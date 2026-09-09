import { MonitoredLocation } from '../../types/location';

export const SIKKIM_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'SIK_001',
    name: 'Mangan - Chungthang Highway Pass',
    state: 'Sikkim',
    district: 'Mangan (North Sikkim)',
    latitude: 27.5020,
    longitude: 88.5290,
    environmental: {
      elevation: 1780,
      slope: 46.8,
      aspect: 'East',
      geology: 'Chungthang Formation Schist & Gneiss (Highly Fractured)',
      soil: 'Coarse Colluvial Debris',
      landCover: 'Steep Escarpment & Alpine Shrub',
      drainage: 'Teesta River Upper Valley Torrent',
      faultDistanceKm: 0.8
    },
    rainfall: {
      today: 135.0,
      last3Days: 298.0,
      last7Days: 520.0,
      last15Days: 840.0,
      last30Days: 1290.0,
      max1Day: 148.0,
      max3Day: 320.0,
      rainyDays: 25,
      antecedentRainfallIndex: 96.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.94,
      rainfallTriggerScore: 0.95,
      riskScore: 95,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Extreme Slope Steepness (46.8°)', value: 'Critical Angle', contribution: 0.35, percentage: 37 },
        { feature: 'Continuous Heavy Rainfall (520 mm 7D)', value: 'Record Trigger', contribution: 0.32, percentage: 34 },
        { feature: 'Main Central Thrust (MCT) Proximity', value: '0.8 km Fault Line', contribution: 0.20, percentage: 21 },
        { feature: 'Colluvial Overburden Thickness', value: '>4m Unconsolidated', contribution: 0.08, percentage: 8 }
      ],
      explanationPoints: [
        'Main Central Thrust (MCT) fault shearing coupled with 46° slopes creates maximum instability.',
        'Teesta river toe-erosion actively undercutting slope base.',
        'High likelihood of massive rockfall & debris flow blocking Chungthang highway corridor.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'North Sikkim Highway (Chungthang - Lachen Axis)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mangan Town Sub-sector', population: 2100, distanceMeters: 400 },
        { name: 'Tung Army Camp Access', population: 850, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2950
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 22
  },
  {
    id: 'SIK_002',
    name: 'Gangtok - 9th Mile Deorali Section',
    state: 'Sikkim',
    district: 'Gangtok',
    latitude: 27.3314,
    longitude: 88.6138,
    environmental: {
      elevation: 1650,
      slope: 35.2,
      aspect: 'South-East',
      geology: 'Daling Group Phyllites & Chlorite Schist',
      soil: 'Silty Clay with weathered fragments',
      landCover: 'Urbanized Steep Slope / Terraces',
      drainage: 'Rani Khola Drainage Basin',
      faultDistanceKm: 2.2
    },
    rainfall: {
      today: 84.0,
      last3Days: 182.0,
      last7Days: 340.0,
      last15Days: 610.0,
      last30Days: 980.0,
      max1Day: 95.0,
      max3Day: 198.0,
      rainyDays: 21,
      antecedentRainfallIndex: 82.5,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.81,
      rainfallTriggerScore: 0.83,
      riskScore: 82,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Urban Surcharge & Building Density', value: 'High Load on Slope', contribution: 0.30, percentage: 32 },
        { feature: '3-Day Rainfall Intensity', value: '182.0 mm', contribution: 0.28, percentage: 30 },
        { feature: 'Phyllite Foliation Plane Dip', value: 'Dips into Valley', contribution: 0.24, percentage: 26 },
        { feature: 'Drainage Overflows', value: 'Blockage of storm drains', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Urban hillside overloading combined with foliation planes dipping slope-parallel.',
        'High potential for multi-story foundation shear along Deorali-Tadong corridor.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-10 (Siliguri - Gangtok Lifeline)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Deorali Bazar Ward', population: 8400, distanceMeters: 120 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 8400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 16
  },
  {
    id: 'SIK_003',
    name: 'Pakyong Airport Hill Slopes',
    state: 'Sikkim',
    district: 'Pakyong',
    latitude: 27.2340,
    longitude: 88.5870,
    environmental: {
      elevation: 1390,
      slope: 38.0,
      aspect: 'West',
      geology: 'Garo-Daling Meta-sediments & Geotextile Reinforced Fill',
      soil: 'Engineered Compacted Fill over Schist',
      landCover: 'Airport Runway Embankment & Terraces',
      drainage: 'Dikchu River Basin Tributaries',
      faultDistanceKm: 3.1
    },
    rainfall: {
      today: 68.0,
      last3Days: 145.0,
      last7Days: 275.0,
      last15Days: 510.0,
      last30Days: 840.0,
      max1Day: 78.0,
      max3Day: 160.0,
      rainyDays: 19,
      antecedentRainfallIndex: 72.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.74,
      rainfallTriggerScore: 0.71,
      riskScore: 73,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Engineered Retaining Wall Stress', value: 'High Pore Pressure', contribution: 0.32, percentage: 35 },
        { feature: 'Cumulative 7-Day Rainfall', value: '275.0 mm', contribution: 0.27, percentage: 29 },
        { feature: 'Slope Angle (38.0°)', value: 'Steep Cut Slope', contribution: 0.22, percentage: 24 },
        { feature: 'Reinforced Berms', value: 'Engineered Mitigation', contribution: -0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Runway reinforced gabion walls experience lateral hydrostatic pressure.',
        'Subsidence detected in surrounding boundary fencing.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Pakyong - Gangtok State Highway', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Pakyong Sub-division', population: 4600, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 11
  },
  {
    id: 'SIK_004',
    name: 'Namchi Tendong Hill Slopes',
    state: 'Sikkim',
    district: 'Namchi (South Sikkim)',
    latitude: 27.1680,
    longitude: 88.3560,
    environmental: {
      elevation: 1820,
      slope: 33.4,
      aspect: 'South',
      geology: 'Gondwana Sandstone & Carbonaceous Shale',
      soil: 'Weathered Silty Loam',
      landCover: 'Oak-Rhododendron Forest & Tea Estates',
      drainage: 'Rangit River Basin',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 45.0,
      last3Days: 98.0,
      last7Days: 185.0,
      last15Days: 340.0,
      last30Days: 590.0,
      max1Day: 52.0,
      max3Day: 110.0,
      rainyDays: 15,
      antecedentRainfallIndex: 51.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.58,
      rainfallTriggerScore: 0.49,
      riskScore: 54,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Carbonaceous Shale Fracturing', value: 'High Shear Potential', contribution: 0.29, percentage: 33 },
        { feature: 'Slope Incline (33.4°)', value: 'Moderate High', contribution: 0.26, percentage: 30 },
        { feature: 'Moderate Rainfall Surge', value: '45.0 mm 24h', contribution: 0.20, percentage: 23 },
        { feature: 'Forest Canopy Buffer', value: 'Good Infiltration Buffer', contribution: -0.12, percentage: 14 }
      ],
      explanationPoints: [
        'Watch level maintained for tourist corridors between Namchi and Tendong summit.',
        'Minor soil creep observed in tea gardens following rainfall.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Namchi - Damthang Road', type: 'District Road', distanceMeters: 50, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Tendong Village Sector', population: 1850, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 1850
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'SIK_005',
    name: 'Singtam - Rangpo Teesta Sinking Zone',
    state: 'Sikkim',
    district: 'Pakyong',
    latitude: 27.1850,
    longitude: 88.5120,
    environmental: {
      elevation: 420,
      slope: 41.2,
      aspect: 'North-West',
      geology: 'Daling Slate & Phyllite with intense toe erosion',
      soil: 'Alluvial Colluvium mixture',
      landCover: 'Highway ribbon development & industrial sheds',
      drainage: 'Teesta River Main Suture Zone',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 92.0,
      last3Days: 195.0,
      last7Days: 360.0,
      last15Days: 620.0,
      last30Days: 990.0,
      max1Day: 105.0,
      max3Day: 215.0,
      rainyDays: 20,
      antecedentRainfallIndex: 85.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.89,
      rainfallTriggerScore: 0.86,
      riskScore: 88,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Teesta River Toe Undercutting & Scour', value: 'High Discharge Rate', contribution: 0.34, percentage: 36 },
        { feature: 'Continuous Heavy Rainfall Surcharge', value: '92.0 mm 24h', contribution: 0.29, percentage: 31 },
        { feature: 'Main Boundary Thrust Proximity', value: '1.1 km Distance', contribution: 0.22, percentage: 23 },
        { feature: 'Slope Incline (41.2°)', value: 'Shear Failure Zone', contribution: 0.15, percentage: 16 }
      ],
      explanationPoints: [
        'NH-10 critical lifeline sinking zone between Rangpo and Singtam.',
        'High water release from upstream dams compounds base toe erosion.',
        'Imminent road cut collapse risk; heavy transport restricted.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-10 (Sikkim Lifeline at 20th Mile)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Singtam River Colony', population: 6800, distanceMeters: 200 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 6800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 29
  },
  {
    id: 'SIK_006',
    name: 'Lachung - Yumthang Valley Escarpment',
    state: 'Sikkim',
    district: 'Mangan (North Sikkim)',
    latitude: 27.6890,
    longitude: 88.7460,
    environmental: {
      elevation: 2700,
      slope: 44.5,
      aspect: 'South-East',
      geology: 'Higher Himalayan Crystalline Gneiss & Moraines',
      soil: 'Glacial Till & Loose Talus',
      landCover: 'Subalpine Conifer Forest & Scree Slopes',
      drainage: 'Lachung Chu Gorge Torrent',
      faultDistanceKm: 1.6
    },
    rainfall: {
      today: 105.0,
      last3Days: 230.0,
      last7Days: 410.0,
      last15Days: 720.0,
      last30Days: 1120.0,
      max1Day: 115.0,
      max3Day: 250.0,
      rainyDays: 23,
      antecedentRainfallIndex: 89.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.90,
      rainfallTriggerScore: 0.88,
      riskScore: 89,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Loose Glacial Moraine Debris Surcharge', value: 'High Porosity Scree', contribution: 0.35, percentage: 37 },
        { feature: 'Heavy Orogenic Rainfall (105 mm)', value: 'Extreme Trigger', contribution: 0.31, percentage: 33 },
        { feature: 'Steep Rockwall Angle (44.5°)', value: 'Rock Avalanche Zone', contribution: 0.22, percentage: 23 },
        { feature: 'Permafrost Thaw Influence', value: 'Accelerating Debris Flow', contribution: 0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Glacial moraine liquefaction risk on road to Zero Point and Yumthang.',
        'Multiple culvert washouts recorded along the military supply corridor.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Lachung - Yumthang Military Axis', type: 'Strategic Road', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lachung Village Center', population: 2450, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2450
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 19
  },
  {
    id: 'SIK_007',
    name: 'Gyalshing - Pelling Pemayangtse Ridge',
    state: 'Sikkim',
    district: 'Gyalshing (West Sikkim)',
    latitude: 27.3180,
    longitude: 88.2390,
    environmental: {
      elevation: 2050,
      slope: 34.8,
      aspect: 'North',
      geology: 'Kanchenjunga Gneiss & Garnetiferous Schist',
      soil: 'Organic Rich Silt Loam over Jointed Rock',
      landCover: 'Temperate Forest & Heritage Monasteries',
      drainage: 'Rathong Chu Sub-basin',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 52.0,
      last3Days: 112.0,
      last7Days: 210.0,
      last15Days: 390.0,
      last30Days: 660.0,
      max1Day: 60.0,
      max3Day: 125.0,
      rainyDays: 17,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.63,
      rainfallTriggerScore: 0.57,
      riskScore: 61,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Jointed Rock Mass Wedging', value: 'High Joint Frequency', contribution: 0.29, percentage: 32 },
        { feature: 'Hillside Drainage Saturation', value: '112 mm 3D Rain', contribution: 0.26, percentage: 29 },
        { feature: 'Tourist Traffic Vibration', value: 'Heavy Seasonal Fleet', contribution: 0.21, percentage: 23 },
        { feature: 'Dense Forest Cover Root Anchorage', value: 'Protective Slope Forest', contribution: -0.14, percentage: 16 }
      ],
      explanationPoints: [
        'Watch alert for Pelling-Gyalshing ridge road curves.',
        'Minor debris falling on road shoulder during monsoon downpours.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Pelling - Gyalshing Road', type: 'State Highway', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Upper Pelling Tourism Cluster', population: 3100, distanceMeters: 420 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'SIK_008',
    name: 'Ravangla Buddha Park Ridge',
    state: 'Sikkim',
    district: 'Namchi (South Sikkim)',
    latitude: 27.3060,
    longitude: 88.3630,
    environmental: {
      elevation: 2100,
      slope: 31.5,
      aspect: 'West',
      geology: 'Precambrian Phyllite with Quartz Intrusions',
      soil: 'Brown Loamy Forest Soil',
      landCover: 'Alpine Meadows & Conifer Ridge',
      drainage: 'Teesta-Rangit Divide',
      faultDistanceKm: 3.9
    },
    rainfall: {
      today: 42.0,
      last3Days: 92.0,
      last7Days: 175.0,
      last15Days: 320.0,
      last30Days: 540.0,
      max1Day: 48.0,
      max3Day: 104.0,
      rainyDays: 14,
      antecedentRainfallIndex: 48.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.54,
      rainfallTriggerScore: 0.46,
      riskScore: 50,
      riskLevel: 'WATCH',
      confidence: 0.87,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Moderate Slope Angle (31.5°)', value: 'Moderate Shear', contribution: 0.28, percentage: 32 },
        { feature: 'Antecedent Wetness (48.0)', value: 'Moderate Soil Water', contribution: 0.24, percentage: 28 },
        { feature: 'Ridge Saddle Topography', value: 'Wind-driven Rain Exposure', contribution: 0.20, percentage: 23 },
        { feature: 'Good Vegetative Anchorage', value: 'Intact Root Web', contribution: -0.15, percentage: 17 }
      ],
      explanationPoints: [
        'Stable conditions overall; monitoring required for sudden localized downpours.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Ravangla - Legship Highway', type: 'State Highway', distanceMeters: 45, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Ravangla Bazar', population: 2200, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 2200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'SIK_009',
    name: 'Soreng - Jorethang Fault Line Slopes',
    state: 'Sikkim',
    district: 'Soreng (West Sikkim)',
    latitude: 27.1720,
    longitude: 88.3180,
    environmental: {
      elevation: 750,
      slope: 36.2,
      aspect: 'South-East',
      geology: 'Daling Group Weathered Quartzite & Sandstone',
      soil: 'Gravelly Clay with High Permeability',
      landCover: 'Steep Agro-terraces & Mixed Forest',
      drainage: 'Rangit River Valley Deep Cut',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 61.0,
      last3Days: 138.0,
      last7Days: 255.0,
      last15Days: 470.0,
      last30Days: 790.0,
      max1Day: 72.0,
      max3Day: 152.0,
      rainyDays: 18,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.70,
      rainfallTriggerScore: 0.66,
      riskScore: 69,
      riskLevel: 'WATCH',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Rangit Valley Shear Lineament', value: '1.9 km Fault Distance', contribution: 0.31, percentage: 34 },
        { feature: 'Antecedent Rain Soil Saturation', value: '65.0 API', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Incline (36.2°)', value: 'High Incline', contribution: 0.24, percentage: 26 },
        { feature: 'Toe Scour by River Swell', value: 'Rangit River Surge', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Watch alert near boundary threshold; heavy vehicle transit along Jorethang link flagged.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Jorethang - Soreng Highway', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Soreng Sub-town Sector', population: 3400, distanceMeters: 410 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'SIK_010',
    name: 'Yuksom - Dzongri Himalayan Trailhead',
    state: 'Sikkim',
    district: 'Gyalshing',
    latitude: 27.3710,
    longitude: 88.2210,
    environmental: {
      elevation: 1780,
      slope: 41.5,
      aspect: 'North-West',
      geology: 'Kanchenjunga Gneiss Complex & Garnetiferous Mica Schist',
      soil: 'Glacial Till & Colluvial Bouldery Gravel',
      landCover: 'Temperate Oak-Rhododendron Forest & Alpine Scree',
      drainage: 'Rathong Chu High Energy Torrents',
      faultDistanceKm: 1.6
    },
    rainfall: {
      today: 72.0,
      last3Days: 165.0,
      last7Days: 295.0,
      last15Days: 520.0,
      last30Days: 840.0,
      max1Day: 86.0,
      max3Day: 182.0,
      rainyDays: 19,
      antecedentRainfallIndex: 74.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-YKS-10',
      telemetrySource: 'IMD Automated Weather Station + GSI Pore Sensor',
      soilMoisturePct: 79.5,
      poreWaterPressureKPa: 52.4
    },
    prediction: {
      susceptibilityScore: 0.78,
      rainfallTriggerScore: 0.74,
      riskScore: 77,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'High Slopes Gradient (41.5°)', value: 'Extreme High Mountain Relief', contribution: 0.34, percentage: 36 },
        { feature: 'Heavy Orogaphic Infiltration (165mm 3D)', value: 'Severe Subsurface Saturation', contribution: 0.29, percentage: 31 },
        { feature: 'Rathong Chu Torrential Toe Scour', value: 'High Basal River Energy', contribution: 0.22, percentage: 24 },
        { feature: 'Trek Route Human Excavation', value: 'Localized Surcharge', contribution: 0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Critical debris avalanche risk triggered across Rathong Chu gorge blocking Yuksom-Geyzing transit link.',
        'High pore pressure (52.4 kPa) detected across mica schist foliation plane.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Yuksom - Geyzing Highway', type: 'State Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Yuksom Historic Enclave', population: 2100, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'SIK_011',
    name: 'Ravangla - Maenam Hill Ridge Observatory',
    state: 'Sikkim',
    district: 'Namchi',
    latitude: 27.3080,
    longitude: 88.3620,
    environmental: {
      elevation: 2050,
      slope: 38.6,
      aspect: 'South-East',
      geology: 'Daling Group Phyllite with Chloritic Quartzite Bands',
      soil: 'Weathered Silty Loam over Slaking Clay',
      landCover: 'Temperate Coniferous Forest & High Altitude Tea Slopes',
      drainage: 'Teesta Right-Bank Perennial Channels',
      faultDistanceKm: 2.2
    },
    rainfall: {
      today: 54.0,
      last3Days: 122.0,
      last7Days: 220.0,
      last15Days: 410.0,
      last30Days: 710.0,
      max1Day: 68.0,
      max3Day: 140.0,
      rainyDays: 17,
      antecedentRainfallIndex: 61.5,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-RVG-11',
      telemetrySource: 'IMD Automated Weather Station + In-situ Inclinometer',
      soilMoisturePct: 66.8,
      poreWaterPressureKPa: 36.2
    },
    prediction: {
      susceptibilityScore: 0.65,
      rainfallTriggerScore: 0.58,
      riskScore: 63,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Slaking Weathered Phyllite Sheeting', value: 'Weak Shear Strength', contribution: 0.32, percentage: 36 },
        { feature: 'Slope Incline (38.6°)', value: 'Steep Escarpment', contribution: 0.28, percentage: 31 },
        { feature: 'Cumulative Precipitation (122mm 3D)', value: 'Pore Pressure Buildup', contribution: 0.22, percentage: 25 },
        { feature: 'Forest Cover Buffer', value: 'Partial Stabilization', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory on Ravangla-Legship transit artery due to rotational subsidence indicators in phyllite strata.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Ravangla - Legship Highway', type: 'State Highway', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Ravangla Tourist Hub & Monasteries', population: 3800, distanceMeters: 600 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'SIK_012',
    name: 'Lachen Valley - Zemu Chu Debris Fan',
    state: 'Sikkim',
    district: 'Mangan',
    latitude: 27.7240,
    longitude: 88.5580,
    environmental: {
      elevation: 2750,
      slope: 46.8,
      aspect: 'East',
      geology: 'Chungthang Formation Calcsilicate Gneiss & Glacial Drift Deposits',
      soil: 'Morainic Debris & Unconsolidated Glaciofluvial Boulders',
      landCover: 'Alpine Larch & High Mountain Scree',
      drainage: 'Zemu Chu High Velocity Glacial Melt',
      faultDistanceKm: 0.8
    },
    rainfall: {
      today: 96.0,
      last3Days: 218.0,
      last7Days: 380.0,
      last15Days: 620.0,
      last30Days: 990.0,
      max1Day: 112.0,
      max3Day: 240.0,
      rainyDays: 22,
      antecedentRainfallIndex: 89.0,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-LCH-12',
      telemetrySource: 'IMD Automated Weather Station + BRO Geophone Array',
      soilMoisturePct: 88.4,
      poreWaterPressureKPa: 68.9
    },
    prediction: {
      susceptibilityScore: 0.94,
      rainfallTriggerScore: 0.92,
      riskScore: 93,
      riskLevel: 'WARNING',
      confidence: 0.97,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Glacial Outburst / Extreme Moraine Slope (46.8°)', value: 'Extreme Mountain Relief', contribution: 0.38, percentage: 39 },
        { feature: 'Heavy Cloudburst + Glacial Melt (218mm 3D)', value: 'Extreme Hydrodynamic Surcharge', contribution: 0.32, percentage: 33 },
        { feature: 'Main Central Thrust Proximity (0.8km)', value: 'High Fracturing', contribution: 0.21, percentage: 21 },
        { feature: 'Strategic Army Logistic Axis', value: 'High Vibration', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'CRITICAL RED ALERT: Debris flow warning along Lachen axis following cloudburst and moraine breach.',
        'Immediate evacuation protocol advised for lower river terraces along North Sikkim Highway.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'North Sikkim Strategic Highway (Lachen Axis)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lachen Township Outskirts', population: 2800, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 11
  },
  {
    id: 'SIK_013',
    name: 'Rhenock - Aritar Border Ridge',
    state: 'Sikkim',
    district: 'Pakyong',
    latitude: 27.1850,
    longitude: 88.6420,
    environmental: {
      elevation: 1120,
      slope: 33.4,
      aspect: 'South',
      geology: 'Daling Group Phyllite with Quartz Intercalations',
      soil: 'Clayey Loam with Low Permeability',
      landCover: 'Cardamom Agroforestry & Terraced Paddy',
      drainage: 'Reshi River Tributary Basin',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 44.0,
      last3Days: 96.0,
      last7Days: 185.0,
      last15Days: 340.0,
      last30Days: 590.0,
      max1Day: 58.0,
      max3Day: 112.0,
      rainyDays: 14,
      antecedentRainfallIndex: 48.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-RNK-13',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 56.2,
      poreWaterPressureKPa: 28.5
    },
    prediction: {
      susceptibilityScore: 0.48,
      rainfallTriggerScore: 0.46,
      riskScore: 47,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Clayey Subsoil Saturation', value: 'Moderate Influx', contribution: 0.28, percentage: 35 },
        { feature: 'Slope Incline (33.4°)', value: 'Moderate Slope Relief', contribution: 0.26, percentage: 32 },
        { feature: 'Agricultural Terracing Irrigation Leakage', value: 'Anthropogenic Surcharge', contribution: 0.18, percentage: 22 },
        { feature: 'Dense Cardamom Undergrowth', value: 'Erosion Retardant', contribution: -0.09, percentage: 11 }
      ],
      explanationPoints: [
        'Watch status active on Rhenock-Rongli arterial corridor with localized shallow slumping reported.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Rhenock - Rongli - Aritar Road', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Aritar Tourist Lake Settlement', population: 1950, distanceMeters: 480 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 1950
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'SIK_014',
    name: 'Chakung - Soreng Escarpment Cutting',
    state: 'Sikkim',
    district: 'Soreng',
    latitude: 27.1650,
    longitude: 88.2610,
    environmental: {
      elevation: 1540,
      slope: 39.1,
      aspect: 'North-East',
      geology: 'Gondwana Formation Sandstone & Carbonaceous Shale',
      soil: 'Friable Crushed Silt with Coal Specks',
      landCover: 'Mixed Broom Grass & Degraded Oak Scrub',
      drainage: 'Rammam River Right-Bank Ravine',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 63.0,
      last3Days: 140.0,
      last7Days: 260.0,
      last15Days: 480.0,
      last30Days: 780.0,
      max1Day: 75.0,
      max3Day: 158.0,
      rainyDays: 18,
      antecedentRainfallIndex: 67.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-CKG-14',
      telemetrySource: 'IMD Automated Weather Station + Piezometer',
      soilMoisturePct: 74.0,
      poreWaterPressureKPa: 46.8
    },
    prediction: {
      susceptibilityScore: 0.72,
      rainfallTriggerScore: 0.70,
      riskScore: 71,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Friable Carbonaceous Shale Weathering', value: 'High Slaking Tendency', contribution: 0.33, percentage: 36 },
        { feature: 'High Slope Incline (39.1°)', value: 'Steep Escarpment Cut', contribution: 0.28, percentage: 30 },
        { feature: 'Rainfall Infiltration (140mm 3D)', value: 'High Influx', contribution: 0.25, percentage: 27 },
        { feature: 'Highway Widening Excavation', value: 'Toe Removal', contribution: 0.09, percentage: 7 }
      ],
      explanationPoints: [
        'Warning triggered on Soreng-Chakung link due to fresh tension crack opening across road bench.',
        'High soil moisture (74.0%) and antecedent saturation demand geotechnical surveillance.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Soreng - Chakung - Nayabazar Highway', type: 'State Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Chakung Bazar Outskirts', population: 2200, distanceMeters: 350 }
      ],
      hospitals: 0,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  }
];
