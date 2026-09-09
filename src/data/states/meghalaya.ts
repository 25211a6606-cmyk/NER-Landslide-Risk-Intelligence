import { MonitoredLocation } from '../../types/location';

export const MEGHALAYA_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'MEG_001',
    name: 'Cherrapunji (Sohra) - Mawkdok-Nongrim Escarpment',
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
    lastUpdated: '2026-09-08T10:15:00+05:30',
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
    lastUpdated: '2026-09-08T10:15:00+05:30',
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
      geology: 'Archaean Granite-Gneiss with Deep Saprolite',
      soil: 'Red Lateritic Clayey Loam',
      landCover: 'Mixed Secondary Forest / Highway Settlements',
      drainage: 'Umiam River Sub-basin',
      faultDistanceKm: 4.8
    },
    rainfall: {
      today: 54.0,
      last3Days: 118.0,
      last7Days: 215.0,
      last15Days: 410.0,
      last30Days: 690.0,
      max1Day: 62.0,
      max3Day: 130.0,
      rainyDays: 17,
      antecedentRainfallIndex: 58.4,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.62,
      rainfallTriggerScore: 0.58,
      riskScore: 60,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Deep Saprolite Horizon', value: '4-6m Weathered Crust', contribution: 0.28, percentage: 32 },
        { feature: 'Highway Road Cut Over-steepening', value: '60° Cut Angle', contribution: 0.25, percentage: 29 },
        { feature: 'Weekly Rain Volume', value: '215.0 mm', contribution: 0.21, percentage: 24 },
        { feature: 'Slope Angle', value: '28.5°', contribution: 0.13, percentage: 15 }
      ],
      explanationPoints: [
        'Arterial Guwahati-Shillong corridor (NH-6) has high volume heavy vehicle vibrations.',
        'Cut slopes in saprolite exhibit minor slumping after 50mm rainfall thresholds.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-6 (Guwahati - Shillong Expressway)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Nongpoh Commercial Sub-division', population: 6500, distanceMeters: 550 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 6500
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MEG_004',
    name: 'Shillong Peak & Upper Shillong',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.5342,
    longitude: 91.8540,
    environmental: {
      elevation: 1960,
      slope: 32.0,
      aspect: 'South',
      geology: 'Shillong Group Quartzite & Schist',
      soil: 'Humus Rich Sandy Loam',
      landCover: 'Pine Forest & Army Cantonment',
      drainage: 'Wah Umkhrah Headwaters',
      faultDistanceKm: 3.2
    },
    rainfall: {
      today: 62.0,
      last3Days: 135.0,
      last7Days: 245.0,
      last15Days: 460.0,
      last30Days: 780.0,
      max1Day: 70.0,
      max3Day: 148.0,
      rainyDays: 19,
      antecedentRainfallIndex: 66.0,
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
        { feature: 'High Elevation Rainfall Interception', value: '1960m Elevation', contribution: 0.29, percentage: 33 },
        { feature: 'Pine Needle Litter Soil Slippage', value: 'Shallow Rooting Layer', contribution: 0.25, percentage: 28 },
        { feature: 'Slope Gradient (32.0°)', value: 'Critical Threshold', contribution: 0.21, percentage: 24 },
        { feature: 'Road Construction Drainage Surcharge', value: 'Unlined Side Drains', contribution: 0.13, percentage: 15 }
      ],
      explanationPoints: [
        'Watch level active for Upper Shillong tourist and military transit links.',
        'Saturated topsoil above quartzite bedrock shows signs of minor rotational slips.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Shillong Peak Access Road', type: 'District Road', distanceMeters: 15, trafficVulnerability: 'MEDIUM' },
        { name: 'NH-106 Upper Shillong Bypass', type: 'National Highway', distanceMeters: 90, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Upper Shillong Village', population: 3100, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'MEG_005',
    name: 'Mawsynram Hills',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    latitude: 25.2974,
    longitude: 91.5828,
    environmental: {
      elevation: 1400,
      slope: 39.5,
      aspect: 'South-South-West',
      geology: 'Sylhet Trap Basalt & Cretaceous Sandstone',
      soil: 'Shallow Leached Skeletal Soil',
      landCover: 'Open Ridge & Cloud Forest Remnants',
      drainage: 'Perennial Flash Torrent Channels',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 128.0,
      last3Days: 275.0,
      last7Days: 520.0,
      last15Days: 980.0,
      last30Days: 1560.0,
      max1Day: 145.0,
      max3Day: 310.0,
      rainyDays: 26,
      antecedentRainfallIndex: 95.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.91,
      rainfallTriggerScore: 0.94,
      riskScore: 92,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Extreme Monsoon Cloudburst Surge', value: '128.0 mm in 24h', contribution: 0.36, percentage: 38 },
        { feature: 'World Highest Precipitation Zone', value: '520 mm 7-Day', contribution: 0.30, percentage: 32 },
        { feature: 'Steep Escarpment Angle (39.5°)', value: 'Gravity Shearing', contribution: 0.20, percentage: 21 },
        { feature: 'Dauki Fault Splay Lineament', value: '1.8 km Distance', contribution: 0.08, percentage: 9 }
      ],
      explanationPoints: [
        'World rain capital currently under severe hydraulic surcharge.',
        'High risk of rapid debris flows down towards Bangladesh border plain entries.',
        'Immediate warning for road traffic along Mawsynram-Balat link.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mawsynram - Balat Road', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mawsynram Town Center', population: 2800, distanceMeters: 300 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 18
  },
  {
    id: 'MEG_006',
    name: 'Jowai Pass & Myntdu Valley',
    state: 'Meghalaya',
    district: 'West Jaintia Hills',
    latitude: 25.4480,
    longitude: 92.2040,
    environmental: {
      elevation: 1380,
      slope: 31.0,
      aspect: 'West',
      geology: 'Tertiary Jaintia Group Sandstone & Coal Shales',
      soil: 'Clayey Loam with Coal Weathering Dust',
      landCover: 'Open Cast Mining Scars & Terraces',
      drainage: 'Myntdu River Ravine',
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
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'MEG_007',
    name: 'Tura Peak & Rongram Valley',
    state: 'Meghalaya',
    district: 'West Garo Hills',
    latitude: 25.5140,
    longitude: 90.2210,
    environmental: {
      elevation: 870,
      slope: 34.0,
      aspect: 'West',
      geology: 'Archaean Granite-Gneiss Complex with Pegmatite Intrusions',
      soil: 'Deep Red Laterite and Colluvium',
      landCover: 'Dense Evergreen Canopy & Agro-forestry',
      drainage: 'Rongram River Headwaters',
      faultDistanceKm: 4.1
    },
    rainfall: {
      today: 64.0,
      last3Days: 142.0,
      last7Days: 260.0,
      last15Days: 480.0,
      last30Days: 810.0,
      max1Day: 75.0,
      max3Day: 155.0,
      rainyDays: 18,
      antecedentRainfallIndex: 68.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.69,
      rainfallTriggerScore: 0.67,
      riskScore: 68,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Lateritic Soil Horizon Moisture Saturation', value: 'High Plasticity', contribution: 0.31, percentage: 35 },
        { feature: 'Rainfall Infiltration (142 mm 3D)', value: 'High Pore Pressure', contribution: 0.27, percentage: 31 },
        { feature: 'Escarpment Slope (34.0°)', value: 'High Gravitational Stress', contribution: 0.22, percentage: 25 },
        { feature: 'Dense Forest Root Network', value: 'Stabilizing Canopy', contribution: -0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Tura town perimeter slopes vulnerable to road-cut debris flows along NH-217.',
        'Watch advisory issued for Ringrey and Danakgre hillside sectors.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-217 (Tura - Rongram - Dalu Highway)', type: 'National Highway', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Tura Municipal Ward 4', population: 5200, distanceMeters: 350 }
      ],
      hospitals: 2,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 5200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'MEG_008',
    name: 'Baghmara - Simsang River Gorge',
    state: 'Meghalaya',
    district: 'South Garo Hills',
    latitude: 25.1950,
    longitude: 90.6380,
    environmental: {
      elevation: 320,
      slope: 30.5,
      aspect: 'South',
      geology: 'Tertiary Limestone and Friable Sandstone',
      soil: 'Karstic Loam and Sandy Clay',
      landCover: 'Tropical Wet Evergreen & Karst Hills',
      drainage: 'Simsang River High Velocity Valley',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 51.0,
      last3Days: 110.0,
      last7Days: 205.0,
      last15Days: 390.0,
      last30Days: 680.0,
      max1Day: 60.0,
      max3Day: 125.0,
      rainyDays: 16,
      antecedentRainfallIndex: 56.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.58,
      rainfallTriggerScore: 0.54,
      riskScore: 56,
      riskLevel: 'WATCH',
      confidence: 0.87,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Karst Sinkhole Cavity Formation', value: 'Subsurface Dissolution', contribution: 0.32, percentage: 36 },
        { feature: 'Simsang Riverbank Toe Undercutting', value: 'Erosive Current', contribution: 0.28, percentage: 32 },
        { feature: 'Precipitation Trigger', value: '51.0 mm 24h', contribution: 0.22, percentage: 25 },
        { feature: 'Bedrock Quality', value: 'Massive Limestone Blocks', contribution: -0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Karst dissolution and intense riverbank scour trigger localized bank slumping.',
        'Watch advisory for Baghmara bridge approach road.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Baghmara - Karukol Border Highway', type: 'State Highway', distanceMeters: 55, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Baghmara Riverside Sector', population: 2900, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'MEG_009',
    name: 'Nongstoin - Kynshi River Escarpment',
    state: 'Meghalaya',
    district: 'West Khasi Hills',
    latitude: 25.5210,
    longitude: 91.2680,
    environmental: {
      elevation: 1410,
      slope: 33.2,
      aspect: 'North-West',
      geology: 'Precambrian Granite Gneiss with Quartzite Ridges',
      soil: 'Silty Loam over Weathered Bedrock',
      landCover: 'Open Pine Forests & Grassland',
      drainage: 'Kynshi River Canyon',
      faultDistanceKm: 3.5
    },
    rainfall: {
      today: 48.0,
      last3Days: 105.0,
      last7Days: 195.0,
      last15Days: 370.0,
      last30Days: 640.0,
      max1Day: 55.0,
      max3Day: 118.0,
      rainyDays: 15,
      antecedentRainfallIndex: 52.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.52,
      rainfallTriggerScore: 0.50,
      riskScore: 51,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Jointed Gneissic Foliation Planes', value: 'Moderate Weathering', contribution: 0.28, percentage: 33 },
        { feature: 'Rainfall Infiltration (105 mm 3D)', value: 'Moderate Influx', contribution: 0.26, percentage: 31 },
        { feature: 'Slope Gradient (33.2°)', value: 'Moderate Slope', contribution: 0.22, percentage: 26 },
        { feature: 'Low Housing Density', value: 'Minimal Surcharge', contribution: -0.08, percentage: 10 }
      ],
      explanationPoints: [
        'Watch advisory on Nongstoin-Shillong road section near Kynshi canyon crossings.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Nongstoin - Shillong Highway (NH-127B)', type: 'National Highway', distanceMeters: 50, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Nongstoin Outskirts', population: 2600, distanceMeters: 650 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 3
  },
  {
    id: 'MEG_010',
    name: 'Williamnagar - Simsang River Gorge',
    state: 'Meghalaya',
    district: 'East Garo Hills',
    latitude: 25.5970,
    longitude: 90.6210,
    environmental: {
      elevation: 420,
      slope: 36.4,
      aspect: 'South-West',
      geology: 'Archaean Gneiss Complex & Tertiary Sandstone Siltstone',
      soil: 'Red Lateritic Gravelly Loam',
      landCover: 'Secondary Bamboo Groves & Riverine Forest',
      drainage: 'Simsang River High Gradient Torrent',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 64.5,
      last3Days: 142.0,
      last7Days: 248.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 78.0,
      max3Day: 155.0,
      rainyDays: 18,
      antecedentRainfallIndex: 68.4,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-WMR-10',
      telemetrySource: 'IMD Automated Weather Station + MEMS Tiltmeter',
      soilMoisturePct: 76.2,
      poreWaterPressureKPa: 48.5
    },
    prediction: {
      susceptibilityScore: 0.74,
      rainfallTriggerScore: 0.76,
      riskScore: 75,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Simsang Riverbank Basal Scour', value: 'High Toe Erosion', contribution: 0.32, percentage: 34 },
        { feature: 'Rainfall Infiltration (142mm / 3D)', value: 'Heavy Monsoonal Influx', contribution: 0.28, percentage: 30 },
        { feature: 'Slope Gradient (36.4°)', value: 'Steep River Bluff', contribution: 0.22, percentage: 24 },
        { feature: 'Soil Surcharge from Cultivation', value: 'Moderate Disturbance', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Active slope destabilization along Simsang river bank with direct undercutting of SH-4 road corridor.',
        'High soil saturation (76.2%) combined with 64.5mm 24h precipitation initiates warning status.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'State Highway 4 (Williamnagar-Tura Corridor)', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Williamnagar Riverside Basti', population: 3100, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'MEG_011',
    name: 'Baghmara - Balpakram Canyon Rim',
    state: 'Meghalaya',
    district: 'South Garo Hills',
    latitude: 25.1950,
    longitude: 90.6380,
    environmental: {
      elevation: 620,
      slope: 42.1,
      aspect: 'South',
      geology: 'Garo Group Massive Sandstone & Sedimentary Shale Beds',
      soil: 'Porous Sandy Silt over Fractured Shale Bedrock',
      landCover: 'Dense Canopy Semi-Evergreen Forest',
      drainage: 'Mahadeo River Deep Ravine System',
      faultDistanceKm: 1.4
    },
    rainfall: {
      today: 88.0,
      last3Days: 198.0,
      last7Days: 340.0,
      last15Days: 580.0,
      last30Days: 910.0,
      max1Day: 104.0,
      max3Day: 215.0,
      rainyDays: 21,
      antecedentRainfallIndex: 82.5,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-BGM-11',
      telemetrySource: 'IMD Automated Weather Station + In-situ Piezometer',
      soilMoisturePct: 84.8,
      poreWaterPressureKPa: 61.2
    },
    prediction: {
      susceptibilityScore: 0.86,
      rainfallTriggerScore: 0.88,
      riskScore: 87,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Steep Escarpment Relief (42.1°)', value: 'Critical Plateau Scarp', contribution: 0.36, percentage: 38 },
        { feature: 'Sustained Heavy Infiltration (340mm 7D)', value: 'Extreme Soil Saturation', contribution: 0.31, percentage: 33 },
        { feature: 'Weak Sandstone-Shale Interbeds', value: 'High Slip Potential', contribution: 0.20, percentage: 21 },
        { feature: 'Forest Root Cohesion', value: 'Stabilizing Factor', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Critical debris slide hazard on canyon rim access road towards Balpakram National Park and coal transshipment route.',
        'High pore pressure (61.2 kPa) recorded at basal shale interface.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Baghmara - Ranikor Strategic Border Road', type: 'District Road', distanceMeters: 40, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Baghmara Bazaar Frontier Settlement', population: 2450, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2450
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'MEG_012',
    name: 'Khliehriat - Umlyngsha Escarpment',
    state: 'Meghalaya',
    district: 'East Jaintia Hills',
    latitude: 25.3520,
    longitude: 92.3680,
    environmental: {
      elevation: 1210,
      slope: 34.8,
      aspect: 'South-East',
      geology: 'Shella Formation Sandstone with Rat-hole Coal Seam Voids',
      soil: 'Acidic Friable Silt & Uncompacted Mine Overburden',
      landCover: 'Reclaimed Scrub & Mining Spoils',
      drainage: 'Myntdu - Lubha Catchment Tributary',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 52.0,
      last3Days: 118.0,
      last7Days: 210.0,
      last15Days: 390.0,
      last30Days: 680.0,
      max1Day: 68.0,
      max3Day: 135.0,
      rainyDays: 16,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-KLT-12',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 62.4,
      poreWaterPressureKPa: 34.0
    },
    prediction: {
      susceptibilityScore: 0.62,
      rainfallTriggerScore: 0.55,
      riskScore: 59,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Subsurface Mining Subsidence Voids', value: 'High Structural Instability', contribution: 0.30, percentage: 35 },
        { feature: 'Slope Gradient (34.8°)', value: 'Moderate-Steep Relief', contribution: 0.25, percentage: 29 },
        { feature: 'Cumulative Precipitation (118mm 3D)', value: 'Active Seepage', contribution: 0.24, percentage: 28 },
        { feature: 'Heavy Mineral Truck Vibration', value: 'Continuous Loading', contribution: 0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory for NH-06 freight corridor near Khliehriat toll barrier due to legacy mine subsidence risks.',
        'Rainfall trigger remains moderate with watch protocol active.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-06 (Shillong - Silchar Freight Lifeline)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Umlyngsha Village', population: 1850, distanceMeters: 320 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 1850
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 4
  },
  {
    id: 'MEG_013',
    name: 'Resubelpara - Damas Valley Pass',
    state: 'Meghalaya',
    district: 'North Garo Hills',
    latitude: 25.9080,
    longitude: 90.5890,
    environmental: {
      elevation: 340,
      slope: 28.5,
      aspect: 'North-East',
      geology: 'Weathered Gneissic Basement with Alluvial Terraces',
      soil: 'Sandy Clay Loam with High Infiltration Index',
      landCover: 'Arecanut Plantation & Mixed Deciduous Forest',
      drainage: 'Damring River Meander Cutoff',
      faultDistanceKm: 4.2
    },
    rainfall: {
      today: 34.0,
      last3Days: 78.0,
      last7Days: 145.0,
      last15Days: 280.0,
      last30Days: 520.0,
      max1Day: 42.0,
      max3Day: 90.0,
      rainyDays: 12,
      antecedentRainfallIndex: 38.0,
      triggerLevel: 'LOW',
      telemetryStationId: 'IMD-AWS-RSB-13',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 44.5,
      poreWaterPressureKPa: 18.2
    },
    prediction: {
      susceptibilityScore: 0.34,
      rainfallTriggerScore: 0.32,
      riskScore: 33,
      riskLevel: 'NORMAL',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Moderate Slopes (28.5°)', value: 'Stable Terraced Relief', contribution: 0.22, percentage: 38 },
        { feature: 'Low Antecedent Moisture (38/100)', value: 'Good Infiltration Drainage', contribution: -0.18, percentage: 32 },
        { feature: 'Vegetative Tree Canopy', value: 'Root Anchoring', contribution: -0.12, percentage: 20 },
        { feature: 'Local Road Drainage Channels', value: 'Well Maintained', contribution: -0.06, percentage: 10 }
      ],
      explanationPoints: [
        'Normal operating conditions across North Garo Hills transit spine with low rainfall trigger levels.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mendipathar - Resubelpara Highway', type: 'State Highway', distanceMeters: 80, trafficVulnerability: 'LOW' }
      ],
      settlements: [
        { name: 'Damas Central Village', population: 1400, distanceMeters: 700 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 1400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 2
  },
  {
    id: 'MEG_014',
    name: 'Mairang - Kyllang Rock Granitic Spur',
    state: 'Meghalaya',
    district: 'Eastern West Khasi Hills',
    latitude: 25.5680,
    longitude: 91.6420,
    environmental: {
      elevation: 1680,
      slope: 39.2,
      aspect: 'North-West',
      geology: 'South Khasi Batholith Coarse Biotite Granite Monolith',
      soil: 'Thin Lithic Leptosols & Granitic Grus',
      landCover: 'Exposed Granite Rock Faces & Sparse Pine',
      drainage: 'Kynshi Headwater Streamlets',
      faultDistanceKm: 3.1
    },
    rainfall: {
      today: 58.0,
      last3Days: 130.0,
      last7Days: 230.0,
      last15Days: 410.0,
      last30Days: 690.0,
      max1Day: 72.0,
      max3Day: 144.0,
      rainyDays: 17,
      antecedentRainfallIndex: 64.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-MRG-14',
      telemetrySource: 'IMD Automated Weather Station + Crackmeter',
      soilMoisturePct: 69.5,
      poreWaterPressureKPa: 38.6
    },
    prediction: {
      susceptibilityScore: 0.68,
      rainfallTriggerScore: 0.62,
      riskScore: 66,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Sheet Jointing & Exfoliation Slab Dislodgement', value: 'Joint Cleavage', contribution: 0.34, percentage: 37 },
        { feature: 'Slope Gradient (39.2°)', value: 'Steep Granitic Dome Spur', contribution: 0.29, percentage: 32 },
        { feature: 'Rainfall Infiltration in Joint Sets', value: 'Hydrostatic Pressure', contribution: 0.22, percentage: 24 },
        { feature: 'Sparse Vegetation Cover', value: 'High Runoff Velocity', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'Watch advisory for rockfall and exfoliation slab detachment onto Mairang-Ranigodown link road.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mairang - Nongkhlaw Scenic Road', type: 'District Road', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Kyllang Foothill Settlement', population: 1650, distanceMeters: 450 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 0,
      estimatedVulnerablePopulation: 1650
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 3
  }
];
