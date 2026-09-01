import { MonitoredLocation } from '../types/location';

export interface DailyRainfallPoint {
  date: string;
  dayLabel: string;
  rainfallMm: number;
  cumulativeMm: number;
  riskScore: number;
  thresholdMm: number;
  isAlertDay: boolean;
}

export interface IntensityDurationPoint {
  durationHours: number;
  intensityMmPerHour: number;
  thresholdMmPerHour: number;
  triggerStatus: 'ABOVE_THRESHOLD' | 'NEAR_THRESHOLD' | 'SAFE';
}

export class RainfallService {
  /**
   * Generates realistic historical daily rainfall and risk score points for a given location and timeframe
   */
  public static getHistoricalTimeSeries(
    location: MonitoredLocation,
    days: 7 | 30 | 90 | 365 = 30
  ): DailyRainfallPoint[] {
    const points: DailyRainfallPoint[] = [];
    const now = new Date('2026-09-01T20:42:00+05:30');
    let runningCumulative = 0;

    const baseMaxRain = location.rainfall.max1Day;
    const baseRainToday = location.rainfall.today;

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric'
      });

      // Generate realistic fluctuating rainfall leading up to today's peak
      let rain = 0;
      if (i === 0) {
        rain = baseRainToday;
      } else if (i <= 3) {
        rain = Math.max(
          5,
          Math.round(baseRainToday * (0.6 + Math.sin(i * 1.5) * 0.35))
        );
      } else if (i <= 7) {
        rain = Math.max(
          2,
          Math.round((baseMaxRain * 0.5) + Math.cos(i) * 20)
        );
      } else {
        const cyclical = Math.sin(i * 0.4) * (baseMaxRain * 0.3);
        rain = Math.max(0, Math.round(15 + cyclical + (Math.sin(i * 1.8) * 12)));
      }

      runningCumulative += rain;

      // Threshold is dynamic based on location slope
      const threshold = Math.round(55 + (location.environmental.slope > 35 ? -15 : 10));
      const riskScore = Math.min(
        98,
        Math.max(
          12,
          Math.round(
            (rain / 120) * 40 +
            (runningCumulative / (days * 18)) * 35 +
            (location.environmental.slope / 45) * 25
          )
        )
      );

      points.push({
        date: dateStr,
        dayLabel,
        rainfallMm: rain,
        cumulativeMm: runningCumulative,
        riskScore,
        thresholdMm: threshold,
        isAlertDay: riskScore >= 70
      });
    }

    return points;
  }

  /**
   * Generates Caine (1980) & Guzzetti (2007) empirical rainfall Intensity-Duration curve points
   * Equation: I_critical = 14.82 * (D ^ -0.39)
   */
  public static getIntensityDurationPoints(location: MonitoredLocation): IntensityDurationPoint[] {
    const durations = [1, 2, 4, 6, 12, 24, 48, 72, 120];
    const peakHourRain = location.rainfall.today / 4; // approx peak 1-hour burst

    return durations.map((d) => {
      const thresholdIntensity = +(14.82 * Math.pow(d, -0.39)).toFixed(2);
      // Simulated actual rainfall intensity over duration
      const actualIntensity = +(
        peakHourRain * Math.pow(d, -0.45) * (location.prediction.rainfallTriggerScore + 0.3)
      ).toFixed(2);

      let triggerStatus: 'ABOVE_THRESHOLD' | 'NEAR_THRESHOLD' | 'SAFE' = 'SAFE';
      if (actualIntensity >= thresholdIntensity) {
        triggerStatus = 'ABOVE_THRESHOLD';
      } else if (actualIntensity >= thresholdIntensity * 0.8) {
        triggerStatus = 'NEAR_THRESHOLD';
      }

      return {
        durationHours: d,
        intensityMmPerHour: actualIntensity,
        thresholdMmPerHour: thresholdIntensity,
        triggerStatus
      };
    });
  }
}
