import { MonitoredLocation, NERState, StateStats } from '../types/location';

export const NER_STATES_INFO: Record<NERState, StateStats> = {
  'Arunachal Pradesh': {
    state: 'Arunachal Pradesh',
    capital: 'Itanagar',
    totalLocations: 5,
    normalCount: 1,
    watchCount: 2,
    warningCount: 2,
    highRiskDistricts: ['Tawang', 'West Kameng', 'Papum Pare', 'Upper Siang'],
    averageElevation: 2240,
    averageRainfallToday: 54.2,
    coordinates: [27.1004, 93.6166],
    zoomLevel: 8,
  },
  'Assam': {
    state: 'Assam',
    capital: 'Dispur / Guwahati',
    totalLocations: 5,
    normalCount: 2,
    watchCount: 2,
    warningCount: 1,
    highRiskDistricts: ['Dima Hasao (North Cachar)', 'Karbi Anglong', 'Kamrup Metro', 'Cachar'],
    averageElevation: 380,
    averageRainfallToday: 38.6,
    coordinates: [26.2006, 92.9376],
    zoomLevel: 8,
  },
  'Manipur': {
    state: 'Manipur',
    capital: 'Imphal',
    totalLocations: 4,
    normalCount: 1,
    watchCount: 1,
    warningCount: 2,
    highRiskDistricts: ['Noney', 'Tamenglong', 'Churachandpur', 'Kangpokpi'],
    averageElevation: 1120,
    averageRainfallToday: 49.8,
    coordinates: [24.6637, 93.9063],
    zoomLevel: 8,
  },
  'Meghalaya': {
    state: 'Meghalaya',
    capital: 'Shillong',
    totalLocations: 6,
    normalCount: 1,
    watchCount: 2,
    warningCount: 3,
    highRiskDistricts: ['East Khasi Hills', 'West Khasi Hills', 'South West Khasi Hills', 'Ri-Bhoi'],
    averageElevation: 1480,
    averageRainfallToday: 76.4,
    coordinates: [25.4670, 91.3662],
    zoomLevel: 8,
  },
  'Mizoram': {
    state: 'Mizoram',
    capital: 'Aizawl',
    totalLocations: 4,
    normalCount: 1,
    watchCount: 2,
    warningCount: 1,
    highRiskDistricts: ['Aizawl', 'Lunglei', 'Champhai', 'Hnahthial'],
    averageElevation: 1210,
    averageRainfallToday: 44.5,
    coordinates: [23.1645, 92.9376],
    zoomLevel: 8,
  },
  'Nagaland': {
    state: 'Nagaland',
    capital: 'Kohima',
    totalLocations: 4,
    normalCount: 1,
    watchCount: 1,
    warningCount: 2,
    highRiskDistricts: ['Kohima', 'Phek', 'Wokha', 'Mokokchung'],
    averageElevation: 1650,
    averageRainfallToday: 51.0,
    coordinates: [26.1584, 94.5624],
    zoomLevel: 8,
  },
  'Sikkim': {
    state: 'Sikkim',
    capital: 'Gangtok',
    totalLocations: 5,
    normalCount: 1,
    watchCount: 1,
    warningCount: 3,
    highRiskDistricts: ['Mangan (North Sikkim)', 'Gangtok', 'Namchi', 'Pakyong'],
    averageElevation: 2150,
    averageRainfallToday: 82.1,
    coordinates: [27.5330, 88.5122],
    zoomLevel: 9,
  },
  'Tripura': {
    state: 'Tripura',
    capital: 'Agartala',
    totalLocations: 4,
    normalCount: 3,
    watchCount: 1,
    warningCount: 0,
    highRiskDistricts: ['Dhalai', 'Unakoti', 'North Tripura'],
    averageElevation: 140,
    averageRainfallToday: 26.3,
    coordinates: [23.9408, 91.9882],
    zoomLevel: 8,
  }
};

export const INITIAL_MONITORED_LOCATIONS: MonitoredLocation[] = [
  // MEGHALAYA
  {
    id: 'MEG_001',
    name: 'Cherrapunji (Sohra)',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.2986,
    longitude: 91.7324,
    environmental: {
      elevation: 1430,
      slope: 38.4,
      aspect: 'South',
      geology: 'Cretaceous-Tertiary Sandstone & Shale',
      soil: 'Gravelly Sandy Loam (High Infiltration)',
      landCover: 'Degraded Grassland / Escarpment',
      drainage: 'High Density Deep Gorges',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 114.5,
      last3Days: 248.0,
      last7Days: 486.2,
      last15Days: 890.0,
      last30Days: 1420.5,
      max1Day: 132.0,
      max3Day: 280.0,
      rainyDays: 24,
      antecedentRainfallIndex: 92.4,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.88,
      rainfallTriggerScore: 0.92,
      riskScore: 89,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Antecedent Rainfall (7D/15D)', value: '486.2 mm', contribution: 0.31, percentage: 34 },
        { feature: 'Slope Angle', value: '38.4°', contribution: 0.26, percentage: 28 },
        { feature: 'High 24h Rainfall Intensity', value: '114.5 mm', contribution: 0.19, percentage: 21 },
        { feature: 'Lithology / Sandstone-Shale Interface', value: 'Tertiary Sedimentary', contribution: 0.12, percentage: 12 },
        { feature: 'Proximity to Fault Line', value: '2.1 km', contribution: 0.05, percentage: 5 }
      ],
      explanationPoints: [
        'Excessive 7-day cumulative rainfall (486 mm) has fully saturated the shallow regolith layer.',
        'High slope steepness (>38°) exceeds typical internal friction angle of weathered sandstone.',
        'Heavy storm runoff through gorges increases pore-water pressure along shear planes.',
        'Critical state reached: imminent shallow translational debris slide risk along NH-106 corridor.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-106 (Shillong-Cherrapunji Highway)', type: 'National Highway', distanceMeters: 45, trafficVulnerability: 'HIGH' },
        { name: 'Mawkdok-Sohra Bypass Link', type: 'State Highway', distanceMeters: 280, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Nongrim Village', population: 1420, distanceMeters: 310 },
        { name: 'Sohra Market Sector', population: 3850, distanceMeters: 620 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 5270
    },
    lastUpdated: '2026-09-01T20:42:00+05:30',
    historicalEventsCount: 14
  },
  {
    id: 'MEG_002',
    name: 'Mawkdok Dympep Valley',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.3970,
    longitude: 91.7580,
    environmental: {
      elevation: 1580,
      slope: 42.1,
      aspect: 'South-West',
      geology: 'Khasi Group Quartzite & Weathered Phyllite',
      soil: 'Sandy Silt over Clayey Horizon',
      landCover: 'Steep Escarpment & Open Shrub',
      drainage: 'Steep V-Shaped Valleys',
      faultDistanceKm: 1.4
    },
    rainfall: {
      today: 98.0,
      last3Days: 210.4,
      last7Days: 395.0,
      last15Days: 680.0,
      last30Days: 1150.0,
      max1Day: 110.0,
      max3Day: 235.0,
      rainyDays: 22,
      antecedentRainfallIndex: 86.8,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.85,
      rainfallTriggerScore: 0.84,
      riskScore: 84,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Slope Steepness', value: '42.1°', contribution: 0.32, percentage: 35 },
        { feature: 'Antecedent Wetness Index', value: '86.8 / 100', contribution: 0.28, percentage: 30 },
        { feature: '24h Rainfall Surge', value: '98.0 mm', contribution: 0.18, percentage: 19 },
        { feature: 'Tectonic Lineament Proximity', value: '1.4 km', contribution: 0.14, percentage: 16 }
      ],
      explanationPoints: [
        'Steep valley cut has elevated rockfall and debris flow probability.',
        'Bridge approach on NH-106 at Mawkdok gorge has observed tension cracks.',
        'Continuous wet spell of 5 consecutive days without solar drying.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-106 Gorge Bridge Section', type: 'National Highway', distanceMeters: 60, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mawkdok Hamlet', population: 890, distanceMeters: 400 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 890
    },
    lastUpdated: '2026-09-01T20:38:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'MEG_003',
    name: 'Nongpoh Valley Slopes',
    state: 'Meghalaya',
    district: 'Ri-Bhoi',
    latitude: 25.9038,
    longitude: 91.8804,
    environmental: {
      elevation: 580,
      slope: 28.5,
      aspect: 'North-East',
      geology: 'Gneissic Complex & Residual Soil',
      soil: 'Red Lateritic Clayey Soil',
      landCover: 'Mixed Bamboo & Horticulture',
      drainage: 'Dendritic Stream Network',
      faultDistanceKm: 4.8
    },
    rainfall: {
      today: 64.2,
      last3Days: 132.0,
      last7Days: 245.0,
      last15Days: 410.0,
      last30Days: 690.0,
      max1Day: 78.0,
      max3Day: 145.0,
      rainyDays: 18,
      antecedentRainfallIndex: 68.2,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.62,
      rainfallTriggerScore: 0.70,
      riskScore: 66,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: '3-Day Rainfall Accumulation', value: '132.0 mm', contribution: 0.35, percentage: 38 },
        { feature: 'Clayey Soil Moisture Retention', value: 'High Plasticity', contribution: 0.25, percentage: 27 },
        { feature: 'Highway Cut Slopes (NH-6)', value: 'Steep Artificial Cut', contribution: 0.22, percentage: 24 },
        { feature: 'Slope Gradient', value: '28.5°', contribution: 0.10, percentage: 11 }
      ],
      explanationPoints: [
        'NH-6 Guwahati-Shillong expressway cut slopes show active seepage lines.',
        'Rainfall trigger is near threshold; alert watch status advised for heavy vehicles.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-6 (Guwahati - Shillong 4-lane Corridor)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Umsning Outskirts', population: 2400, distanceMeters: 800 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2400
    },
    lastUpdated: '2026-09-01T20:40:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MEG_004',
    name: 'Shillong Peak & Upper Shillong',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.5450,
    longitude: 91.8540,
    environmental: {
      elevation: 1960,
      slope: 22.0,
      aspect: 'North',
      geology: 'Shillong Group Quartzite',
      soil: 'Loamy Humus Rich Soil',
      landCover: 'Pine Forest & Urban Margin',
      drainage: 'Sub-parallel Streams',
      faultDistanceKm: 6.2
    },
    rainfall: {
      today: 34.0,
      last3Days: 78.5,
      last7Days: 145.0,
      last15Days: 290.0,
      last30Days: 480.0,
      max1Day: 42.0,
      max3Day: 85.0,
      rainyDays: 14,
      antecedentRainfallIndex: 38.5,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.35,
      rainfallTriggerScore: 0.32,
      riskScore: 32,
      riskLevel: 'NORMAL',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Dense Pine Root Cohesion', value: 'High Forest Cover', contribution: -0.25, percentage: 38 },
        { feature: 'Competent Quartzite Bedrock', value: 'Low Weathering', contribution: -0.20, percentage: 31 },
        { feature: 'Moderate Slope Angle', value: '22.0°', contribution: 0.12, percentage: 18 },
        { feature: 'Current 24h Rainfall', value: '34.0 mm', contribution: 0.08, percentage: 13 }
      ],
      explanationPoints: [
        'Stable bedrock and dense pine canopy provide significant root reinforcement.',
        'Rainfall remains comfortably beneath empirical threshold curves.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Upper Shillong Bypass Rd', type: 'District Road', distanceMeters: 120, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: '5th Mile Cantonment', population: 3100, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-01T20:25:00+05:30',
    historicalEventsCount: 1
  },
  {
    id: 'MEG_005',
    name: 'Mawsynram Hills',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.2975,
    longitude: 91.5826,
    environmental: {
      elevation: 1400,
      slope: 36.5,
      aspect: 'South-East',
      geology: 'Sylhet Trap Basalt & Sandstone',
      soil: 'Shallow Clay Loam',
      landCover: 'Barren Escarpment & Shrub',
      drainage: 'Torrential Cascades',
      faultDistanceKm: 3.0
    },
    rainfall: {
      today: 128.0,
      last3Days: 290.0,
      last7Days: 540.0,
      last15Days: 980.0,
      last30Days: 1560.0,
      max1Day: 145.0,
      max3Day: 310.0,
      rainyDays: 26,
      antecedentRainfallIndex: 95.2,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.89,
      rainfallTriggerScore: 0.96,
      riskScore: 92,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Extreme 7D Rainfall (540 mm)', value: 'Highest in NER', contribution: 0.36, percentage: 38 },
        { feature: 'Escarpment Slope Gradient', value: '36.5°', contribution: 0.28, percentage: 30 },
        { feature: 'Shallow Bedrock Regolith Contact', value: 'High Pore Pressure', contribution: 0.20, percentage: 21 },
        { feature: 'Fault Proximity', value: '3.0 km', contribution: 0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Highest wetness accumulation in Asia; critical saturation across all topsoil profiles.',
        'High probability of road breaches and mud debris torrents connecting to valley settlements.',
        'Immediate evacuation protocol suggested for low-lying slopes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mawsynram - Balat Border Road', type: 'State Highway', distanceMeters: 50, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mawsynram Village Center', population: 2900, distanceMeters: 250 },
        { name: 'Kenmynsaw Hamlet', population: 650, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3550
    },
    lastUpdated: '2026-09-01T20:44:00+05:30',
    historicalEventsCount: 18
  },
  {
    id: 'MEG_006',
    name: 'Jowai Pass & Myntdu Slopes',
    state: 'Meghalaya',
    district: 'West Jaintia Hills',
    latitude: 25.4484,
    longitude: 92.2038,
    environmental: {
      elevation: 1380,
      slope: 31.0,
      aspect: 'South',
      geology: 'Tertiary Jaintia Group Sandstone & Coal Measures',
      soil: 'Sandy Silt Loam',
      landCover: 'Cultivated Slopes & Mining Scars',
      drainage: 'Myntdu River Tributaries',
      faultDistanceKm: 3.8
    },
    rainfall: {
      today: 58.0,
      last3Days: 125.0,
      last7Days: 230.0,
      last15Days: 440.0,
      last30Days: 780.0,
      max1Day: 68.0,
      max3Day: 138.0,
      rainyDays: 19,
      antecedentRainfallIndex: 64.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.68,
      rainfallTriggerScore: 0.65,
      riskScore: 67,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Mining Cut Excavation Impact', value: 'Unstabilized Cuts', contribution: 0.30, percentage: 33 },
        { feature: 'Antecedent Rainfall Index', value: '64.0 / 100', contribution: 0.26, percentage: 29 },
        { feature: 'Slope Gradient', value: '31.0°', contribution: 0.22, percentage: 24 },
        { feature: 'Sandstone Joint Weakness', value: 'Tertiary Sediments', contribution: 0.13, percentage: 14 }
      ],
      explanationPoints: [
        'Anthropogenic slope toe-cutting near mining areas exacerbates slope failure risk.',
        'NH-6 Silchar lifeline section through Jowai monitored for subsidence.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-6 (Jowai - Ratacherra Section)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Ladrymbai Junction', population: 4200, distanceMeters: 600 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4200
    },
    lastUpdated: '2026-09-01T20:30:00+05:30',
    historicalEventsCount: 8
  },

  // SIKKIM
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
    lastUpdated: '2026-09-01T20:45:00+05:30',
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
        'Urban hillside overloading on weak Daling phyllites.',
        'NH-10 connecting Gangtok to Siliguri at high risk of blockade near 9th Mile.',
        'Early warning issued to municipal disaster management authorities.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-10 (Sikkim Lifeline Highway)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Deorali Upper Colony', population: 5400, distanceMeters: 180 },
        { name: 'Tadong Downhill Sector', population: 7800, distanceMeters: 550 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 13200
    },
    lastUpdated: '2026-09-01T20:41:00+05:30',
    historicalEventsCount: 16
  },
  {
    id: 'SIK_003',
    name: 'Pakyong Airport Slopes & Dikchu Link',
    state: 'Sikkim',
    district: 'Pakyong',
    latitude: 27.2340,
    longitude: 88.5870,
    environmental: {
      elevation: 1410,
      slope: 33.0,
      aspect: 'North-West',
      geology: 'Schistose Gneiss & Colluvial Soil',
      soil: 'Engineered Reinforced Earth & Residual Silt',
      landCover: 'Terraced Agriculture & Transport Infrastructure',
      drainage: 'Engineered Catchwater Drains',
      faultDistanceKm: 3.5
    },
    rainfall: {
      today: 72.0,
      last3Days: 155.0,
      last7Days: 290.0,
      last15Days: 520.0,
      last30Days: 850.0,
      max1Day: 80.0,
      max3Day: 168.0,
      rainyDays: 20,
      antecedentRainfallIndex: 74.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.74,
      rainfallTriggerScore: 0.77,
      riskScore: 76,
      riskLevel: 'WARNING',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Cut-and-Fill Engineered Slope Height', value: '>60m Geogrid Wall', contribution: 0.33, percentage: 36 },
        { feature: '7-Day Rainfall Index', value: '290 mm', contribution: 0.27, percentage: 29 },
        { feature: 'Drainage Pipe Pore Pressure', value: 'Elevated Sensor Readings', contribution: 0.22, percentage: 24 },
        { feature: 'Bedrock Weathering Grade', value: 'Grade IV', contribution: 0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Reinforced earth structures show elevated pore pressures.',
        'Airport access roadway requires continuous slope monitoring during monsoon surges.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Pakyong Airport Expressway', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Pakyong Bazaar', population: 3100, distanceMeters: 700 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-01T20:39:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'SIK_004',
    name: 'Namchi Tendong Hill Slopes',
    state: 'Sikkim',
    district: 'Namchi (South Sikkim)',
    latitude: 27.1650,
    longitude: 88.3580,
    environmental: {
      elevation: 1310,
      slope: 26.5,
      aspect: 'South',
      geology: 'Gondwana Sandstone & Carbonaceous Shale',
      soil: 'Clayey Loam with Colluvium',
      landCover: 'Tea Gardens & Forest Shrub',
      drainage: 'Manpur Khola Stream Basin',
      faultDistanceKm: 5.1
    },
    rainfall: {
      today: 45.0,
      last3Days: 98.0,
      last7Days: 180.0,
      last15Days: 340.0,
      last30Days: 590.0,
      max1Day: 52.0,
      max3Day: 110.0,
      rainyDays: 16,
      antecedentRainfallIndex: 52.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.52,
      rainfallTriggerScore: 0.48,
      riskScore: 50,
      riskLevel: 'WATCH',
      confidence: 0.87,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Shale Bedding Orientation', value: 'Weak Interbeds', contribution: 0.28, percentage: 34 },
        { feature: 'Accumulated 7D Rainfall', value: '180.0 mm', contribution: 0.25, percentage: 30 },
        { feature: 'Moderate Slope Gradient', value: '26.5°', contribution: 0.18, percentage: 22 },
        { feature: 'Tea Plantation Root Network', value: 'Moderate Stabilization', contribution: -0.12, percentage: 14 }
      ],
      explanationPoints: [
        'Moderate susceptibility with isolated minor rotational slips recorded on tea estate access routes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Namchi - Jorethang Hill Road', type: 'State Highway', distanceMeters: 85, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Damthang Sub-district', population: 1850, distanceMeters: 650 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 1850
    },
    lastUpdated: '2026-09-01T20:20:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'SIK_005',
    name: 'Ravangla Buddha Park Ridge',
    state: 'Sikkim',
    district: 'Namchi',
    latitude: 27.3080,
    longitude: 88.3630,
    environmental: {
      elevation: 2100,
      slope: 20.0,
      aspect: 'North-East',
      geology: 'Massive Granite Gneiss Bedrock',
      soil: 'Thin Rocky Soil Horizon',
      landCover: 'Coniferous Alpine Forest',
      drainage: 'Ridge Crest / Minimal Channelization',
      faultDistanceKm: 7.4
    },
    rainfall: {
      today: 32.0,
      last3Days: 68.0,
      last7Days: 130.0,
      last15Days: 260.0,
      last30Days: 450.0,
      max1Day: 38.0,
      max3Day: 75.0,
      rainyDays: 13,
      antecedentRainfallIndex: 34.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.28,
      rainfallTriggerScore: 0.30,
      riskScore: 28,
      riskLevel: 'NORMAL',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Competent Massive Granite Bedrock', value: 'High Strength', contribution: -0.32, percentage: 45 },
        { feature: 'Dense Coniferous Tree Cover', value: 'High Slope Stability', contribution: -0.22, percentage: 31 },
        { feature: 'Gentle Crest Topography', value: '20.0°', contribution: -0.10, percentage: 14 },
        { feature: 'Rainfall Below Trigger Index', value: '32.0 mm 24h', contribution: 0.07, percentage: 10 }
      ],
      explanationPoints: [
        'Stable ridge top with high bedrock cohesion. No active displacement detected.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Ravangla - Legship Rd', type: 'District Road', distanceMeters: 200, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Ravangla Settlement', population: 2200, distanceMeters: 800 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 2200
    },
    lastUpdated: '2026-09-01T20:15:00+05:30',
    historicalEventsCount: 1
  },

  // ARUNACHAL PRADESH
  {
    id: 'ARU_001',
    name: 'Tawang Sela Pass Transit Corridor',
    state: 'Arunachal Pradesh',
    district: 'Tawang',
    latitude: 27.5050,
    longitude: 92.0980,
    environmental: {
      elevation: 3180,
      slope: 44.5,
      aspect: 'South-East',
      geology: 'Se La Group Biotite Gneiss & Pegmatite',
      soil: 'Glaciated Moraine & Frost Shattered Talus',
      landCover: 'Alpine Barren Rock & Rhododendron Scrub',
      drainage: 'Tawang Chu Tributaries',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 92.0,
      last3Days: 195.0,
      last7Days: 370.0,
      last15Days: 620.0,
      last30Days: 980.0,
      max1Day: 104.0,
      max3Day: 215.0,
      rainyDays: 23,
      antecedentRainfallIndex: 88.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.91,
      rainfallTriggerScore: 0.89,
      riskScore: 90,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Freeze-Thaw Weathered Talus Overburden', value: 'Unstable Scree', contribution: 0.34, percentage: 36 },
        { feature: 'High Slope Gradient (44.5°)', value: 'Above Critical Angle', contribution: 0.30, percentage: 32 },
        { feature: 'Intense 72h Rainfall Surge', value: '195.0 mm', contribution: 0.22, percentage: 23 },
        { feature: 'Military Highway Strategic Cut', value: 'Toe Disturbance', contribution: 0.09, percentage: 9 }
      ],
      explanationPoints: [
        'Freeze-thaw joint loosening combined with torrential monsoon runoff triggers rockfall avalanche risk.',
        'NH-13 Balipara-Chariduar-Tawang (BCT) strategic road vulnerable to total blockage.',
        'Border Roads Organisation (BRO) quick response deployment recommended.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-13 (Trans-Arunachal Strategic Highway)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Jaswantgarh Transit Camp', population: 650, distanceMeters: 350 },
        { name: 'Jang Sub-town', population: 2100, distanceMeters: 1200 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2750
    },
    lastUpdated: '2026-09-01T20:43:00+05:30',
    historicalEventsCount: 19
  },
  {
    id: 'ARU_002',
    name: 'Itanagar - Zoo Road & Hollongi Foothills',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    latitude: 27.0844,
    longitude: 93.6053,
    environmental: {
      elevation: 480,
      slope: 34.0,
      aspect: 'South',
      geology: 'Upper Siwalik Soft Sandstone & Boulder Conglomerate',
      soil: 'Porous Sandy Colluvium',
      landCover: 'Urban Expansion on Hilltops & Shrub',
      drainage: 'Pachin River Drainage Basin',
      faultDistanceKm: 1.2
    },
    rainfall: {
      today: 88.5,
      last3Days: 174.0,
      last7Days: 310.0,
      last15Days: 540.0,
      last30Days: 890.0,
      max1Day: 96.0,
      max3Day: 188.0,
      rainyDays: 20,
      antecedentRainfallIndex: 81.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.83,
      rainfallTriggerScore: 0.81,
      riskScore: 82,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Unconsolidated Siwalik Sandstone Bedrock', value: 'Weak Cohesion', contribution: 0.32, percentage: 35 },
        { feature: 'Anthropogenic Hill Cutting for Housing', value: 'Unretained Cuts', contribution: 0.28, percentage: 30 },
        { feature: 'High 24h Rainfall Surge', value: '88.5 mm', contribution: 0.22, percentage: 24 },
        { feature: 'Main Frontal Thrust (MFT) Proximity', value: '1.2 km', contribution: 0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Weak Siwalik soft conglomerate fails rapidly upon water saturation.',
        'Multiple hillside residential dwellings at risk near Zoo Road and Chimpu area.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-415 (Itanagar - Naharlagun Arterial Road)', type: 'National Highway', distanceMeters: 35, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Chimpu Ward 4', population: 3800, distanceMeters: 200 },
        { name: 'Ganga Sector Hillside', population: 2900, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 6700
    },
    lastUpdated: '2026-09-01T20:37:00+05:30',
    historicalEventsCount: 12
  },
  {
    id: 'ARU_003',
    name: 'Bomdila Pass Slopes',
    state: 'Arunachal Pradesh',
    district: 'West Kameng',
    latitude: 27.2645,
    longitude: 92.4210,
    environmental: {
      elevation: 2210,
      slope: 30.2,
      aspect: 'South-West',
      geology: 'Bomdila Gneissic Complex',
      soil: 'Sandy Silt with Quartz fragments',
      landCover: 'Oak-Pine Subtropical Forest',
      drainage: 'Kameng River Sub-basin',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 52.0,
      last3Days: 110.0,
      last7Days: 215.0,
      last15Days: 390.0,
      last30Days: 680.0,
      max1Day: 60.0,
      max3Day: 124.0,
      rainyDays: 17,
      antecedentRainfallIndex: 61.5,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.65,
      rainfallTriggerScore: 0.63,
      riskScore: 64,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Moderate Rainfall Accumulation', value: '215 mm 7D', contribution: 0.30, percentage: 34 },
        { feature: 'Weathered Gneissic Joints', value: 'High Fracturing', contribution: 0.26, percentage: 30 },
        { feature: 'Road Shoulder Erosion', value: 'NH-13 Axis', contribution: 0.20, percentage: 23 },
        { feature: 'Tree Canopy Cushioning', value: 'Healthy Forest Cover', contribution: -0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Watch condition active; vulnerable to localized debris slides on steep outer road bends.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-13 (Bomdila Pass Section)', type: 'National Highway', distanceMeters: 45, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Lower Bomdila Village', population: 2600, distanceMeters: 600 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-01T20:28:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'ARU_004',
    name: 'Pasighat - Yembung Siang Escarpment',
    state: 'Arunachal Pradesh',
    district: 'East Siang',
    latitude: 28.0620,
    longitude: 95.3260,
    environmental: {
      elevation: 320,
      slope: 32.5,
      aspect: 'East',
      geology: 'Abor Volcanics & Siwalik Sandstone',
      soil: 'Gravelly Colluvial Silt',
      landCover: 'Tropical Evergreen Rainforest',
      drainage: 'Mighty Siang (Brahmaputra) River Canyon',
      faultDistanceKm: 2.7
    },
    rainfall: {
      today: 60.0,
      last3Days: 135.0,
      last7Days: 250.0,
      last15Days: 460.0,
      last30Days: 780.0,
      max1Day: 72.0,
      max3Day: 152.0,
      rainyDays: 19,
      antecedentRainfallIndex: 67.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.69,
      rainfallTriggerScore: 0.66,
      riskScore: 68,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Siang River Hydrological Undercutting', value: 'High Current Scour', contribution: 0.34, percentage: 38 },
        { feature: '7-Day Rainfall Index', value: '250.0 mm', contribution: 0.28, percentage: 31 },
        { feature: 'Abor Volcanic Weathering', value: 'Jointed Basalt', contribution: 0.18, percentage: 20 },
        { feature: 'Dense Forest Root Network', value: 'Stabilizing Canopy', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'High river discharge along Siang gorge exerts intense toe-scour against mountain base.',
        'Watch advisory issued for Pasighat-Yingkiong highway stretch.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Pasighat - Yingkiong Highway (NH-513)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Yembung Settlement', population: 1450, distanceMeters: 450 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 1450
    },
    lastUpdated: '2026-09-01T20:32:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'ARU_005',
    name: 'Ziro Valley Plateau Slopes',
    state: 'Arunachal Pradesh',
    district: 'Lower Subansiri',
    latitude: 27.5950,
    longitude: 93.8320,
    environmental: {
      elevation: 1560,
      slope: 16.0,
      aspect: 'North',
      geology: 'Gneissic Bedrock with Lacustrine Clay',
      soil: 'Deep Fertile Alluvial Clay Loam',
      landCover: 'Pine Forest & Paddy Terraces',
      drainage: 'Kele River Flat Basin',
      faultDistanceKm: 8.5
    },
    rainfall: {
      today: 28.0,
      last3Days: 58.0,
      last7Days: 110.0,
      last15Days: 220.0,
      last30Days: 390.0,
      max1Day: 32.0,
      max3Day: 66.0,
      rainyDays: 12,
      antecedentRainfallIndex: 28.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.22,
      rainfallTriggerScore: 0.24,
      riskScore: 23,
      riskLevel: 'NORMAL',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Gentle Valley Plateau Gradient', value: '16.0°', contribution: -0.38, percentage: 52 },
        { feature: 'Distance to Active Faults', value: '8.5 km', contribution: -0.22, percentage: 30 },
        { feature: 'Low 24h Rainfall Level', value: '28.0 mm', contribution: -0.10, percentage: 14 },
        { feature: 'Paddy Terraced Drainage Maintenance', value: 'Apatani Indigenous Drainage', contribution: -0.05, percentage: 4 }
      ],
      explanationPoints: [
        'Gentle topography with traditional Apatani water retention systems preventing soil erosion.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Old Ziro Arterial Link', type: 'District Road', distanceMeters: 300, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Hapoli Sub-town', population: 5800, distanceMeters: 900 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 5800
    },
    lastUpdated: '2026-09-01T20:10:00+05:30',
    historicalEventsCount: 0
  },

  // ASSAM
  {
    id: 'ASM_001',
    name: 'Haflong - Jatinga Hill Slopes',
    state: 'Assam',
    district: 'Dima Hasao',
    latitude: 25.1764,
    longitude: 93.0248,
    environmental: {
      elevation: 960,
      slope: 39.5,
      aspect: 'South-East',
      geology: 'Surma Group Siltstone & Highly Fractured Mudstone',
      soil: 'Clayey Residual Regolith',
      landCover: 'Degraded Forest & Rail-Road Corridor Cuts',
      drainage: 'Jatinga River Steep Valley',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 102.0,
      last3Days: 220.0,
      last7Days: 410.0,
      last15Days: 730.0,
      last30Days: 1180.0,
      max1Day: 115.0,
      max3Day: 240.0,
      rainyDays: 22,
      antecedentRainfallIndex: 89.4,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.90,
      rainfallTriggerScore: 0.91,
      riskScore: 91,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Clay-Rich Mudstone Softening in Water', value: 'High Plastic Index', contribution: 0.35, percentage: 37 },
        { feature: 'Extreme 7D Rainfall (410 mm)', value: 'Threshold Breach', contribution: 0.30, percentage: 32 },
        { feature: 'Railway and Highway Hill-Cutting', value: 'Over-steepened Slopes', contribution: 0.22, percentage: 23 },
        { feature: 'Dauki Fault Splay Proximity', value: '1.1 km', contribution: 0.08, percentage: 8 }
      ],
      explanationPoints: [
        'Dima Hasao represents one of the most critical landslide corridors in Assam.',
        'Lumding-Badarpur railway tracks and NH-54/NH-27 Mahur-Jatinga section vulnerable to massive sinking.',
        'High casualty exposure near Jatinga village settlements.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-27 (East-West Corridor / Mahur-Jatinga)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' },
        { name: 'N.F. Railway Lumding-Badarpur Hill Section Track', type: 'District Road', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Jatinga Village Outskirts', population: 2100, distanceMeters: 300 },
        { name: 'Haflong Town Ward 2', population: 4300, distanceMeters: 750 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 6400
    },
    lastUpdated: '2026-09-01T20:44:00+05:30',
    historicalEventsCount: 26
  },
  {
    id: 'ASM_002',
    name: 'Guwahati - Narakasur & Kamakhya Hills',
    state: 'Assam',
    district: 'Kamrup Metro',
    latitude: 26.1664,
    longitude: 91.7056,
    environmental: {
      elevation: 290,
      slope: 33.5,
      aspect: 'North',
      geology: 'Proterozoic Gneissic Inlier with Deep Weathered Silt',
      soil: 'Red Silt Clay Regolith (Saprolite)',
      landCover: 'Dense Urban Encroachment on Steep Slopes',
      drainage: 'Bharalu Urban Catchment',
      faultDistanceKm: 3.2
    },
    rainfall: {
      today: 55.0,
      last3Days: 120.0,
      last7Days: 225.0,
      last15Days: 390.0,
      last30Days: 610.0,
      max1Day: 68.0,
      max3Day: 135.0,
      rainyDays: 17,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.72,
      rainfallTriggerScore: 0.68,
      riskScore: 70,
      riskLevel: 'WARNING',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Dense Hillside Urbanization without Retaining Walls', value: 'High Encroachment', contribution: 0.38, percentage: 41 },
        { feature: 'Sudden High Intensity Convective Rain', value: '55.0 mm in 3 hrs', contribution: 0.28, percentage: 30 },
        { feature: 'Deep Saprolite Soil Weathering Layer', value: '3-5m thickness', contribution: 0.20, percentage: 22 },
        { feature: 'Slope Gradient (33.5°)', value: 'Oversteepened by earth cutting', contribution: 0.08, percentage: 7 }
      ],
      explanationPoints: [
        'Urban flash landslides triggered by unscientific slope cutting on Guwahati city hills.',
        'High population exposure with informal housing on Narakasur and Nabagraha hillsides.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kamakhya Temple Access Road', type: 'District Road', distanceMeters: 30, trafficVulnerability: 'HIGH' },
        { name: 'Bhangagarh - Narakasur Link', type: 'District Road', distanceMeters: 50, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Narakasur Hill Colony', population: 8500, distanceMeters: 100 },
        { name: 'Kamakhya Gate Settlement', population: 4200, distanceMeters: 300 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 12700
    },
    lastUpdated: '2026-09-01T20:36:00+05:30',
    historicalEventsCount: 15
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
      slope: 27.0,
      aspect: 'South',
      geology: 'Archaean Granite-Gneiss with Sandstone Outliers',
      soil: 'Lateritic Loam',
      landCover: 'Jhum Shifting Cultivation Scars & Bamboo',
      drainage: 'Dhansiri River Tributaries',
      faultDistanceKm: 4.5
    },
    rainfall: {
      today: 42.0,
      last3Days: 88.0,
      last7Days: 165.0,
      last15Days: 310.0,
      last30Days: 520.0,
      max1Day: 48.0,
      max3Day: 96.0,
      rainyDays: 15,
      antecedentRainfallIndex: 48.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.54,
      rainfallTriggerScore: 0.51,
      riskScore: 53,
      riskLevel: 'WATCH',
      confidence: 0.86,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Jhum Burn & Root Loss', value: 'Loss of shear strength', contribution: 0.32, percentage: 38 },
        { feature: '7-Day Accumulated Rain', value: '165 mm', contribution: 0.26, percentage: 31 },
        { feature: 'Slope Gradient (27.0°)', value: 'Moderate Slope', contribution: 0.20, percentage: 24 },
        { feature: 'Clay Content in Soil', value: 'Lateritic Subsoil', contribution: 0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Deforested jhum patches show surface rill erosion and shallow soil slips during moderate rain.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Diphu - Manja Link Road', type: 'State Highway', distanceMeters: 90, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Manja Outskirts', population: 2200, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2200
    },
    lastUpdated: '2026-09-01T20:22:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'ASM_004',
    name: 'Silchar - Lakhipur Cachar Slopes',
    state: 'Assam',
    district: 'Cachar',
    latitude: 24.7950,
    longitude: 93.0120,
    environmental: {
      elevation: 85,
      slope: 22.0,
      aspect: 'West',
      geology: 'Tipam Group Friable Sandstone',
      soil: 'Sandy Silt Alluvium & Colluvium',
      landCover: 'Tea Estates & Rural Settlements',
      drainage: 'Barak River Floodplain Margin',
      faultDistanceKm: 5.8
    },
    rainfall: {
      today: 35.0,
      last3Days: 74.0,
      last7Days: 140.0,
      last15Days: 270.0,
      last30Days: 450.0,
      max1Day: 40.0,
      max3Day: 82.0,
      rainyDays: 14,
      antecedentRainfallIndex: 42.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.44,
      rainfallTriggerScore: 0.42,
      riskScore: 43,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Barak Riverbank Hydraulic Slumping', value: 'High River Level', contribution: 0.35, percentage: 42 },
        { feature: 'Rainfall Accumulation', value: '140 mm 7D', contribution: 0.25, percentage: 30 },
        { feature: 'Tea Garden Topsoil Saturation', value: 'Moderate Soil Wetness', contribution: 0.18, percentage: 22 },
        { feature: 'Gentle Slope Gradient', value: '22.0°', contribution: -0.05, percentage: 6 }
      ],
      explanationPoints: [
        'Riverbank toe cutting by Barak river causes slumps on low hillocks bordering tea estates.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Silchar - Jiribam Road (NH-37)', type: 'National Highway', distanceMeters: 65, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Lakhipur Town Edge', population: 3100, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-01T20:18:00+05:30',
    historicalEventsCount: 3
  },
  {
    id: 'ASM_005',
    name: 'Tezpur Bhomoraguri Bank Section',
    state: 'Assam',
    district: 'Sonitpur',
    latitude: 26.6250,
    longitude: 92.8520,
    environmental: {
      elevation: 75,
      slope: 12.0,
      aspect: 'South',
      geology: 'Gneissic Rock Island / Fluvial Sand Bank',
      soil: 'Sandy Silt Alluvium',
      landCover: 'Plains & Riparian Shrub',
      drainage: 'Brahmaputra Main Channel',
      faultDistanceKm: 12.0
    },
    rainfall: {
      today: 18.0,
      last3Days: 42.0,
      last7Days: 85.0,
      last15Days: 180.0,
      last30Days: 310.0,
      max1Day: 22.0,
      max3Day: 48.0,
      rainyDays: 9,
      antecedentRainfallIndex: 19.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.18,
      rainfallTriggerScore: 0.19,
      riskScore: 19,
      riskLevel: 'NORMAL',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Flat Plain Topography', value: '12.0°', contribution: -0.42, percentage: 60 },
        { feature: 'Low 24h Precipitation', value: '18.0 mm', contribution: -0.18, percentage: 26 },
        { feature: 'Low Tectonic Activity Distance', value: '12.0 km', contribution: -0.10, percentage: 14 }
      ],
      explanationPoints: [
        'Stable alluvial lowlands with no slope instability hazards.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kolia Bhomora Bridge Approach (NH-715)', type: 'National Highway', distanceMeters: 500, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Tezpur Riverside Ward', population: 4800, distanceMeters: 1200 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4800
    },
    lastUpdated: '2026-09-01T20:05:00+05:30',
    historicalEventsCount: 0
  },

  // MANIPUR
  {
    id: 'MAN_001',
    name: 'Noney Tupul Railway Construction Site',
    state: 'Manipur',
    district: 'Noney',
    latitude: 24.8140,
    longitude: 93.6320,
    environmental: {
      elevation: 760,
      slope: 41.2,
      aspect: 'East',
      geology: 'Disang Group Flysch (Shale-Sandstone Rhythmite)',
      soil: 'Highly Weathered Expansive Clay Regolith',
      landCover: 'Excavated Construction Cut & Degraded Forest',
      drainage: 'Ijei River High Velocity Tributary',
      faultDistanceKm: 0.9
    },
    rainfall: {
      today: 108.0,
      last3Days: 235.0,
      last7Days: 440.0,
      last15Days: 780.0,
      last30Days: 1210.0,
      max1Day: 120.0,
      max3Day: 260.0,
      rainyDays: 24,
      antecedentRainfallIndex: 93.5,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.95,
      rainfallTriggerScore: 0.93,
      riskScore: 94,
      riskLevel: 'WARNING',
      confidence: 0.97,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Weak Disang Shale Degradation', value: 'High Shear Failure', contribution: 0.36, percentage: 38 },
        { feature: 'Continuous Heavy Rainfall (440 mm 7D)', value: 'High Antecedent Index', contribution: 0.32, percentage: 34 },
        { feature: 'Steep Artificial Construction Slope Cuts', value: '>40° Cuts', contribution: 0.22, percentage: 23 },
        { feature: 'Active Tectonic Splay Fault', value: '0.9 km', contribution: 0.05, percentage: 5 }
      ],
      explanationPoints: [
        'Site of catastrophic 2022 Tupul landslide remains hyper-susceptible under monsoon saturation.',
        'High pore-water pressures along Disang shale bedding planes create rapid debris flow risks.',
        'Immediate warning for Jiribam-Imphal railway workers and valley dwellers along Ijei river basin.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-37 (Imphal - Jiribam Lifeline Highway)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' },
        { name: 'Jiribam-Imphal Railway Tunnel Portal Access', type: 'District Road', distanceMeters: 50, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tupul Station Colony', population: 1650, distanceMeters: 200 },
        { name: 'Makhuam Village Sector', population: 980, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2630
    },
    lastUpdated: '2026-09-01T20:46:00+05:30',
    historicalEventsCount: 21
  },
  {
    id: 'MAN_002',
    name: 'Tamenglong Hill Ridge & Khongsang Axis',
    state: 'Manipur',
    district: 'Tamenglong',
    latitude: 24.9850,
    longitude: 93.4980,
    environmental: {
      elevation: 1260,
      slope: 36.8,
      aspect: 'South-West',
      geology: 'Barail Sandstone over Disang Shale Contact',
      soil: 'Sandy Clay Loam with Talus',
      landCover: 'Subtropical Wet Hill Forest & Jhum',
      drainage: 'Irang River Gorge',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 82.0,
      last3Days: 170.0,
      last7Days: 320.0,
      last15Days: 560.0,
      last30Days: 910.0,
      max1Day: 90.0,
      max3Day: 185.0,
      rainyDays: 21,
      antecedentRainfallIndex: 79.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.82,
      rainfallTriggerScore: 0.79,
      riskScore: 81,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Lithological Contact Boundary Slip', value: 'Sandstone/Shale Interface', contribution: 0.33, percentage: 36 },
        { feature: '3-Day Rainfall Influx (170 mm)', value: 'High Infiltration', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Steepness (36.8°)', value: 'High Gravity Stress', contribution: 0.24, percentage: 26 },
        { feature: 'Road Cutting Toe Erosion', value: 'NH-37 Bypass', contribution: 0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Water perching along the permeable Barail sandstone and impermeable Disang shale boundary triggers translational slides.',
        'Khongsang highway sector blocked repeatedly during past 48 hours.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Khongsang - Tamenglong Road', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Khongsang Settlement', population: 2100, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-01T20:39:00+05:30',
    historicalEventsCount: 11
  },
  {
    id: 'MAN_003',
    name: 'Churachandpur - Singngat Hill Road',
    state: 'Manipur',
    district: 'Churachandpur',
    latitude: 24.3320,
    longitude: 93.6740,
    environmental: {
      elevation: 910,
      slope: 28.0,
      aspect: 'South',
      geology: 'Ophiolitic Mélange & Siltstone',
      soil: 'Reddish Brown Clay',
      landCover: 'Mixed Pine Forest & Agro-forestry',
      drainage: 'Khuga River Drainage Basin',
      faultDistanceKm: 3.9
    },
    rainfall: {
      today: 48.0,
      last3Days: 104.0,
      last7Days: 195.0,
      last15Days: 370.0,
      last30Days: 620.0,
      max1Day: 54.0,
      max3Day: 112.0,
      rainyDays: 16,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.58,
      rainfallTriggerScore: 0.56,
      riskScore: 57,
      riskLevel: 'WATCH',
      confidence: 0.87,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Ophiolite Weathering Layer', value: 'Serpentinite Shearing', contribution: 0.31, percentage: 36 },
        { feature: '7-Day Accumulated Rain (195 mm)', value: 'Moderate Infiltration', contribution: 0.27, percentage: 31 },
        { feature: 'Road Shoulder Cut Slope', value: 'NH-102B Axis', contribution: 0.22, percentage: 25 },
        { feature: 'Vegetation Cover', value: 'Partial Tree Canopy', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory for NH-102B Singngat border route due to tension cracks on outer berms.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-102B (Churachandpur - Singngat - Behiang)', type: 'National Highway', distanceMeters: 55, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tuibong Sector', population: 3900, distanceMeters: 700 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3900
    },
    lastUpdated: '2026-09-01T20:25:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MAN_004',
    name: 'Imphal Valley Central Plains',
    state: 'Manipur',
    district: 'Imphal West',
    latitude: 24.8170,
    longitude: 93.9368,
    environmental: {
      elevation: 785,
      slope: 4.5,
      aspect: 'Flat',
      geology: 'Quaternary Fluvio-Lacustrine Alluvium',
      soil: 'Deep Sticky Alluvial Clay',
      landCover: 'Dense Urban & Paddy Fields',
      drainage: 'Imphal River System',
      faultDistanceKm: 14.0
    },
    rainfall: {
      today: 22.0,
      last3Days: 48.0,
      last7Days: 95.0,
      last15Days: 190.0,
      last30Days: 320.0,
      max1Day: 26.0,
      max3Day: 54.0,
      rainyDays: 11,
      antecedentRainfallIndex: 21.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.12,
      rainfallTriggerScore: 0.15,
      riskScore: 14,
      riskLevel: 'NORMAL',
      confidence: 0.98,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Flat Valley Topography', value: '4.5°', contribution: -0.45, percentage: 65 },
        { feature: 'No Slope Cut Surcharges', value: 'Plains Infrastructure', contribution: -0.15, percentage: 22 },
        { feature: 'Low Dynamic Rainfall Index', value: '22.0 mm', contribution: -0.09, percentage: 13 }
      ],
      explanationPoints: [
        'Central valley floor free from landslide hazards; urban waterlogging monitored separately.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Imphal Airport Ring Road', type: 'District Road', distanceMeters: 400, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Imphal City Center', population: 26000, distanceMeters: 1000 }
      ],
      hospitals: 4,
      schools: 8,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 26000
    },
    lastUpdated: '2026-09-01T20:00:00+05:30',
    historicalEventsCount: 0
  },

  // MIZORAM
  {
    id: 'MIZ_001',
    name: 'Aizawl - Bawngkawn Sinking Zone & Ramhlun Slopes',
    state: 'Mizoram',
    district: 'Aizawl',
    latitude: 23.7540,
    longitude: 92.7310,
    environmental: {
      elevation: 1140,
      slope: 38.0,
      aspect: 'West',
      geology: 'Surma Group Alternating Siltstone and Friable Shale',
      soil: 'Clayey Residual Silt with high void ratio',
      landCover: 'Multi-story Hillside Concrete Buildings',
      drainage: 'Tlawng River Deep Ravines',
      faultDistanceKm: 1.5
    },
    rainfall: {
      today: 95.0,
      last3Days: 205.0,
      last7Days: 385.0,
      last15Days: 670.0,
      last30Days: 1080.0,
      max1Day: 102.0,
      max3Day: 220.0,
      rainyDays: 23,
      antecedentRainfallIndex: 87.0,
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
        { feature: 'Structural Overloading of Hill Slopes', value: 'High Building Density', contribution: 0.35, percentage: 37 },
        { feature: 'Surma Shale Weathering & Water Ingress', value: 'Loss of Cohesion', contribution: 0.29, percentage: 31 },
        { feature: 'Continuous Monsoon Influx (385 mm 7D)', value: 'High Pore Pressure', contribution: 0.24, percentage: 25 },
        { feature: 'West-Dipping Bedding Plane', value: 'Daylighting in Slope Face', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'Bawngkawn and Ramhlun sectors are known chronic active sinking zones with ongoing creep.',
        'High-density 5 to 7 story RC buildings surcharge slope beyond factor of safety (FS < 1.0).',
        'State Disaster Management Authority (SDMA) evacuation alert for 12 buildings in red zone.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-54 / NH-2 (Aizawl - Silchar Arterial Route)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Bawngkawn Ward 3', population: 6400, distanceMeters: 120 },
        { name: 'Ramhlun North Slopes', population: 4900, distanceMeters: 250 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 11300
    },
    lastUpdated: '2026-09-01T20:45:00+05:30',
    historicalEventsCount: 23
  },
  {
    id: 'MIZ_002',
    name: 'Lunglei - Venglai Hill Slopes',
    state: 'Mizoram',
    district: 'Lunglei',
    latitude: 22.8880,
    longitude: 92.7380,
    environmental: {
      elevation: 1220,
      slope: 33.5,
      aspect: 'South-East',
      geology: 'Bhuban Formation Sandstone & Claystone',
      soil: 'Sandy Silt Clay Horizon',
      landCover: 'Urban Hill Town & Mixed Scrub',
      drainage: 'Mat River Catchment',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 65.0,
      last3Days: 140.0,
      last7Days: 260.0,
      last15Days: 480.0,
      last30Days: 790.0,
      max1Day: 75.0,
      max3Day: 158.0,
      rainyDays: 19,
      antecedentRainfallIndex: 71.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.71,
      rainfallTriggerScore: 0.69,
      riskScore: 70,
      riskLevel: 'WARNING',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Claystone Slaking in Water', value: 'High Swelling/Shrinkage', contribution: 0.32, percentage: 36 },
        { feature: '7-Day Accumulated Rain (260 mm)', value: 'High Infiltration', contribution: 0.28, percentage: 31 },
        { feature: 'Steep Urban Terraces', value: '33.5°', contribution: 0.22, percentage: 25 },
        { feature: 'Lack of Coordinated Hill Drains', value: 'Surface Wash', contribution: 0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Venglai and Rahsi Veng show active retaining wall cracks following continuous downpours.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Lunglei - Tlabung Road (NH-502A)', type: 'National Highway', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Venglai Ward', population: 3800, distanceMeters: 220 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 3800
    },
    lastUpdated: '2026-09-01T20:34:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'MIZ_003',
    name: 'Champhai - Zokhawthar Border Hills',
    state: 'Mizoram',
    district: 'Champhai',
    latitude: 23.4720,
    longitude: 93.3280,
    environmental: {
      elevation: 1390,
      slope: 29.0,
      aspect: 'East',
      geology: 'Bokabil Formation Sandstone and Mudstone',
      soil: 'Sandy Loam',
      landCover: 'Vineyards & Terraced Hills',
      drainage: 'Tiau River International Border Valley',
      faultDistanceKm: 3.6
    },
    rainfall: {
      today: 44.0,
      last3Days: 92.0,
      last7Days: 175.0,
      last15Days: 330.0,
      last30Days: 560.0,
      max1Day: 50.0,
      max3Day: 104.0,
      rainyDays: 16,
      antecedentRainfallIndex: 51.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.55,
      rainfallTriggerScore: 0.50,
      riskScore: 52,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Border Trade Road Surcharge', value: 'Heavy Truck Vibrations', contribution: 0.29, percentage: 34 },
        { feature: 'Accumulated Rainfall', value: '175 mm 7D', contribution: 0.27, percentage: 32 },
        { feature: 'Slope Gradient (29.0°)', value: 'Moderate Slope', contribution: 0.23, percentage: 27 },
        { feature: 'Agricultural Terracing', value: 'Good Surface Runoff', contribution: -0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Watch status active on Zokhawthar Myanmar trade corridor; localized mud slips.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Champhai - Zokhawthar Border Trade Road', type: 'State Highway', distanceMeters: 50, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Champhai East Sector', population: 2800, distanceMeters: 600 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-01T20:20:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'MIZ_004',
    name: 'Kolasib - Bairabi Link Corridor',
    state: 'Mizoram',
    district: 'Kolasib',
    latitude: 24.2250,
    longitude: 92.6810,
    environmental: {
      elevation: 640,
      slope: 24.5,
      aspect: 'North',
      geology: 'Surma Siltstone & Dense Clay',
      soil: 'Clayey Loam',
      landCover: 'Betelnut & Rubber Agro-forests',
      drainage: 'Serlui River Sub-basin',
      faultDistanceKm: 6.2
    },
    rainfall: {
      today: 30.0,
      last3Days: 65.0,
      last7Days: 125.0,
      last15Days: 250.0,
      last30Days: 440.0,
      max1Day: 35.0,
      max3Day: 72.0,
      rainyDays: 13,
      antecedentRainfallIndex: 32.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.36,
      rainfallTriggerScore: 0.33,
      riskScore: 34,
      riskLevel: 'NORMAL',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Rubber Plantations Root Cohesion', value: 'Dense Root Mat', contribution: -0.26, percentage: 42 },
        { feature: 'Moderate Slope Angle (24.5°)', value: 'Within Safe Friction Limit', contribution: -0.18, percentage: 29 },
        { feature: 'Sub-threshold 24h Rain', value: '30.0 mm', contribution: 0.12, percentage: 19 },
        { feature: 'Tectonic Distance', value: '6.2 km', contribution: -0.06, percentage: 10 }
      ],
      explanationPoints: [
        'Normal stability profile with functioning agro-forestry root matrix.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-306 (Kolasib Transit Section)', type: 'National Highway', distanceMeters: 110, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Kolasib Sub-division', population: 3100, distanceMeters: 750 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-01T20:12:00+05:30',
    historicalEventsCount: 2
  },

  // NAGALAND
  {
    id: 'NAG_001',
    name: 'Kohima - Dzükou Valley & NH-29 Bypass Sinking Zone',
    state: 'Nagaland',
    district: 'Kohima',
    latitude: 25.6740,
    longitude: 94.1080,
    environmental: {
      elevation: 1540,
      slope: 41.0,
      aspect: 'South-East',
      geology: 'Disang Group Crushed Carbonaceous Shale & Mudstone',
      soil: 'Expansive Silty Clay Regolith (High Moisture Sensitivity)',
      landCover: 'Terraced Settlements & Road Sinking Zone',
      drainage: 'Doyang River Headwaters',
      faultDistanceKm: 1.0
    },
    rainfall: {
      today: 104.0,
      last3Days: 228.0,
      last7Days: 425.0,
      last15Days: 740.0,
      last30Days: 1190.0,
      max1Day: 118.0,
      max3Day: 250.0,
      rainyDays: 23,
      antecedentRainfallIndex: 91.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.93,
      rainfallTriggerScore: 0.92,
      riskScore: 93,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Highly Sheared Disang Black Shale', value: 'Zero Cohesion when wet', contribution: 0.37, percentage: 39 },
        { feature: 'Persistent Heavy Rainfall (425 mm 7D)', value: 'Antecedent Overload', contribution: 0.31, percentage: 33 },
        { feature: 'NH-29 National Lifeline Highway Surcharge', value: 'Heavy Goods Traffic', contribution: 0.21, percentage: 22 },
        { feature: 'Schuppen Thrust Belt Proximity', value: '1.0 km Active Splay', contribution: 0.06, percentage: 6 }
      ],
      explanationPoints: [
        'Kohima-Dimapur NH-29 lifeline highway at Dzüdza/Phesama experiencing catastrophic active subsidence.',
        'Black shale liquefies under high pore pressure causing recurring blockades.',
        'Immediate warning for inter-state freight transport and Kohima municipal disaster teams.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-29 (Dimapur - Kohima - Manipur Lifeline Highway)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Phesama Village Sector', population: 3400, distanceMeters: 250 },
        { name: 'Kohima South Outskirts', population: 6800, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 10200
    },
    lastUpdated: '2026-09-01T20:45:00+05:30',
    historicalEventsCount: 25
  },
  {
    id: 'NAG_002',
    name: 'Phek - Meluri Ridge Road',
    state: 'Nagaland',
    district: 'Phek',
    latitude: 25.6850,
    longitude: 94.4980,
    environmental: {
      elevation: 1680,
      slope: 35.5,
      aspect: 'East',
      geology: 'Ophiolite Belt Serpentinite & Pelagic Sediments',
      soil: 'Shallow Gravelly Clay',
      landCover: 'Terraced Paddy & Secondary Jungle',
      drainage: 'Tizu River Canyon System',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 78.0,
      last3Days: 165.0,
      last7Days: 310.0,
      last15Days: 550.0,
      last30Days: 890.0,
      max1Day: 88.0,
      max3Day: 180.0,
      rainyDays: 20,
      antecedentRainfallIndex: 78.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.79,
      rainfallTriggerScore: 0.76,
      riskScore: 78,
      riskLevel: 'WARNING',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Serpentinized Ophiolite Shear Zones', value: 'Slickensided Fault Plane', contribution: 0.34, percentage: 37 },
        { feature: '7-Day Rainfall Index (310 mm)', value: 'Trigger Level Breach', contribution: 0.28, percentage: 31 },
        { feature: 'Steep Escarpment Angle (35.5°)', value: 'High Gravitational Stress', contribution: 0.23, percentage: 25 },
        { feature: 'Border Highway Excavation', value: 'Toe Destabilization', contribution: 0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Meluri-Avakhung Indo-Myanmar border road at risk of rotational debris slumps.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-202 (Mokokchung - Tuensang - Phek - Jessami)', type: 'National Highway', distanceMeters: 35, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Meluri Town Center', population: 2900, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-01T20:38:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'NAG_003',
    name: 'Mokokchung - Ungma Hill Escarpment',
    state: 'Nagaland',
    district: 'Mokokchung',
    latitude: 26.3240,
    longitude: 94.5210,
    environmental: {
      elevation: 1320,
      slope: 28.5,
      aspect: 'South',
      geology: 'Barail Group Sandstone with Coal Seams',
      soil: 'Clayey Residual Sand',
      landCover: 'Town Margin & Oak Forest',
      drainage: 'Milak River Sub-basin',
      faultDistanceKm: 3.5
    },
    rainfall: {
      today: 46.0,
      last3Days: 98.0,
      last7Days: 185.0,
      last15Days: 340.0,
      last30Days: 580.0,
      max1Day: 52.0,
      max3Day: 110.0,
      rainyDays: 16,
      antecedentRainfallIndex: 53.0,
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
        { feature: 'Coal Interbed Weakness', value: 'Low Friction Boundary', contribution: 0.30, percentage: 35 },
        { feature: 'Antecedent Rain Index', value: '53.0 / 100', contribution: 0.27, percentage: 32 },
        { feature: 'Moderate Slope Angle (28.5°)', value: 'Stable under dry state', contribution: 0.21, percentage: 25 },
        { feature: 'Urban Storm Drain Flow', value: 'Unlined gullies', contribution: 0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch level maintained; minor localized debris slides observed near Ungma village perimeter.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mokokchung - Mariani Road (NH-702D)', type: 'National Highway', distanceMeters: 60, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Ungma Village', population: 4100, distanceMeters: 500 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 4100
    },
    lastUpdated: '2026-09-01T20:24:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'NAG_004',
    name: 'Dimapur Foothill Plains & Chumukedima Gate',
    state: 'Nagaland',
    district: 'Chümoukedima',
    latitude: 25.7980,
    longitude: 93.7740,
    environmental: {
      elevation: 210,
      slope: 14.0,
      aspect: 'North-West',
      geology: 'Siwalik Foothill Sandstone & Alluvium',
      soil: 'Sandy Silt Alluvial Fan',
      landCover: 'Urban Commercial & River Bank',
      drainage: 'Chathe River Valley',
      faultDistanceKm: 5.4
    },
    rainfall: {
      today: 25.0,
      last3Days: 55.0,
      last7Days: 105.0,
      last15Days: 210.0,
      last30Days: 360.0,
      max1Day: 30.0,
      max3Day: 62.0,
      rainyDays: 11,
      antecedentRainfallIndex: 25.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.24,
      rainfallTriggerScore: 0.26,
      riskScore: 25,
      riskLevel: 'NORMAL',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Foothill Gradient (14.0°)', value: 'Low Slopes', contribution: -0.38, percentage: 55 },
        { feature: 'Low Dynamic Rainfall Index', value: '25.0 mm 24h', contribution: -0.18, percentage: 26 },
        { feature: 'Competent Bedrock Outcrops', value: 'Dense Aggregate', contribution: -0.13, percentage: 19 }
      ],
      explanationPoints: [
        'Foothill gateway zone safe; normal traffic transit operating smoothly on NH-29.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-29 Chumukedima 4-lane Highway', type: 'National Highway', distanceMeters: 80, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Chumukedima Town', population: 9200, distanceMeters: 600 }
      ],
      hospitals: 2,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 9200
    },
    lastUpdated: '2026-09-01T20:10:00+05:30',
    historicalEventsCount: 2
  },

  // TRIPURA
  {
    id: 'TRI_001',
    name: 'Jampui Hills - Vanghmun Ridge',
    state: 'Tripura',
    district: 'North Tripura',
    latitude: 23.9850,
    longitude: 92.2780,
    environmental: {
      elevation: 930,
      slope: 26.0,
      aspect: 'West',
      geology: 'Surma Siltstone & Clay Bands',
      soil: 'Reddish Sandy Loam',
      landCover: 'Orange Orchards & Betelnut Terraces',
      drainage: 'Manu River Sub-basin',
      faultDistanceKm: 4.8
    },
    rainfall: {
      today: 38.0,
      last3Days: 82.0,
      last7Days: 155.0,
      last15Days: 290.0,
      last30Days: 490.0,
      max1Day: 44.0,
      max3Day: 92.0,
      rainyDays: 14,
      antecedentRainfallIndex: 44.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.49,
      rainfallTriggerScore: 0.46,
      riskScore: 48,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Clay Bedding Weathering', value: 'High Moisture Plasticity', contribution: 0.32, percentage: 37 },
        { feature: 'Rainfall Accumulation (155 mm 7D)', value: 'Moderate Influx', contribution: 0.26, percentage: 30 },
        { feature: 'Ridge Escarpment Angle (26.0°)', value: 'Moderate Gradient', contribution: 0.22, percentage: 25 },
        { feature: 'Orchard Tree Root Stabilization', value: 'Dense Root Mesh', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Highest hill range in Tripura; isolated shallow soil slips along Jampui ridge connecting road.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kanchanpur - Vanghmun Hill Road', type: 'State Highway', distanceMeters: 65, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Vanghmun Village', population: 2100, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-01T20:25:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'TRI_002',
    name: 'Atharamura Hill Range & NH-8 Pass',
    state: 'Tripura',
    district: 'Dhalai',
    latitude: 23.8650,
    longitude: 91.6850,
    environmental: {
      elevation: 430,
      slope: 21.0,
      aspect: 'South',
      geology: 'Tipam Sandstone & Sandy Shale',
      soil: 'Sandy Clay Silt',
      landCover: 'Bamboo & Secondary Deciduous Jungle',
      drainage: 'Khowai River Catchment',
      faultDistanceKm: 6.5
    },
    rainfall: {
      today: 28.0,
      last3Days: 60.0,
      last7Days: 115.0,
      last15Days: 230.0,
      last30Days: 410.0,
      max1Day: 34.0,
      max3Day: 68.0,
      rainyDays: 12,
      antecedentRainfallIndex: 30.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.34,
      rainfallTriggerScore: 0.32,
      riskScore: 33,
      riskLevel: 'NORMAL',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Moderate Hill Gradient (21.0°)', value: 'Low Friction Risk', contribution: -0.28, percentage: 40 },
        { feature: 'Bamboo Root Cohesion Matrix', value: 'High Soil Binding', contribution: -0.22, percentage: 31 },
        { feature: 'Current 24h Rain (28.0 mm)', value: 'Below Threshold', contribution: 0.12, percentage: 17 },
        { feature: 'Fault Line Distance (6.5 km)', value: 'Low Seismicity', contribution: -0.08, percentage: 12 }
      ],
      explanationPoints: [
        'Normal stability profile along NH-8 arterial link connecting Agartala to Assam.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-8 (Tripura National Highway Lifeline)', type: 'National Highway', distanceMeters: 50, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Teliamura Outskirts', population: 3400, distanceMeters: 800 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3400
    },
    lastUpdated: '2026-09-01T20:15:00+05:30',
    historicalEventsCount: 2
  },
  {
    id: 'TRI_003',
    name: 'Unakoti Archaeological Hill Slopes',
    state: 'Tripura',
    district: 'Unakoti',
    latitude: 24.3180,
    longitude: 92.0520,
    environmental: {
      elevation: 280,
      slope: 23.5,
      aspect: 'East',
      geology: 'Tertiary Sandstone Bas-Relief Bedrock',
      soil: 'Sandy Loam with Humus',
      landCover: 'Heritage Forest & Rock Cut Sculptures',
      drainage: 'Natural Spring Cascade',
      faultDistanceKm: 7.2
    },
    rainfall: {
      today: 24.0,
      last3Days: 52.0,
      last7Days: 98.0,
      last15Days: 205.0,
      last30Days: 370.0,
      max1Day: 28.0,
      max3Day: 58.0,
      rainyDays: 10,
      antecedentRainfallIndex: 24.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.28,
      rainfallTriggerScore: 0.27,
      riskScore: 28,
      riskLevel: 'NORMAL',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Bedrock Carving Cohesion', value: 'Competent Sandstone', contribution: -0.32, percentage: 48 },
        { feature: 'Spring Water Flow Channels', value: 'Controlled Runoff', contribution: -0.18, percentage: 27 },
        { feature: 'Low Precipitation Index', value: '24.0 mm', contribution: -0.17, percentage: 25 }
      ],
      explanationPoints: [
        'Stable archaeological site; protective retaining masonry installed by ASI.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kailashahar - Unakoti Heritage Road', type: 'State Highway', distanceMeters: 120, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Kailashahar Sub-town', population: 2600, distanceMeters: 900 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-01T20:08:00+05:30',
    historicalEventsCount: 1
  },
  {
    id: 'TRI_004',
    name: 'Agartala Urban Floodplain Slopes',
    state: 'Tripura',
    district: 'West Tripura',
    latitude: 23.8315,
    longitude: 91.2868,
    environmental: {
      elevation: 22,
      slope: 3.0,
      aspect: 'Flat',
      geology: 'Quaternary Fluvial Alluvium',
      soil: 'Deep Silt Loam',
      landCover: 'Capital City Urban Fabric',
      drainage: 'Howrah River Basin',
      faultDistanceKm: 16.0
    },
    rainfall: {
      today: 15.0,
      last3Days: 34.0,
      last7Days: 70.0,
      last15Days: 150.0,
      last30Days: 270.0,
      max1Day: 18.0,
      max3Day: 39.0,
      rainyDays: 8,
      antecedentRainfallIndex: 14.0,
      triggerLevel: 'LOW'
    },
    prediction: {
      susceptibilityScore: 0.08,
      rainfallTriggerScore: 0.12,
      riskScore: 10,
      riskLevel: 'NORMAL',
      confidence: 0.99,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Completely Flat Plains', value: '3.0°', contribution: -0.55, percentage: 75 },
        { feature: 'Far from Fault Lines', value: '16.0 km', contribution: -0.12, percentage: 16 },
        { feature: 'Low Rainfall Volume', value: '15.0 mm', contribution: -0.06, percentage: 9 }
      ],
      explanationPoints: [
        'Zero landslide susceptibility on Agartala urban alluvium.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Agartala Airport VIP Boulevard', type: 'District Road', distanceMeters: 600, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Agartala Municipal Core', population: 42000, distanceMeters: 1500 }
      ],
      hospitals: 5,
      schools: 12,
      criticalBridges: 3,
      estimatedVulnerablePopulation: 42000
    },
    lastUpdated: '2026-09-01T20:00:00+05:30',
    historicalEventsCount: 0
  }
];
