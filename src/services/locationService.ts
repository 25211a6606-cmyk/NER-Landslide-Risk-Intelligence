import { INITIAL_MONITORED_LOCATIONS, NER_STATES_INFO } from '../data/nerLocations';
import { MonitoredLocation, NERState, RiskLevel, StateStats } from '../types/location';

export class LocationService {
  private locations: MonitoredLocation[] = [...INITIAL_MONITORED_LOCATIONS];

  public getAllLocations(): MonitoredLocation[] {
    return [...this.locations];
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

    const baseInfo = NER_STATES_INFO[state];

    return {
      ...baseInfo,
      totalLocations: locs.length,
      normalCount,
      watchCount,
      warningCount
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
