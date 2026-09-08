import { MonitoredLocation } from '../../types/location';

export const TRIPURA_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'TRI_001',
    name: 'Jampui Hills - Vanghmun Ridge',
    state: 'Tripura',
    district: 'North Tripura',
    latitude: 23.9680,
    longitude: 92.2740,
    environmental: {
      elevation: 930,
      slope: 35.8,
      aspect: 'West',
      geology: 'Surma Group (Bhuban Formation) Medium Sandstone with Siltstone Interbeds',
      soil: 'Sandy Clay Loam with High Leaching',
      landCover: 'Orange Orchards, Betel Nut Plantations & Hilltop Ridge Settlements',
      drainage: 'Deo River Canyon Headwaters',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 74.0,
      last3Days: 165.0,
      last7Days: 310.0,
      last15Days: 560.0,
      last30Days: 900.0,
      max1Day: 84.0,
      max3Day: 180.0,
      rainyDays: 19,
      antecedentRainfallIndex: 76.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.74,
      rainfallTriggerScore: 0.74,
      riskScore: 74,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Ridge Escarpment High Slopes (35.8°)', value: 'Steep Structural Relief', contribution: 0.33, percentage: 35 },
        { feature: 'Intense Monsoon Rainfall (74 mm 24h)', value: 'Rapid Water Table Influx', contribution: 0.29, percentage: 31 },
        { feature: 'Orchard Plantation Deep Infiltration', value: 'Elevated Pore Water Pressure', contribution: 0.23, percentage: 25 },
        { feature: 'Jampui Anticlinal Axis Suture', value: 'Fold Flank Jointing', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning triggered for Jampui Hills tourist & horticultural lifeline (Vanghmun-Kanchanpur axis).',
        'Subsidence and road shoulder cracks observed along tourist viewpoint approaches.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kanchanpur - Vanghmun - Jampui Road', type: 'State Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Vanghmun Tourist Village', population: 2800, distanceMeters: 280 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 16
  },
  {
    id: 'TRI_002',
    name: 'Atharamura Hill Range & NH-8 Pass',
    state: 'Tripura',
    district: 'Dhalai',
    latitude: 23.8540,
    longitude: 91.7580,
    environmental: {
      elevation: 410,
      slope: 37.0,
      aspect: 'North-West',
      geology: 'Tipam Sandstone Formation (Coarse, Friable with Clay Partings)',
      soil: 'Gravelly Sandy Loam (Highly Prone to Gullying & Slumping)',
      landCover: 'Dense Bamboo Groves & Strategic National Lifeline Expressway Cuts',
      drainage: 'Khowai & Dhalai River Watershed Divide',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 88.0,
      last3Days: 195.0,
      last7Days: 360.0,
      last15Days: 630.0,
      last30Days: 1010.0,
      max1Day: 98.0,
      max3Day: 215.0,
      rainyDays: 20,
      antecedentRainfallIndex: 84.0,
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
        { feature: 'Friable Tipam Sandstone Sudden Slaking', value: 'Loss of Matrix Cementation', contribution: 0.35, percentage: 37 },
        { feature: 'Torrential 24h Downpour (88 mm)', value: 'Extreme Gully Runoff', contribution: 0.30, percentage: 32 },
        { feature: 'NH-8 National Lifeline Four-Lane Cutting', value: 'Steep Cut Slope Angle (37.0°)', contribution: 0.22, percentage: 23 },
        { feature: 'Atharamura Anticlinal Thrust Contact', value: '1.8 km Fault Distance', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'National Highway NH-8 (Lifeline of Tripura linking Agartala to Assam) under high alert.',
        'Frequent massive translational debris slides block freight trucks between Teliamura and Ambassa.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-8 (Assam-Agartala National Lifeline)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Atharamura Pass Transit Hamlet', population: 1650, distanceMeters: 180 },
        { name: 'Teliamura Outskirts', population: 5200, distanceMeters: 650 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 6850
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 29
  },
  {
    id: 'TRI_003',
    name: 'Unakoti Archaeological Hill Slopes',
    state: 'Tripura',
    district: 'Unakoti',
    latitude: 24.3210,
    longitude: 92.0540,
    environmental: {
      elevation: 280,
      slope: 33.0,
      aspect: 'South-East',
      geology: 'Surma Group Soft Weathered Sandstone with Rock-Cut Bas-Reliefs',
      soil: 'Sandy Silt with High Weathering Susceptibility',
      landCover: 'National Heritage Archaeological Reserve & Forest Slopes',
      drainage: 'Manu River Sub-basin Ravines',
      faultDistanceKm: 3.1
    },
    rainfall: {
      today: 56.0,
      last3Days: 124.0,
      last7Days: 230.0,
      last15Days: 420.0,
      last30Days: 700.0,
      max1Day: 64.0,
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
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Ancient Rock-Carving Slopes Weathering', value: 'High Exfoliation & Spalling', contribution: 0.32, percentage: 35 },
        { feature: 'Waterfall Hydrostatic Saturation', value: 'Continuous Stream Splash Infiltration', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Surge (124 mm 3D)', value: 'Pore Pressure Inflow', contribution: 0.23, percentage: 25 },
        { feature: 'Archaeological Drainage Diversion', value: 'Engineered Gullies', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory active for UNESCO tentative heritage rock carvings and visitor pathways at Unakoti.',
        'Continuous monitoring of slope drainage to prevent rock face detachment.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kailashahar - Unakoti Heritage Road', type: 'District Road', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Unakoti Heritage Colony', population: 2100, distanceMeters: 350 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'TRI_004',
    name: 'Baramura (Hathai Kotor) Hill Range',
    state: 'Tripura',
    district: 'Khowai',
    latitude: 23.8340,
    longitude: 91.5420,
    environmental: {
      elevation: 320,
      slope: 34.5,
      aspect: 'West',
      geology: 'Tipam Friable Coarse Sandstone with Lignite Lenses',
      soil: 'Red Lateritic Sandy Clay (High Infiltration Rate)',
      landCover: 'Rubber Plantations, Forest & National Gas Pipeline Corridor',
      drainage: 'Haora River Basin',
      faultDistanceKm: 2.5
    },
    rainfall: {
      today: 65.0,
      last3Days: 145.0,
      last7Days: 275.0,
      last15Days: 500.0,
      last30Days: 820.0,
      max1Day: 75.0,
      max3Day: 160.0,
      rainyDays: 18,
      antecedentRainfallIndex: 70.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.71,
      rainfallTriggerScore: 0.69,
      riskScore: 70,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Baramura Anticlinal Axis Fracturing', value: '2.5 km Fault Axis', contribution: 0.33, percentage: 36 },
        { feature: 'Natural Gas Pipeline Corridor Surcharge', value: 'Underground Infrastructure Vulnerability', contribution: 0.28, percentage: 31 },
        { feature: 'Rainfall Saturation (145 mm 3D)', value: 'Pore Water Rise', contribution: 0.24, percentage: 26 },
        { feature: 'Slope Incline (34.5°)', value: 'Slip Potential', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Warning triggered for Baramura pass on NH-8; critical for Agartala gas pipeline safety.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-8 (Baramura Pass Section)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Hathai Kotor Tribal Basti', population: 3100, distanceMeters: 300 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 14
  },
  {
    id: 'TRI_005',
    name: 'Longtharai Mandir Hill Pass',
    state: 'Tripura',
    district: 'Dhalai',
    latitude: 23.9480,
    longitude: 91.9840,
    environmental: {
      elevation: 480,
      slope: 36.2,
      aspect: 'East',
      geology: 'Bhuban Formation Jointed Sandstone & Claystone',
      soil: 'Sandy Silt Loam over Slicken-sided Clay',
      landCover: 'Dense Mixed Forest & Pilgrimage Highway',
      drainage: 'Dhalai River Valley Flank',
      faultDistanceKm: 2.0
    },
    rainfall: {
      today: 72.0,
      last3Days: 160.0,
      last7Days: 300.0,
      last15Days: 540.0,
      last30Days: 880.0,
      max1Day: 82.0,
      max3Day: 175.0,
      rainyDays: 19,
      antecedentRainfallIndex: 75.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.76,
      rainfallTriggerScore: 0.74,
      riskScore: 75,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Longtharai Ridge Thrust Shearing', value: '2.0 km Fault Distance', contribution: 0.33, percentage: 36 },
        { feature: 'Heavy Monsoon Precipitation Pulse', value: '72 mm 24h Rain', contribution: 0.29, percentage: 31 },
        { feature: 'Steep Ghat Slope Incline (36.2°)', value: 'High Shear Stress', contribution: 0.24, percentage: 26 },
        { feature: 'Pilgrimage Traffic Surcharge', value: 'Seasonal Bus Traffic', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning active for Longtharai Mandir ghat section on NH-8 between Ambassa and Manu.',
        'Frequent rockfalls recorded during night-time rain pulses.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-8 (Ambassa - Manu Longtharai Corridor)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Longtharai Valley Settlement', population: 2900, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 17
  },
  {
    id: 'TRI_006',
    name: 'Deotamura (Chhabimura) Kalapania Rock Sculptures',
    state: 'Tripura',
    district: 'Gomati',
    latitude: 23.5180,
    longitude: 91.5640,
    environmental: {
      elevation: 190,
      slope: 42.0,
      aspect: 'South',
      geology: 'Surma Sandstone Vertical River Bluffs',
      soil: 'Colluvial Sandy Wash',
      landCover: 'River Gorge Cliffs & Wet Evergreen Canopy',
      drainage: 'Gomati River Gorge Riverbank',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 60.0,
      last3Days: 132.0,
      last7Days: 248.0,
      last15Days: 460.0,
      last30Days: 760.0,
      max1Day: 68.0,
      max3Day: 145.0,
      rainyDays: 18,
      antecedentRainfallIndex: 66.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.72,
      rainfallTriggerScore: 0.65,
      riskScore: 69,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Gomati River Bank Erosion & Wave Scour', value: 'High Water Current Undercutting', contribution: 0.35, percentage: 38 },
        { feature: 'Vertical Cliff Profile (42.0°)', value: 'Rockfall & Toppling Risk', contribution: 0.28, percentage: 30 },
        { feature: 'Rainfall Inflow (132 mm 3D)', value: 'Water Pressure in Joints', contribution: 0.23, percentage: 25 },
        { feature: 'Dense Cliff Fern Root Anchorage', value: 'Superficial Binding', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory for boat transit corridor and heritage rock faces along Gomati river.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Amarpur - Chhabimura Access Road', type: 'District Road', distanceMeters: 45, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Chhabimura Tribal Village', population: 1850, distanceMeters: 300 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 1850
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'TRI_007',
    name: 'Sakhan Ranges - Kanchanpur Forest Slopes',
    state: 'Tripura',
    district: 'North Tripura',
    latitude: 23.7840,
    longitude: 92.1850,
    environmental: {
      elevation: 780,
      slope: 34.0,
      aspect: 'West',
      geology: 'Surma Group Alternating Sandstone & Shales',
      soil: 'Sandy Silt Clay Loam',
      landCover: 'Deciduous Forest & Hill Agriculture',
      drainage: 'Deo River Fluvial System',
      faultDistanceKm: 3.0
    },
    rainfall: {
      today: 51.0,
      last3Days: 114.0,
      last7Days: 215.0,
      last15Days: 395.0,
      last30Days: 670.0,
      max1Day: 58.0,
      max3Day: 125.0,
      rainyDays: 16,
      antecedentRainfallIndex: 57.0,
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
        { feature: 'Sakhan Anticlinal Flank Relief', value: '34.0° Slope Angle', contribution: 0.31, percentage: 34 },
        { feature: 'Subsurface Wetting (114 mm 3D)', value: 'Moderate Influx', contribution: 0.27, percentage: 30 },
        { feature: 'Weathered Sandstone Joints', value: 'Shear Weakness', contribution: 0.22, percentage: 24 },
        { feature: 'Forest Canopy Buffer', value: 'Interception Buffer', contribution: -0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Watch advisory for Kanchanpur-Sakhan link roads during sustained monsoon rain.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kanchanpur - Anandabazar Road', type: 'State Highway', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Kanchanpur Town Sub-division', population: 4500, distanceMeters: 480 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4500
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'TRI_008',
    name: 'Agartala Urban Floodplain Slopes',
    state: 'Tripura',
    district: 'West Tripura',
    latitude: 23.8315,
    longitude: 91.2868,
    environmental: {
      elevation: 35,
      slope: 18.5,
      aspect: 'North',
      geology: 'Quaternary Alluvium & Dupitila Formation Siltstone',
      soil: 'Fine Sandy Alluvial Silt (Easily Liquefied)',
      landCover: 'Capital City Built-up Perimeter & River Embankments',
      drainage: 'Haora River Urban Embankment Channel',
      faultDistanceKm: 4.8
    },
    rainfall: {
      today: 38.0,
      last3Days: 85.0,
      last7Days: 165.0,
      last15Days: 310.0,
      last30Days: 520.0,
      max1Day: 44.0,
      max3Day: 95.0,
      rainyDays: 14,
      antecedentRainfallIndex: 44.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.35,
      rainfallTriggerScore: 0.40,
      riskScore: 36,
      riskLevel: 'NORMAL',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Haora River High Water Surcharge', value: 'Urban Embankment Toe Water', contribution: 0.30, percentage: 34 },
        { feature: 'Moderate Rainfall Trigger', value: '38 mm 24h Rain', contribution: 0.25, percentage: 28 },
        { feature: 'Gentle Slope Incline (18.5°)', value: 'Low Gravitational Shear', contribution: 0.20, percentage: 23 },
        { feature: 'Engineered Concrete Embankment Revetment', value: 'Toe Protection', contribution: -0.18, percentage: 20 }
      ],
      explanationPoints: [
        'Normal status prevailing across Agartala urban river embankments.',
        'Embankment revetments intact with zero active slope movement detected.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Agartala Ring Road Corridor', type: 'City Arterial', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Haora Embankment Colony', population: 8900, distanceMeters: 250 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 8900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 3
  }
];
