import { alertService } from './alertService';
import { locationService } from './locationService';
import { RainfallService } from './rainfallService';
import { smsService } from './smsService';
import { MonitoredLocation, NERState } from '../types/location';
import { Subscriber } from '../types/alert';

export class LandslideApiClient {
  private isLiveApiConnected = false;

  public async getStates() {
    return locationService.getAllStatesSummary();
  }

  public async getStateDetails(stateName: NERState) {
    return locationService.getStateStats(stateName);
  }

  public async getDistrictsByState(stateName: NERState): Promise<string[]> {
    const locs = locationService.getLocationsByState(stateName);
    const districts = Array.from(new Set(locs.map((l) => l.district)));
    return districts;
  }

  public async getLocations(params?: {
    state?: string;
    district?: string;
    risk?: string;
    searchQuery?: string;
    minSlope?: number;
  }): Promise<MonitoredLocation[]> {
    if (params) {
      return locationService.filterLocations(params);
    }
    return locationService.getAllLocations();
  }

  public async getLocationById(id: string): Promise<MonitoredLocation | undefined> {
    return locationService.getLocationById(id);
  }

  public async getLocationPrediction(id: string) {
    const loc = locationService.getLocationById(id);
    if (!loc) throw new Error(`Location ${id} not found`);
    return {
      location_id: loc.id,
      state: loc.state,
      district: loc.district,
      latitude: loc.latitude,
      longitude: loc.longitude,
      susceptibility_score: loc.prediction.susceptibilityScore,
      rainfall_trigger_score: loc.prediction.rainfallTriggerScore,
      risk_score: loc.prediction.riskScore,
      risk_level: loc.prediction.riskLevel,
      confidence: loc.prediction.confidence,
      shap_contributions: loc.prediction.shapContributions,
      explanation_points: loc.prediction.explanationPoints,
      last_updated: loc.lastUpdated
    };
  }

  public async getLocationRainfall(id: string) {
    const loc = locationService.getLocationById(id);
    if (!loc) throw new Error(`Location ${id} not found`);
    return {
      location_id: loc.id,
      rainfall: loc.rainfall,
      intensity_duration: RainfallService.getIntensityDurationPoints(loc)
    };
  }

  public async getLocationHistory(id: string, days: 7 | 30 | 90 | 365 = 30) {
    const loc = locationService.getLocationById(id);
    if (!loc) throw new Error(`Location ${id} not found`);
    return {
      location_id: loc.id,
      days,
      time_series: RainfallService.getHistoricalTimeSeries(loc, days)
    };
  }

  public async getLocationExposure(id: string) {
    const loc = locationService.getLocationById(id);
    if (!loc) throw new Error(`Location ${id} not found`);
    return {
      location_id: loc.id,
      exposure: loc.exposure
    };
  }

  public async getAlerts() {
    return {
      active_alerts: alertService.getActiveAlerts(),
      all_alerts: alertService.getAllAlerts()
    };
  }

  public async subscribeToAlerts(subData: Omit<Subscriber, 'id' | 'subscribedAt' | 'active'>) {
    const subscriber = alertService.addSubscriber(subData);
    return {
      success: true,
      message: 'Alert subscription activated successfully.',
      subscriber
    };
  }

  public async testEmergencyAlert(locationId: string) {
    const loc = locationService.getLocationById(locationId);
    if (!loc) throw new Error(`Location ${locationId} not found`);
    const result = await alertService.broadcastAlertForLocation(loc, 'WARNING');
    return {
      success: true,
      message: `Emergency alert broadcasted for ${loc.name}. ${result.smsSentCount} SMS notifications dispatched.`,
      ...result
    };
  }

  public async getSystemStatus() {
    return {
      status: 'OPERATIONAL',
      mode: 'DEMO_AND_GEOAI_HYBRID',
      services: {
        gsi_landslide_inventory: { status: 'ONLINE', records: 3418, coverage: 'ALL_8_NER_STATES' },
        imd_satellite_rainfall_gpm: { status: 'ONLINE', resolution: '0.1_DEGREE', latency: '15_MINUTES' },
        sentinel_environmental_rasters: { status: 'ONLINE', dem_resolution: '30m_SRTM', ndvi: 'SENTINEL_2' },
        ml_prediction_engine: { status: 'ONLINE', model: 'XGBoost_v2.4_GeoAI', inference_time_ms: 18 },
        sms_gateway_service: { status: 'ONLINE_MOCK', provider: 'BSNL_NER_GATEWAY_MOCK', queue_healthy: true },
        spatial_database_postgis: { status: 'CONNECTED', tables: 12, srid: 'EPSG_4326' }
      },
      last_data_sync: '2026-09-01T20:42:00+05:30'
    };
  }

  public getSMSService() {
    return smsService;
  }
}

export const api = new LandslideApiClient();
