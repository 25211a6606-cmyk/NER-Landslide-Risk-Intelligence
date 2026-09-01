export interface MLModelSpecs {
  name: string;
  modelName: string;
  version: string;
  architecture: string;
  ensembleComponents: string[];
  trainingDataPoints: number;
  historicalLandslideEvents: number;
  inferenceLatencyMs: number;
  trainingDataset: {
    totalRecords: number;
    historicalEventsCount: number;
    spatialCoverage: string;
    temporalRange: string;
  };
  metrics: {
    accuracy: number;
    aucRoc: number;
    precision: number;
    recall: number;
    f1Score: number;
    brierScore: number;
  };
  evaluationMetrics: {
    accuracy: number;
    aucRoc: number;
    precision: number;
    recall: number;
    f1Score: number;
    brierScore: number;
  };
  featureImportance: {
    feature: string;
    description: string;
    importancePercentage: number;
    category: 'Dynamic Weather' | 'Topographic' | 'Geological' | 'Anthropogenic';
  }[];
  globalFeatureImportance: {
    feature: string;
    description: string;
    importance: number; // 0 to 1
    category: 'Dynamic Weather' | 'Topographic' | 'Geological' | 'Anthropogenic';
  }[];
  confusionMatrix: {
    trueWarning_predWarning: number;
    trueWarning_predSafe: number;
    trueSafe_predWarning: number;
    trueSafe_predSafe: number;
  };
  rocPoints: { fpr: number; tpr: number }[];
  rainfallThresholdEquation: string;
}

export const ML_SPECS_DATA: MLModelSpecs = {
  name: 'NER-LandslideNet v2.4 (GeoAI Ensemble)',
  modelName: 'NER-LandslideNet v2.4 (XGBoost + RF)',
  version: '2.4.2-prod (SIH 2026 Edition)',
  architecture: 'Hierarchical Spatial Gradient Boosting (XGBoost) + Random Forest Regressor + Dynamic Antecedent Decay Neural Head',
  ensembleComponents: [
    'XGBoost v2.1 (Susceptibility & Non-linear Factor Interaction)',
    'Random Forest 500-Tree Classifier (Lithological & Slope Cohesion)',
    'Antecedent Precipitation Index (API) Decay Function: API_t = P_t + 0.85*API_{t-1}',
    'Empirical Intensity-Duration (I-D) Threshold Verifier (Caine-Guzzetti Curve)'
  ],
  trainingDataPoints: 48920,
  historicalLandslideEvents: 3418, // GSI Landslide Inventory NER records 2010-2025
  inferenceLatencyMs: 18,
  trainingDataset: {
    totalRecords: 48920,
    historicalEventsCount: 3418,
    spatialCoverage: 'All 8 North-Eastern States (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura)',
    temporalRange: '2010–2025 (Monsoon & Post-Monsoon Records)'
  },
  metrics: {
    accuracy: 0.934,
    aucRoc: 0.961,
    precision: 0.912,
    recall: 0.948,
    f1Score: 0.929,
    brierScore: 0.078
  },
  evaluationMetrics: {
    accuracy: 0.934,
    aucRoc: 0.961,
    precision: 0.912,
    recall: 0.948,
    f1Score: 0.929,
    brierScore: 0.078
  },
  featureImportance: [
    {
      feature: 'Antecedent Rainfall Index (API_7D/15D)',
      description: 'Decay-weighted soil moisture accumulation proxy over 7 & 15 days',
      importancePercentage: 28.4,
      category: 'Dynamic Weather'
    },
    {
      feature: 'Slope Gradient (SRTM 30m DEM)',
      description: 'First derivative of elevation determining gravitational shear stress',
      importancePercentage: 22.8,
      category: 'Topographic'
    },
    {
      feature: '24h Peak Rainfall Intensity',
      description: 'Maximum 1-day deluge triggering pore-water pressure spikes',
      importancePercentage: 16.5,
      category: 'Dynamic Weather'
    },
    {
      feature: 'Lithology & Weathering Grade',
      description: 'GSI 1:50k geological units (Disang Shale, Schist, Sandstone)',
      importancePercentage: 12.4,
      category: 'Geological'
    },
    {
      feature: 'Distance to Active Tectonic Lineament / Fault',
      description: 'Proximity to MCT, MFT, Dauki, and Schuppen thrust belts',
      importancePercentage: 8.2,
      category: 'Geological'
    },
    {
      feature: 'Anthropogenic Road & Slope Cuts',
      description: 'Distance to NH/SH corridors with toe excavation surcharges',
      importancePercentage: 6.1,
      category: 'Anthropogenic'
    },
    {
      feature: 'Land Use / Land Cover (Sentinel-2 NDVI)',
      description: 'Root reinforcement from dense tree canopy vs barren/urban slopes',
      importancePercentage: 5.6,
      category: 'Topographic'
    }
  ],
  globalFeatureImportance: [
    {
      feature: 'Antecedent Rainfall Index (API_7D/15D)',
      description: 'Decay-weighted soil moisture accumulation proxy over 7 & 15 days',
      importance: 0.284,
      category: 'Dynamic Weather'
    },
    {
      feature: 'Slope Gradient (SRTM 30m DEM)',
      description: 'First derivative of elevation determining gravitational shear stress',
      importance: 0.228,
      category: 'Topographic'
    },
    {
      feature: '24h Peak Rainfall Intensity',
      description: 'Maximum 1-day deluge triggering pore-water pressure spikes',
      importance: 0.165,
      category: 'Dynamic Weather'
    },
    {
      feature: 'Lithology & Weathering Grade',
      description: 'GSI 1:50k geological units (Disang Shale, Schist, Sandstone)',
      importance: 0.124,
      category: 'Geological'
    },
    {
      feature: 'Distance to Active Tectonic Lineament / Fault',
      description: 'Proximity to MCT, MFT, Dauki, and Schuppen thrust belts',
      importance: 0.082,
      category: 'Geological'
    },
    {
      feature: 'Anthropogenic Road & Slope Cuts',
      description: 'Distance to NH/SH corridors with toe excavation surcharges',
      importance: 0.061,
      category: 'Anthropogenic'
    },
    {
      feature: 'Land Use / Land Cover (Sentinel-2 NDVI)',
      description: 'Root reinforcement from dense tree canopy vs barren/urban slopes',
      importance: 0.056,
      category: 'Topographic'
    }
  ],
  confusionMatrix: {
    trueWarning_predWarning: 894,
    trueWarning_predSafe: 49,
    trueSafe_predWarning: 86,
    trueSafe_predSafe: 3863
  },
  rocPoints: [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.02, tpr: 0.38 },
    { fpr: 0.04, tpr: 0.65 },
    { fpr: 0.07, tpr: 0.82 },
    { fpr: 0.1, tpr: 0.91 },
    { fpr: 0.15, tpr: 0.95 },
    { fpr: 0.22, tpr: 0.97 },
    { fpr: 0.35, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 }
  ],
  rainfallThresholdEquation: 'I = 14.82 × D^(-0.39) (where I = mm/h, D = duration in hours)'
};

export const ML_MODEL_SPECS = ML_SPECS_DATA;
