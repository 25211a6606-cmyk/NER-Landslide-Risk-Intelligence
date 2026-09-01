import { NERState, RiskLevel } from './location';

export interface AlertItem {
  id: string;
  locationId: string;
  locationName: string;
  state: NERState;
  district: string;
  riskLevel: RiskLevel;
  riskScore: number;
  triggerReason: string;
  affectedRadiusKm: number;
  affectedSubscribersCount: number;
  recommendedAction: string;
  timestamp: string;
  status: 'ACTIVE' | 'RESOLVED' | 'NORMALIZED';
  smsDispatchedCount: number;
  coordinates: [number, number];
}

export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  state: NERState;
  district: string;
  locationArea: string;
  alertRadiusKm: number; // 1, 5, 10, 25
  alertType: 'WATCH' | 'WARNING' | 'BOTH';
  subscribedAt: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export interface SMSDeliveryLog {
  id: string;
  alertId: string;
  subscriberId: string;
  recipientName: string;
  phone: string;
  messageText: string;
  locationName: string;
  riskLevel: RiskLevel;
  dispatchedAt: string;
  status: 'SENT' | 'DELIVERED' | 'PENDING' | 'FAILED';
  carrierGateway: string;
  latencyMs: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'WARNING' | 'WATCH' | 'SYSTEM' | 'SMS' | 'INFO';
  timestamp: string;
  read: boolean;
  actionLocationId?: string;
}
