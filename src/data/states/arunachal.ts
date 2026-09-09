import { MonitoredLocation } from '../../types/location';

export const ARUNACHAL_LOCATIONS: MonitoredLocation[] = [
  {
    id: 'ARU_001',
    name: 'Tawang - Sela Pass Transit Corridor',
    state: 'Arunachal Pradesh',
    district: 'Tawang',
    latitude: 27.5050,
    longitude: 92.1030,
    environmental: {
      elevation: 4170,
      slope: 45.2,
      aspect: 'North-East',
      geology: 'Se La Group Gneiss & Migmatite with Freeze-Thaw Cleavage',
      soil: 'Glacial Till & Frost-Shattered Talus',
      landCover: 'Alpine Scree & Glacial Moraines',
      drainage: 'Tawang Chu Upper Alpine Glacial Stream',
      faultDistanceKm: 1.2
    },
    rainfall: {
      today: 95.0,
      last3Days: 215.0,
      last7Days: 380.0,
      last15Days: 640.0,
      last30Days: 980.0,
      max1Day: 110.0,
      max3Day: 235.0,
      rainyDays: 22,
      antecedentRainfallIndex: 88.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.92,
      rainfallTriggerScore: 0.89,
      riskScore: 91,
      riskLevel: 'WARNING',
      confidence: 0.96,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Freeze-Thaw Frost Wedging', value: 'Severe Cryogenic Fracturing', contribution: 0.35, percentage: 37 },
        { feature: 'High Slopes Gradient (45.2°)', value: 'Extreme Mountain Relief', contribution: 0.30, percentage: 32 },
        { feature: 'Heavy Snowmelt + Rain Infiltration', value: '380 mm 7D Total', contribution: 0.23, percentage: 24 },
        { feature: 'Strategic Heavy Armor Convoys', value: 'High Road Bed Vibration', contribution: 0.08, percentage: 8 }
      ],
      explanationPoints: [
        'Strategic Trans-Himalayan lifeline (NH-13) under critical freeze-thaw and saturated talus failure.',
        'Imminent rockfall risk between Sela Lake approach and Baisakhi military staging camp.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-13 (Trans-Arunachal Highway / Sela Axis)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Jaswant Garh Transit Base', population: 650, distanceMeters: 250 },
        { name: 'Jung Military Cantonment', population: 2400, distanceMeters: 800 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 3050
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 31
  },
  {
    id: 'ARU_002',
    name: 'Itanagar - Zoo Road & Ganga Lake Hills',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    latitude: 27.0844,
    longitude: 93.6053,
    environmental: {
      elevation: 480,
      slope: 36.5,
      aspect: 'South-East',
      geology: 'Siwalik Group Upper Sandstone, Claystone & Siltstone',
      soil: 'Friable Sandy Clay (Rapid Loss of Cohesion)',
      landCover: 'Urbanized Slopes, Deforested Jhum Terraces',
      drainage: 'Senki River Valley Sub-basin',
      faultDistanceKm: 2.7
    },
    rainfall: {
      today: 102.0,
      last3Days: 228.0,
      last7Days: 410.0,
      last15Days: 710.0,
      last30Days: 1140.0,
      max1Day: 118.0,
      max3Day: 255.0,
      rainyDays: 21,
      antecedentRainfallIndex: 90.5,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.86,
      rainfallTriggerScore: 0.88,
      riskScore: 87,
      riskLevel: 'WARNING',
      confidence: 0.93,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Friable Siwalik Soft Sediments', value: 'Rapid Slaking Upon Wetting', contribution: 0.33, percentage: 36 },
        { feature: 'Unplanned Hillside Construction', value: 'Cut-and-Fill Terracing', contribution: 0.29, percentage: 31 },
        { feature: 'Torrential 24h Downpour (102 mm)', value: 'Extreme Cloudburst Surge', contribution: 0.22, percentage: 24 },
        { feature: 'Drainage Choking by Construction Debris', value: 'High Runoff Overflow', contribution: 0.10, percentage: 11 }
      ],
      explanationPoints: [
        'State capital hillside colonies (Ganga Lake & Donyi Polo area) face multi-hazard flash debris flows.',
        'Siwalik soft sandstone softens completely after 72h continuous rainfall, leading to planar failures.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Itanagar - Naharlagun Twin City Expressway', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Ganga Village Hill Sector', population: 7600, distanceMeters: 180 },
        { name: 'Papu Nallah Encroachment Area', population: 3900, distanceMeters: 350 }
      ],
      hospitals: 2,
      schools: 5,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 11500
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 17
  },
  {
    id: 'ARU_003',
    name: 'Bomdila Pass Slopes',
    state: 'Arunachal Pradesh',
    district: 'West Kameng',
    latitude: 27.2640,
    longitude: 92.4180,
    environmental: {
      elevation: 2410,
      slope: 38.0,
      aspect: 'South',
      geology: 'Bomdila Gneiss Complex & Sericitic Phyllite',
      soil: 'Sandy Silt with Abundant Gravel Fragments',
      landCover: 'Temperate Coniferous Forest & Hillside Orchard Cuts',
      drainage: 'Kameng River Sub-basin',
      faultDistanceKm: 2.1
    },
    rainfall: {
      today: 64.0,
      last3Days: 142.0,
      last7Days: 260.0,
      last15Days: 480.0,
      last30Days: 790.0,
      max1Day: 75.0,
      max3Day: 155.0,
      rainyDays: 18,
      antecedentRainfallIndex: 70.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.73,
      rainfallTriggerScore: 0.69,
      riskScore: 72,
      riskLevel: 'WARNING',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Foliation Plane Shear Weakness', value: 'Weathered Gneiss Layering', contribution: 0.31, percentage: 34 },
        { feature: 'Antecedent Rainfall Index (70.0)', value: 'High Groundwater Saturation', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Incline (38.0°)', value: 'High Gravity Shear', contribution: 0.23, percentage: 25 },
        { feature: 'Road Widening Excavations', value: 'Unretained Cut Face', contribution: 0.11, percentage: 12 }
      ],
      explanationPoints: [
        'Warning triggered due to ongoing NH-13 widening cuts creating steep unsupported rockfaces.',
        'High tension cracks observed on upper road bends towards Dirang.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-13 (Bomdila - Dirang Strategic Link)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Bomdila Upper Bazar', population: 4200, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 4200
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 12
  },
  {
    id: 'ARU_004',
    name: 'Pasighat - Yembung Siang Escarpment',
    state: 'Arunachal Pradesh',
    district: 'East Siang',
    latitude: 28.1420,
    longitude: 95.2280,
    environmental: {
      elevation: 210,
      slope: 41.5,
      aspect: 'East',
      geology: 'Tertiary Siwalik Sandstone & Abor Volcanics',
      soil: 'Sandy Gravel & Colluvium',
      landCover: 'Sub-tropical Rainforest & River Bluffs',
      drainage: 'Siang River Main Stem Gorge',
      faultDistanceKm: 1.5
    },
    rainfall: {
      today: 110.0,
      last3Days: 245.0,
      last7Days: 450.0,
      last15Days: 780.0,
      last30Days: 1250.0,
      max1Day: 125.0,
      max3Day: 270.0,
      rainyDays: 23,
      antecedentRainfallIndex: 93.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.89,
      rainfallTriggerScore: 0.91,
      riskScore: 90,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Siang River Hydrological Undercutting', value: 'High Discharge Velocity', contribution: 0.35, percentage: 37 },
        { feature: 'Extreme Monsoon Rainfall Intensity', value: '110 mm 24h', contribution: 0.31, percentage: 33 },
        { feature: 'Abor Volcanic Fault Contact', value: 'Tectonic Fracture Line', contribution: 0.21, percentage: 22 },
        { feature: 'Slope Angle (41.5°)', value: 'Over-steepened River Bluff', contribution: 0.13, percentage: 14 }
      ],
      explanationPoints: [
        'Massive bank slumping and debris avalanches threaten Pasighat-Pangin-Yingkiong highway.',
        'Siang river flood levels cause hydraulic suction at toe of slopes.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Pasighat - Pangin - Along Highway', type: 'National Highway', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Yembung Village', population: 1450, distanceMeters: 300 }
      ],
      hospitals: 0,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 1450
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 20
  },
  {
    id: 'ARU_005',
    name: 'Ziro Valley Plateau Slopes',
    state: 'Arunachal Pradesh',
    district: 'Lower Subansiri',
    latitude: 27.5950,
    longitude: 93.8280,
    environmental: {
      elevation: 1560,
      slope: 29.0,
      aspect: 'West',
      geology: 'Gneissic Bedrock with Lacustrine Clay & Silt Deposits',
      soil: 'Organic Clayey Loam (Apatani Valley)',
      landCover: 'Pine Groves & Bamboo Forest Perimeter',
      drainage: 'Kele River Basin',
      faultDistanceKm: 3.8
    },
    rainfall: {
      today: 44.0,
      last3Days: 98.0,
      last7Days: 185.0,
      last15Days: 340.0,
      last30Days: 580.0,
      max1Day: 50.0,
      max3Day: 110.0,
      rainyDays: 16,
      antecedentRainfallIndex: 50.0,
      triggerLevel: 'MODERATE'
    },
    prediction: {
      susceptibilityScore: 0.48,
      rainfallTriggerScore: 0.45,
      riskScore: 47,
      riskLevel: 'WATCH',
      confidence: 0.88,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Moderate Valley Margin Slopes (29.0°)', value: 'Moderate Slope Relief', contribution: 0.27, percentage: 32 },
        { feature: 'Clay Horizon Swelling Capacity', value: 'High Plasticity Clay', contribution: 0.25, percentage: 30 },
        { feature: 'Rainfall Infiltration (98 mm 3D)', value: 'Moderate Water Inflow', contribution: 0.21, percentage: 25 },
        { feature: 'Traditional Agro-Forestry Preservation', value: 'Soil Conservation Practice', contribution: -0.12, percentage: 14 }
      ],
      explanationPoints: [
        'Valley basin relatively stable; watch alert restricted to outer rim highway cuts to Kamle.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Ziro - Daporijo Highway Section', type: 'State Highway', distanceMeters: 45, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Hapoli Urban Sector', population: 5800, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 3,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 5800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'ARU_006',
    name: 'Bhalukpong - Tipi Elephant Corridor',
    state: 'Arunachal Pradesh',
    district: 'West Kameng',
    latitude: 27.0210,
    longitude: 92.6280,
    environmental: {
      elevation: 290,
      slope: 37.8,
      aspect: 'South-East',
      geology: 'Siwalik Friable Sandstone & Quaternary Boulder Conglomerate',
      soil: 'Sandy Silt with Boulder Clasts',
      landCover: 'Semi-Evergreen Forest & Highway Bluffs',
      drainage: 'Kameng (Jia Bhoreli) River Suture',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 88.0,
      last3Days: 192.0,
      last7Days: 350.0,
      last15Days: 610.0,
      last30Days: 990.0,
      max1Day: 98.0,
      max3Day: 210.0,
      rainyDays: 20,
      antecedentRainfallIndex: 83.0,
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
        { feature: 'Unconsolidated Boulder Conglomerate', value: 'High Clast Detachment', contribution: 0.33, percentage: 36 },
        { feature: 'Intense Monsoon Rainfall (88 mm)', value: 'Gully Erosion Surge', contribution: 0.29, percentage: 31 },
        { feature: 'Kameng River Foot Erosion', value: 'Base Undercutting', contribution: 0.22, percentage: 24 },
        { feature: 'Foothill Tectonic Lineament', value: 'Main Frontal Thrust Area', contribution: 0.12, percentage: 13 }
      ],
      explanationPoints: [
        'Strategic entry point to West Kameng and Tawang at Bhalukpong gorge.',
        'Frequent rockfalls and debris blockades at Tipi orchid sanctuary section.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Bhalukpong - Bomdila Highway (NH-13 Entry)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Bhalukpong Gate Market', population: 3100, distanceMeters: 320 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 3100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 16
  },
  {
    id: 'ARU_007',
    name: 'Roing - Mayodia Pass Snow & Landslide Corridor',
    state: 'Arunachal Pradesh',
    district: 'Lower Dibang Valley',
    latitude: 28.2320,
    longitude: 95.9120,
    environmental: {
      elevation: 2650,
      slope: 43.0,
      aspect: 'North',
      geology: 'Mishmi Metamorphic Complex Schist, Gneiss & Serpentinite',
      soil: 'Gravelly Colluvial Silt',
      landCover: 'Temperate Rhododendron Forest & Rocky Cliffs',
      drainage: 'Eze (Dibang Tributary) River Torrent',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 98.0,
      last3Days: 220.0,
      last7Days: 420.0,
      last15Days: 730.0,
      last30Days: 1180.0,
      max1Day: 112.0,
      max3Day: 240.0,
      rainyDays: 22,
      antecedentRainfallIndex: 89.0,
      triggerLevel: 'CRITICAL'
    },
    prediction: {
      susceptibilityScore: 0.90,
      rainfallTriggerScore: 0.89,
      riskScore: 90,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Mishmi Thrust Active Suture Zone', value: '1.1 km Distance', contribution: 0.36, percentage: 38 },
        { feature: 'High Precipitation & Cloud Trapping', value: '420 mm 7D Total', contribution: 0.30, percentage: 32 },
        { feature: 'Steep Escarpment Angle (43.0°)', value: 'Gravitational Instability', contribution: 0.22, percentage: 23 },
        { feature: 'Freeze-Thaw Weathering Horizon', value: 'Upper Pass Elevation', contribution: 0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Lifeline pass linking Roing to Anini in Dibang Valley completely vulnerable to mudslides.',
        'Mayodia Pass experiencing road bed sinking on hairpin turns 12 through 16.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Roing - Anini Highway (NH-313)', type: 'National Highway', distanceMeters: 12, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mayodia Camp Base', population: 380, distanceMeters: 180 }
      ],
      hospitals: 0,
      schools: 0,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 380
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 24
  },
  {
    id: 'ARU_008',
    name: 'Along (Aalo) - Darka Siyom Valley Section',
    state: 'Arunachal Pradesh',
    district: 'West Siang',
    latitude: 28.1680,
    longitude: 94.7950,
    environmental: {
      elevation: 620,
      slope: 33.5,
      aspect: 'South-West',
      geology: 'Gondwana Sandstone & Daling Quartzite Facies',
      soil: 'Sandy Clay Loam with Weathered Fragments',
      landCover: 'Terraced Cultivation & Mixed Jungle',
      drainage: 'Siyom River Deep Valley',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 58.0,
      last3Days: 130.0,
      last7Days: 240.0,
      last15Days: 450.0,
      last30Days: 740.0,
      max1Day: 66.0,
      max3Day: 142.0,
      rainyDays: 17,
      antecedentRainfallIndex: 64.0,
      triggerLevel: 'HIGH'
    },
    prediction: {
      susceptibilityScore: 0.67,
      rainfallTriggerScore: 0.64,
      riskScore: 66,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Siyom River Hydraulic Erosion', value: 'Toe Base Erosion', contribution: 0.31, percentage: 35 },
        { feature: 'Soil Moisture Saturation (API 64)', value: 'High Subsurface Moisture', contribution: 0.27, percentage: 31 },
        { feature: 'Valley Slope Angle (33.5°)', value: 'Critical Road Slopes', contribution: 0.22, percentage: 25 },
        { feature: 'Agricultural Drainage Runoff', value: 'Surface Wash', contribution: 0.08, percentage: 9 }
      ],
      explanationPoints: [
        'Watch advisory active for Aalo town entrance road and Darka village bypass.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Aalo - Likabali Road (NH-515)', type: 'National Highway', distanceMeters: 30, trafficVulnerability: 'MEDIUM' }
      ],
      settlements: [
        { name: 'Darka Village', population: 2100, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2100
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 8
  },
  {
    id: 'ARU_009',
    name: 'Anini - Dibang Valley Gorge Slopes',
    state: 'Arunachal Pradesh',
    district: 'Dibang Valley',
    latitude: 28.7880,
    longitude: 95.8920,
    environmental: {
      elevation: 1970,
      slope: 42.0,
      aspect: 'East',
      geology: 'Metamorphic Schist & Marble Bands with Deep Shear Zones',
      soil: 'Shallow Colluvium on Rock Escarpment',
      landCover: 'Pristine Temperate Forests & Rocky Outcrops',
      drainage: 'Dri River (Upper Dibang) Canyon',
      faultDistanceKm: 1.4
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
      susceptibilityScore: 0.81,
      rainfallTriggerScore: 0.76,
      riskScore: 80,
      riskLevel: 'WARNING',
      confidence: 0.92,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Deep Canyon Relief & Sheared Rock', value: '42.0° Slope Relief', contribution: 0.34, percentage: 36 },
        { feature: 'High Orogenic Rainfall Trigger', value: '78 mm 24h Surge', contribution: 0.28, percentage: 30 },
        { feature: 'Remote Border Highway Vulnerability', value: 'Single Lifeline Axis', contribution: 0.22, percentage: 24 },
        { feature: 'Low Human Modification', value: 'Intact Natural Slopes', contribution: -0.09, percentage: 10 }
      ],
      explanationPoints: [
        'High alert for isolated district headquarters Anini; debris slides cutoff road communication regularly.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Anini - Mipi Border Highway', type: 'Strategic Road', distanceMeters: 20, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Anini Town Core', population: 2260, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2260
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 14
  },
  {
    id: 'ARU_010',
    name: 'Roing - Mayodia Pass Snowmelt Corridor',
    state: 'Arunachal Pradesh',
    district: 'Lower Dibang Valley',
    latitude: 28.2340,
    longitude: 93.9120,
    environmental: {
      elevation: 2650,
      slope: 44.5,
      aspect: 'North-East',
      geology: 'Mishmi Hills Granodiorite & Chlorite-Hornblende Schist',
      soil: 'Glacial Scree & Coarse Colluvium',
      landCover: 'Subalpine Conifers & Dense Rhododendron Scrub',
      drainage: 'Eze River Torrential Headwaters',
      faultDistanceKm: 1.1
    },
    rainfall: {
      today: 82.0,
      last3Days: 188.0,
      last7Days: 330.0,
      last15Days: 570.0,
      last30Days: 910.0,
      max1Day: 96.0,
      max3Day: 210.0,
      rainyDays: 20,
      antecedentRainfallIndex: 81.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-MYD-10',
      telemetrySource: 'IMD Automated Weather Station + BRO In-situ Tiltmeter',
      soilMoisturePct: 83.2,
      poreWaterPressureKPa: 58.6
    },
    prediction: {
      susceptibilityScore: 0.85,
      rainfallTriggerScore: 0.82,
      riskScore: 84,
      riskLevel: 'WARNING',
      confidence: 0.94,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Severe Freeze-Thaw & Slope Incline (44.5°)', value: 'Extreme High Mountain Relief', contribution: 0.36, percentage: 38 },
        { feature: 'High Precipitation & Snowmelt Infiltration', value: '188mm 3D Total', contribution: 0.30, percentage: 32 },
        { feature: 'Mishmi Thrust Shear Zone Proximity', value: '1.1km Fault Distance', contribution: 0.22, percentage: 23 },
        { feature: 'Military Staging Convoy Dynamics', value: 'Vibrational Surcharge', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'Warning issued for Roing-Anini road at Mayodia summit pass due to massive talus slide mobilization.',
        'High pore water pressure (58.6 kPa) threatens strategic border link.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Roing - Mayodia - Hunli Highway (NH-313)', type: 'National Highway', distanceMeters: 15, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Mayodia Base Camp', population: 450, distanceMeters: 250 },
        { name: 'Hunli Transit Basti', population: 1600, distanceMeters: 800 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2050
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 9
  },
  {
    id: 'ARU_011',
    name: 'Pasighat - Pangin Siang River Highway',
    state: 'Arunachal Pradesh',
    district: 'East Siang',
    latitude: 28.1820,
    longitude: 95.1480,
    environmental: {
      elevation: 420,
      slope: 37.8,
      aspect: 'South',
      geology: 'Siwalik Group Friable Sandstone & Boulder Conglomerate',
      soil: 'Porous Gravelly Clayey Silt with Low Cohesion',
      landCover: 'Tropical Evergreen Rainforest & Riverine Cane Brakes',
      drainage: 'Siang River (Brahmaputra) Mega Canyon',
      faultDistanceKm: 1.8
    },
    rainfall: {
      today: 92.5,
      last3Days: 205.0,
      last7Days: 370.0,
      last15Days: 610.0,
      last30Days: 980.0,
      max1Day: 108.0,
      max3Day: 228.0,
      rainyDays: 21,
      antecedentRainfallIndex: 86.4,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-PNG-11',
      telemetrySource: 'IMD Automated Weather Station + CWC Siang Gauge',
      soilMoisturePct: 86.5,
      poreWaterPressureKPa: 64.0
    },
    prediction: {
      susceptibilityScore: 0.88,
      rainfallTriggerScore: 0.90,
      riskScore: 89,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Siang River Torrential Basal Toe Undercutting', value: 'Severe Hydraulic Scour', contribution: 0.35, percentage: 37 },
        { feature: 'Extremely Heavy Monsoon Rainfall (205mm 3D)', value: 'Extreme Infiltration', contribution: 0.32, percentage: 34 },
        { feature: 'Weak Siwalik Friable Sandstone', value: 'High Disintegration', contribution: 0.21, percentage: 22 },
        { feature: 'Dense Canopy Interception', value: 'Partial Mitigation', contribution: -0.07, percentage: 7 }
      ],
      explanationPoints: [
        'CRITICAL ALERT: Slumping and massive debris slips along Pasighat-Pangin highway (NH-13).',
        'Multiple road breaches reported between Rottung and Kebang with Siang river surging at danger levels.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-13 (Trans-Arunachal Highway Siang Axis)', type: 'National Highway', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Kebang Tribal Settlement', population: 1750, distanceMeters: 320 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 1750
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 12
  },
  {
    id: 'ARU_012',
    name: 'Khonsa - Deomali Border Ridge',
    state: 'Arunachal Pradesh',
    district: 'Tirap',
    latitude: 26.9850,
    longitude: 95.5120,
    environmental: {
      elevation: 1250,
      slope: 35.2,
      aspect: 'North-West',
      geology: 'Disang Group Laminated Splintery Shale & Interbedded Sandstone',
      soil: 'High Plasticity Silty Clay prone to Liquid Slip',
      landCover: 'Secondary Bamboo Regrowth & Jhum Cultivation Slopes',
      drainage: 'Tirap River Headwaters',
      faultDistanceKm: 2.4
    },
    rainfall: {
      today: 51.0,
      last3Days: 114.0,
      last7Days: 205.0,
      last15Days: 380.0,
      last30Days: 660.0,
      max1Day: 64.0,
      max3Day: 130.0,
      rainyDays: 16,
      antecedentRainfallIndex: 56.5,
      triggerLevel: 'MODERATE',
      telemetryStationId: 'IMD-AWS-KSA-12',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 63.8,
      poreWaterPressureKPa: 35.5
    },
    prediction: {
      susceptibilityScore: 0.64,
      rainfallTriggerScore: 0.54,
      riskScore: 60,
      riskLevel: 'WATCH',
      confidence: 0.89,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Splintery Disang Shale Decomposition', value: 'High Slip Propensity', contribution: 0.32, percentage: 36 },
        { feature: 'Steep Slope Relief (35.2°)', value: 'Moderate-High Incline', contribution: 0.27, percentage: 31 },
        { feature: 'Antecedent Soil Saturation (56.5 API)', value: 'Moderate Influx', contribution: 0.23, percentage: 26 },
        { feature: 'Jhum Slash-and-Burn De-vegetation', value: 'Erosion Trigger', contribution: 0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Watch advisory on Khonsa-Longding road corridor due to mudslides in saturated splintery shale cuts.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Khonsa - Deomali Highway (State Highway)', type: 'State Highway', distanceMeters: 30, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Khonsa Town Periphery', population: 3800, distanceMeters: 550 }
      ],
      hospitals: 1,
      schools: 2,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 3800
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 6
  },
  {
    id: 'ARU_013',
    name: 'Changlang - Jairampur Pangsau Axis',
    state: 'Arunachal Pradesh',
    district: 'Changlang',
    latitude: 27.1850,
    longitude: 96.0120,
    environmental: {
      elevation: 980,
      slope: 38.0,
      aspect: 'South-East',
      geology: 'Barail & Tipam Sandstone Series with Coal Seam Horizons',
      soil: 'Sandy Clay Loam with Weathered Ferruginous Crust',
      landCover: 'Dense Wet Subtropical Forest & Tea Outskirts',
      drainage: 'Tirap-Dihing Basin Ravine Channels',
      faultDistanceKm: 2.9
    },
    rainfall: {
      today: 60.0,
      last3Days: 135.0,
      last7Days: 245.0,
      last15Days: 430.0,
      last30Days: 730.0,
      max1Day: 74.0,
      max3Day: 150.0,
      rainyDays: 18,
      antecedentRainfallIndex: 65.0,
      triggerLevel: 'HIGH',
      telemetryStationId: 'IMD-AWS-JRP-13',
      telemetrySource: 'IMD Automated Weather Station',
      soilMoisturePct: 72.1,
      poreWaterPressureKPa: 44.2
    },
    prediction: {
      susceptibilityScore: 0.69,
      rainfallTriggerScore: 0.66,
      riskScore: 68,
      riskLevel: 'WATCH',
      confidence: 0.91,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Barail-Tipam Contact Shear Zone', value: 'High Weakness', contribution: 0.31, percentage: 34 },
        { feature: 'Heavy Orogenic Precipitation (135mm 3D)', value: 'High Saturation', contribution: 0.28, percentage: 31 },
        { feature: 'Slope Incline (38.0°)', value: 'Steep Cutting', contribution: 0.25, percentage: 28 },
        { feature: 'Dense Forest Root System', value: 'Anchor Buffer', contribution: -0.06, percentage: 7 }
      ],
      explanationPoints: [
        'Watch advisory for historic Stilwell Road / NH-315 sector toward Pangsau border pass.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'NH-315 (Historic Ledo / Stilwell Highway)', type: 'National Highway', distanceMeters: 25, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Jairampur Border Town', population: 2900, distanceMeters: 450 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 1,
      estimatedVulnerablePopulation: 2900
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 5
  },
  {
    id: 'ARU_014',
    name: 'Hawai - Hayuliang Lohit River Canyon',
    state: 'Arunachal Pradesh',
    district: 'Anjaw',
    latitude: 28.0450,
    longitude: 96.7950,
    environmental: {
      elevation: 1280,
      slope: 45.0,
      aspect: 'North',
      geology: 'Walong Metasediment Gneiss & Sheared Marble Interbeds',
      soil: 'Talus Cones & Coarse Angular Rock Scree',
      landCover: 'Alpine Pine & Sparse Precipitous Escarpment Vegetation',
      drainage: 'Lohit River Canyon Gorge (Direct Influx to Brahmaputra)',
      faultDistanceKm: 1.3
    },
    rainfall: {
      today: 85.0,
      last3Days: 195.0,
      last7Days: 350.0,
      last15Days: 590.0,
      last30Days: 940.0,
      max1Day: 98.0,
      max3Day: 218.0,
      rainyDays: 21,
      antecedentRainfallIndex: 84.0,
      triggerLevel: 'CRITICAL',
      telemetryStationId: 'IMD-AWS-HYL-14',
      telemetrySource: 'IMD Automated Weather Station + Army Geophone',
      soilMoisturePct: 85.0,
      poreWaterPressureKPa: 62.5
    },
    prediction: {
      susceptibilityScore: 0.89,
      rainfallTriggerScore: 0.87,
      riskScore: 88,
      riskLevel: 'WARNING',
      confidence: 0.95,
      modelType: 'XGBoost v2.4 + GSI Inventory Ensemble',
      shapContributions: [
        { feature: 'Extreme Lohit River Canyon Relief (45.0°)', value: 'Extreme Mountain Relief', contribution: 0.37, percentage: 39 },
        { feature: 'Sustained Heavy Infiltration (195mm 3D)', value: 'Severe Hydrostatic Buildup', contribution: 0.31, percentage: 33 },
        { feature: 'Walong Shear Fault Proximity (1.3km)', value: 'Intensely Fractured Bedrock', contribution: 0.20, percentage: 21 },
        { feature: 'Single Lifeline Vulnerability', value: 'Kibithu Defense Corridor', contribution: 0.07, percentage: 7 }
      ],
      explanationPoints: [
        'WARNING: Massive rockfall and debris avalanche alert between Hayuliang and Hawai district headquarters.',
        'High pore water pressure (62.5 kPa) along single strategic road accessing easternmost Indo-Tibetan border.'
      ]
    },
    exposure: {
      roadSegments: [
        { name: 'Hayuliang - Hawai Strategic Border Highway', type: 'Strategic Road', distanceMeters: 10, trafficVulnerability: 'HIGH' }
      ],
      settlements: [
        { name: 'Hawai Administrative Complex', population: 1950, distanceMeters: 380 }
      ],
      hospitals: 1,
      schools: 1,
      criticalBridges: 2,
      estimatedVulnerablePopulation: 1950
    },
    lastUpdated: '2026-09-08T10:15:00+05:30',
    historicalEventsCount: 13
  }
];
