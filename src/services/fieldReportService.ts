export interface FieldReport {
  id: string;
  reporterName: string;
  reporterRole: 'BRO Engineer' | 'DDMA Official' | 'Village Gaon Burha' | 'Citizen Scout' | 'NDRF Patrol';
  contactPhone: string;
  state: string;
  district: string;
  landmark: string;
  latitude: number;
  longitude: number;
  hazardType:
    | 'Tension Cracks on Hillside'
    | 'Mud / Slurry Seepage from Slope Toe'
    | 'Minor Rockfall / Boulder Inundation'
    | 'Road Subsidence / Sinking Pavement'
    | 'Culvert / Mountain Drain Blockage'
    | 'Retaining Wall Bulging / Shear Failure';
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  roadBlocked: boolean;
  blockedHighway?: string;
  estimatedAffectedHouseholds?: number;
  notes: string;
  timestamp: string;
  syncedToCloud: boolean;
  photoUrl?: string;
}

const STORAGE_KEY = 'geoalert_field_reports_v1';

export class FieldReportService {
  private static initialReports: FieldReport[] = [
    {
      id: 'REP_NER_001',
      reporterName: 'Capt. R. Thapa (BRO Project Swastik)',
      reporterRole: 'BRO Engineer',
      contactPhone: '+91 94360 21984',
      state: 'Sikkim',
      district: 'Mangan',
      landmark: 'Chungthang - Lachen Road Km 14',
      latitude: 27.6042,
      longitude: 88.6475,
      hazardType: 'Road Subsidence / Sinking Pavement',
      severity: 'CRITICAL',
      roadBlocked: true,
      blockedHighway: 'NH-10 Link to North Sikkim',
      estimatedAffectedHouseholds: 180,
      notes: 'Road surface displaced vertically by 60cm after 4 hours of cloudburst. Tension cracks propagating across uphill hillside.',
      timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
      syncedToCloud: true
    },
    {
      id: 'REP_NER_002',
      reporterName: 'Lianchama (Village Council Secretary)',
      reporterRole: 'Village Gaon Burha',
      contactPhone: '+91 98622 71109',
      state: 'Mizoram',
      district: 'Aizawl',
      landmark: 'Bawngkawn North Slope Settlement',
      latitude: 23.7540,
      longitude: 92.7310,
      hazardType: 'Mud / Slurry Seepage from Slope Toe',
      severity: 'HIGH',
      roadBlocked: false,
      estimatedAffectedHouseholds: 35,
      notes: 'Muddy red water spurting out from retaining wall weep holes. 4 residential houses instructed to move to community hall.',
      timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
      syncedToCloud: true
    },
    {
      id: 'REP_NER_003',
      reporterName: 'Debabrata Barman (DDMA Field Scout)',
      reporterRole: 'DDMA Official',
      contactPhone: '+91 97741 83204',
      state: 'Assam',
      district: 'Dima Hasao',
      landmark: 'Jatinga Valley Cutting near Haflong',
      latitude: 25.1200,
      longitude: 93.0300,
      hazardType: 'Minor Rockfall / Boulder Inundation',
      severity: 'MODERATE',
      roadBlocked: false,
      blockedHighway: 'Haflong - Silchar Road',
      estimatedAffectedHouseholds: 10,
      notes: 'Sporadic shale fragments rolling down road cutting. Cautionary signage erected by SDRF scout.',
      timestamp: new Date(Date.now() - 195 * 60 * 1000).toISOString(),
      syncedToCloud: true
    }
  ];

  public static getReports(): FieldReport[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return this.initialReports;
  }

  public static addReport(report: Omit<FieldReport, 'id' | 'timestamp' | 'syncedToCloud'>, isOnline: boolean): FieldReport {
    const newReport: FieldReport = {
      ...report,
      id: `REP_NER_${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      syncedToCloud: isOnline
    };

    const current = this.getReports();
    const updated = [newReport, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return newReport;
  }

  public static syncPendingReports(): { syncedCount: number; remainingCount: number } {
    const current = this.getReports();
    let synced = 0;
    const updated = current.map((r) => {
      if (!r.syncedToCloud) {
        synced++;
        return { ...r, syncedToCloud: true };
      }
      return r;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return { syncedCount: synced, remainingCount: 0 };
  }

  public static getPendingSyncCount(): number {
    const reports = this.getReports();
    return reports.filter((r) => !r.syncedToCloud).length;
  }
}
