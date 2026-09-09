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
  },
  {
    id: 'TRP_009',
    name: 'Kanchanpur - Jampui Foothills Corridor',
    state: 'Tripura',
    district: 'North Tripura',
    latitude: 23.9850,
    longitude: 92.2180,
    environmental: {
      elevation: 420,
      slope: 34.5,
      aspect: 'East',
      geology: 'Surma Group Soft Laminated Shale & Calcareous Siltstone',
      soil: 'Sandy Clay Loam with High Water Table Infiltration',
      landCover: 'Betel Nut Groves & Orange Orchards',
      drainage: 'Deo River Torrential Tributaries',
      faultDistanceKm: 2.2
    },
    rainfall: {
      today: 52.0,
      last3Days: 118.0,
      last7Days: 215.0,
      last15Days: 390.0,
      last30Days: 660.0,
      max1Day: 64.0,
      max3Day: 130.0,
      rainyDays: 16,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-KCP-09',
      telemetrySource: 'IMD Automated Weather Station + Tripura PWD Sensor',
      soilMoisturePct: 64.5,
      poreWaterPressureKPa: 35.0
    },
    prediction: {
      susceptibilityScore: 0.62,
      rainfallTriggerScore: 0.55,
      riskScore: 59,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Deo River Swell Hydraulic Undercutting', value: 'Moderate Toe Erosion', contribution: 0.30, percentage: 35 },
        { feature: 'Rainfall Infiltration (118mm 3D)', value: 'Moderate Influx', contribution: 0.27, percentage: 31 },
        { feature: 'Slope Incline (34.5°)', value: 'Moderate Hill Slopes', contribution: 0.23, percentage: 26 },
        { feature: 'Betel Palm Vegetation', value: 'Surface Binding', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory on Kanchanpur-Vanghmun highway accessing Jampui Hills tourist ridge.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kanchanpur - Vanghmun Highway', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Kanchanpur Foothill Sub-town', population: 3100, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'TRP_010',
    name: 'Teliamura - Baramura Eco Ridge Cutting',
    state: 'Tripura',
    district: 'Khowai',
    latitude: 23.8240,
    longitude: 91.5850,
    environmental: {
      elevation: 260,
      slope: 33.2,
      aspect: 'West',
      geology: 'Tipam Sandstone & Dupi Tila Silt Interbeds with Gas Pipe Line Trenches',
      soil: 'Friable Sandy Silt prone to Sudden Rill Erosion',
      landCover: 'Moist Deciduous Forest & Pipeline Clearings',
      drainage: 'Khowai River Catchment Ravines',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 64.0,
      last3Days: 142.0,
      last7Days: 255.0,
      last15Days: 450.0,
      last30Days: 740.0,
      max1Day: 76.0,
      max3Day: 156.0,
      rainyDays: 18,
      antecedentRainfallIndex: 68.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-TLM-10',
      telemetrySource: 'IMD Automated Weather Station + GAIL Pipeline Fiber Acoustic',
      soilMoisturePct: 75.0,
      poreWaterPressureKPa: 46.5
    },
    prediction: {
      susceptibilityScore: 0.73,
      rainfallTriggerScore: 0.70,
      riskScore: 72,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'NH-08 Highway & Gas Pipeline Cut Vulnerability', value: 'High Linear Infrastructure Exposure', contribution: 0.35, percentage: 37 },
        { feature: 'Heavy Monsoon Rain Infiltration (142mm 3D)', value: 'High Saturation', contribution: 0.29, percentage: 31 },
        { feature: 'Friable Tipam Sandstone Dissolution', value: 'Low Cohesion', contribution: 0.22, percentage: 24 },
        { feature: 'Forest Canopy Interception', value: 'Mitigating Factor', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Warning active for NH-08 corridor over Baramura eco-ridge; active slumping above gas pipeline servitude.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-08 (Agartala - Silchar National Highway Lifeline)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Teliamura Ridge Hamlet', population: 2600, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'TRP_011',
    name: 'Amarpur - Dumbur Lake Escarpment',
    state: 'Tripura',
    district: 'Gomati',
    latitude: 23.5180,
    longitude: 91.6850,
    environmental: {
      elevation: 180,
      slope: 31.5,
      aspect: 'South',
      geology: 'Bhuban Formation Muddy Sandstone & Siltstone',
      soil: 'Sandy Silt with Thin Humus Mantle',
      landCover: 'Bamboo Thickets & Hydro Reservoir Margins',
      drainage: 'Gomati River Reservoir Rim',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 48.0,
      last3Days: 106.0,
      last7Days: 195.0,
      last15Days: 360.0,
      last30Days: 610.0,
      max1Day: 58.0,
      max3Day: 122.0,
      rainyDays: 15,
      antecedentRainfallIndex: 52.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-AMP-11',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 59.8,
      poreWaterPressureKPa: 32.0
    },
    prediction: {
      susceptibilityScore: 0.52,
      rainfallTriggerScore: 0.49,
      riskScore: 51,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Reservoir Wave Surcharge & Drawdown Slump', value: 'Moderate Shoreline Scour', contribution: 0.31, percentage: 36 },
        { feature: 'Rainfall Infiltration (106mm 3D)', value: 'Moderate Influx', contribution: 0.26, percentage: 30 },
        { feature: 'Slope Incline (31.5°)', value: 'Moderate Incline', contribution: 0.22, percentage: 25 },
        { feature: 'Bamboo Thicket Buffers', value: 'Erosion Retardant', contribution: -0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Watch advisory for Amarpur-Gandacherra lake road near Dumbur dam rim due to shoreline slips.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Amarpur - Gandacherra Road', type: 'District Road', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Dumbur Lakeside Village', population: 1800, distanceMeters: 490 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 1800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 3
  },
  {
    id: 'TRP_012',
    name: 'Belonia - Pilak Ridge',
    state: 'Tripura',
    district: 'South Tripura',
    latitude: 23.2450,
    longitude: 91.4550,
    environmental: {
      elevation: 140,
      slope: 28.0,
      aspect: 'South-West',
      geology: 'Dupi Tila Formation Mottled Clay & Loose Silty Sandstone',
      soil: 'Lateritic Sandy Clay with High Infiltration',
      landCover: 'Rubber Plantations & Archaeological Heritage Buffer',
      drainage: 'Muhuri River Lowland Streamlets',
      faultDistanceKm: 4.1
    },
    rainfall: {
      today: 36.0,
      last3Days: 82.0,
      last7Days: 155.0,
      last15Days: 295.0,
      last30Days: 520.0,
      max1Day: 45.0,
      max3Day: 95.0,
      rainyDays: 12,
      antecedentRainfallIndex: 40.0,
      triggerLevel: 'LOW',
      telemetryStationId: 'IMD-AWS-BLN-12',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 46.5,
      poreWaterPressureKPa: 20.4
    },
    prediction: {
      susceptibilityScore: 0.36,
      rainfallTriggerScore: 0.34,
      riskScore: 35,
      riskLevel: 'NORMAL',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Gentle Hill Slopes (28.0°)', value: 'Low Sloping Relief', contribution: 0.21, percentage: 38 },
        { feature: 'Low Cumulative Precipitation (82mm 3D)', value: 'Adequate Soil Permeability', contribution: -0.18, percentage: 33 },
        { feature: 'Extensive Rubber Forest Root Binding', value: 'High Soil Anchoring', contribution: -0.16, percentage: 29 }
      ],
      explanationPoints: [
        'Normal operations across Southern Tripura border corridor; low precipitation trigger.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Belonia - Sabroom Highway', type: 'State Highway', distanceMeters: 50, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Pilak Heritage Enclave', population: 2100, distanceMeters: 620 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 2
  },
  {
    id: 'TRP_013',
    name: 'Ambassa - Dhalai River Canyon Highway',
    state: 'Tripura',
    district: 'Dhalai',
    latitude: 23.9180,
    longitude: 91.8520,
    environmental: {
      elevation: 290,
      slope: 35.8,
      aspect: 'North',
      geology: 'Surma & Tipam Sequence Interbedded Shale & Soft Quartzite',
      soil: 'Clayey Silt Mantle with High Plasticity Indices',
      landCover: 'Teak Plantations & Major National Highway Cuttings',
      drainage: 'Dhalai River Perennial Basin',
      faultDistanceKm: 2.5
    },
    rainfall: {
      today: 59.0,
      last3Days: 134.0,
      last7Days: 245.0,
      last15Days: 430.0,
      last30Days: 710.0,
      max1Day: 72.0,
      max3Day: 148.0,
      rainyDays: 17,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-AMB-13',
      telemetrySource: 'IMD Automated Weather Station + PWD Strain Gauge',
      soilMoisturePct: 71.8,
      poreWaterPressureKPa: 43.5
    },
    prediction: {
      susceptibilityScore: 0.69,
      rainfallTriggerScore: 0.66,
      riskScore: 68,
      riskLevel: 'WATCH',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'NH-08 Highway Deep Slope Cuttings', value: 'Toe Removal Overhang', contribution: 0.33, percentage: 36 },
        { feature: 'Rainfall Infiltration (134mm 3D)', value: 'High Influx', contribution: 0.28, percentage: 30 },
        { feature: 'Slope Incline (35.8°)', value: 'Steep Cutting', contribution: 0.24, percentage: 26 },
        { feature: 'Teak Forest Deep Taproots', value: 'Partial Deep Anchor', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory on NH-08 sector near Ambassa district headquarters due to tension cracks in cut slopes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-08 (Ambassa Bypass Segment)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Ambassa District Core', population: 4200, distanceMeters: 410 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  }
];
