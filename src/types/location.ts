export type RiskLevel = 'NORMAL' | 'WATCH' | 'WARNING';

export interface EnvironmentalFeatures {
  elevation: number; // in meters (m)
  slope: number; // in degrees (°)
  aspect: string; // e.g., 'South-West', 'North-East'
  geology: string; // e.g., 'Precambrian Gneiss', 'Tertiary Sandstone'
  soil: string; // e.g., 'Sandy Loam', 'Clayey Loam'
  landCover: string; // e.g., 'Dense Forest', 'Degraded Forest', 'Settlement'
  drainage: string; // e.g., 'High Density Dendritic', 'Moderate Stream Density'
  faultDistanceKm: number; // Distance to major tectonic lineament / fault (km)
}

export interface RainfallMetrics {
  today: number; // mm in last 24h
  last3Days: number; // mm
  last7Days: number; // mm
  last15Days: number; // mm
  last30Days: number; // mm
  max1Day: number; // peak single-day mm in last 30d
  max3Day: number; // peak 3-day mm
  rainyDays: number; // number of days with >2.5mm rain in last 30d
  antecedentRainfallIndex: number; // 0 - 100 API index (weighted decay)
  triggerLevel: 'LOW' | 'NORMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL';
}

export type RainfallFeatures = RainfallMetrics;

export interface PredictionOutput {
  susceptibilityScore: number; // 0 to 1
  rainfallTriggerScore: number; // 0 to 1
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  confidence: number; // 0 to 1
  modelType: string;
  shapContributions: {
    feature: string;
    value: string;
    contribution: number; // e.g. +0.24
    percentage: number;
  }[];
  explanationPoints: string[];
}

export interface ExposureAssets {
  roadSegments: {
    name: string;
    type:
      | 'National Highway'
      | 'State Highway'
      | 'District Road'
      | 'Strategic Road'
      | 'Railway Track'
      | 'City Arterial';
    distanceMeters: number;
    trafficVulnerability: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
  settlements: {
    name: string;
    population: number;
    distanceMeters: number;
  }[];
  hospitals: number;
  schools: number;
  criticalBridges: number;
  estimatedVulnerablePopulation: number;
}

export type ExposureFeatures = ExposureAssets;

export interface MonitoredLocation {
  id: string;
  name: string;
  state: NERState;
  district: string;
  latitude: number;
  longitude: number;
  environmental: EnvironmentalFeatures;
  rainfall: RainfallMetrics;
  prediction: PredictionOutput;
  exposure: ExposureAssets;
  lastUpdated: string;
  historicalEventsCount: number;
}

export type NERState =
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Sikkim'
  | 'Tripura';

export interface StateStats {
  state: NERState;
  capital: string;
  totalLocations: number;
  normalCount: number;
  watchCount: number;
  warningCount: number;
  highRiskDistricts: string[];
  averageElevation: number;
  averageRainfallToday: number;
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
}
