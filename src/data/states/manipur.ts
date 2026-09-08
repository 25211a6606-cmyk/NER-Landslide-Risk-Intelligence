import { MonitoredLocation } from '../../types/location';

export const MANIPUR_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'MAN_001',
    name: 'Noney Tupul Railway Yard & Ijei River Basin',
    state: 'Manipur',
    district: 'Noney',
    latitude: 24.8140,
    longitude: 93.6120,
    environmental: {
      elevation: 540,
      slope: 44.0,
      aspect: 'West',
      geology: 'Disang Group Highly Fractured Splintery Shales with Siltstone Interbeds',
      soil: 'High Plasticity Colluvium and Uncompacted Cut-Fill',
      landCover: 'Railway Yard Construction Platform, Disturbed River Canyon',
      drainage: 'Ijei River Deep Canyon (Debris Dam Formation Zone)',
      faultDistanceKm: 0.7
    },
    rainfall: {
      today: 124.0,
      last3Days: 270.0,
      last7Days: 480.0,
      last15Days: 820.0,
      last30Days: 1340.0,
      max1Day: 140.0,
      max3Day: 300.0,
      rainyDays: 24,
      antecedentRainfallIndex: 95.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.96,
      rainfallTriggerScore: 0.95,
      riskScore: 96,
      riskLevel: 'WARNING',
      confidence: 0.97,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Catastrophic Mass Earth Failure Hazard', value: 'High Slope Instability History', contribution: 0.38, percentage: 40 },
        { feature: 'Splintery Disang Shale Shear Breakdown', value: 'Complete Loss of Cohesion', contribution: 0.31, percentage: 32 },
        { feature: 'Continuous Torrential Downpour (124 mm)', value: 'Hydraulic Damming Surcharge', contribution: 0.22, percentage: 23 },
        { feature: 'Unretained Cut Slope Angle (44.0°)', value: 'Over-steepened Construction Cuts', contribution: 0.11, percentage: 11 }
      ],
      explanationPoints: [
        'Critical warning active for Tupul railway yard and Ijei river valley (site of devastating 2022 debris avalanche).',
        'Extreme rainfall has induced catastrophic pore water pressure in weathered shales; immediate evacuation threshold reached.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Jiribam - Imphal National Railway Project', type: 'Railway Track', distanceMeters: 5, trafficVulnerability: 'HIGH' },
        { name: 'NH-37 (Old Cachar Highway Link)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tupul Station Worker Colony', population: 2100, distanceMeters: 120 },
        { name: 'Makhuam Village', population: 980, distanceMeters: 350 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 3080
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 38
  },
  {
    id: 'MAN_002',
    name: 'Tamenglong Hill Ridge & Khongsang Axis',
    state: 'Manipur',
    district: 'Tamenglong',
    latitude: 24.9850,
    longitude: 93.4920,
    environmental: {
      elevation: 1260,
      slope: 38.5,
      aspect: 'South-East',
      geology: 'Barail Sandstone over Soft Disang Shales (Escarpment Capping)',
      soil: 'Gravelly Clay Loam (High Infiltration)',
      landCover: 'Sub-tropical Pine & Wet Forest Escarpment',
      drainage: 'Irang River Canyon',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 86.0,
      last3Days: 188.0,
      last7Days: 340.0,
      last15Days: 610.0,
      last30Days: 980.0,
      max1Day: 98.0,
      max3Day: 210.0,
      rainyDays: 20,
      antecedentRainfallIndex: 82.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.83,
      rainfallTriggerScore: 0.83,
      riskScore: 83,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Cap-Rock Sandstone Undermining', value: 'Disang Shale Squeeze-out', contribution: 0.33, percentage: 35 },
        { feature: 'High 3-Day Cumulative Rain (188 mm)', value: 'Hydrostatic Head Surge', contribution: 0.29, percentage: 31 },
        { feature: 'Steep Escarpment Angle (38.5°)', value: 'Gravitational Shear Failure', contribution: 0.24, percentage: 26 },
        { feature: 'Irang River Valley Undercut', value: 'Erosive Toe Scour', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning triggered for Tamenglong-Khongsang arterial road; frequent rotational slips block town supply route.',
        'Continuous seeping water observed at sandstone-shale interface.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Tamenglong - Khongsang Road', type: 'State Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tamenglong Headquarters Ward', population: 6400, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 6400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 19
  },
  {
    id: 'MAN_003',
    name: 'Churachandpur - Singngat Hill Road',
    state: 'Manipur',
    district: 'Churachandpur',
    latitude: 24.3310,
    longitude: 93.6780,
    environmental: {
      elevation: 910,
      slope: 32.0,
      aspect: 'South',
      geology: 'Disang Group Mudstone & Siltstone with Cleavage Planes',
      soil: 'Brown Residual Silty Clay',
      landCover: 'Jhum Shifting Cultivation Slopes & Scrub',
      drainage: 'Tuila River Sub-basin',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 56.0,
      last3Days: 124.0,
      last7Days: 230.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 65.0,
      max3Day: 138.0,
      rainyDays: 17,
      antecedentRainfallIndex: 62.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.65,
      rainfallTriggerScore: 0.63,
      riskScore: 64,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Deforestation & Shifting Cultivation', value: 'Loss of Root Anchorage', contribution: 0.31, percentage: 34 },
        { feature: 'Clay Mudstone Saturation (API 62)', value: 'High Pore Pressure', contribution: 0.27, percentage: 30 },
        { feature: 'Slope Angle (32.0°)', value: 'Moderate High Relief', contribution: 0.23, percentage: 25 },
        { feature: 'Distance from Major Thrust', value: '3.4 km Buffer', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory active for Churachandpur-Singngat (NH-102B) road cuts.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-102B (Churachandpur - Singngat - Behiang)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Singngat Sub-divisional Town', population: 3800, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'MAN_004',
    name: 'Kangpokpi - Senapati NH-2 Mountain Highway',
    state: 'Manipur',
    district: 'Kangpokpi',
    latitude: 25.1480,
    longitude: 93.9740,
    environmental: {
      elevation: 1120,
      slope: 36.8,
      aspect: 'North-East',
      geology: 'Disang Shales with Sinuous Fold Hinges & Fault Splay',
      soil: 'Colluvial Silt Clay with Weathered Slabs',
      landCover: 'Highway Commercial Terraces & Mixed Scrub',
      drainage: 'Imphal River Upper Basin',
      faultDistanceKm: 1.6
    },
    rainfall: {
      today: 72.0,
      last3Days: 158.0,
      last7Days: 295.0,
      last15Days: 530.0,
      last30Days: 860.0,
      max1Day: 82.0,
      max3Day: 175.0,
      rainyDays: 19,
      antecedentRainfallIndex: 74.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.77,
      rainfallTriggerScore: 0.74,
      riskScore: 76,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Lifeline National Highway Heavy Traffic', value: 'High Cyclic Axle Load', contribution: 0.32, percentage: 35 },
        { feature: 'Disang Shale Fold Hinge Weakness', value: 'Intense Micro-shearing', contribution: 0.28, percentage: 31 },
        { feature: 'Weekly Rain Volume (295 mm)', value: 'Subsurface Saturation', contribution: 0.24, percentage: 26 },
        { feature: 'Road Widening Slopes', value: 'Steepened Toe Cut', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Critical national lifeline NH-2 (Imphal-Dimapur) experiencing sinking at Koubru foothills.',
        'Immediate warning for heavy multi-axle freight trucks.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-2 (Imphal - Dimapur Lifeline)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Kangpokpi Town Corridor', population: 7200, distanceMeters: 300 }
      ],
      hospitals: 2,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 7200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 22
  },
  {
    id: 'MAN_005',
    name: 'Ukhrul - Shirui Kashong Slopes',
    state: 'Manipur',
    district: 'Ukhrul',
    latitude: 25.1180,
    longitude: 94.3640,
    environmental: {
      elevation: 2190,
      slope: 35.4,
      aspect: 'East',
      geology: 'Ophiolite Belt Serpentinite, Peridotite & Chert',
      soil: 'Nickel-Chromium Rich Silt with High Weathering Tendency',
      landCover: 'Shirui Lily Sub-alpine Grassland & Shrub',
      drainage: 'Thoubal River Headwaters',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 51.0,
      last3Days: 115.0,
      last7Days: 215.0,
      last15Days: 400.0,
      last30Days: 680.0,
      max1Day: 60.0,
      max3Day: 128.0,
      rainyDays: 16,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.64,
      rainfallTriggerScore: 0.58,
      riskScore: 61,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Serpentinite Fault Contact Softening', value: 'Slickensided Slip Planes', contribution: 0.32, percentage: 35 },
        { feature: 'Ridge Elevation & Fog Saturation', value: '2190m High Altitude Wetness', contribution: 0.27, percentage: 30 },
        { feature: 'Moderate Slope Angle (35.4°)', value: 'Moderate Gravitational Pull', contribution: 0.22, percentage: 24 },
        { feature: 'Native Grassland Root Mat', value: 'Topsoil Cohesion', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch advisory for tourist trailheads and Ukhrul-Jessami road corridors.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Ukhrul - Jessami Highway (NH-202)', type: 'National Highway', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Shirui Village', population: 2600, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'MAN_006',
    name: 'Maram - Mao Gate Border Pass',
    state: 'Manipur',
    district: 'Senapati',
    latitude: 25.5120,
    longitude: 94.1350,
    environmental: {
      elevation: 1780,
      slope: 39.2,
      aspect: 'North-West',
      geology: 'Barail Hard Sandstone with Heavily Fractured Disang Shales Beneath',
      soil: 'Colluvial Scree over Deformed Silt',
      landCover: 'Alpine Scrub & Inter-state Checkpost Corridor',
      drainage: 'Makru River Catchment',
      faultDistanceKm: 1.4
    },
    rainfall: {
      today: 80.0,
      last3Days: 175.0,
      last7Days: 320.0,
      last15Days: 570.0,
      last30Days: 910.0,
      max1Day: 90.0,
      max3Day: 195.0,
      rainyDays: 20,
      antecedentRainfallIndex: 80.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.81,
      rainfallTriggerScore: 0.80,
      riskScore: 81,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Pass Elevation Tectonic Shearing', value: '1.4 km Splay Fault', contribution: 0.33, percentage: 36 },
        { feature: 'High 24h Rain Surge (80 mm)', value: 'Extreme Inflow Trigger', contribution: 0.29, percentage: 31 },
        { feature: 'Steep Valley Flanks (39.2°)', value: 'Rotational Slump Vulnerability', contribution: 0.23, percentage: 25 },
        { feature: 'Heavy Interstate Traffic Vibrations', value: 'High Axle Frequency', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning triggered at Manipur-Nagaland border crossing on NH-2.',
        'Sinking zone active near Maram bazar with tension cracks cutting across carriageway.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-2 (Mao Gate - Maram Interstate Axis)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mao Border Gate Town', population: 4900, distanceMeters: 280 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 18
  },
  {
    id: 'MAN_007',
    name: 'Imphal East - Nongmaiching Hill Escarpment',
    state: 'Manipur',
    district: 'Imphal East',
    latitude: 24.8420,
    longitude: 94.0250,
    environmental: {
      elevation: 1040,
      slope: 33.0,
      aspect: 'West',
      geology: 'Surma-Disang Transition Sandstone & Red Shale',
      soil: 'Sandy Silt Clay with Weathered Fragments',
      landCover: 'Sacred Hill Forest & Hillside Settlements',
      drainage: 'Iril River Valley',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 49.0,
      last3Days: 110.0,
      last7Days: 205.0,
      last15Days: 380.0,
      last30Days: 630.0,
      max1Day: 58.0,
      max3Day: 122.0,
      rainyDays: 15,
      antecedentRainfallIndex: 55.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.59,
      rainfallTriggerScore: 0.54,
      riskScore: 57,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Valley Border Slope Relief', value: '33.0° Escarpment Face', contribution: 0.30, percentage: 33 },
        { feature: 'Rainfall Infiltration (110 mm 3D)', value: 'Water Table Rise', contribution: 0.27, percentage: 30 },
        { feature: 'Hillside Foot Quarrying Cuts', value: 'Unretained Toe', contribution: 0.22, percentage: 24 },
        { feature: 'Sacred Grove Forest Cover', value: 'Canopy Interception', contribution: -0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Watch advisory on Nongmaiching hill circuit road for suburban Imphal East residents.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Nongmaiching Pilgrimage Link', type: 'District Road', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Lamlong Outskirts Sector', population: 3600, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 3600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MAN_008',
    name: 'Loktak Lake - Thanga Karang Hillslopes',
    state: 'Manipur',
    district: 'Bishnupur',
    latitude: 24.5240,
    longitude: 93.8120,
    environmental: {
      elevation: 820,
      slope: 29.5,
      aspect: 'North',
      geology: 'Tertiary Sandstone Islands in Lacustrine Silt Basin',
      soil: 'Gravelly Silty Loam',
      landCover: 'Fishing Villages & Floating Phumdi Buffer',
      drainage: 'Loktak Lake Lacustrine System',
      faultDistanceKm: 4.1
    },
    rainfall: {
      today: 42.0,
      last3Days: 95.0,
      last7Days: 180.0,
      last15Days: 340.0,
      last30Days: 570.0,
      max1Day: 50.0,
      max3Day: 108.0,
      rainyDays: 14,
      antecedentRainfallIndex: 48.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.49,
      rainfallTriggerScore: 0.46,
      riskScore: 48,
      riskLevel: 'WATCH',
      confidence: 0.87,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Lake High Water Level Hydrostatic Action', value: 'Toe Softening by Lake Swell', contribution: 0.29, percentage: 33 },
        { feature: 'Slope Incline (29.5°)', value: 'Moderate Island Slopes', contribution: 0.25, percentage: 29 },
        { feature: 'Precipitation Inflow (42 mm 24h)', value: 'Moderate Rain Rate', contribution: 0.21, percentage: 24 },
        { feature: 'Low Building Load', value: 'Lightweight Wooden Stilt Dwellings', contribution: -0.12, percentage: 14 }
      ],
      explanationPoints: [
        'Conditions stable; minor wave-induced toe scouring monitored along Thanga island causeway.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Moirang - Thanga Island Causeway Road', type: 'District Road', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Thanga Village Clusters', population: 2900, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'MAN_009',
    name: 'Chandel - Tengnoupal Indo-Myanmar Border Corridor',
    state: 'Manipur',
    district: 'Tengnoupal',
    latitude: 24.3980,
    longitude: 94.1480,
    environmental: {
      elevation: 1420,
      slope: 37.0,
      aspect: 'South-East',
      geology: 'Ophiolitic Mélange & Sheared Flysch Shales',
      soil: 'Clayey Colluvium with Serpentinite Blocks',
      landCover: 'Dense Wet Evergreen Ridge & Border Highway',
      drainage: 'Yu River Basin (Chindwin Drainage)',
      faultDistanceKm: 1.7
    },
    rainfall: {
      today: 68.0,
      last3Days: 152.0,
      last7Days: 285.0,
      last15Days: 510.0,
      last30Days: 840.0,
      max1Day: 78.0,
      max3Day: 168.0,
      rainyDays: 18,
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
        { feature: 'Ophiolite Tectonic Suture Shearing', value: '1.7 km Suture Fault', contribution: 0.32, percentage: 35 },
        { feature: 'Heavy Monsoon Rainfall Pulse', value: '68 mm 24h Rain', contribution: 0.28, percentage: 31 },
        { feature: 'International Transit Freight Axle Load', value: 'Heavy Asian Highway 1 Traffic', contribution: 0.24, percentage: 26 },
        { feature: 'Steep Escarpment Profile (37.0°)', value: 'High Potential Shear', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning issued for Asian Highway 1 (AH-1 / NH-102) between Tengnoupal and Moreh border post.',
        'Subsidence and slip failures observed on hairpins 7 through 11.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'AH-1 / NH-102 (Imphal - Moreh Border Highway)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tengnoupal Hq Settlement', population: 3400, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 3400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 14
  }
];
