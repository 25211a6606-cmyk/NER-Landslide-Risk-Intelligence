import { INITIAL_ALERTS, INITIAL_SUBSCRIBERS } from '../data/initialAlerts';
import { AlertItem, Subscriber, SystemNotification } from '../types/alert';
import { MonitoredLocation, RiskLevel } from '../types/location';
import { smsService } from './smsService';

export class AlertService {
  private alerts: AlertItem[] = [...INITIAL_ALERTS];
  private subscribers: Subscriber[] = [...INITIAL_SUBSCRIBERS];
  private notifications: SystemNotification[] = [
    {
      id: 'NOTIF_01',
      title: 'Active Warning: Mangan - Chungthang Highway',
      message: 'Mangan North Sikkim corridor reached Risk Score 95/100 (Critical 520 mm 7D rainfall).',
      type: 'WARNING',
      timestamp: '20:32 IST',
      read: false,
      actionLocationId: 'SIK_001'
    },
    {
      id: 'NOTIF_02',
      title: 'SMS Alerts Dispatched (18 Recipients)',
      message: 'Emergency SMS sent to PWD officers & SDMA teams in North Sikkim alert zone.',
      type: 'SMS',
      timestamp: '20:33 IST',
      read: false
    },
    {
      id: 'NOTIF_03',
      title: 'Active Warning: Noney Tupul Site',
      message: 'Manipur Disang shale saturation trigger reached 94/100.',
      type: 'WARNING',
      timestamp: '20:25 IST',
      read: false,
      actionLocationId: 'MAN_001'
    },
    {
      id: 'NOTIF_04',
      title: 'IMD GPM Rainfall Raster Sync',
      message: 'High resolution 0.1° satellite rainfall grid updated across all 8 NER states.',
      type: 'SYSTEM',
      timestamp: '20:00 IST',
      read: true
    }
  ];

  public getAllAlerts(): AlertItem[] {
    return [...this.alerts];
  }

  public getActiveAlerts(): AlertItem[] {
    return this.alerts.filter((a) => a.status === 'ACTIVE');
  }

  public getSubscribers(): Subscriber[] {
    return [...this.subscribers];
  }

  public getNotifications(): SystemNotification[] {
    return [...this.notifications];
  }

  public markNotificationAsRead(id: string): void {
    const n = this.notifications.find((item) => item.id === id);
    if (n) n.read = true;
  }

  public markAllNotificationsAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  public addSubscriber(sub: Omit<Subscriber, 'id' | 'subscribedAt' | 'active'>): Subscriber {
    const newSubscriber: Subscriber = {
      ...sub,
      id: `SUB_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      subscribedAt: new Date().toISOString(),
      active: true
    };
    this.subscribers.unshift(newSubscriber);

    // Also add a system notification
    this.notifications.unshift({
      id: `NOTIF_${Date.now()}`,
      title: 'New Alert Subscription Activated',
      message: `${newSubscriber.name} (${newSubscriber.phone}) registered for ${newSubscriber.alertType} alerts in ${newSubscriber.district}, ${newSubscriber.state} (Radius: ${newSubscriber.alertRadiusKm} km).`,
      type: 'INFO',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      read: false
    });

    return newSubscriber;
  }

  /**
   * Broadcasts an emergency alert, finds subscribers in radius, triggers mock SMS, and updates alerts list
   */
  public async broadcastAlertForLocation(
    location: MonitoredLocation,
    overrideRiskLevel?: RiskLevel,
    customMessage?: string,
    options?: {
      radiusKm?: number;
      recommendedAction?: string;
      customSmsTemplate?: string;
    }
  ): Promise<{ alert: AlertItem; affectedSubscribersCount: number; smsSentCount: number }> {
    const riskLevel = overrideRiskLevel ?? location.prediction.riskLevel;
    const affectedRadiusKm = options?.radiusKm ?? 10;

    // Find subscribers in radius or region
    const matchedSubscribers = smsService.findSubscribersInRadius(
      location.latitude,
      location.longitude,
      affectedRadiusKm,
      riskLevel,
      this.subscribers,
      location.state,
      location.district
    );

    const alertId = `ALT_${Date.now()}`;
    const defaultAction = riskLevel === 'WARNING'
      ? 'Enforce emergency mountain road closures; alert local SDMA and NDRF battalions.'
      : 'Maintain heightened monitoring along slope drainage cuts.';

    const newAlert: AlertItem = {
      id: alertId,
      locationId: location.id,
      locationName: location.name,
      state: location.state,
      district: location.district,
      riskLevel,
      riskScore: location.prediction.riskScore,
      triggerReason: customMessage ?? location.prediction.explanationPoints[0] ?? 'Critical threshold breach',
      affectedRadiusKm,
      affectedSubscribersCount: matchedSubscribers.length,
      recommendedAction: options?.recommendedAction || defaultAction,
      timestamp: new Date().toISOString(),
      status: 'ACTIVE',
      smsDispatchedCount: 0,
      coordinates: [location.latitude, location.longitude]
    };

    this.alerts.unshift(newAlert);

    // Dispatch SMS via service
    const smsLogs = await smsService.dispatchBulkAlertSMS(
      newAlert,
      this.subscribers,
      options?.customSmsTemplate
    );
    newAlert.smsDispatchedCount = smsLogs.length;

    // Push system notifications
    this.notifications.unshift({
      id: `NOTIF_ALT_${Date.now()}`,
      title: `Emergency ${riskLevel}: ${location.name}`,
      message: `Landslide early warning triggered for ${location.district}, ${location.state}. Risk Score: ${location.prediction.riskScore}/100.`,
      type: riskLevel === 'WARNING' ? 'WARNING' : 'WATCH',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
      read: false,
      actionLocationId: location.id
    });

    if (smsLogs.length > 0) {
      this.notifications.unshift({
        id: `NOTIF_SMS_${Date.now()}`,
        title: `SMS Dispatched (${smsLogs.length} Recipients)`,
        message: `Early warning SMS delivered to ${smsLogs.length} verified mobile numbers within ${affectedRadiusKm} km radius of ${location.name}.`,
        type: 'SMS',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        read: false
      });
    }

    return {
      alert: newAlert,
      affectedSubscribersCount: matchedSubscribers.length,
      smsSentCount: smsLogs.length
    };
  }

  public resolveAlert(alertId: string): void {
    const alert = this.alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = 'RESOLVED';
      this.notifications.unshift({
        id: `NOTIF_RES_${Date.now()}`,
        title: `Alert Resolved: ${alert.locationName}`,
        message: `Hazard warning for ${alert.district}, ${alert.state} marked as resolved. Ground stability restored.`,
        type: 'INFO',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        read: false
      });
    }
  }
}

export const alertService = new AlertService();
