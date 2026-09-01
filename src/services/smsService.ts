import { AlertItem, SMSDeliveryLog, Subscriber } from '../types/alert';
import { RiskLevel } from '../types/location';

export interface ISMSService {
  sendSMS(params: {
    recipientPhone: string;
    recipientName: string;
    messageText: string;
    locationName: string;
    riskLevel: RiskLevel;
    alertId: string;
    subscriberId: string;
  }): Promise<SMSDeliveryLog>;

  findSubscribersInRadius(
    locationLat: number,
    locationLng: number,
    radiusKm: number,
    riskLevel: RiskLevel,
    subscribers: Subscriber[],
    locationState?: string,
    locationDistrict?: string
  ): Subscriber[];

  dispatchBulkAlertSMS(
    alert: AlertItem,
    subscribers: Subscriber[],
    customMessageTemplate?: string
  ): Promise<SMSDeliveryLog[]>;

  getDeliveryLogs(): SMSDeliveryLog[];
  clearLogs(): void;
}

// Haversine formula for exact distance between two coordinates in km
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Initial realistic delivery logs for the initial alerts
const INITIAL_LOGS: SMSDeliveryLog[] = [
  {
    id: 'SMS_LOG_INIT_01',
    alertId: 'ALT_2026_0901_01',
    subscriberId: 'SUB_003',
    recipientName: 'Tenzing Lepcha (Border Roads Liaison)',
    phone: '+91 97740 51299',
    messageText: '[GEOALERT EMERGENCY] Critical 95/100 landslide risk at Mangan - Chungthang Highway. Enforce road closures. SDMA: 1070.',
    locationName: 'Mangan - Chungthang Highway Pass',
    riskLevel: 'WARNING',
    dispatchedAt: new Date(Date.now() - 3600000).toISOString(),
    status: 'DELIVERED',
    carrierGateway: 'BSNL-NER-GATEWAY',
    latencyMs: 142
  },
  {
    id: 'SMS_LOG_INIT_02',
    alertId: 'ALT_2026_0901_02',
    subscriberId: 'SUB_007',
    recipientName: 'Kamei Gaidon (N.F. Railway Site Engineer)',
    phone: '+91 98561 77209',
    messageText: '[GEOALERT EMERGENCY] 94/100 risk at Noney Tupul Railway Construction Site. Evacuate portal zone. Helpline: 1070.',
    locationName: 'Noney Tupul Railway Construction Site',
    riskLevel: 'WARNING',
    dispatchedAt: new Date(Date.now() - 4200000).toISOString(),
    status: 'DELIVERED',
    carrierGateway: 'AIRTEL-TELECOM-NDRF',
    latencyMs: 165
  },
  {
    id: 'SMS_LOG_INIT_03',
    alertId: 'ALT_2026_0901_03',
    subscriberId: 'SUB_005',
    recipientName: 'Neiketou Angami (Nagaland PWD Highway Div)',
    phone: '+91 94360 03412',
    messageText: '[GEOALERT EMERGENCY] 93/100 risk at Kohima - Dzükou Valley & NH-29 Bypass. Divert heavy vehicles via bypass.',
    locationName: 'Kohima - Dzükou Valley & NH-29 Bypass',
    riskLevel: 'WARNING',
    dispatchedAt: new Date(Date.now() - 4800000).toISOString(),
    status: 'DELIVERED',
    carrierGateway: 'JIO-EMERGENCY-SMS',
    latencyMs: 118
  },
  {
    id: 'SMS_LOG_INIT_04',
    alertId: 'ALT_2026_0901_04',
    subscriberId: 'SUB_001',
    recipientName: 'Rahul Sharma (PWD Assistant Engineer)',
    phone: '+91 98621 44510',
    messageText: '[GEOALERT EMERGENCY] 89/100 risk at Cherrapunji (Sohra). Extreme rainfall (114.5mm). Monitor NH-106 approach.',
    locationName: 'Cherrapunji (Sohra)',
    riskLevel: 'WARNING',
    dispatchedAt: new Date(Date.now() - 6000000).toISOString(),
    status: 'DELIVERED',
    carrierGateway: 'BSNL-NER-GATEWAY',
    latencyMs: 135
  }
];

class MockSMSService implements ISMSService {
  private deliveryLogs: SMSDeliveryLog[] = [...INITIAL_LOGS];

  public findSubscribersInRadius(
    locationLat: number,
    locationLng: number,
    radiusKm: number,
    riskLevel: RiskLevel,
    subscribers: Subscriber[],
    locationState?: string,
    locationDistrict?: string
  ): Subscriber[] {
    const activeSubscribers = subscribers.filter((sub) => sub.active);

    // 1. First pass: exact GPS distance match
    const matched = activeSubscribers.filter((sub) => {
      // Check alert type preference
      if (sub.alertType === 'WARNING' && riskLevel !== 'WARNING') return false;
      if (sub.alertType === 'WATCH' && riskLevel !== 'WATCH' && riskLevel !== 'WARNING') return false;

      const effectiveRadius = Math.max(radiusKm, sub.alertRadiusKm);
      const distance = calculateDistanceKm(
        locationLat,
        locationLng,
        sub.latitude,
        sub.longitude
      );

      return distance <= effectiveRadius;
    });

    // 2. Second pass: District/State level match if within broad region
    if (matched.length === 0 && (locationDistrict || locationState)) {
      const regionMatched = activeSubscribers.filter((sub) => {
        if (sub.alertType === 'WARNING' && riskLevel !== 'WARNING') return false;
        if (sub.district.toLowerCase() === locationDistrict?.toLowerCase()) return true;
        if (sub.state.toLowerCase() === locationState?.toLowerCase()) return true;
        return false;
      });
      if (regionMatched.length > 0) {
        return regionMatched;
      }
    }

    // 3. Fallback: Always ensure at least 2-4 verified emergency duty responders for the sector
    if (matched.length === 0) {
      const emergencyResponders: Subscriber[] = [
        {
          id: `RESP_SDMA_${locationDistrict || 'HQ'}`,
          name: `Duty Officer (${locationDistrict || 'District'} SDMA Control)`,
          phone: '+91 94350 11070',
          state: (locationState as any) || 'Sikkim',
          district: locationDistrict || 'Central',
          locationArea: `${locationDistrict || 'District'} Emergency Ops Center`,
          alertRadiusKm: 50,
          alertType: 'BOTH',
          subscribedAt: new Date().toISOString(),
          latitude: locationLat,
          longitude: locationLng,
          active: true
        },
        {
          id: `RESP_PWD_${locationDistrict || 'HWY'}`,
          name: `Executive Engineer (PWD Mountain Highways)`,
          phone: '+91 98620 99441',
          state: (locationState as any) || 'Sikkim',
          district: locationDistrict || 'Central',
          locationArea: `NH Division Corridor Control`,
          alertRadiusKm: 50,
          alertType: 'BOTH',
          subscribedAt: new Date().toISOString(),
          latitude: locationLat + 0.02,
          longitude: locationLng + 0.02,
          active: true
        },
        {
          id: `RESP_NDRF_${locationState || 'NER'}`,
          name: `1st & 12th NDRF Battalion Nodal Post`,
          phone: '+91 97740 00112',
          state: (locationState as any) || 'Sikkim',
          district: locationDistrict || 'Central',
          locationArea: `Regional Rapid Response Base`,
          alertRadiusKm: 100,
          alertType: 'BOTH',
          subscribedAt: new Date().toISOString(),
          latitude: locationLat - 0.02,
          longitude: locationLng - 0.02,
          active: true
        }
      ];
      return emergencyResponders;
    }

    return matched;
  }

  public async sendSMS(params: {
    recipientPhone: string;
    recipientName: string;
    messageText: string;
    locationName: string;
    riskLevel: RiskLevel;
    alertId: string;
    subscriberId: string;
  }): Promise<SMSDeliveryLog> {
    // Simulate real gateway network latency (80 - 200ms)
    await new Promise((resolve) => setTimeout(resolve, 100));

    const carriers = ['BSNL-NER-GATEWAY', 'AIRTEL-TELECOM-NDRF', 'JIO-EMERGENCY-SMS'];
    const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];

    const log: SMSDeliveryLog = {
      id: `SMS_LOG_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      alertId: params.alertId,
      subscriberId: params.subscriberId,
      recipientName: params.recipientName,
      phone: params.recipientPhone,
      messageText: params.messageText,
      locationName: params.locationName,
      riskLevel: params.riskLevel,
      dispatchedAt: new Date().toISOString(),
      status: 'DELIVERED',
      carrierGateway: randomCarrier,
      latencyMs: Math.floor(Math.random() * 60) + 95
    };

    this.deliveryLogs.unshift(log);
    return log;
  }

  public async dispatchBulkAlertSMS(
    alert: AlertItem,
    subscribers: Subscriber[],
    customMessageTemplate?: string
  ): Promise<SMSDeliveryLog[]> {
    const matchedSubscribers = this.findSubscribersInRadius(
      alert.coordinates[0],
      alert.coordinates[1],
      alert.affectedRadiusKm,
      alert.riskLevel,
      subscribers,
      alert.state,
      alert.district
    );

    const defaultTemplate = `[GEOALERT NER] EMERGENCY LANDSLIDE ${alert.riskLevel}:
High hazard triggered at ${alert.locationName} (${alert.district}, ${alert.state}).
Risk Score: ${alert.riskScore}/100.
Trigger: ${alert.triggerReason.substring(0, 95)}...
Action: ${alert.recommendedAction}
Avoid travel through vulnerable mountain corridors. Local SDMA Helpline: 1070 / 112.`;

    const messageText = customMessageTemplate?.trim() || defaultTemplate;
    const logs: SMSDeliveryLog[] = [];

    for (const sub of matchedSubscribers) {
      const log = await this.sendSMS({
        recipientPhone: sub.phone,
        recipientName: sub.name,
        messageText: messageText.replace('{NAME}', sub.name),
        locationName: alert.locationName,
        riskLevel: alert.riskLevel,
        alertId: alert.id,
        subscriberId: sub.id
      });
      logs.push(log);
    }

    return logs;
  }

  public getDeliveryLogs(): SMSDeliveryLog[] {
    return [...this.deliveryLogs];
  }

  public clearLogs(): void {
    this.deliveryLogs = [];
  }
}

export const smsService = new MockSMSService();

