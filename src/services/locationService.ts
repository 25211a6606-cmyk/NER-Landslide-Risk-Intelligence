import { ALL_STATE_LOCATIONS } from '../data/allStateLocations';
import { NER_STATES_INFO } from '../data/nerLocations';
import { MonitoredLocation, NERState, RiskLevel, StateStats } from '../types/location';
import { RiskThresholdConfig } from '../types/config';
import { PredictionEngine, DEFAULT_THRESHOLDS } from './predictionService';

export class LocationService {
  private locations: MonitoredLocation[] = [...ALL_STATE_LOCATIONS];

  public getAllLocations(): MonitoredLocation[] {
    return [...this.locations];
  }

  public setLocations(newLocations: MonitoredLocation[]): void {
    this.locations = [...newLocations];
  }

  public getLocationById(id: string): MonitoredLocation | undefined {
    return this.locations.find((loc) => loc.id === id);
  }

  public getLocationsByState(state: NERState): MonitoredLocation[] {
    return this.locations.filter((loc) => loc.state === state);
  }

  public getLocationsByRisk(risk: RiskLevel): MonitoredLocation[] {
    return this.locations.filter((loc) => loc.prediction.riskLevel === risk);
  }

  public updateLocation(updatedLocation: MonitoredLocation): void {
    const idx = this.locations.findIndex((l) => l.id === updatedLocation.id);
    if (idx !== -1) {
      this.locations[idx] = { ...updatedLocation };
    }
  }

  /**
   * Recalculates risk for ALL locations based on the current System & Risk Thresholds
   */
  public recalculateAllWithThresholds(config: RiskThresholdConfig): MonitoredLocation[] {
    this.locations = this.locations.map((loc) => {
      const newPrediction = PredictionEngine.evaluateRisk(
        loc.environmental,
        loc.rainfall,
        loc.exposure,
        config
      );
      return {
        ...loc,
        prediction: newPrediction,
        lastUpdated: new Date().toISOString()
      };
    });
    return [...this.locations];
  }

  /**
   * Simulates dynamic real-time telemetry streaming from IMD automated weather stations (AWS),
   * piezometer pore-pressure telemetry, and radar rainfall feeds.
   */
  public simulateRealTimeTelemetryTick(config: RiskThresholdConfig = DEFAULT_THRESHOLDS): {
    updatedLocations: MonitoredLocation[];
    affectedLocations: MonitoredLocation[];
    newWarningsCount: number;
  } {
    // Pick 4-8 random locations to receive live rainfall/telemetry packets
    const countToUpdate = Math.floor(Math.random() * 5) + 4;
    const shuffled = [...this.locations].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, countToUpdate);
    const affectedLocations: MonitoredLocation[] = [];
    let newWarningsCount = 0;

    const updated = this.locations.map((loc) => {
      if (selected.some((s) => s.id === loc.id)) {
        // Generate realistic telemetry jitter (+0.5mm to +4.5mm rain, or slight dry shift)
        const isRainSurge = Math.random() > 0.35;
        const rainDelta = isRainSurge ? +(Math.random() * 3.8 + 0.5).toFixed(1) : 0;
        const newToday = +(loc.rainfall.today + rainDelta).toFixed(1);
        const new7d = +(loc.rainfall.last7Days + rainDelta).toFixed(1);
        const newApi = Math.min(
          99,
          Math.max(20, +(loc.rainfall.antecedentRainfallIndex + (isRainSurge ? 0.8 : -0.3)).toFixed(1))
        );

        let newTriggerLevel: 'LOW' | 'NORMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
        if (newToday > 100 || newApi > 85) newTriggerLevel = 'CRITICAL';
        else if (newToday > 60 || newApi > 70) newTriggerLevel = 'HIGH';
        else if (newToday > 35 || newApi > 50) newTriggerLevel = 'MODERATE';

        const updatedRainfall = {
          ...loc.rainfall,
          today: newToday,
          last7Days: new7d,
          antecedentRainfallIndex: newApi,
          triggerLevel: newTriggerLevel
        };

        const prevRisk = loc.prediction.riskLevel;
        const newPrediction = PredictionEngine.evaluateRisk(
          loc.environmental,
          updatedRainfall,
          loc.exposure,
          config
        );

        if (prevRisk !== 'WARNING' && newPrediction.riskLevel === 'WARNING') {
          newWarningsCount++;
        }

        const updatedLoc: MonitoredLocation = {
          ...loc,
          rainfall: updatedRainfall,
          prediction: newPrediction,
          lastUpdated: new Date().toISOString()
        };

        affectedLocations.push(updatedLoc);
        return updatedLoc;
      }
      return loc;
    });

    this.locations = updated;
    return {
      updatedLocations: [...this.locations],
      affectedLocations,
      newWarningsCount
    };
  }

  public filterLocations(params: {
    state?: string;
    district?: string;
    risk?: string;
    searchQuery?: string;
    minSlope?: number;
  }): MonitoredLocation[] {
    return this.locations.filter((loc) => {
      if (params.state && params.state !== 'ALL' && loc.state !== params.state) {
        return false;
      }
      if (params.district && params.district !== 'ALL' && loc.district !== params.district) {
        return false;
      }
      if (params.risk && params.risk !== 'ALL' && loc.prediction.riskLevel !== params.risk) {
        return false;
      }
      if (params.minSlope && loc.environmental.slope < params.minSlope) {
        return false;
      }
      if (params.searchQuery) {
        const q = params.searchQuery.toLowerCase().trim();
        const matchName = loc.name.toLowerCase().includes(q);
        const matchState = loc.state.toLowerCase().includes(q);
        const matchDistrict = loc.district.toLowerCase().includes(q);
        const matchGeology = loc.environmental.geology.toLowerCase().includes(q);
        const matchRoad = loc.exposure.roadSegments.some((r) => r.name.toLowerCase().includes(q));
        if (!matchName && !matchState && !matchDistrict && !matchGeology && !matchRoad) {
          return false;
        }
      }
      return true;
    });
  }

  public updateLocationPrediction(id: string, newScore: number, newRisk: RiskLevel): void {
    const idx = this.locations.findIndex((l) => l.id === id);
    if (idx !== -1) {
      this.locations[idx] = {
        ...this.locations[idx],
        prediction: {
          ...this.locations[idx].prediction,
          riskScore: newScore,
          riskLevel: newRisk
        },
        lastUpdated: new Date().toISOString()
      };
    }
  }

  public getStateStats(state: NERState): StateStats {
    const locs = this.getLocationsByState(state);
    const normalCount = locs.filter((l) => l.prediction.riskLevel === 'NORMAL').length;
    const watchCount = locs.filter((l) => l.prediction.riskLevel === 'WATCH').length;
    const warningCount = locs.filter((l) => l.prediction.riskLevel === 'WARNING').length;

    const baseInfo = NER_STATES_INFO[state] || {
      state,
      capital: 'State Capital',
      totalLocations: locs.length,
      normalCount: 0,
      watchCount: 0,
      warningCount: 0,
      highRiskDistricts: [],
      averageElevation: 1000,
      averageRainfallToday: 50,
      coordinates: [26.0, 92.0],
      zoomLevel: 8
    };

    const avgElev = locs.length
      ? Math.round(locs.reduce((acc, l) => acc + l.environmental.elevation, 0) / locs.length)
      : baseInfo.averageElevation;
    const avgRain = locs.length
      ? +(locs.reduce((acc, l) => acc + l.rainfall.today, 0) / locs.length).toFixed(1)
      : baseInfo.averageRainfallToday;

    return {
      ...baseInfo,
      totalLocations: locs.length,
      normalCount,
      watchCount,
      warningCount,
      averageElevation: avgElev,
      averageRainfallToday: avgRain
    };
  }

  public getAllStatesSummary(): Record<NERState, StateStats> {
    const result: Partial<Record<NERState, StateStats>> = {};
    const states = Object.keys(NER_STATES_INFO) as NERState[];
    for (const st of states) {
      result[st] = this.getStateStats(st);
    }
    return result as Record<NERState, StateStats>;
  }

  public getSystemOverviewStats() {
    const total = this.locations.length;
    const normal = this.locations.filter((l) => l.prediction.riskLevel === 'NORMAL').length;
    const watch = this.locations.filter((l) => l.prediction.riskLevel === 'WATCH').length;
    const warning = this.locations.filter((l) => l.prediction.riskLevel === 'WARNING').length;

    const totalRoads = this.locations.reduce((acc, l) => acc + l.exposure.roadSegments.length, 0);
    const totalSettlements = this.locations.reduce((acc, l) => acc + l.exposure.settlements.length, 0);
    const totalVulnerablePop = this.locations.reduce((acc, l) => acc + l.exposure.estimatedVulnerablePopulation, 0);

    return {
      monitoredStatesCount: 8,
      totalLocations: total,
      normalLocations: normal,
      watchLocations: watch,
      warningLocations: warning,
      exposedRoadsCount: totalRoads,
      exposedSettlementsCount: totalSettlements,
      vulnerablePopulationTotal: totalVulnerablePop,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    };
  }
}

export const locationService = new LocationService();
