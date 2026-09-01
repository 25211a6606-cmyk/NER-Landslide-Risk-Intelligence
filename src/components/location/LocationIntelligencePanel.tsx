import React, { useState } from 'react';
import {
  X,
  MapPin,
  Mountain,
  Compass,
  Layers,
  CloudRain,
  ShieldAlert,
  Building2,
  Activity,
  History,
  Send,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ExternalLink,
  BrainCircuit,
  Maximize2
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';
import { alertService } from '../../services/alertService';
import { RainfallService } from '../../services/rainfallService';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface LocationIntelligencePanelProps {
  location: MonitoredLocation | null;
  onClose: () => void;
  onOpenHistoryView?: (location: MonitoredLocation) => void;
  onOpenSubscribeView?: (location: MonitoredLocation) => void;
  onAlertDispatched?: () => void;
  isLightMode?: boolean;
}

export const LocationIntelligencePanel: React.FC<LocationIntelligencePanelProps> = ({
  location,
  onClose,
  onOpenHistoryView,
  onOpenSubscribeView,
  onAlertDispatched,
  isLightMode = true
}) => {
  const [isSendingSMS, setIsSendingSMS] = useState(false);
  const [smsResult, setSmsResult] = useState<{
    success: boolean;
    smsSentCount: number;
    subscribersCount: number;
  } | null>(null);

  if (!location) return null;

  const isWarning = location.prediction.riskLevel === 'WARNING';
  const isWatch = location.prediction.riskLevel === 'WATCH';
  const riskBadgeColor = isWarning
    ? 'bg-rose-100 text-rose-800 border-rose-300'
    : isWatch
    ? 'bg-amber-100 text-amber-900 border-amber-300'
    : 'bg-emerald-100 text-emerald-800 border-emerald-300';

  // 7-day mini chart data
  const miniTimelineData = RainfallService.getHistoricalTimeSeries(location, 7);

  const handleTestSMSDispatch = async () => {
    setIsSendingSMS(true);
    setSmsResult(null);
    try {
      const res = await alertService.broadcastAlertForLocation(location, 'WARNING');
      setSmsResult({
        success: true,
        smsSentCount: res.smsSentCount,
        subscribersCount: res.affectedSubscribersCount
      });
      if (onAlertDispatched) {
        onAlertDispatched();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSendingSMS(false);
    }
  };

  return (
    <div
      className={`w-full lg:w-96 xl:w-[420px] border-l h-full flex flex-col justify-between overflow-hidden shadow-2xl z-20 shrink-0 transition-colors ${
        isLightMode
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}
    >
      {/* Panel Top Header */}
      <div
        className={`p-4 border-b flex items-start justify-between ${
          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}
      >
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {location.district}, {location.state}
          </div>
          <h2
            className={`text-base font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            {location.name}
          </h2>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
            {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E • Elev: {location.environmental.elevation}m
          </div>
        </div>

        <button
          onClick={onClose}
          className={`p-1.5 rounded-lg border transition-colors ${
            isLightMode
              ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Core Risk Score & Trigger Summary Card */}
        <div
          className={`p-3.5 rounded-xl border space-y-3 ${
            isLightMode ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold font-mono text-slate-500 uppercase">CURRENT RISK SCORE</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${riskBadgeColor}`}>
              {location.prediction.riskLevel} • {location.prediction.riskScore}/100
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isWarning ? 'bg-rose-500' : isWatch ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${location.prediction.riskScore}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            <div className={`p-2 rounded border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Susceptibility</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">
                {Math.round(location.prediction.susceptibilityScore * 100)}%
              </div>
            </div>
            <div className={`p-2 rounded border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Trigger Level</div>
              <div className="text-xs font-bold text-cyan-700 mt-0.5">
                {location.rainfall.triggerLevel}
              </div>
            </div>
            <div className={`p-2 rounded border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Antecedent</div>
              <div className="text-xs font-bold text-amber-700 mt-0.5">
                {Math.round(location.rainfall.antecedentRainfallIndex)}/100
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Static Environmental Features */}
        <div>
          <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <Mountain className="w-3.5 h-3.5 text-emerald-600" />
            Static Geotechnical Features
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Elevation</div>
              <div className="font-bold text-slate-800 mt-0.5 font-mono">
                {location.environmental.elevation} m
              </div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Slope Gradient</div>
              <div className="font-bold text-slate-800 mt-0.5 font-mono">
                {location.environmental.slope}° ({location.environmental.aspect})
              </div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Fault Proximity</div>
              <div className="font-bold text-slate-800 mt-0.5 font-mono">
                {location.environmental.faultDistanceKm} km
              </div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[10px] text-slate-500">Land Cover</div>
              <div className="font-bold text-slate-800 mt-0.5 truncate" title={location.environmental.landCover}>
                {location.environmental.landCover}
              </div>
            </div>
          </div>

          <div className={`p-2.5 rounded-lg border mt-2 space-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            <div className="text-[10px] text-slate-500">Lithology & Geology Unit</div>
            <div className="font-semibold text-slate-800 leading-snug">
              {location.environmental.geology}
            </div>
            <div className="text-[11px] text-slate-600 mt-1">
              Soil: <span className="font-medium text-slate-700">{location.environmental.soil}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Dynamic Rainfall & Antecedent Analysis */}
        <div>
          <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <CloudRain className="w-3.5 h-3.5 text-cyan-600" />
            Dynamic Rainfall & Antecedent Timeline
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center font-mono mb-2.5">
            <div className={`p-2 rounded border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[9px] text-slate-500">TODAY</div>
              <div className="text-xs font-bold text-cyan-700 mt-0.5">
                {location.rainfall.today}mm
              </div>
            </div>
            <div className={`p-2 rounded border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[9px] text-slate-500">3-DAY</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">
                {location.rainfall.last3Days}mm
              </div>
            </div>
            <div className={`p-2 rounded border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[9px] text-slate-500">7-DAY</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">
                {location.rainfall.last7Days}mm
              </div>
            </div>
            <div className={`p-2 rounded border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[9px] text-slate-500">30-DAY</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">
                {location.rainfall.last30Days}mm
              </div>
            </div>
          </div>

          {/* Mini 7-Day Rainfall Trend Chart */}
          <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
              <span>7-Day Rainfall Timeline (mm)</span>
              <span className="text-cyan-700 font-bold">Peak: {location.rainfall.max1Day}mm</span>
            </div>
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniTimelineData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="dayLabel" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: isLightMode ? '#ffffff' : '#0f172a',
                      borderColor: isLightMode ? '#cbd5e1' : '#334155',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: isLightMode ? '#0f172a' : '#f8fafc'
                    }}
                  />
                  <Area type="monotone" dataKey="rainfallMm" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#rainGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section 3: Model Explainability (SHAP Contributions) */}
        <div>
          <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
            Model Explainability & Primary Factors
          </div>

          <div className={`p-3 rounded-lg border space-y-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            <div className="text-[11px] text-slate-600 leading-relaxed">
              {location.prediction.explanationPoints[0]}
            </div>

            {/* SHAP Factor Bars */}
            <div className="space-y-2 pt-1 border-t border-slate-200">
              {location.prediction.shapContributions.map((shap, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-600 truncate max-w-[200px]">{shap.feature}</span>
                    <span className="text-amber-800 font-bold">{shap.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${shap.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Infrastructure & Population Exposure */}
        <div>
          <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Infrastructure & Settlement Exposure
          </div>

          <div className={`p-3 rounded-lg border space-y-2.5 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-500 font-mono">NEARBY ROAD CORRIDORS</div>
              {location.exposure.roadSegments.map((road, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded border ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{road.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {road.type} • Distance: {road.distanceMeters}m
                    </div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      road.trafficVulnerability === 'HIGH'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {road.trafficVulnerability} VULN
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center font-mono">
              <div className={`p-1.5 rounded ${isLightMode ? 'bg-white border border-slate-200' : 'bg-slate-900'}`}>
                <div className="text-[9px] text-slate-500">Pop. Exposed</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {location.exposure.estimatedVulnerablePopulation}
                </div>
              </div>
              <div className={`p-1.5 rounded ${isLightMode ? 'bg-white border border-slate-200' : 'bg-slate-900'}`}>
                <div className="text-[9px] text-slate-500">Hospitals</div>
                <div className="font-bold text-cyan-700 mt-0.5">
                  {location.exposure.hospitals}
                </div>
              </div>
              <div className={`p-1.5 rounded ${isLightMode ? 'bg-white border border-slate-200' : 'bg-slate-900'}`}>
                <div className="text-[9px] text-slate-500">Schools</div>
                <div className="font-bold text-amber-800 mt-0.5">
                  {location.exposure.schools}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live SMS Test Result Feedback */}
        {smsResult && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Early Warning SMS Dispatched!
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Delivered emergency alerts to <strong>{smsResult.smsSentCount}</strong> registered subscribers within the 10km radius zone.
            </p>
          </div>
        )}
      </div>

      {/* Panel Bottom Action Bar */}
      <div className={`p-3 border-t flex items-center gap-2 shrink-0 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
        <button
          onClick={handleTestSMSDispatch}
          disabled={isSendingSMS}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
        >
          <Send className={`w-3.5 h-3.5 ${isSendingSMS ? 'animate-spin' : ''}`} />
          {isSendingSMS ? 'Dispatching SMS...' : 'Broadcast Alert SMS'}
        </button>

        {onOpenHistoryView && (
          <button
            onClick={() => onOpenHistoryView(location)}
            title="Open Historical Trends"
            className={`p-2 rounded-lg border transition-colors ${
              isLightMode
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <History className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
