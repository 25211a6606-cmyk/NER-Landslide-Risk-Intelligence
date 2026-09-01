export interface RiskThresholdConfig {
  normalMax: number; // e.g. 39
  watchMax: number; // e.g. 69
  warningMin: number; // e.g. 70
  // Configurable weights for unified risk formula:
  // Risk = (wSusceptibility * Susceptibility) + (wRainfall * Trigger) + (wExposure * Exposure)
  susceptibilityWeight: number; // default 0.45
  rainfallWeight: number; // default 0.40
  exposureWeight: number; // default 0.15
}

export interface MapLayerState {
  riskMarkers: boolean;
  susceptibilityHeatmap: boolean;
  dynamicRainfall: boolean;
  roadNetwork: boolean;
  settlements: boolean;
  criticalInfrastructure: boolean;
  alertRadiusBuffer: boolean;
  satelliteOverlay: boolean;
  stateBoundaries: boolean;
}

export type MapTileStyle = 'carto-dark' | 'osm-standard' | 'esri-satellite' | 'opentopo';

export interface SystemSettingsState {
  theme: 'dark' | 'slate' | 'light';
  mapStyle: MapTileStyle;
  autoRefreshIntervalSeconds: number; // 0 for manual, 15, 30, 60, 300
  demoMode: boolean;
  liveSimulationActive: boolean;
  soundAlertsEnabled: boolean;
  riskThresholds: RiskThresholdConfig;
}
