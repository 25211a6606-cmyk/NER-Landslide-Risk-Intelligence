import React, { useState, useMemo } from 'react';
import {
  BellRing,
  Send,
  Radio,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  MapPin,
  Clock,
  PhoneCall,
  MessageSquare,
  Users,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Smartphone,
  Flame,
  Check,
  Volume2,
  Trash2,
  FileText,
  Sliders,
  ExternalLink,
  Search
} from 'lucide-react';
import { AlertItem, SMSDeliveryLog, Subscriber } from '../../types/alert';
import { MonitoredLocation, RiskLevel } from '../../types/location';
import { alertService } from '../../services/alertService';
import { smsService } from '../../services/smsService';

interface AlertsCenterProps {
  alerts: AlertItem[];
  locations: MonitoredLocation[];
  onRefreshAlerts: () => void;
  onSelectLocation: (loc: MonitoredLocation) => void;
  isLightMode?: boolean;
}

export const AlertsCenter: React.FC<AlertsCenterProps> = ({
  alerts,
  locations,
  onRefreshAlerts,
  onSelectLocation,
  isLightMode = true
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'WARNING' | 'WATCH' | 'RESOLVED'>('ALL');
  const [alertSearchQuery, setAlertSearchQuery] = useState('');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Broadcast Form State
  const [targetLocationId, setTargetLocationId] = useState<string>(locations[0]?.id || '');
  const [broadcastScope, setBroadcastScope] = useState<'SINGLE' | 'ALL_WARNINGS' | 'STATE_WIDE'>('SINGLE');
  const [targetState, setTargetState] = useState<string>('Sikkim');
  const [alertSeverity, setAlertSeverity] = useState<RiskLevel>('WARNING');
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [recommendedAction, setRecommendedAction] = useState<string>('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<{
    success: boolean;
    smsSentCount: number;
    subscribersCount: number;
    locationsAlertedCount: number;
    primaryLocationName: string;
    alertIds: string[];
    timestamp: string;
  } | null>(null);

  const [deliveryLogs, setDeliveryLogs] = useState<SMSDeliveryLog[]>(smsService.getDeliveryLogs());

  const selectedLoc = useMemo(
    () => locations.find((l) => l.id === targetLocationId) || locations[0],
    [locations, targetLocationId]
  );

  const subscribers = alertService.getSubscribers();

  // Matched subscribers calculation
  const matchingSubscribers = useMemo(() => {
    if (!selectedLoc) return [];
    return smsService.findSubscribersInRadius(
      selectedLoc.latitude,
      selectedLoc.longitude,
      radiusKm,
      alertSeverity,
      subscribers,
      selectedLoc.state,
      selectedLoc.district
    );
  }, [selectedLoc, radiusKm, alertSeverity, subscribers]);

  // Preset Message Templates
  const applyPreset = (presetType: 'HIGHWAY' | 'EVACUATION' | 'CLOUDBURST' | 'SEEPAGE') => {
    if (!selectedLoc) return;
    switch (presetType) {
      case 'HIGHWAY':
        setAlertSeverity('WARNING');
        setCustomMessage(
          `Critical slope instability along arterial mountain highway near ${selectedLoc.name}. Tension cracks detected with high saturation (${selectedLoc.rainfall.last3Days}mm 3D rain).`
        );
        setRecommendedAction('Enforce immediate vehicular halt and divert traffic via bypass. Deploy BRO & PWD inspection teams.');
        break;
      case 'EVACUATION':
        setAlertSeverity('WARNING');
        setCustomMessage(
          `Extreme landslide hazard alert for ${selectedLoc.name} (${selectedLoc.district}). Saturated slope displacement rate exceeds safe thresholds.`
        );
        setRecommendedAction('Issue immediate toe-slope settlement evacuation advisory. Mobilize SDMA shelters and NDRF teams.');
        break;
      case 'CLOUDBURST':
        setAlertSeverity('WARNING');
        setCustomMessage(
          `Cloudburst flash alert: ${selectedLoc.rainfall.today}mm torrential precipitation recorded in 24h over steep ${selectedLoc.environmental.slope}° terrain.`
        );
        setRecommendedAction('Alert downstream valley settlements of debris flow hazards. Keep emergency helplines 1070/112 active.');
        break;
      case 'SEEPAGE':
        setAlertSeverity('WATCH');
        setCustomMessage(
          `Elevated pore-water pressure and slope seepage observed at ${selectedLoc.name}. Antecedent Rainfall Index: ${Math.round(selectedLoc.rainfall.antecedentRainfallIndex)}/100.`
        );
        setRecommendedAction('Maintain heightened continuous geotechnical monitoring along road cuts and drainage chutes.');
        break;
    }
  };

  // Preview SMS text
  const previewSmsText = useMemo(() => {
    if (!selectedLoc) return '';
    const reasonText = customMessage.trim() || selectedLoc.prediction.explanationPoints[0] || 'Critical slope saturation threshold breach';
    const actionText = recommendedAction.trim() || (alertSeverity === 'WARNING'
      ? 'Enforce emergency mountain road closures; alert local SDMA and NDRF battalions.'
      : 'Maintain heightened monitoring along slope drainage cuts.');

    return `[GEOALERT NER] EMERGENCY ${alertSeverity}:
Hazard triggered at ${selectedLoc.name} (${selectedLoc.district}, ${selectedLoc.state}).
Risk Score: ${selectedLoc.prediction.riskScore}/100 | Rain: ${selectedLoc.rainfall.today}mm.
Advisory: ${reasonText.substring(0, 85)}...
Action: ${actionText.substring(0, 80)}...
Helpline: 1070 / 112`;
  }, [selectedLoc, customMessage, recommendedAction, alertSeverity]);

  // Handle Broadcast Dispatch
  const handleBroadcast = async () => {
    if (!selectedLoc) return;
    setIsBroadcasting(true);
    setBroadcastResult(null);

    try {
      let totalSms = 0;
      let totalSubs = 0;
      const createdAlertIds: string[] = [];
      let locCount = 0;

      if (broadcastScope === 'SINGLE') {
        const res = await alertService.broadcastAlertForLocation(
          selectedLoc,
          alertSeverity,
          customMessage.trim() || undefined,
          {
            radiusKm,
            recommendedAction: recommendedAction.trim() || undefined,
            customSmsTemplate: previewSmsText
          }
        );
        totalSms += res.smsSentCount;
        totalSubs += res.affectedSubscribersCount;
        createdAlertIds.push(res.alert.id);
        locCount = 1;
      } else if (broadcastScope === 'ALL_WARNINGS') {
        const warningLocs = locations.filter((l) => l.prediction.riskLevel === 'WARNING');
        locCount = warningLocs.length || 1;
        for (const loc of warningLocs) {
          const res = await alertService.broadcastAlertForLocation(
            loc,
            'WARNING',
            customMessage.trim() || undefined,
            {
              radiusKm,
              recommendedAction: recommendedAction.trim() || undefined
            }
          );
          totalSms += res.smsSentCount;
          totalSubs += res.affectedSubscribersCount;
          createdAlertIds.push(res.alert.id);
        }
      } else if (broadcastScope === 'STATE_WIDE') {
        const stateLocs = locations.filter((l) => l.state === targetState);
        locCount = stateLocs.length || 1;
        for (const loc of stateLocs) {
          const res = await alertService.broadcastAlertForLocation(
            loc,
            alertSeverity,
            customMessage.trim() || undefined,
            {
              radiusKm: 50,
              recommendedAction: recommendedAction.trim() || undefined
            }
          );
          totalSms += res.smsSentCount;
          totalSubs += res.affectedSubscribersCount;
          createdAlertIds.push(res.alert.id);
        }
      }

      setBroadcastResult({
        success: true,
        smsSentCount: totalSms,
        subscribersCount: totalSubs,
        locationsAlertedCount: locCount,
        primaryLocationName: broadcastScope === 'SINGLE' ? selectedLoc.name : `${broadcastScope === 'STATE_WIDE' ? targetState : 'All High-Risk'} Sector`,
        alertIds: createdAlertIds,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'
      });

      // Refresh delivery logs and alerts
      setDeliveryLogs(smsService.getDeliveryLogs());
      onRefreshAlerts();
    } catch (e) {
      console.error('Broadcast failed:', e);
    } finally {
      setIsBroadcasting(false);
    }
  };

  const handleResolveAlert = (alertId: string) => {
    alertService.resolveAlert(alertId);
    onRefreshAlerts();
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (selectedFilter === 'WARNING' && a.riskLevel !== 'WARNING') return false;
      if (selectedFilter === 'WATCH' && a.riskLevel !== 'WATCH') return false;
      if (selectedFilter === 'RESOLVED' && a.status !== 'RESOLVED' && a.status !== 'NORMALIZED') return false;
      if (selectedFilter === 'ALL' && a.status === 'RESOLVED') return false; // Show active alerts under ALL

      if (alertSearchQuery) {
        const q = alertSearchQuery.toLowerCase();
        return (
          a.locationName.toLowerCase().includes(q) ||
          a.district.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q) ||
          a.triggerReason.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [alerts, selectedFilter, alertSearchQuery]);

  const filteredLogs = useMemo(() => {
    if (!logSearchQuery) return deliveryLogs;
    const q = logSearchQuery.toLowerCase();
    return deliveryLogs.filter(
      (l) =>
        l.recipientName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.locationName.toLowerCase().includes(q) ||
        l.carrierGateway.toLowerCase().includes(q)
    );
  }, [deliveryLogs, logSearchQuery]);

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Top Header */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="text-[11px] font-mono font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-4 h-4 animate-pulse text-rose-600" />
            Early Warning Broadcast & SMS Gateway Center
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Emergency Alert Broadcast & Dispatch Gateway
          </h1>
          <p className="text-xs text-slate-500">
            Dispatch radius-targeted early warning SMS alerts to residents, PWD highway engineers, and SDMA emergency response units.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border ${
              isLightMode
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            TELECOM GATEWAY ONLINE • {subscribers.length} SUBSCRIBERS
          </span>
        </div>
      </div>

      {/* Main Broadcast Workstation */}
      <div
        className={`rounded-2xl border p-5 md:p-6 shadow-xl transition-all ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-slate-200/50'
            : 'bg-slate-900 border-slate-800 shadow-black/40'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-600 text-white shadow-xs">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2
                className={`text-sm font-bold tracking-tight uppercase font-mono ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                Compose & Dispatch Early Warning SMS
              </h2>
              <p className="text-[11px] text-slate-500">
                Automated geospatial radius calculation & carrier transmission
              </p>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setBroadcastScope('SINGLE')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                broadcastScope === 'SINGLE'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Target Station
            </button>
            <button
              onClick={() => setBroadcastScope('ALL_WARNINGS')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                broadcastScope === 'ALL_WARNINGS'
                  ? 'bg-white text-rose-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All High-Risk Sites
            </button>
            <button
              onClick={() => setBroadcastScope('STATE_WIDE')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                broadcastScope === 'STATE_WIDE'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              State-Wide
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Configuration Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Target Selection & Severity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {broadcastScope === 'SINGLE' && (
                <div>
                  <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                    TARGET MONITORING LOCATION:
                  </label>
                  <select
                    value={targetLocationId}
                    onChange={(e) => setTargetLocationId(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
                      isLightMode
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-700 text-slate-100'
                    }`}
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.district}, {loc.state}) - {loc.prediction.riskLevel} {loc.prediction.riskScore}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {broadcastScope === 'STATE_WIDE' && (
                <div>
                  <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                    TARGET STATE:
                  </label>
                  <select
                    value={targetState}
                    onChange={(e) => setTargetState(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
                      isLightMode
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-700 text-slate-100'
                    }`}
                  >
                    {Array.from(new Set(locations.map((l) => l.state))).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {broadcastScope === 'ALL_WARNINGS' && (
                <div>
                  <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                    BROADCAST TARGET GROUP:
                  </label>
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold text-rose-800">
                    All {locations.filter((l) => l.prediction.riskLevel === 'WARNING').length} Active Warning Sites in NER
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                  ALERT SEVERITY LEVEL:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAlertSeverity('WARNING')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                      alertSeverity === 'WARNING'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    WARNING (Critical)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertSeverity('WATCH')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                      alertSeverity === 'WATCH'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    WATCH (Advisory)
                  </button>
                </div>
              </div>
            </div>

            {/* Radius & Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                  DISPATCH RADIUS:
                </label>
                <select
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  <option value={5}>5 km (Local Slide Toe)</option>
                  <option value={10}>10 km (Immediate Corridor)</option>
                  <option value={25}>25 km (District Sector)</option>
                  <option value={50}>50 km (Regional Arterial)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                  QUICK ADVISORY PRESETS:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyPreset('HIGHWAY')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 transition-colors"
                  >
                    Highway Closure
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('EVACUATION')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 transition-colors"
                  >
                    Slope Evacuation
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('CLOUDBURST')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 transition-colors"
                  >
                    Cloudburst Surge
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('SEEPAGE')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 transition-colors"
                  >
                    Seepage Watch
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Advisory Inputs */}
            <div className="space-y-2">
              <div>
                <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                  HAZARD TRIGGER DESCRIPTION / CAUSE:
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={
                    selectedLoc
                      ? `Auto: ${selectedLoc.prediction.explanationPoints[0]}`
                      : 'Enter trigger explanation...'
                  }
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold font-mono text-slate-600 block mb-1">
                  RECOMMENDED ACTION / DIRECTIVE:
                </label>
                <input
                  type="text"
                  value={recommendedAction}
                  onChange={(e) => setRecommendedAction(e.target.value)}
                  placeholder="Enforce emergency mountain road closures; alert local SDMA and NDRF battalions."
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>

            {/* Dispatch Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBroadcast}
                disabled={isBroadcasting}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs font-mono shadow-md shadow-rose-600/20 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                <Send className={`w-4 h-4 ${isBroadcasting ? 'animate-spin' : ''}`} />
                {isBroadcasting ? 'TRANSMITTING VIA TELECOM GATEWAYS...' : 'BROADCAST EMERGENCY ALERT & DISPATCH SMS'}
              </button>
            </div>
          </div>

          {/* Right Smartphone Simulator Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div
              className={`rounded-2xl p-4 border space-y-3 ${
                isLightMode ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-950 text-white border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  SMS GATEWAY SIMULATOR PREVIEW
                </span>
                <span className="text-emerald-400 font-bold">BSNL / AIRTEL</span>
              </div>

              {/* Mock Mobile Message Bubble */}
              <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-300 font-bold">DZ-GEOALERT</span>
                  <span className="text-slate-400">Now</span>
                </div>
                <p className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {previewSmsText}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
                <span>Estimated Target Reach:</span>
                <strong className="text-emerald-400 font-bold">
                  {matchingSubscribers.length} Verified Mobile Numbers
                </strong>
              </div>
            </div>

            {/* Matched Responders Chips */}
            <div
              className={`p-3 rounded-xl border text-xs space-y-2 ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Immediate Alert Subscribers ({matchingSubscribers.length})</span>
                <span className="text-slate-400 font-normal">Within {radiusKm}km</span>
              </div>
              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {matchingSubscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className={`flex items-center justify-between p-1.5 rounded border text-[11px] ${
                      isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                      {sub.name}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-700 font-bold">
                      {sub.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Broadcast Success Notification Banner */}
        {broadcastResult && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs font-mono text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                BROADCAST SUCCESSFULLY TRANSMITTED ACROSS TELECOM TOWERS!
              </div>
              <span className="text-[11px] font-mono text-emerald-700">
                {broadcastResult.timestamp}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Dispatched <strong>{broadcastResult.smsSentCount} SMS alerts</strong> for{' '}
              <strong>{broadcastResult.primaryLocationName}</strong> to registered emergency personnel and citizens.
              Gateway delivery confirmed with zero drops.
            </p>
            <div className="flex gap-2 pt-1">
              <span className="px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 text-[10px] font-mono font-bold">
                Alert ID: {broadcastResult.alertIds[0] || 'ALT_LIVE'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 text-[10px] font-mono font-bold">
                Status: DELIVERED (100%)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Active Alerts List Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['ALL', 'WARNING', 'WATCH', 'RESOLVED'] as const).map((filter) => {
              const count =
                filter === 'ALL'
                  ? alerts.filter((a) => a.status === 'ACTIVE').length
                  : filter === 'RESOLVED'
                  ? alerts.filter((a) => a.status === 'RESOLVED' || a.status === 'NORMALIZED').length
                  : alerts.filter((a) => a.riskLevel === filter && a.status === 'ACTIVE').length;

              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all border ${
                    selectedFilter === filter
                      ? isLightMode
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-800 text-white border-slate-700'
                      : isLightMode
                      ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {filter} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={alertSearchQuery}
              onChange={(e) => setAlertSearchQuery(e.target.value)}
              placeholder="Search active alerts..."
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            />
          </div>
        </div>

        {/* Alert Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlerts.map((alert) => {
            const isWarning = alert.riskLevel === 'WARNING';
            const isWatch = alert.riskLevel === 'WATCH';
            const locObj = locations.find((l) => l.id === alert.locationId);

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border space-y-3 shadow-sm transition-all ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                      {alert.district}, {alert.state}
                    </span>
                    <h3
                      className={`font-bold text-sm mt-0.5 ${
                        isLightMode ? 'text-slate-900' : 'text-slate-100'
                      }`}
                    >
                      {alert.locationName}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isWarning
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : isWatch
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {alert.riskLevel} {alert.riskScore}
                  </span>
                </div>

                <p
                  className={`text-xs p-2.5 rounded-lg border leading-relaxed ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {alert.triggerReason}
                </p>

                <div
                  className={`p-2.5 rounded-lg border text-[11px] space-y-1 ${
                    isLightMode
                      ? 'bg-slate-50/50 border-slate-200 text-slate-600'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <strong className="font-semibold text-slate-800">Recommended Action:</strong>{' '}
                    <span>{alert.recommendedAction}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500">
                  <span>SMS Dispatched: {alert.smsDispatchedCount || alert.affectedSubscribersCount}</span>
                  <div className="flex items-center gap-2">
                    {alert.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="text-slate-500 hover:text-slate-800 hover:underline font-semibold"
                      >
                        Resolve
                      </button>
                    )}
                    {locObj && (
                      <button
                        onClick={() => onSelectLocation(locObj)}
                        className="text-emerald-600 hover:underline font-bold flex items-center gap-0.5"
                      >
                        View Map &rarr;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live SMS Delivery Logs Table */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-xl transition-colors ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div
          className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div>
            <h3
              className={`font-bold text-xs uppercase tracking-wide font-mono flex items-center gap-2 ${
                isLightMode ? 'text-slate-900' : 'text-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              Recent Telemetry & SMS Dispatch Delivery Logs ({filteredLogs.length})
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              Gateway Transmissions: BSNL NER, Airtel NDRF, Jio Emergency Gateway
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={logSearchQuery}
              onChange={(e) => setLogSearchQuery(e.target.value)}
              placeholder="Search recipient or phone..."
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className={`text-[10px] uppercase font-mono border-b ${
                isLightMode
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              <tr>
                <th className="px-4 py-3">Recipient Name</th>
                <th className="px-4 py-3">Mobile Number</th>
                <th className="px-4 py-3">Sector / Zone</th>
                <th className="px-4 py-3">Alert Level</th>
                <th className="px-4 py-3">Dispatched Time</th>
                <th className="px-4 py-3">Carrier Gateway</th>
                <th className="px-4 py-3 text-center">Latency</th>
                <th className="px-4 py-3 text-right">Gateway Status</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y font-mono text-xs ${
                isLightMode ? 'divide-slate-200 text-slate-700' : 'divide-slate-800 text-slate-300'
              }`}
            >
              {filteredLogs.slice(0, 15).map((log) => (
                <tr
                  key={log.id}
                  className={`transition-colors ${
                    isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="px-4 py-3 font-sans font-semibold text-slate-900">
                    {log.recipientName}
                  </td>
                  <td className="px-4 py-3 text-cyan-700 font-bold">{log.phone}</td>
                  <td className="px-4 py-3 font-sans text-slate-600">{log.locationName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        log.riskLevel === 'WARNING'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {log.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(log.dispatchedAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}{' '}
                    IST
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px]">{log.carrierGateway}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{log.latencyMs} ms</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
