import { MonitoredLocation } from '../../types/location';

export const ASSAM_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'ASM_001',
    name: 'Haflong - Jatinga Hill Sinking Zone',
    state: 'Assam',
    district: 'Dima Hasao',
    latitude: 25.1780,
    longitude: 93.0320,
    environmental: {
      elevation: 680,
      slope: 39.0,
      aspect: 'South-East',
      geology: 'Disang Group Shales with High Montmorillonite Clay Swelling',
      soil: 'Expansive Silty Clay (Active Deep Sinking)',
      landCover: 'Degraded Shifting Cultivation Slopes & Rail Embankments',
      drainage: 'Jatinga River Fault Gorge',
      faultDistanceKm: 0.9
    },
    rainfall: {
      today: 118.0,
      last3Days: 260.0,
      last7Days: 490.0,
      last15Days: 840.0,
      last30Days: 1380.0,
      max1Day: 135.0,
      max3Day: 290.0,
      rainyDays: 24,
      antecedentRainfallIndex: 94.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.95,
      rainfallTriggerScore: 0.94,
      riskScore: 95,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Disang Montmorillonite Clay Liquefaction', value: 'Severe Expansive Shrink-Swell', contribution: 0.36, percentage: 38 },
        { feature: 'Continuous Heavy Rainfall (490 mm 7D)', value: 'Extreme Surcharge Trigger', contribution: 0.31, percentage: 33 },
        { feature: 'Jatinga Thrust Fault Lineament (0.9 km)', value: 'Active Suture Plane', contribution: 0.22, percentage: 23 },
        { feature: 'Steep Rail/Road Cutting Angle (39.0°)', value: 'Over-deepened Excavations', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'National Highway NH-27 (East-West Corridor) and Lumding-Badarpur railway hill section under severe sinking alert.',
        'Extensive slope creeps observed across Jatinga village with multi-meter road subsidence.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-27 (East-West Corridor Hill Highway)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' },
        { name: 'Lumding - Silchar Hill Railway Axis', type: 'Railway Track', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Haflong Town Sub-division', population: 8900, distanceMeters: 350 },
        { name: 'Jatinga Settlement Cluster', population: 3100, distanceMeters: 200 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 3,
      estimatedVulnerablePopulation: 12000
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 36
  },
  {
    id: 'ASM_002',
    name: 'Guwahati - Narakasur & Kamakhya Hills',
    state: 'Assam',
    district: 'Kamrup Metro',
    latitude: 26.1664,
    longitude: 91.7050,
    environmental: {
      elevation: 260,
      slope: 34.0,
      aspect: 'North',
      geology: 'Archaean Porphyritic Granite & Weathered Biotite Gneiss',
      soil: 'Red Residual Clay Loam with Corestones',
      landCover: 'Dense Urban Informal Settlements / Encroached Slopes',
      drainage: 'Bharalu River Catchment Slopes',
      faultDistanceKm: 3.2
    },
    rainfall: {
      today: 82.0,
      last3Days: 178.0,
      last7Days: 320.0,
      last15Days: 590.0,
      last30Days: 920.0,
      max1Day: 95.0,
      max3Day: 205.0,
      rainyDays: 20,
      antecedentRainfallIndex: 81.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.82,
      rainfallTriggerScore: 0.81,
      riskScore: 82,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Extreme Urban Density on Slopes', value: 'High Structural Load', contribution: 0.34, percentage: 36 },
        { feature: 'Loss of Soil Cohesion Upon Saturation', value: 'Weathered Granite Mantle', contribution: 0.28, percentage: 30 },
        { feature: 'Unregulated Earth Cutting for Dwellings', value: 'Vertical 80° Cut Faces', contribution: 0.24, percentage: 26 },
        { feature: 'Blocked Urban Storm Drains', value: 'Artificial Water Logging', contribution: 0.14, percentage: 15 }
      ],
      explanationPoints: [
        'Dense municipal settlements on Nilachal and Narakasur hills prone to fatal debris slides and boulder rolling.',
        'High casualty vulnerability during overnight torrential downpours exceeding 80 mm.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kamakhya Temple Hill Road', type: 'State Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' },
        { name: 'GS Road Arterial Connector', type: 'City Arterial', distanceMeters: 120, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Narakasur Hill Colony', population: 14200, distanceMeters: 50 },
        { name: 'Kamakhya Foothill Ward', population: 9600, distanceMeters: 80 }
      ],
      hospitals: 3,
      schools: 6,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 23800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 28
  },
  {
    id: 'ASM_003',
    name: 'Karbi Anglong - Diphu Ridge Slopes',
    state: 'Assam',
    district: 'Karbi Anglong',
    latitude: 25.8450,
    longitude: 93.4320,
    environmental: {
      elevation: 420,
      slope: 28.0,
      aspect: 'West',
      geology: 'Precambrian Gneiss with Tertiary Sandstone Caps',
      soil: 'Lateritic Red Sandy Clay',
      landCover: 'Rubber Plantations & Secondary Scrub',
      drainage: 'Dhansiri River Sub-basin',
      faultDistanceKm: 4.5
    },
    rainfall: {
      today: 46.0,
      last3Days: 104.0,
      last7Days: 195.0,
      last15Days: 360.0,
      last30Days: 610.0,
      max1Day: 54.0,
      max3Day: 118.0,
      rainyDays: 16,
      antecedentRainfallIndex: 52.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.52,
      rainfallTriggerScore: 0.49,
      riskScore: 51,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Laterite Crusting & Deep Infiltration', value: 'Pore Pressure Buildup', contribution: 0.30, percentage: 33 },
        { feature: 'Moderate Hill Slopes (28.0°)', value: 'Moderate Shear Stress', contribution: 0.26, percentage: 29 },
        { feature: 'Monsoon Rain Volume (104 mm 3D)', value: 'Hydraulic Inflow', contribution: 0.22, percentage: 24 },
        { feature: 'Agro-forestry Cover', value: 'Root Web Reinforcement', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch advisory for Diphu-Manja connecting road cuts in weathered laterite.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Diphu - Manja Road (NH-329)', type: 'National Highway', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Diphu Hill Colony', population: 5100, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 5100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'ASM_004',
    name: 'Silchar - Lakhipur Cachar Slopes',
    state: 'Assam',
    district: 'Cachar',
    latitude: 24.7950,
    longitude: 93.0120,
    environmental: {
      elevation: 95,
      slope: 26.5,
      aspect: 'South',
      geology: 'Surma Group Sandstone & Mudstone Alternations',
      soil: 'Silty Alluvium & Weathered Mudstone Clay',
      landCover: 'Tea Garden Slopes & Rural Settlements',
      drainage: 'Barak River Fluvial System',
      faultDistanceKm: 3.9
    },
    rainfall: {
      today: 62.0,
      last3Days: 140.0,
      last7Days: 265.0,
      last15Days: 480.0,
      last30Days: 810.0,
      max1Day: 72.0,
      max3Day: 155.0,
      rainyDays: 18,
      antecedentRainfallIndex: 68.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.60,
      rainfallTriggerScore: 0.65,
      riskScore: 63,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Barak River Bank Slumping & Toe Undercutting', value: 'Fluvial Flood Inundation', contribution: 0.32, percentage: 35 },
        { feature: 'Mudstone Softening Upon Wetting', value: 'Low Residual Shear Strength', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Infiltration (140 mm 3D)', value: 'High Water Table Rise', contribution: 0.24, percentage: 26 },
        { feature: 'Tea Bush Root Retention', value: 'Topsoil Stabilization', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Riverbank toe-erosion during high Barak river discharge causes progressive sloughing along NH-37.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-37 (Silchar - Imphal Lifeline Section)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lakhipur Tea Estate Cluster', population: 4200, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'ASM_005',
    name: 'Margherita - Ledo Coal Hills & Patkai Foothills',
    state: 'Assam',
    district: 'Tinsukia',
    latitude: 27.2950,
    longitude: 95.7480,
    environmental: {
      elevation: 280,
      slope: 35.0,
      aspect: 'North-East',
      geology: 'Barail Group Coal Measures, Sandstone & Carbonaceous Shale',
      soil: 'Colluvial Sandy Silt with Mine Spoil Overburden',
      landCover: 'Open Cast Coal Spoil Dumps & Tea Estates',
      drainage: 'Burhi Dihing River Sub-basin',
      faultDistanceKm: 2.3
    },
    rainfall: {
      today: 74.0,
      last3Days: 165.0,
      last7Days: 310.0,
      last15Days: 570.0,
      last30Days: 910.0,
      max1Day: 85.0,
      max3Day: 180.0,
      rainyDays: 19,
      antecedentRainfallIndex: 76.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.76,
      rainfallTriggerScore: 0.74,
      riskScore: 75,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Unconsolidated Mine Spoil Overburden Dumps', value: 'High Porosity Waste Dumps', contribution: 0.35, percentage: 37 },
        { feature: 'Intense Monsoon Rainfall Surge', value: '74 mm 24h Rain', contribution: 0.28, percentage: 30 },
        { feature: 'Steep Dump Slopes (35.0°)', value: 'Over-steepened Spoil Heaps', contribution: 0.22, percentage: 24 },
        { feature: 'Patkai Foothill Tectonic Thrust', value: 'Regional Seismic Zone', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning active for unstable overburden dumps in Ledo-Tirap colliery zones.',
        'High risk of rapid mudflows engulfing workers settlements and Stilwell Road approaches.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-315 (Stilwell Road to Pangsau Pass)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Ledo Colliery Basti', population: 3800, distanceMeters: 250 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 15
  },
  {
    id: 'ASM_006',
    name: 'Mahur - New Haflong Hill Railway Section',
    state: 'Assam',
    district: 'Dima Hasao',
    latitude: 25.1950,
    longitude: 93.1180,
    environmental: {
      elevation: 740,
      slope: 41.0,
      aspect: 'South',
      geology: 'Barail Sandstone over highly deformed Disang Shales',
      soil: 'Plastic Clay Loam and Boulder Scree',
      landCover: 'Steep Escarpments, Rail Tunnels & Viaducts',
      drainage: 'Mahur River Torrent Gorge',
      faultDistanceKm: 1.3
    },
    rainfall: {
      today: 112.0,
      last3Days: 248.0,
      last7Days: 460.0,
      last15Days: 810.0,
      last30Days: 1320.0,
      max1Day: 128.0,
      max3Day: 275.0,
      rainyDays: 23,
      antecedentRainfallIndex: 92.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.92,
      rainfallTriggerScore: 0.91,
      riskScore: 92,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Steep Rail Viaduct Cut Slopes', value: '41.0° Angle of Cut', contribution: 0.34, percentage: 36 },
        { feature: 'Extreme Continuous Downpour', value: '112 mm 24h Rainfall', contribution: 0.31, percentage: 33 },
        { feature: 'Disang Shale Weathering Horizon', value: 'Plastic Slip Failure', contribution: 0.23, percentage: 24 },
        { feature: 'Tunnel Portal Hydrostatic Pressure', value: 'Seepage Along Fractures', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'New Haflong railway station yard and Mahur tunnel portals experienced catastrophic mud washouts in 2022.',
        'Critical warning for train movements; track alignment monitoring active.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Northeast Frontier Railway Hill Mainline', type: 'Railway Track', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mahur Town Settlement', population: 3900, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 3900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 25
  },
  {
    id: 'ASM_007',
    name: 'Umrangso - Kopili Reservoir Bluffs',
    state: 'Assam',
    district: 'Dima Hasao',
    latitude: 25.5180,
    longitude: 92.7480,
    environmental: {
      elevation: 590,
      slope: 32.5,
      aspect: 'West',
      geology: 'Sylhet Limestone & Sandstone with Karst Cavities',
      soil: 'Karstic Clayey Loam with Sinkholes',
      landCover: 'Reservoir Buffer Forest & Hydel Plant Colony',
      drainage: 'Kopili River Hydroelectric Dam Basin',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 55.0,
      last3Days: 122.0,
      last7Days: 230.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 64.0,
      max3Day: 135.0,
      rainyDays: 17,
      antecedentRainfallIndex: 61.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.65,
      rainfallTriggerScore: 0.61,
      riskScore: 63,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Reservoir Rapid Drawdown & Rim Slumping', value: 'High Pore Pressure Fluctuation', contribution: 0.33, percentage: 36 },
        { feature: 'Karstic Limestone Cave Collapse', value: 'Subsurface Sinkholes', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Inflow (122 mm 3D)', value: 'Moderate Recharge', contribution: 0.22, percentage: 24 },
        { feature: 'Dam Spillway Drainage Channeling', value: 'Controlled Discharge', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch alert on reservoir rim roads near Kopili HEP power house.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Umrangso - Lanka Road', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Kopili Dam Colony', population: 2800, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'ASM_008',
    name: 'Bokajan - Khatkhati Quarry Cut Slopes',
    state: 'Assam',
    district: 'Karbi Anglong',
    latitude: 26.0180,
    longitude: 93.7950,
    environmental: {
      elevation: 210,
      slope: 33.0,
      aspect: 'East',
      geology: 'Limestone & Calcareous Shale Beds',
      soil: 'Clayey Residual Silt',
      landCover: 'Cement Plant Quarries & Disturbed Slopes',
      drainage: 'Dhansiri River Tributaries',
      faultDistanceKm: 3.6
    },
    rainfall: {
      today: 48.0,
      last3Days: 108.0,
      last7Days: 205.0,
      last15Days: 380.0,
      last30Days: 640.0,
      max1Day: 58.0,
      max3Day: 120.0,
      rainyDays: 15,
      antecedentRainfallIndex: 54.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.56,
      rainfallTriggerScore: 0.52,
      riskScore: 54,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Mining Cut Face Blasting Weakness', value: 'Micro-fractured Bedrock', contribution: 0.32, percentage: 35 },
        { feature: 'Shale Weathering & Bedding Slips', value: 'Slip Along Bedding Planes', contribution: 0.27, percentage: 30 },
        { feature: 'Precipitation Inflow (48 mm)', value: 'Moderate Influx', contribution: 0.22, percentage: 24 },
        { feature: 'Gentle Valley Floor', value: 'Runout Buffer', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch advisory for quarry haul roads and nearby Bokajan highway approaches.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-39 (Bokajan - Dimapur Axis)', type: 'National Highway', distanceMeters: 60, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Bokajan Outskirts', population: 3600, distanceMeters: 600 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'ASM_009',
    name: 'Chandrapur - Panikhaiti Brahmaputra Bluffs',
    state: 'Assam',
    district: 'Kamrup Metro',
    latitude: 26.2240,
    longitude: 91.8850,
    environmental: {
      elevation: 140,
      slope: 31.0,
      aspect: 'North-West',
      geology: 'Archaean Biotite Gneiss with Heavy Overburden',
      soil: 'Sandy Silt Alluvial Colluvium',
      landCover: 'Riverbank Road, Brick Kilns & Suburbs',
      drainage: 'Brahmaputra Main Riverbank Channel',
      faultDistanceKm: 3.1
    },
    rainfall: {
      today: 59.0,
      last3Days: 132.0,
      last7Days: 250.0,
      last15Days: 460.0,
      last30Days: 780.0,
      max1Day: 68.0,
      max3Day: 145.0,
      rainyDays: 18,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.63,
      rainfallTriggerScore: 0.62,
      riskScore: 62,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Brahmaputra Flood Current Undercutting', value: 'Toe Riverbank Scour', contribution: 0.33, percentage: 36 },
        { feature: 'Saturated Colluvial Soil Mantle', value: 'High Pore Water Pressure', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Surge (132 mm 3D)', value: 'Water Table Surge', contribution: 0.23, percentage: 25 },
        { feature: 'Riparian Buffer Zones', value: 'Riverbank Reeds', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory for Panikhaiti-Chandrapur railway line and river link road.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Guwahati - Chandrapur Link Road', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Panikhaiti Sub-town', population: 4800, distanceMeters: 350 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  }
];
