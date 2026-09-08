export type HighwayStatus = 'CLEAR' | 'RESTRICTED' | 'BLOCKED' | 'HIGH_RISK_WATCH';

export interface HighwayLifeline {
  id: string;
  highwayCode: string;
  name: string;
  route: string;
  connectingStates: string[];
  totalLengthKm: number;
  criticalSection: string;
  status: HighwayStatus;
  statusDescription: string;
  lastUpdated: string;
  blockageLocation?: {
    name: string;
    latitude: number;
    longitude: number;
    chainageKm: string;
  };
  debrisVolumeEstimatedM3?: number;
  clearingAgency: 'Border Roads Organisation (BRO)' | 'NHIDCL' | 'State PWD' | 'NDRF Quick Clearance';
  estimatedRestorationHours?: number;
  strandedVehiclesCount?: number;
  alternateBypassRoute: string;
  bypassDistanceAddedKm: number;
  trafficPriority: 'VITAL_MILITARY_AND_CIVIL' | 'STRATEGIC_LIFELINE' | 'REGIONAL_COMMERCE';
  activeMonitoringSensors: {
    piezometers: number;
    tiltmeters: number;
    cctvMonitoring: boolean;
  };
}

export const NER_HIGHWAY_LIFELINES: HighwayLifeline[] = [
  {
    id: 'HWY_NH10_SIK',
    highwayCode: 'NH-10',
    name: 'Sikkim Main Lifeline Corridor',
    route: 'Siliguri (Sevoke) → Teesta Bazaar → Rangpo → Singtam → Gangtok',
    connectingStates: ['Sikkim', 'West Bengal'],
    totalLengthKm: 114,
    criticalSection: '29th Mile & Teesta Low Dam Sinking Zone (Chainage Km 28 - 42)',
    status: 'BLOCKED',
    statusDescription: 'Massive debris flow and Teesta river undercutting near 29th Mile. Road washed away for 75 meters. Traffic completely suspended.',
    lastUpdated: '12 mins ago',
    blockageLocation: {
      name: '29th Mile, Teesta Gorge',
      latitude: 27.0620,
      longitude: 88.4680,
      chainageKm: 'Km 29.4'
    },
    debrisVolumeEstimatedM3: 8400,
    clearingAgency: 'Border Roads Organisation (BRO)',
    estimatedRestorationHours: 18,
    strandedVehiclesCount: 340,
    alternateBypassRoute: 'Siliguri → Lava → Gorubathan → Damdim → Reshi → Rhenock → Pakyong → Gangtok',
    bypassDistanceAddedKm: 58,
    trafficPriority: 'VITAL_MILITARY_AND_CIVIL',
    activeMonitoringSensors: {
      piezometers: 6,
      tiltmeters: 4,
      cctvMonitoring: true
    }
  },
  {
    id: 'HWY_NH29_NAG',
    highwayCode: 'NH-29',
    name: 'Dimapur - Kohima Asian Highway 1 Lifeline',
    route: 'Dimapur → Chumoukedima → Medziphema → Kohima → Mao Gate (Manipur border)',
    connectingStates: ['Nagaland', 'Manipur', 'Assam'],
    totalLengthKm: 78,
    criticalSection: 'Pagla Pahar (Old Chumoukedima Bridge section)',
    status: 'RESTRICTED',
    statusDescription: 'Single-lane movement permitted under BRO flag supervision. Active boulder roll and continuous mud seepage on uphill slope.',
    lastUpdated: '25 mins ago',
    blockageLocation: {
      name: 'Pagla Pahar Gorge',
      latitude: 25.7925,
      longitude: 93.7650,
      chainageKm: 'Km 18.2'
    },
    debrisVolumeEstimatedM3: 1200,
    clearingAgency: 'NHIDCL',
    estimatedRestorationHours: 4,
    strandedVehiclesCount: 85,
    alternateBypassRoute: 'Chumoukedima 7th Mile → Niuland → Kohima bypass via Peducha',
    bypassDistanceAddedKm: 32,
    trafficPriority: 'STRATEGIC_LIFELINE',
    activeMonitoringSensors: {
      piezometers: 4,
      tiltmeters: 3,
      cctvMonitoring: true
    }
  },
  {
    id: 'HWY_NH06_MEG',
    highwayCode: 'NH-06',
    name: 'Barak Valley & South NER Lifeline (GS Road & Jowai Corridor)',
    route: 'Guwahati (Jorabat) → Shillong → Jowai → Khliehriat → Sonapur → Badarpur / Silchar',
    connectingStates: ['Meghalaya', 'Assam', 'Tripura', 'Mizoram'],
    totalLengthKm: 298,
    criticalSection: 'Sonapur Tunnel Portal & Umkiang Limestone Escarpment',
    status: 'HIGH_RISK_WATCH',
    statusDescription: 'Continuous heavy rainfall (145mm/24h) in Jaintia Hills. Mud slurry spilling onto northern tunnel entrance. Heavy vehicles proceeding at 10 km/h with spotters.',
    lastUpdated: '18 mins ago',
    blockageLocation: {
      name: 'Sonapur Tunnel Mouth',
      latitude: 25.1120,
      longitude: 92.3680,
      chainageKm: 'Km 142.6'
    },
    debrisVolumeEstimatedM3: 450,
    clearingAgency: 'NHIDCL',
    estimatedRestorationHours: 2,
    strandedVehiclesCount: 120,
    alternateBypassRoute: 'Shillong → Dawki → Tamabil → Karimganj (Restricted capacity border route)',
    bypassDistanceAddedKm: 74,
    trafficPriority: 'STRATEGIC_LIFELINE',
    activeMonitoringSensors: {
      piezometers: 8,
      tiltmeters: 6,
      cctvMonitoring: true
    }
  },
  {
    id: 'HWY_NH54_MIZ',
    highwayCode: 'NH-54 / NH-306',
    name: 'Mizoram National Supply Lifeline',
    route: 'Silchar (Assam) → Vairengte → Kolasib → Bawngkawn → Aizawl',
    connectingStates: ['Mizoram', 'Assam'],
    totalLengthKm: 180,
    criticalSection: 'Kolasib - Rengtekawn Sinking Zone (Chainage Km 85 - 94)',
    status: 'RESTRICTED',
    statusDescription: 'Pavement subsidence of 45cm recorded. Only light commercial vehicles (LCV) and emergency medical ambulances allowed. Heavy trucks held at Vairengte check-gate.',
    lastUpdated: '35 mins ago',
    blockageLocation: {
      name: 'Rengtekawn Subsidence Slope',
      latitude: 24.1820,
      longitude: 92.6840,
      chainageKm: 'Km 88.1'
    },
    debrisVolumeEstimatedM3: 850,
    clearingAgency: 'State PWD',
    estimatedRestorationHours: 8,
    strandedVehiclesCount: 190,
    alternateBypassRoute: 'Kolasib → Bilkhawthlir → Bairabi bypass railway road',
    bypassDistanceAddedKm: 42,
    trafficPriority: 'STRATEGIC_LIFELINE',
    activeMonitoringSensors: {
      piezometers: 3,
      tiltmeters: 2,
      cctvMonitoring: false
    }
  },
  {
    id: 'HWY_NH13_ARU',
    highwayCode: 'NH-13',
    name: 'Trans-Arunachal Strategic Himalayan Highway',
    route: 'Potin → Ziro → Daporijo → Along → Pangin → Pasighat',
    connectingStates: ['Arunachal Pradesh', 'Assam'],
    totalLengthKm: 420,
    criticalSection: 'Potin to Yazali Gorge & Siyom River Cut',
    status: 'CLEAR',
    statusDescription: 'Road open for two-way traffic. Intermittent rockfall netting inspected and cleared by BRO Task Force 756.',
    lastUpdated: '50 mins ago',
    clearingAgency: 'Border Roads Organisation (BRO)',
    alternateBypassRoute: 'North Lakhimpur → Banderdewa → Itanagar → Gohpur',
    bypassDistanceAddedKm: 65,
    trafficPriority: 'VITAL_MILITARY_AND_CIVIL',
    activeMonitoringSensors: {
      piezometers: 5,
      tiltmeters: 4,
      cctvMonitoring: true
    }
  },
  {
    id: 'HWY_NH02_MNP',
    highwayCode: 'NH-02',
    name: 'Imphal - Kohima - Mao North Arterial Corridor',
    route: 'Mao Gate → Maram → Senapati → Kangpokpi → Sekmai → Imphal',
    connectingStates: ['Manipur', 'Nagaland'],
    totalLengthKm: 110,
    criticalSection: 'Maram Bazar & Kangpokpi Ridge Slope Cut',
    status: 'CLEAR',
    statusDescription: 'Open for all traffic categories. Slope drainage channels clear. Rainfall within green threshold (28mm).',
    lastUpdated: '1 hour ago',
    clearingAgency: 'State PWD',
    alternateBypassRoute: 'None viable for heavy commercial vehicles',
    bypassDistanceAddedKm: 0,
    trafficPriority: 'STRATEGIC_LIFELINE',
    activeMonitoringSensors: {
      piezometers: 3,
      tiltmeters: 2,
      cctvMonitoring: true
    }
  },
  {
    id: 'HWY_NH08_TRI',
    highwayCode: 'NH-08',
    name: 'Tripura - Assam National Highway',
    route: 'Churaibari (Assam border) → Dharmanagar → Kumarghat → Teliamura → Agartala',
    connectingStates: ['Tripura', 'Assam'],
    totalLengthKm: 198,
    criticalSection: 'Baramura Hill Range & Atharamura Pass',
    status: 'CLEAR',
    statusDescription: 'Open and dry. Normal vehicular speeds permitted. Road maintenance patrols on standby.',
    lastUpdated: '40 mins ago',
    clearingAgency: 'NHIDCL',
    alternateBypassRoute: 'Khowai → Kamalpur state arterial link',
    bypassDistanceAddedKm: 28,
    trafficPriority: 'REGIONAL_COMMERCE',
    activeMonitoringSensors: {
      piezometers: 2,
      tiltmeters: 2,
      cctvMonitoring: true
    }
  }
];
