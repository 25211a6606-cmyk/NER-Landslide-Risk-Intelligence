export type RoadHazardCategory =
  | 'ROAD_BLOCKED'
  | 'POTHOLES_CRATERS'
  | 'ROCKFALL_BOULDERS'
  | 'ROAD_SUBSIDENCE'
  | 'WATER_MUD_SLURRY'
  | 'RETAINING_WALL_COLLAPSE';

export type PassabilityStatus =
  | 'COMPLETELY_BLOCKED'
  | 'SINGLE_LANE_RESTRICTED'
  | 'PASSABLE_WITH_CAUTION'
  | 'HAZARD_DEVELOPING';

export interface RoadHazardReport {
  id: string;
  highwayId?: string; // Matches HighwayLifeline id (e.g. 'HWY_NH10_SIK')
  highwayCode: string; // e.g. 'NH-10'
  highwayName?: string;
  category: RoadHazardCategory;
  passability: PassabilityStatus;
  state: string;
  district: string;
  landmarkOrChainage: string;
  latitude?: number;
  longitude?: number;
  description: string;
  reportedBy: string;
  reporterRole:
    | 'Commuter / Driver'
    | 'Local Taxi Operator'
    | 'Commercial Trucker'
    | 'Local Resident'
    | 'PWD / Field Volunteer'
    | 'BRO Patrol Scout';
  contactPhone?: string;
  potholeSeverity?: 'SHALLOW' | 'DEEP_DANGEROUS' | 'TIRE_DAMAGE_CRATERS';
  estimatedStrandedVehicles?: number;
  timestamp: string;
  timeAgo: string;
  upvotes: number;
  userUpvoted?: boolean;
  status: 'ACTIVE_REPORT' | 'VERIFIED_BY_AUTHORITY' | 'CLEARED_REPAIRED';
  clearedBy?: string;
}

const STORAGE_KEY = 'ner_community_road_hazard_reports_v1';

const INITIAL_REPORTS: RoadHazardReport[] = [
  {
    id: 'HAZ_001',
    highwayId: 'HWY_NH10_SIK',
    highwayCode: 'NH-10',
    highwayName: 'Sikkim Main Lifeline Corridor',
    category: 'ROAD_BLOCKED',
    passability: 'COMPLETELY_BLOCKED',
    state: 'Sikkim',
    district: 'Kalimpong / Pakyong',
    landmarkOrChainage: '29th Mile, between Sevoke and Teesta Bazar',
    latitude: 27.062,
    longitude: 88.468,
    description: 'Massive landslide debris and rocks blocking both lanes. Teesta river level high at the road toe. No vehicle movement possible. Wait at Sevoke or divert via Lava.',
    reportedBy: 'Kunzang Sherpa',
    reporterRole: 'Local Taxi Operator',
    contactPhone: '+91 98320 44219',
    estimatedStrandedVehicles: 140,
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    timeAgo: '25 mins ago',
    upvotes: 24,
    status: 'VERIFIED_BY_AUTHORITY'
  },
  {
    id: 'HAZ_002',
    highwayId: 'HWY_NH10_SIK',
    highwayCode: 'NH-10',
    highwayName: 'Sikkim Main Lifeline Corridor',
    category: 'POTHOLES_CRATERS',
    passability: 'PASSABLE_WITH_CAUTION',
    state: 'Sikkim',
    district: 'Pakyong',
    landmarkOrChainage: 'Near 32nd Mile / Rangpo entry stretch',
    latitude: 27.175,
    longitude: 88.528,
    description: 'Continuous deep potholes and water-filled craters extending over 80 meters. Low ground clearance cars scraping undercarriage. Heavy trucks moving at 5 km/h.',
    reportedBy: 'Pranay Chettri',
    reporterRole: 'Commuter / Driver',
    potholeSeverity: 'DEEP_DANGEROUS',
    timestamp: new Date(Date.now() - 48 * 60 * 1000).toISOString(),
    timeAgo: '48 mins ago',
    upvotes: 11,
    status: 'ACTIVE_REPORT'
  },
  {
    id: 'HAZ_003',
    highwayId: 'HWY_NH29_NAG',
    highwayCode: 'NH-29',
    highwayName: 'Dimapur - Kohima Asian Highway 1 Lifeline',
    category: 'ROCKFALL_BOULDERS',
    passability: 'SINGLE_LANE_RESTRICTED',
    state: 'Nagaland',
    district: 'Chumoukedima',
    landmarkOrChainage: 'Pagla Pahar gorge, near Old Bridge Km 18.2',
    latitude: 25.7925,
    longitude: 93.765,
    description: 'Intermittent loose boulders rolling down from cut slope. Single lane operating under local flagmen. Do not stop vehicles in the rockfall hazard zone.',
    reportedBy: 'T. Jamir',
    reporterRole: 'Commercial Trucker',
    contactPhone: '+91 94360 88210',
    estimatedStrandedVehicles: 45,
    timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    timeAgo: '1 hour ago',
    upvotes: 18,
    status: 'ACTIVE_REPORT'
  },
  {
    id: 'HAZ_004',
    highwayId: 'HWY_NH06_MEG',
    highwayCode: 'NH-06',
    highwayName: 'Barak Valley & South NER Lifeline',
    category: 'WATER_MUD_SLURRY',
    passability: 'PASSABLE_WITH_CAUTION',
    state: 'Meghalaya',
    district: 'East Jaintia Hills',
    landmarkOrChainage: 'Sonapur Tunnel northern approach Km 142.6',
    latitude: 25.112,
    longitude: 92.368,
    description: 'Thick slurry of limestone mud and rainwater overflowing the highway drain. Road extremely slippery. Heavy two-wheeler skidding risk.',
    reportedBy: 'D. Shullai',
    reporterRole: 'Local Resident',
    timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    timeAgo: '1.5 hours ago',
    upvotes: 8,
    status: 'ACTIVE_REPORT'
  },
  {
    id: 'HAZ_005',
    highwayId: 'HWY_NH54_MIZ',
    highwayCode: 'NH-54 / NH-306',
    highwayName: 'Mizoram National Supply Lifeline',
    category: 'ROAD_SUBSIDENCE',
    passability: 'SINGLE_LANE_RESTRICTED',
    state: 'Mizoram',
    district: 'Kolasib',
    landmarkOrChainage: 'Rengtekawn Sinking Zone Km 88.1',
    latitude: 24.182,
    longitude: 92.684,
    description: 'Valley side of the road sunken by roughly 40-50 cm. Big cracks developing along center white line. PWD has placed wooden pegs and red flags.',
    reportedBy: 'Lalrinsanga',
    reporterRole: 'PWD / Field Volunteer',
    contactPhone: '+91 98623 11502',
    estimatedStrandedVehicles: 30,
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    timeAgo: '2 hours ago',
    upvotes: 15,
    status: 'VERIFIED_BY_AUTHORITY'
  }
];

export class RoadHazardReportService {
  public static getReports(): RoadHazardReport[] {
    if (typeof window === 'undefined') return INITIAL_REPORTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
        return INITIAL_REPORTS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_REPORTS;
    }
  }

  public static addReport(
    reportData: Omit<RoadHazardReport, 'id' | 'timestamp' | 'timeAgo' | 'upvotes' | 'status'>
  ): RoadHazardReport {
    const existing = this.getReports();
    const newReport: RoadHazardReport = {
      ...reportData,
      id: `HAZ_${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      upvotes: 1,
      userUpvoted: true,
      status: 'ACTIVE_REPORT'
    };

    const updated = [newReport, ...existing];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save road hazard report to localStorage', e);
    }

    return newReport;
  }

  public static upvoteReport(reportId: string): RoadHazardReport[] {
    const existing = this.getReports();
    const updated = existing.map((r) => {
      if (r.id === reportId) {
        const isUpvoted = !!r.userUpvoted;
        return {
          ...r,
          upvotes: isUpvoted ? Math.max(1, r.upvotes - 1) : r.upvotes + 1,
          userUpvoted: !isUpvoted
        };
      }
      return r;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update upvote in localStorage', e);
    }

    return updated;
  }

  public static markAsCleared(reportId: string, clearedBy: string = 'BRO / Local PWD Crew'): RoadHazardReport[] {
    const existing = this.getReports();
    const updated = existing.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'CLEARED_REPAIRED' as const,
          clearedBy,
          passability: 'PASSABLE_WITH_CAUTION' as const
        };
      }
      return r;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update status in localStorage', e);
    }

    return updated;
  }
}
