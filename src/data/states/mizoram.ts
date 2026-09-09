import { MonitoredLocation } from '../../types/location';

export const MIZORAM_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'MIZ_001',
    name: 'Aizawl - Bawngkawn Sinking Zone & Ramhlun Slopes',
    state: 'Mizoram',
    district: 'Aizawl',
    latitude: 23.7580,
    longitude: 92.7310,
    environmental: {
      elevation: 1040,
      slope: 41.5,
      aspect: 'West',
      geology: 'Surma Group (Bhuban Formation) Alternating Sandstone & Friable Shale',
      soil: 'Residual Silty Clay Mantle with High Saturation Softening',
      landCover: 'Extreme Density Multi-Story Hillside RCC Buildings on Staggered Columns',
      drainage: 'Chite Lui River Ravine Catchment',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 108.0,
      last3Days: 235.0,
      last7Days: 440.0,
      last15Days: 780.0,
      last30Days: 1260.0,
      max1Day: 120.0,
      max3Day: 265.0,
      rainyDays: 23,
      antecedentRainfallIndex: 92.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.94,
      rainfallTriggerScore: 0.93,
      riskScore: 94,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Excessive Structural Surcharge on Steep Slopes', value: 'Overloaded Multi-Story RCC', contribution: 0.36, percentage: 38 },
        { feature: 'Bhuban Shale Dip-Parallel Slumping', value: 'Dip into Valley Plane', contribution: 0.30, percentage: 32 },
        { feature: 'Severe Monsoon Saturation (108 mm 24h)', value: 'Extreme Surcharge Trigger', contribution: 0.23, percentage: 24 },
        { feature: 'Unlined Domestic Sullage & Storm Outfalls', value: 'Artificial Slope Saturation', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Aizawl capital northern corridor (Bawngkawn-Ramhlun-Chite Lui) has active deep-seated rotational slides.',
        'Immediate warning for residential apartment collapses and main artery NH-54/NH-2 blockades.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-54 (Aizawl - Silchar Arterial Lifeline)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' },
        { name: 'Ramhlun - Bawngkawn Link Road', type: 'City Arterial', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Bawngkawn Ward Colony', population: 12500, distanceMeters: 80 },
        { name: 'Ramhlun North Sector', population: 9200, distanceMeters: 120 }
      ],
      hospitals: 2,
      schools: 5,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 21700
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 34
  },
  {
    id: 'MIZ_002',
    name: 'Lunglei - Venglai Hill Slopes',
    state: 'Mizoram',
    district: 'Lunglei',
    latitude: 22.8840,
    longitude: 92.7480,
    environmental: {
      elevation: 720,
      slope: 37.0,
      aspect: 'South',
      geology: 'Middle Bhuban Sandstone & Siltstone Intercalations',
      soil: 'Silty Loam over Weathered Shale Beds',
      landCover: 'High-density Hillside Settlements & Road Cuts',
      drainage: 'Tlawng River Basin Sub-streams',
      faultDistanceKm: 2.4
    },
    rainfall: {
      today: 82.0,
      last3Days: 180.0,
      last7Days: 330.0,
      last15Days: 590.0,
      last30Days: 940.0,
      max1Day: 92.0,
      max3Day: 200.0,
      rainyDays: 20,
      antecedentRainfallIndex: 81.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.81,
      rainfallTriggerScore: 0.81,
      riskScore: 81,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Hill Ridge Settlement Slope Overloading', value: 'High Density Habitation', contribution: 0.33, percentage: 36 },
        { feature: 'Continuous Heavy Monsoon Rain (82 mm)', value: 'Rapid Saturation', contribution: 0.28, percentage: 30 },
        { feature: 'Steep Natural Incline (37.0°)', value: 'High Gravitational Stress', contribution: 0.24, percentage: 26 },
        { feature: 'Bedding Plane Weakness', value: 'Valley Dips', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning issued for southern district headquarters Lunglei (Venglai and Rahsiveng sectors).',
        'Multiple mudslips threatening secondary road connections towards Lawngtlai.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-54 (Lunglei - Tlabung Axis)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Venglai Sector', population: 6800, distanceMeters: 220 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 6800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 16
  },
  {
    id: 'MIZ_003',
    name: 'Champhai - Zokhawthar Border Hills',
    state: 'Mizoram',
    district: 'Champhai',
    latitude: 23.3640,
    longitude: 93.3280,
    environmental: {
      elevation: 1320,
      slope: 34.0,
      aspect: 'East',
      geology: 'Upper Bhuban Massive Sandstone with Jointed Shale Bands',
      soil: 'Sandy Silt Loam with High Porosity',
      landCover: 'Grape Vineyards, Terraces & Border Lifeline Highway',
      drainage: 'Tiau (Indo-Myanmar Border) River Gorge',
      faultDistanceKm: 1.6
    },
    rainfall: {
      today: 65.0,
      last3Days: 144.0,
      last7Days: 270.0,
      last15Days: 490.0,
      last30Days: 800.0,
      max1Day: 75.0,
      max3Day: 160.0,
      rainyDays: 18,
      antecedentRainfallIndex: 70.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.72,
      rainfallTriggerScore: 0.69,
      riskScore: 71,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'International Border Lifeline Transit Vulnerability', value: 'High Border Commerce Traffic', contribution: 0.32, percentage: 35 },
        { feature: 'Tiau Fault Shear Zone (1.6 km)', value: 'Tectonic Fracture Zone', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Inflow (144 mm 3D)', value: 'Pore Water Rise', contribution: 0.24, percentage: 26 },
        { feature: 'Steep Valley Flank (34.0°)', value: 'Rockfall Potential', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning triggered for Champhai-Zokhawthar border highway; rockfalls and planar slips frequent during July-August.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Champhai - Zokhawthar Border Road', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Zokhawthar Border Town', population: 4100, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 13
  },
  {
    id: 'MIZ_004',
    name: 'Kolasib - Vairengte NH-306 Lifeline',
    state: 'Mizoram',
    district: 'Kolasib',
    latitude: 24.3120,
    longitude: 92.7680,
    environmental: {
      elevation: 580,
      slope: 36.0,
      aspect: 'North',
      geology: 'Bokabil Formation Soft Mudstone & Siltstone',
      soil: 'Red Clayey Silt (Rapid Softening Upon Rain)',
      landCover: 'Highway Corridor & Bamboo Groves',
      drainage: 'Tlawng River Lower Gorge',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 92.0,
      last3Days: 205.0,
      last7Days: 375.0,
      last15Days: 660.0,
      last30Days: 1040.0,
      max1Day: 105.0,
      max3Day: 225.0,
      rainyDays: 21,
      antecedentRainfallIndex: 86.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.85,
      rainfallTriggerScore: 0.86,
      riskScore: 85,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Lifeline Transit Chokepoint (NH-306)', value: 'Sole Highway Supply Line to Mizoram', contribution: 0.35, percentage: 37 },
        { feature: 'Soft Mudstone Plastic Flow & Liquefaction', value: 'High Plasticity Index', contribution: 0.30, percentage: 32 },
        { feature: 'Torrential 24h Downpour (92 mm)', value: 'Critical Trigger', contribution: 0.22, percentage: 23 },
        { feature: 'Over-steepened Road Cuts (36.0°)', value: 'Unstabilized Cut Slopes', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'National lifeline NH-306 connecting Assam to Mizoram at high risk of multi-day blockade.',
        'Continuous slumping along Vairengte ghat section.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-306 (Silchar - Aizawl Primary Corridor)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Vairengte Town Gate', population: 6200, distanceMeters: 250 },
        { name: 'Kolasib Outskirts', population: 4500, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 10700
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 27
  },
  {
    id: 'MIZ_005',
    name: 'Serchhip - Keitum Hill Pass',
    state: 'Mizoram',
    district: 'Serchhip',
    latitude: 23.3140,
    longitude: 92.8450,
    environmental: {
      elevation: 880,
      slope: 32.5,
      aspect: 'West',
      geology: 'Middle Bhuban Sandstone-Shale Alternation',
      soil: 'Sandy Silt Loam with Low Organic Cohesion',
      landCover: 'Open Agriculture, Citrus Groves & Town Slopes',
      drainage: 'Mat River Sub-basin',
      faultDistanceKm: 3.5
    },
    rainfall: {
      today: 52.0,
      last3Days: 118.0,
      last7Days: 220.0,
      last15Days: 410.0,
      last30Days: 690.0,
      max1Day: 62.0,
      max3Day: 132.0,
      rainyDays: 17,
      antecedentRainfallIndex: 60.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.62,
      rainfallTriggerScore: 0.58,
      riskScore: 60,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Mat River Basin Valley Flank Surcharge', value: 'Moderate Slope Relief', contribution: 0.31, percentage: 34 },
        { feature: 'Rainfall Infiltration (118 mm 3D)', value: 'Subsurface Wetting', contribution: 0.27, percentage: 30 },
        { feature: 'Slope Incline (32.5°)', value: 'Moderate Gravity Pull', contribution: 0.23, percentage: 25 },
        { feature: 'Citrus Orchard Root Density', value: 'Moderate Soil Binding', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch advisory active for Serchhip-Keitum pass section on NH-54.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-54 (Central Mizoram Corridor)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Serchhip Bazar Area', population: 5200, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 5200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'MIZ_006',
    name: 'Hnahthial - Tuipui River Valley Slopes',
    state: 'Mizoram',
    district: 'Hnahthial',
    latitude: 22.9640,
    longitude: 92.9320,
    environmental: {
      elevation: 640,
      slope: 35.0,
      aspect: 'South-East',
      geology: 'Surma Group Siltstone with Sheared Cleavage',
      soil: 'Clayey Residual Silt',
      landCover: 'Mixed Tropical Deciduous Forest & Agro-plots',
      drainage: 'Tuipui River High Gradient Gorge',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 58.0,
      last3Days: 130.0,
      last7Days: 245.0,
      last15Days: 450.0,
      last30Days: 740.0,
      max1Day: 68.0,
      max3Day: 145.0,
      rainyDays: 18,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.67,
      rainfallTriggerScore: 0.63,
      riskScore: 65,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Riverine Toe Undercutting & Erosion', value: 'Tuipui Swell Scour', contribution: 0.32, percentage: 35 },
        { feature: 'Soil Saturation (65.0 API)', value: 'High Saturated Hydraulic Head', contribution: 0.28, percentage: 31 },
        { feature: 'Valley Slope Angle (35.0°)', value: 'Critical Relief Angle', contribution: 0.23, percentage: 25 },
        { feature: 'Forest Buffer Retention', value: 'Canopy Interception', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch alert for Hnahthial town feeder road cuts; monitor for tension cracks on road shoulders.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Hnahthial - Sangau Road', type: 'State Highway', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Hnahthial Town Sector', population: 3100, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'MIZ_007',
    name: 'Lawngtlai - Kaladan Multi-Modal Transit Corridor',
    state: 'Mizoram',
    district: 'Lawngtlai',
    latitude: 22.5280,
    longitude: 92.8940,
    environmental: {
      elevation: 610,
      slope: 38.0,
      aspect: 'South',
      geology: 'Bhuban Formation Jointed Sandstone & Friable Shale',
      soil: 'Gravelly Colluvial Silt Clay',
      landCover: 'Strategic Highway Construction Corridor & Rainforest',
      drainage: 'Kaladan River Basin Suture',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 78.0,
      last3Days: 172.0,
      last7Days: 320.0,
      last15Days: 580.0,
      last30Days: 920.0,
      max1Day: 88.0,
      max3Day: 190.0,
      rainyDays: 20,
      antecedentRainfallIndex: 78.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.78,
      rainfallTriggerScore: 0.77,
      riskScore: 78,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Strategic International Corridor Cut Excavation', value: 'Unstabilized High Cut Slopes', contribution: 0.35, percentage: 37 },
        { feature: 'Heavy Monsoon Downpour Pulse (78 mm)', value: 'High Pore Pressure', contribution: 0.29, percentage: 31 },
        { feature: 'Steep Incline (38.0°)', value: 'High Gravitational Stress', contribution: 0.23, percentage: 24 },
        { feature: 'Kaladan Fault Line Splay', value: '1.9 km Distance', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning triggered for Kaladan Multi-Modal road link between Lawngtlai and Indo-Myanmar border at Zorinpui.',
        'High rate of mud slides and rock falls blocking road machinery.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kaladan Multi-Modal Highway (NH-502A)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lawngtlai Council Area', population: 5800, distanceMeters: 320 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 5800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 15
  },
  {
    id: 'MIZ_008',
    name: 'Mamit - Dampa Tiger Reserve Escarpment',
    state: 'Mizoram',
    district: 'Mamit',
    latitude: 23.9280,
    longitude: 92.4890,
    environmental: {
      elevation: 710,
      slope: 33.8,
      aspect: 'West',
      geology: 'Surma Siltstone with Interbedded Quartzose Sandstone',
      soil: 'Sandy Clay Loam with High Porosity',
      landCover: 'Tropical Evergreen Forest & Sanctuary Perimeter Road',
      drainage: 'Teirei River Valley',
      faultDistanceKm: 3.2
    },
    rainfall: {
      today: 50.0,
      last3Days: 112.0,
      last7Days: 210.0,
      last15Days: 390.0,
      last30Days: 660.0,
      max1Day: 58.0,
      max3Day: 124.0,
      rainyDays: 16,
      antecedentRainfallIndex: 56.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.58,
      rainfallTriggerScore: 0.53,
      riskScore: 56,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Sanctuary Access Road Cut Slope', value: '33.8° Cut Slope', contribution: 0.30, percentage: 33 },
        { feature: 'Subsurface Rainfall Saturation (112 mm 3D)', value: 'Moderate Influx', contribution: 0.27, percentage: 30 },
        { feature: 'Valley Flank Gravitational Shear', value: 'Moderate Potential', contribution: 0.22, percentage: 24 },
        { feature: 'Protected Forest Tree Canopy', value: 'Intact Soil Structure', contribution: -0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Watch advisory for Mamit-Lengpui connecting highway cuts during continuous showers.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mamit - Lengpui Airport Road', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Mamit Town Center', population: 3900, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MIZ_009',
    name: 'Saitual - Ngopa Mountain Link',
    state: 'Mizoram',
    district: 'Saitual',
    latitude: 23.6890,
    longitude: 92.9750,
    environmental: {
      elevation: 1100,
      slope: 35.5,
      aspect: 'North-East',
      geology: 'Middle Bhuban Weathered Shales and Siltstone Beds',
      soil: 'Gravelly Silty Clay Loam',
      landCover: 'Agro-forestry, Terraced Slopes & Ridge Settlements',
      drainage: 'Tuivawl River Catchment',
      faultDistanceKm: 2.7
    },
    rainfall: {
      today: 54.0,
      last3Days: 122.0,
      last7Days: 230.0,
      last15Days: 430.0,
      last30Days: 720.0,
      max1Day: 62.0,
      max3Day: 136.0,
      rainyDays: 17,
      antecedentRainfallIndex: 61.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.63,
      rainfallTriggerScore: 0.60,
      riskScore: 62,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Saitual Ridge Splay Fractures', value: '2.7 km Fault Line', contribution: 0.31, percentage: 34 },
        { feature: 'Weekly Rain Volume (230 mm)', value: 'Pore Pressure Accumulation', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Incline (35.5°)', value: 'Moderate High Relief', contribution: 0.23, percentage: 25 },
        { feature: 'Terrace Farming Drainage', value: 'Controlled Runoff', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory active for Saitual-Ngopa road sector; slow creep observed on agricultural terraces.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Saitual - Ngopa Highway', type: 'State Highway', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Saitual Town Outskirts', population: 3600, distanceMeters: 420 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'MIZ_010',
    name: 'Champhai - Zokhawthar Border Trade Highway',
    state: 'Mizoram',
    district: 'Champhai',
    latitude: 23.4720,
    longitude: 93.3280,
    environmental: {
      elevation: 1380,
      slope: 39.4,
      aspect: 'East',
      geology: 'Surma Group Massive Sandstone with Silty Shale Intercalations',
      soil: 'Porous Sandy Silt over Tilted Bedding Dip Planes',
      landCover: 'Vineyards, Terraced Rice Fields & Road Cut Terraces',
      drainage: 'Tiau River International Border Chasm',
      faultDistanceKm: 1.5
    },
    rainfall: {
      today: 76.0,
      last3Days: 172.0,
      last7Days: 315.0,
      last15Days: 540.0,
      last30Days: 890.0,
      max1Day: 90.0,
      max3Day: 188.0,
      rainyDays: 20,
      antecedentRainfallIndex: 77.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-CMP-10',
      telemetrySource: 'IMD Automated Weather Station + GSI Dipmeter',
      soilMoisturePct: 82.3,
      poreWaterPressureKPa: 55.4
    },
    prediction: {
      susceptibilityScore: 0.81,
      rainfallTriggerScore: 0.79,
      riskScore: 80,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Daylighting Dip Slope Strata toward Tiau Gorge', value: 'High Kinematic Slip', contribution: 0.36, percentage: 38 },
        { feature: 'High 3-Day Rain Influx (172mm)', value: 'Severe Infiltration', contribution: 0.30, percentage: 32 },
        { feature: 'Slope Incline (39.4°)', value: 'Steep Escarpment', contribution: 0.22, percentage: 23 },
        { feature: 'International Border Trade Freight', value: 'Dynamic Traffic Shock', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'Warning active for Champhai-Zokhawthar border trade corridor due to daylighting planar dip failure.',
        'Pore pressure (55.4 kPa) indicates saturation of basal siltstone slip surface.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Champhai - Zokhawthar Border Highway', type: 'State Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Zokhawthar Border Transit Point', population: 3100, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'MIZ_011',
    name: 'Serchhip - Mat River Valley Escarpment',
    state: 'Mizoram',
    district: 'Serchhip',
    latitude: 23.3420,
    longitude: 92.8520,
    environmental: {
      elevation: 890,
      slope: 37.0,
      aspect: 'West',
      geology: 'Tipam Sandstone & Laminated Mudstone Horizons',
      soil: 'Friable Sandy Clay prone to Deep Gullying',
      landCover: 'Horticulture Terraces & Bamboo Groves',
      drainage: 'Mat River Torrential Valley System',
      faultDistanceKm: 2.6
    },
    rainfall: {
      today: 58.0,
      last3Days: 128.0,
      last7Days: 238.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 70.0,
      max3Day: 142.0,
      rainyDays: 17,
      antecedentRainfallIndex: 63.5,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-SCP-11',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 69.8,
      poreWaterPressureKPa: 39.5
    },
    prediction: {
      susceptibilityScore: 0.67,
      rainfallTriggerScore: 0.63,
      riskScore: 65,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Mat River Valley Toe Undercutting', value: 'High Basal Scour', contribution: 0.32, percentage: 36 },
        { feature: 'Rainfall Infiltration (128mm 3D)', value: 'Moderate-High Influx', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Incline (37.0°)', value: 'Steep Valley Wall', contribution: 0.24, percentage: 27 },
        { feature: 'Dense Bamboo Root Mat', value: 'Shallow Soil Binding', contribution: -0.06, percentage: 6 }
      ],
      explanationPoints: [
        'Watch advisory on Serchhip-Thenzawl highway link due to rotational slumping along Mat river valley wall.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Serchhip - Thenzawl Highway', type: 'State Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Serchhip Valley Hamlet', population: 2400, distanceMeters: 510 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MIZ_012',
    name: 'Kolasib - Vairengte NH-306 Assam Border Lifeline',
    state: 'Mizoram',
    district: 'Kolasib',
    latitude: 24.3120,
    longitude: 92.7650,
    environmental: {
      elevation: 410,
      slope: 41.5,
      aspect: 'North',
      geology: 'Bhuban Formation Rhythmic Shale-Sandstone Flysch',
      soil: 'High Plasticity Weathered Mudstone Colluvium',
      landCover: 'Betel Nut Plantations & Heavy Cut Benches',
      drainage: 'Dhaleswari (Tlawng) River Lowland Canyon',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 92.0,
      last3Days: 208.0,
      last7Days: 375.0,
      last15Days: 620.0,
      last30Days: 980.0,
      max1Day: 106.0,
      max3Day: 230.0,
      rainyDays: 22,
      antecedentRainfallIndex: 87.0,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-VRG-12',
      telemetrySource: 'IMD Automated Weather Station + Mizoram PWD Tiltmeter',
      soilMoisturePct: 87.4,
      poreWaterPressureKPa: 65.2
    },
    prediction: {
      susceptibilityScore: 0.91,
      rainfallTriggerScore: 0.92,
      riskScore: 91,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Sole Lifeline Highway NH-306 Vulnerability', value: 'Single Economic Transit Axis', contribution: 0.38, percentage: 40 },
        { feature: 'Extreme Rainfall Precipitation (208mm 3D)', value: 'Extreme Soil Liquefaction', contribution: 0.32, percentage: 34 },
        { feature: 'Steep Road Cut Overhang (41.5°)', value: 'Severe Excavation Incline', contribution: 0.21, percentage: 22 },
        { feature: 'Intensive Heavy Fuel Tanker Transits', value: 'Repetitive Dynamic Stress', contribution: 0.08, percentage: 8 }
      ],
      explanationPoints: [
        'CRITICAL RED ALERT: Imminent mudslide and road severance along NH-306 between Vairengte and Bilkhawthlir.',
        'Pore pressure at 65.2 kPa; total road blockage anticipated within 6-12 hours.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-306 (Silchar - Aizawl Mizoram Primary Lifeline)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Vairengte Gateway Town', population: 6400, distanceMeters: 250 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 6400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 18
  },
  {
    id: 'MIZ_013',
    name: 'Lawngtlai - Kaladan Multi-Modal Corridor',
    state: 'Mizoram',
    district: 'Lawngtlai',
    latitude: 22.5280,
    longitude: 92.8950,
    environmental: {
      elevation: 760,
      slope: 36.2,
      aspect: 'South-East',
      geology: 'Surma Series Soft Clayey Siltstone & Blue Shale Beds',
      soil: 'Lateritic Clay over Plastic Weathered Shales',
      landCover: 'Subtropical Wet Hill Forest & Major Highway Earthworks',
      drainage: 'Chhimtuipui (Kaladan) River Drainage Basin',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 65.0,
      last3Days: 145.0,
      last7Days: 265.0,
      last15Days: 470.0,
      last30Days: 780.0,
      max1Day: 78.0,
      max3Day: 160.0,
      rainyDays: 18,
      antecedentRainfallIndex: 69.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-LTL-13',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 75.8,
      poreWaterPressureKPa: 47.6
    },
    prediction: {
      susceptibilityScore: 0.75,
      rainfallTriggerScore: 0.72,
      riskScore: 74,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Kaladan Road Widening Cut Slope Instability', value: 'High Toe Excavation', contribution: 0.34, percentage: 36 },
        { feature: 'Heavy Monsoon Precipitation (145mm 3D)', value: 'High Infiltration', contribution: 0.29, percentage: 31 },
        { feature: 'Weak Surma Blue Shale Horizon', value: 'Low Friction Angle', contribution: 0.22, percentage: 24 },
        { feature: 'Dense Subtropical Bamboo Mat', value: 'Surface Restraint', contribution: -0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Warning triggered on Kaladan Multi-Modal road link toward Zorinpui Myanmar border due to active cut slope slump.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kaladan Multi-Modal Highway (NH-502A)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lawngtlai Sub-town Sector', population: 3200, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'MIZ_014',
    name: 'Siaha - Chhimtuipui River Basin',
    state: 'Mizoram',
    district: 'Siaha',
    latitude: 22.4850,
    longitude: 92.9750,
    environmental: {
      elevation: 920,
      slope: 40.0,
      aspect: 'South',
      geology: 'Lower Bhuban Calcareous Sandstone & Friable Black Shale',
      soil: 'Gravelly Clay Loam with High Porosity',
      landCover: 'Tropical Semi-Evergreen Forest & Jhum Regrowth',
      drainage: 'Chhimtuipui Deep Gorge',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 71.0,
      last3Days: 158.0,
      last7Days: 290.0,
      last15Days: 510.0,
      last30Days: 840.0,
      max1Day: 84.0,
      max3Day: 175.0,
      rainyDays: 19,
      antecedentRainfallIndex: 74.5,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-SIH-14',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 78.5,
      poreWaterPressureKPa: 51.0
    },
    prediction: {
      susceptibilityScore: 0.79,
      rainfallTriggerScore: 0.76,
      riskScore: 78,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Chhimtuipui River Chasm Toe Erosion', value: 'High Hydraulic Action', contribution: 0.35, percentage: 37 },
        { feature: 'Heavy Infiltration (158mm 3D)', value: 'High Saturation', contribution: 0.29, percentage: 31 },
        { feature: 'Slope Gradient (40.0°)', value: 'Steep Escarpment', contribution: 0.23, percentage: 24 },
        { feature: 'Semi-Evergreen Forest Canopy', value: 'Partial Interception', contribution: -0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Warning active for Siaha-Tipa road corridor due to continuous slope wash and debris chutes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Siaha - Tipa Strategic Road', type: 'District Road', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Siaha Administrative HQ', population: 3500, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3500
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  }
];
