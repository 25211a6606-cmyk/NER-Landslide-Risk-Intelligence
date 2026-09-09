import { MonitoredLocation } from '../../types/location';

export const NAGALAND_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'NAG_001',
    name: 'Kohima - Dzükou Valley & NH-29 Bypass Sinking Zone',
    state: 'Nagaland',
    district: 'Kohima',
    latitude: 25.6740,
    longitude: 94.1080,
    environmental: {
      elevation: 1440,
      slope: 42.0,
      aspect: 'South-East',
      geology: 'Disang Group Splintery Marine Shales with High Crushed Fault Gouge',
      soil: 'High Plasticity Colluvium and Unconsolidated Slope Wash',
      landCover: 'Extreme Urban Slope Encroachment & National Lifeline Highway Cuts',
      drainage: 'Dzümha River Ravine (Deep Subsurface Piping)',
      faultDistanceKm: 0.8
    },
    rainfall: {
      today: 116.0,
      last3Days: 255.0,
      last7Days: 460.0,
      last15Days: 810.0,
      last30Days: 1310.0,
      max1Day: 130.0,
      max3Day: 285.0,
      rainyDays: 23,
      antecedentRainfallIndex: 93.5,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.95,
      rainfallTriggerScore: 0.93,
      riskScore: 94,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Disang Marine Shale Structural Liquefaction', value: 'Complete Loss of Cohesion Upon Wetting', contribution: 0.36, percentage: 38 },
        { feature: 'Critical National Highway Lifeline Axis (NH-29)', value: 'Heavy Inter-state Freight Corridors', contribution: 0.30, percentage: 32 },
        { feature: 'Severe Monsoon Saturation (116 mm 24h)', value: 'Extreme Surcharge Trigger', contribution: 0.23, percentage: 24 },
        { feature: 'Subsurface Hydro-Piping along Gouge Zones', value: 'Internal Erosion Cavities', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'National Highway NH-29 sinking zone (Phesama and Dzüdza bridge axis) under emergency warning.',
        'Deep-seated rotational slumping with multi-meter road drop-offs cutting off Nagaland and Manipur lifelines.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-29 (Dimapur - Kohima - Imphal Highway)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' },
        { name: 'Kohima Bypass Link Road', type: 'State Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Phesama Village Hillside', population: 4800, distanceMeters: 180 },
        { name: 'Kohima South Ward Sector', population: 11400, distanceMeters: 320 }
      ],
      hospitals: 2,
      schools: 4,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 16200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 39
  },
  {
    id: 'NAG_002',
    name: 'Phek - Meluri Ridge Road',
    state: 'Nagaland',
    district: 'Phek',
    latitude: 25.6840,
    longitude: 94.4980,
    environmental: {
      elevation: 1680,
      slope: 36.5,
      aspect: 'South',
      geology: 'Barail Hard Sandstone resting on Deformed Disang Shales',
      soil: 'Sandy Silt Loam over Slicken-sided Clay',
      landCover: 'Terraced Cultivation & Rural Mountain Ridge',
      drainage: 'Tizu River Basin Fluvial Gorge',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 64.0,
      last3Days: 142.0,
      last7Days: 260.0,
      last15Days: 480.0,
      last30Days: 790.0,
      max1Day: 72.0,
      max3Day: 158.0,
      rainyDays: 18,
      antecedentRainfallIndex: 69.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.72,
      rainfallTriggerScore: 0.68,
      riskScore: 71,
      riskLevel: 'WARNING',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Cap-Rock Squeeze-Out Failure', value: 'Weathered Disang Base', contribution: 0.33, percentage: 36 },
        { feature: 'Weekly Rain Volume (260 mm)', value: 'Pore Pressure Buildup', contribution: 0.28, percentage: 31 },
        { feature: 'Steep Escarpment Angle (36.5°)', value: 'High Gravity Shear Stress', contribution: 0.23, percentage: 25 },
        { feature: 'Terrace Wall Agricultural Stabilization', value: 'Stone Bunds', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'Warning active for Phek-Meluri arterial link towards Avakhung international border post.',
        'Frequent rockfalls and slips blocking rural school transport.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Phek - Meluri Road (NH-29 Extension)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Meluri Town Center', population: 3600, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 14
  },
  {
    id: 'NAG_003',
    name: 'Mokokchung - Ungma Hill Escarpment',
    state: 'Nagaland',
    district: 'Mokokchung',
    latitude: 26.3240,
    longitude: 94.5280,
    environmental: {
      elevation: 1320,
      slope: 35.0,
      aspect: 'West',
      geology: 'Surma & Barail Group Weathered Sandstone with Carbonaceous Shales',
      soil: 'Red Lateritic Silt Clay with High Compaction Resistance when Dry',
      landCover: 'Historic Village Hilltop Dwellings & Highway Cuts',
      drainage: 'Milak River Catchment',
      faultDistanceKm: 2.8
    },
    rainfall: {
      today: 58.0,
      last3Days: 128.0,
      last7Days: 240.0,
      last15Days: 440.0,
      last30Days: 730.0,
      max1Day: 68.0,
      max3Day: 140.0,
      rainyDays: 17,
      antecedentRainfallIndex: 64.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.68,
      rainfallTriggerScore: 0.64,
      riskScore: 67,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Urban Ridge Drainage Concentration', value: 'Uncontrolled Storm Outflows', contribution: 0.32, percentage: 35 },
        { feature: 'Weathered Sandstone-Shale Interface', value: 'Shear Cleavage', contribution: 0.28, percentage: 31 },
        { feature: 'Monsoon Rain Volume (128 mm 3D)', value: 'High Infiltration Pulse', contribution: 0.23, percentage: 25 },
        { feature: 'Vegetative Hillside Groves', value: 'Partial Root Cohesion', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch advisory for Mokokchung-Mariani interstate road cuts at Ungma village rim.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mokokchung - Mariani Road (NH-702D)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Ungma Historic Village', population: 6400, distanceMeters: 280 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 6400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 11
  },
  {
    id: 'NAG_004',
    name: 'Wokha - Doyang Hydro Reservoir Slopes',
    state: 'Nagaland',
    district: 'Wokha',
    latitude: 26.1150,
    longitude: 94.2680,
    environmental: {
      elevation: 780,
      slope: 38.8,
      aspect: 'North-West',
      geology: 'Barail Alternating Sandstone & Shales with Reservoir Surcharge',
      soil: 'Residual Silt with High Colluvial Fraction',
      landCover: 'Hydel Dam Catchment Forest & Road Approaches',
      drainage: 'Doyang Hydroelectric Reservoir Rim',
      faultDistanceKm: 1.9
    },
    rainfall: {
      today: 72.0,
      last3Days: 160.0,
      last7Days: 300.0,
      last15Days: 540.0,
      last30Days: 880.0,
      max1Day: 82.0,
      max3Day: 176.0,
      rainyDays: 19,
      antecedentRainfallIndex: 75.0,
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
        { feature: 'Reservoir Rim Slumping & Pore Pressure Transients', value: 'High Reservoir Water Fluctuations', contribution: 0.35, percentage: 37 },
        { feature: 'Steep Gorge Slopes (38.8°)', value: 'High Gravitational Stress', contribution: 0.28, percentage: 30 },
        { feature: 'Precipitation Inflow (72 mm 24h)', value: 'Pore Saturation Surge', contribution: 0.23, percentage: 24 },
        { feature: 'Dam Approach Engineering Walls', value: 'Partial Retaining Structures', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Warning issued for Doyang Hydroelectric reservoir perimeter roads.',
        'Rim sloughing and tension cracking recorded on plant access roads.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Wokha - Doyang HEP Access Road', type: 'State Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Doyang Hydel Colony', population: 2400, distanceMeters: 350 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2400
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 17
  },
  {
    id: 'NAG_005',
    name: 'Tuensang - Helipong Saddle',
    state: 'Nagaland',
    district: 'Tuensang',
    latitude: 26.2840,
    longitude: 94.8250,
    environmental: {
      elevation: 1890,
      slope: 34.0,
      aspect: 'North',
      geology: 'Disang Group Highly Cleaved Flysch Shales',
      soil: 'Shallow Skeletal Silty Clay',
      landCover: 'Eastern Mountain Forest & Hill Township Rim',
      drainage: 'Dikhu River Headwaters',
      faultDistanceKm: 2.3
    },
    rainfall: {
      today: 51.0,
      last3Days: 114.0,
      last7Days: 215.0,
      last15Days: 400.0,
      last30Days: 680.0,
      max1Day: 60.0,
      max3Day: 126.0,
      rainyDays: 16,
      antecedentRainfallIndex: 58.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.64,
      rainfallTriggerScore: 0.58,
      riskScore: 62,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Cleaved Flysch Weathering Degradation', value: 'High Cleavage Density', contribution: 0.31, percentage: 34 },
        { feature: 'High Altitude Mist & Rain Infiltration', value: '1890m Ridge Trapping', contribution: 0.27, percentage: 30 },
        { feature: 'Moderate Slopes (34.0°)', value: 'Moderate Shear Relief', contribution: 0.22, percentage: 24 },
        { feature: 'Intact Ridge Tree Belts', value: 'Root Web Protection', contribution: -0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Watch advisory active for Tuensang-Mokokchung highway saddle section.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Tuensang - Mokokchung Highway (NH-202)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Helipong Village', population: 2800, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'NAG_006',
    name: 'Mon - Aboi Hill Slopes',
    state: 'Nagaland',
    district: 'Mon',
    latitude: 26.7420,
    longitude: 95.0680,
    environmental: {
      elevation: 940,
      slope: 37.2,
      aspect: 'East',
      geology: 'Barail Coal Measures & Fragile Clay Shales with Coal Seams',
      soil: 'Carbonaceous Sandy Silt (Prone to Piping)',
      landCover: 'Jhum Shifting Cultivation Scars & Hilltop Villages',
      drainage: 'Tizit River Valley',
      faultDistanceKm: 2.2
    },
    rainfall: {
      today: 68.0,
      last3Days: 150.0,
      last7Days: 285.0,
      last15Days: 520.0,
      last30Days: 850.0,
      max1Day: 78.0,
      max3Day: 165.0,
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
        { feature: 'Carbonaceous Shale Structural Softening', value: 'High Clay Content In Seams', contribution: 0.33, percentage: 36 },
        { feature: 'Deforestation on Jhum Slopes', value: 'Absence of Deep Roots', contribution: 0.29, percentage: 31 },
        { feature: 'Rainfall Inflow Surge (68 mm)', value: 'High Pore Pressure', contribution: 0.24, percentage: 26 },
        { feature: 'Steep Road Flanks (37.2°)', value: 'Overburden Sliding', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning triggered for Mon-Aboi-Tizit road axis; mud and debris flows frequent after heavy rain.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mon - Aboi - Tizit Highway', type: 'State Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Aboi Town Sector', population: 4200, distanceMeters: 320 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 13
  },
  {
    id: 'NAG_007',
    name: 'Zunheboto - Asalu Ridge Slopes',
    state: 'Nagaland',
    district: 'Zunheboto',
    latitude: 26.0120,
    longitude: 94.5180,
    environmental: {
      elevation: 1870,
      slope: 33.5,
      aspect: 'South-West',
      geology: 'Disang Group Splintery Marine Shales',
      soil: 'Residual Silty Clay with Deep Fractures',
      landCover: 'Sumi Hill Ridge Settlements & Agro-terraces',
      drainage: 'Doyang River Upper Streams',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 54.0,
      last3Days: 120.0,
      last7Days: 225.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 62.0,
      max3Day: 132.0,
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
        { feature: 'Splintery Shale Cleavage planes', value: 'High Foliation Slake', contribution: 0.31, percentage: 34 },
        { feature: 'Rainfall Infiltration (120 mm 3D)', value: 'Pore Water Rise', contribution: 0.27, percentage: 30 },
        { feature: 'Ridge Slope Incline (33.5°)', value: 'Moderate Incline', contribution: 0.22, percentage: 24 },
        { feature: 'Traditional Terracing Drainage', value: 'Water Diversion Channels', contribution: -0.10, percentage: 11 }
      ],
      explanationPoints: [
        'Watch alert active for Zunheboto town entrance roads; monitor hillside retaining walls.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Zunheboto - Kohima Highway', type: 'State Highway', distanceMeters: 35, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Zunheboto Town Ward 3', population: 4900, distanceMeters: 400 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'NAG_008',
    name: 'Peren - Jalukie Valley Bluffs',
    state: 'Nagaland',
    district: 'Peren',
    latitude: 25.5180,
    longitude: 93.7250,
    environmental: {
      elevation: 720,
      slope: 31.0,
      aspect: 'West',
      geology: 'Surma Group Weathered Siltstone & Sandstone',
      soil: 'Sandy Silt Loam with Low Cohesion',
      landCover: 'Valley Margin Farms & Secondary Jungle',
      drainage: 'Tebuki River Sub-basin',
      faultDistanceKm: 3.4
    },
    rainfall: {
      today: 48.0,
      last3Days: 108.0,
      last7Days: 205.0,
      last15Days: 380.0,
      last30Days: 640.0,
      max1Day: 55.0,
      max3Day: 120.0,
      rainyDays: 15,
      antecedentRainfallIndex: 54.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.55,
      rainfallTriggerScore: 0.52,
      riskScore: 53,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Valley Margin Cut Slope Instability', value: '31.0° Cut Angle', contribution: 0.30, percentage: 33 },
        { feature: 'Precipitation Inflow (108 mm 3D)', value: 'Moderate Saturation', contribution: 0.26, percentage: 29 },
        { feature: 'Friable Siltstone Weathering', value: 'Low Rock Strength', contribution: 0.22, percentage: 25 },
        { feature: 'Valley Floor Width', value: 'Natural Runout Buffer', contribution: -0.11, percentage: 13 }
      ],
      explanationPoints: [
        'Watch advisory for Peren-Jalukie road connections during continuous monsoon spells.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Peren - Jalukie Highway', type: 'State Highway', distanceMeters: 40, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Jalukie Agricultural Center', population: 3800, distanceMeters: 550 }
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
    id: 'NAG_009',
    name: 'Chumukedima - Medziphema Hill Gap',
    state: 'Nagaland',
    district: 'Chümoukedima',
    latitude: 25.8120,
    longitude: 93.8180,
    environmental: {
      elevation: 320,
      slope: 36.0,
      aspect: 'North-West',
      geology: 'Siwalik & Quaternary Boulder Deposits over Disang Shales',
      soil: 'Boulder Colluvium with High Permeability Matrix',
      landCover: 'Lifeline Four-Lane Highway Embankments & Foothills',
      drainage: 'Chathe River Valley (High Flash Flood Velocity)',
      faultDistanceKm: 1.5
    },
    rainfall: {
      today: 85.0,
      last3Days: 190.0,
      last7Days: 350.0,
      last15Days: 620.0,
      last30Days: 990.0,
      max1Day: 96.0,
      max3Day: 210.0,
      rainyDays: 20,
      antecedentRainfallIndex: 83.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.82,
      rainfallTriggerScore: 0.82,
      riskScore: 82,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Four-Lane Highway Rock Cut Surcharge', value: 'High Vertical Cut Slopes', contribution: 0.35, percentage: 37 },
        { feature: 'Torrential 24h Downpour (85 mm)', value: 'Flash Debris Flow Trigger', contribution: 0.29, percentage: 31 },
        { feature: 'Chathe River Foot Scour', value: 'Base Undercutting', contribution: 0.23, percentage: 24 },
        { feature: 'Main Boundary Thrust Proximity (1.5 km)', value: 'Tectonic Fracture Plane', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning triggered for Chumukedima-Medziphema NH-29 four-lane corridor (Pakala Pahar rockfall section).',
        'Imminent danger of large boulders tumbling onto active lanes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-29 (Dimapur - Chumukedima Expressway)', type: 'National Highway', distanceMeters: 5, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Chumukedima Urban Ward', population: 8900, distanceMeters: 220 }
      ],
      hospitals: 2,
      schools: 3,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 8900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 26
  },
  {
    id: 'NAG_010',
    name: 'Mokokchung - Changtongya Ridge Axis',
    state: 'Nagaland',
    district: 'Mokokchung',
    latitude: 26.3250,
    longitude: 94.5120,
    environmental: {
      elevation: 1320,
      slope: 37.6,
      aspect: 'North-West',
      geology: 'Disang Group Rhythmic Grey Shale & Siltstone',
      soil: 'High Plasticity Weathered Silt with Expansive Clay',
      landCover: 'Terraced Cultivation & Alder Tree Agroforestry',
      drainage: 'Milak River Deep Canyon Catchment',
      faultDistanceKm: 2.3
    },
    rainfall: {
      today: 62.0,
      last3Days: 138.0,
      last7Days: 250.0,
      last15Days: 440.0,
      last30Days: 730.0,
      max1Day: 74.0,
      max3Day: 152.0,
      rainyDays: 18,
      antecedentRainfallIndex: 66.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-MKC-10',
      telemetrySource: 'IMD Automated Weather Station + PWD Nagaland Tiltmeter',
      soilMoisturePct: 73.5,
      poreWaterPressureKPa: 45.2
    },
    prediction: {
      susceptibilityScore: 0.70,
      rainfallTriggerScore: 0.67,
      riskScore: 69,
      riskLevel: 'WATCH',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Disang Shale Weathering Planes', value: 'Low Friction Angle', contribution: 0.33, percentage: 35 },
        { feature: 'Rainfall Infiltration (138mm 3D)', value: 'High Influx', contribution: 0.28, percentage: 30 },
        { feature: 'Slope Incline (37.6°)', value: 'Steep Escarpment', contribution: 0.24, percentage: 26 },
        { feature: 'Alder Agroforestry Root Bonding', value: 'Root Tensile Cohesion', contribution: -0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Watch advisory for Mokokchung-Amguri Highway (NH-702) near Changtongya due to periodic pavement subsidence.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mokokchung - Amguri Highway (NH-702)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Changtongya Sub-town', population: 3200, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 7
  },
  {
    id: 'NAG_011',
    name: 'Tuensang - Helipong Escarpment Corridor',
    state: 'Nagaland',
    district: 'Tuensang',
    latitude: 26.2780,
    longitude: 94.8210,
    environmental: {
      elevation: 1410,
      slope: 41.0,
      aspect: 'East',
      geology: 'Barail Formation Coarse Sandstone Overlying Highly Crushed Disang Flysch',
      soil: 'Gravelly Colluvial Silt with Discontinuous Talus Cones',
      landCover: 'Secondary Scrub & Slash-and-Burn Hillslope Plots',
      drainage: 'Dikhu River Headwaters',
      faultDistanceKm: 1.7
    },
    rainfall: {
      today: 79.0,
      last3Days: 178.0,
      last7Days: 325.0,
      last15Days: 560.0,
      last30Days: 890.0,
      max1Day: 94.0,
      max3Day: 196.0,
      rainyDays: 20,
      antecedentRainfallIndex: 80.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-TSG-11',
      telemetrySource: 'IMD Automated Weather Station + GSI Pore Sensor',
      soilMoisturePct: 83.6,
      poreWaterPressureKPa: 57.8
    },
    prediction: {
      susceptibilityScore: 0.83,
      rainfallTriggerScore: 0.81,
      riskScore: 82,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Barail-Disang Lithological Contact Weakness', value: 'High Shear Strain', contribution: 0.36, percentage: 38 },
        { feature: 'Heavy Orogenic Precipitation (178mm 3D)', value: 'Extreme Infiltration', contribution: 0.31, percentage: 33 },
        { feature: 'Slope Incline (41.0°)', value: 'Precipitous Mountain Face', contribution: 0.23, percentage: 24 },
        { feature: 'Jhum De-vegetation', value: 'Loss of Topsoil Resistance', contribution: 0.05, percentage: 5 }
      ],
      explanationPoints: [
        'Warning triggered on Tuensang-Longleng road sector near Helipong due to retrogressive headscarp failure.',
        'High pore water pressure (57.8 kPa) threatening lifeline transport into Eastern Nagaland.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Tuensang - Longleng Highway', type: 'State Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Helipong Village', population: 2100, distanceMeters: 380 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'NAG_012',
    name: 'Mon - Aboi Coal & Shale Spur',
    state: 'Nagaland',
    district: 'Mon',
    latitude: 26.7450,
    longitude: 94.9820,
    environmental: {
      elevation: 890,
      slope: 36.4,
      aspect: 'North-East',
      geology: 'Tikak Parbat Formation Sandstone with High-Volatile Coal Seams',
      soil: 'Acidic Friable Soil over Abandoned Surface Coal Pits',
      landCover: 'Open Cast Coal Diggings & Secondary Bamboo Scrub',
      drainage: 'Tizit River Tributary Chasm',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 54.0,
      last3Days: 120.0,
      last7Days: 215.0,
      last15Days: 390.0,
      last30Days: 670.0,
      max1Day: 66.0,
      max3Day: 135.0,
      rainyDays: 16,
      antecedentRainfallIndex: 59.0,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-MON-12',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 65.0,
      poreWaterPressureKPa: 36.5
    },
    prediction: {
      susceptibilityScore: 0.65,
      rainfallTriggerScore: 0.57,
      riskScore: 62,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Unregulated Surface Coal Diggings & Void Overburden', value: 'Severe Anthropogenic Distress', contribution: 0.34, percentage: 37 },
        { feature: 'Slope Incline (36.4°)', value: 'Moderate High Gradient', contribution: 0.27, percentage: 29 },
        { feature: 'Rainfall Infiltration (120mm 3D)', value: 'Active Seepage into Voids', contribution: 0.24, percentage: 26 },
        { feature: 'Bamboo Regeneration', value: 'Partial Stabilization', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory for Mon-Aboi arterial link due to mine spoil collapse into roadway drainage ditches.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Mon - Aboi Highway', type: 'District Road', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Aboi Sub-divisional Town', population: 3600, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'NAG_013',
    name: 'Phek - Meluri Sedimentary Ridge Pass',
    state: 'Nagaland',
    district: 'Phek',
    latitude: 25.6850,
    longitude: 94.4980,
    environmental: {
      elevation: 1580,
      slope: 38.8,
      aspect: 'South',
      geology: 'Laphuri Limestone & Calcareous Sandstone Overburden',
      soil: 'Stony Calcareous Silt with Deep Karstic Fissures',
      landCover: 'Subtropical Pine Forest & Hill Terraces',
      drainage: 'Tizu River Gorges (Chindwin Basin)',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 60.0,
      last3Days: 132.0,
      last7Days: 240.0,
      last15Days: 420.0,
      last30Days: 710.0,
      max1Day: 72.0,
      max3Day: 148.0,
      rainyDays: 17,
      antecedentRainfallIndex: 64.5,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-PHK-13',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 70.2,
      poreWaterPressureKPa: 41.5
    },
    prediction: {
      susceptibilityScore: 0.68,
      rainfallTriggerScore: 0.62,
      riskScore: 66,
      riskLevel: 'WATCH',
      confidence: 0.90,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Karstic Fissure Water Infiltration', value: 'High Subsurface Flow', contribution: 0.32, percentage: 35 },
        { feature: 'Slope Incline (38.8°)', value: 'Steep Escarpment Profile', contribution: 0.28, percentage: 31 },
        { feature: 'Cumulative Precipitation (132mm 3D)', value: 'Active Saturation', contribution: 0.24, percentage: 26 },
        { feature: 'Pine Forest Root Web', value: 'Cohesive Anchor', contribution: -0.07, percentage: 8 }
      ],
      explanationPoints: [
        'Watch advisory on Phek-Meluri international transit corridor towards Avakhung border.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Phek - Meluri Highway (NH-29 Extension)', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Meluri Town Fringe', population: 2900, distanceMeters: 420 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'NAG_014',
    name: 'Kiphire - Mount Saramati Foothill Corridor',
    state: 'Nagaland',
    district: 'Kiphire',
    latitude: 25.8650,
    longitude: 94.7850,
    environmental: {
      elevation: 1690,
      slope: 43.2,
      aspect: 'North-East',
      geology: 'Nagaland Ophiolite Belt Ultramafic Harzburgite & Chromite Lenses',
      soil: 'Thin Gravelly Skeletal Leptosols with Sheared Talus',
      landCover: 'Subalpine Scrub & High-Altitude Conifers',
      drainage: 'Zungki River Torrential Valley',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 88.0,
      last3Days: 198.0,
      last7Days: 355.0,
      last15Days: 610.0,
      last30Days: 960.0,
      max1Day: 102.0,
      max3Day: 220.0,
      rainyDays: 21,
      antecedentRainfallIndex: 85.0,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-KPH-14',
      telemetrySource: 'IMD Automated Weather Station + Army Geophone',
      soilMoisturePct: 86.8,
      poreWaterPressureKPa: 64.5
    },
    prediction: {
      susceptibilityScore: 0.89,
      rainfallTriggerScore: 0.89,
      riskScore: 89,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Saramati Foothill Extreme Slope Relief (43.2°)', value: 'Extreme High Mountain Relief', contribution: 0.38, percentage: 40 },
        { feature: 'Sustained Heavy Infiltration (198mm 3D)', value: 'Severe Hydrostatic Buildup', contribution: 0.32, percentage: 34 },
        { feature: 'Ophiolite Thrust Fault Proximity (1.1km)', value: 'Crushed Serpentinized Bedrock', contribution: 0.21, percentage: 22 },
        { feature: 'Remote Border Transit Vulnerability', value: 'Single Strategic Track', contribution: 0.04, percentage: 4 }
      ],
      explanationPoints: [
        'CRITICAL ALERT: Multi-debris flow triggering across Zungki gorge cutting off Kiphire from Pungro military base.',
        'High pore water pressure (64.5 kPa) across fractured harzburgite foliation.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Kiphire - Pungro Border Strategic Road', type: 'Strategic Road', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Pungro Sub-divisional Base', population: 2600, distanceMeters: 350 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 2600
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 14
  }
];
