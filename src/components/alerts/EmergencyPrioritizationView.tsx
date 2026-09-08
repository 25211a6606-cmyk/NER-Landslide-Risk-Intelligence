import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Users,
  Ambulance,
  PhoneCall,
  Send,
  CheckCircle2,
  Clock,
  Radio,
  Building2,
  HardHat,
  Filter,
  FileSpreadsheet,
  Globe2,
  Zap
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';
import { MultilingualService, SupportedLanguage } from '../../services/multilingualService';

interface EmergencyPrioritizationViewProps {
  locations: MonitoredLocation[];
  onSelectLocation?: (loc: MonitoredLocation) => void;
  isLightMode?: boolean;
}

interface TriageSite {
  location: MonitoredLocation;
  triageScore: number;
  priorityTier: 'TIER_1_CRITICAL' | 'TIER_2_HIGH' | 'TIER_3_ELEVATED' | 'TIER_4_MONITORED';
  evacuationRecommended: boolean;
  isolationRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: string;
  ndrfAssignedUnit: string;
}

export const EmergencyPrioritizationView: React.FC<EmergencyPrioritizationViewProps> = ({
  locations,
  onSelectLocation,
  isLightMode = false
}) => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [activeTier, setActiveTier] = useState<string>('ALL');
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');
  const [dispatchedSites, setDispatchedSites] = useState<Record<string, boolean>>({});

  // Compute multi-criteria emergency response priority for each location
  const triageList: TriageSite[] = locations.map((loc) => {
    const riskFactor = loc.prediction.riskScore / 100;
    const popFactor = Math.min(1, loc.exposure.estimatedVulnerablePopulation / 8000);
    const rainFactor = Math.min(1, loc.rainfall.today / 120);
    const faultFactor = (loc.environmental.faultDistanceKm || 5) < 3 ? 0.9 : 0.4;

    // Multi-factor equation: 40% Risk + 30% Population + 20% Rain Deluge + 10% Fault Proximity
    const triageScore = Math.round(
      (riskFactor * 0.4 + popFactor * 0.3 + rainFactor * 0.2 + faultFactor * 0.1) * 100
    );

    let priorityTier: 'TIER_1_CRITICAL' | 'TIER_2_HIGH' | 'TIER_3_ELEVATED' | 'TIER_4_MONITORED' = 'TIER_4_MONITORED';
    let isolationRisk: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    let evacuationRecommended = false;
    let recommendedAction = 'Routine slope drainage surveillance and gauge logging.';
    let ndrfAssignedUnit = 'SDRF District Patrol';

    if (triageScore >= 75 || loc.prediction.riskLevel === 'WARNING') {
      priorityTier = 'TIER_1_CRITICAL';
      isolationRisk = 'HIGH';
      evacuationRecommended = true;
      recommendedAction =
        'Execute immediate community evacuation along lower toe sectors; stage heavy earthmovers at arterial junction.';
      ndrfAssignedUnit = '1st Bn NDRF (Patgaon / Guwahati Quick Reaction Team)';
    } else if (triageScore >= 55 || loc.prediction.riskLevel === 'WATCH') {
      priorityTier = 'TIER_2_HIGH';
      isolationRisk = 'MEDIUM';
      evacuationRecommended = false;
      recommendedAction =
        'Sound pre-emptive siren alert; place SDRF boat and rope rescue teams on 15-minute standby.';
      ndrfAssignedUnit = '12th Bn NDRF (Doimukh / Itanagar Taskforce)';
    } else if (triageScore >= 40) {
      priorityTier = 'TIER_3_ELEVATED';
      isolationRisk = 'LOW';
      recommendedAction = 'Issue weather-linked road travel restriction and verify satellite link.';
      ndrfAssignedUnit = 'District Civil Defense Volunteers';
    }

    return {
      location: loc,
      triageScore,
      priorityTier,
      evacuationRecommended,
      isolationRisk,
      recommendedAction,
      ndrfAssignedUnit
    };
  });

  // Sort by triage score descending
  const sortedTriage = [...triageList].sort((a, b) => b.triageScore - a.triageScore);

  const filteredTriage = sortedTriage.filter((item) => {
    const matchesState = selectedState === 'ALL' || item.location.state === selectedState;
    const matchesTier = activeTier === 'ALL' || item.priorityTier === activeTier;
    return matchesState && matchesTier;
  });

  const tier1Count = triageList.filter((t) => t.priorityTier === 'TIER_1_CRITICAL').length;
  const tier2Count = triageList.filter((t) => t.priorityTier === 'TIER_2_HIGH').length;
  const tier3Count = triageList.filter((t) => t.priorityTier === 'TIER_3_ELEVATED').length;

  const handleDispatchAlert = (siteId: string) => {
    setDispatchedSites((prev) => ({ ...prev, [siteId]: true }));
  };

  const template = MultilingualService.getTemplate(selectedLang);

  return (
    <div className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-rose-500/20 text-rose-500 border border-rose-500/30">
              Disaster Response Triage Engine
            </span>
            <span className="text-xs text-slate-400">NDMA / SDMA Priority Matrix</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-1 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            Emergency Response & Evacuation Prioritisation
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl">
            Automated multi-factor hazard scoring factoring in real-time rainfall deluges, vulnerable settlements, highway isolation risk, and hospital transit corridors for instant NDRF/SDRF mobilization.
          </p>
        </div>

        {/* Tier Count Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-rose-500 font-bold uppercase">Priority 1 (Red)</div>
            <div className="text-xl font-black text-rose-500">{tier1Count} Sites</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-amber-500 font-bold uppercase">Priority 2 (Amber)</div>
            <div className="text-xl font-black text-amber-500">{tier2Count} Sites</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-cyan-400 font-bold uppercase">Priority 3 (Watch)</div>
            <div className="text-xl font-black text-cyan-400">{tier3Count} Sites</div>
          </div>
        </div>
      </div>

      {/* Multilingual Notification Preview Strip */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isLightMode ? 'bg-indigo-50/70 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'}`}>
        <div className="flex items-start gap-3">
          <Globe2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Multilingual Emergency Broadcast Simulator
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              <strong>{template.criticalAlertTitle}:</strong> {template.evacuationNotice}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">Broadcast Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value as SupportedLanguage)}
            className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
              isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-200'
            }`}
          >
            <option value="en">English (Official)</option>
            <option value="as">অসমীয়া (Assamese)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mni">মৈতৈলোন্ (Manipuri)</option>
            <option value="lus">Mizo ṭawng (Mizo)</option>
            <option value="bn">বাংলা (Bengali)</option>
          </select>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          <span className="font-semibold text-slate-400">State:</span>
          {['ALL', 'Sikkim', 'Meghalaya', 'Assam', 'Arunachal Pradesh', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedState === st
                  ? 'bg-rose-600 text-white shadow-sm'
                  : isLightMode
                  ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400">Tier:</span>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'TIER_1_CRITICAL', label: 'Priority 1 (Red)' },
            { id: 'TIER_2_HIGH', label: 'Priority 2 (Amber)' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTier(t.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeTier === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isLightMode
                  ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prioritization Queue Table / Cards */}
      <div className="space-y-3">
        {filteredTriage.slice(0, 15).map((item, idx) => {
          const isTier1 = item.priorityTier === 'TIER_1_CRITICAL';
          const isTier2 = item.priorityTier === 'TIER_2_HIGH';
          const isDispatched = dispatchedSites[item.location.id];

          return (
            <div
              key={item.location.id}
              className={`p-4 rounded-xl border transition-all ${
                isTier1
                  ? isLightMode
                    ? 'bg-rose-50/50 border-rose-300 shadow-sm'
                    : 'bg-rose-950/15 border-rose-500/40 shadow-md'
                  : isTier2
                  ? isLightMode
                    ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                    : 'bg-amber-950/15 border-amber-500/40'
                  : isLightMode
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      Rank #{idx + 1}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                        isTier1
                          ? 'bg-rose-500 text-white shadow-sm animate-pulse'
                          : isTier2
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isTier1 ? 'IMMEDIATE EVACUATION & DEPLOYMENT' : isTier2 ? 'PRE-EMPTIVE ADVISORY & STANDBY' : 'ELEVATED SURVEILLANCE'}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {item.location.district}, {item.location.state}
                    </span>
                  </div>

                  <h3 className="text-base font-bold flex items-center gap-2">
                    {item.location.name}
                    <span className="text-xs font-normal text-slate-400">({item.location.latitude.toFixed(3)}°N, {item.location.longitude.toFixed(3)}°E)</span>
                  </h3>

                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    <strong>Action:</strong> {item.recommendedAction}
                  </p>
                </div>

                {/* Score & Telemetry Mini Stats */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`p-2 rounded-lg border text-center min-w-[80px] ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Triage Score</div>
                    <div className={`text-xl font-black ${isTier1 ? 'text-rose-500' : isTier2 ? 'text-amber-400' : 'text-slate-200'}`}>
                      {item.triageScore}/100
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border text-center min-w-[80px] ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Vulnerable Pop</div>
                    <div className="text-sm font-bold text-slate-200">
                      {item.location.exposure.estimatedVulnerablePopulation.toLocaleString()}
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg border text-center min-w-[80px] ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">24h Deluge</div>
                    <div className="text-sm font-bold text-cyan-400">{item.location.rainfall.today.toFixed(1)} mm</div>
                  </div>

                  {/* Dispatch Action Button */}
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleDispatchAlert(item.location.id)}
                      disabled={isDispatched}
                      className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isDispatched
                          ? 'bg-emerald-600 text-white cursor-default'
                          : isTier1
                          ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/30 active:scale-95'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      }`}
                    >
                      {isDispatched ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Dispatched to NDRF
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Mobilize Unit
                        </>
                      )}
                    </button>

                    {onSelectLocation && (
                      <button
                        onClick={() => onSelectLocation(item.location)}
                        className={`text-[11px] font-semibold underline text-center ${isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Inspect Sensors
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Task Force & Critical Facilities */}
              <div className="mt-3 pt-2.5 border-t border-dashed border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  Assigned Force: <strong className="text-slate-200">{item.ndrfAssignedUnit}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Ambulance className="w-3.5 h-3.5 text-rose-400" />
                  Isolation Hazard: <strong className={item.isolationRisk === 'HIGH' ? 'text-rose-400' : 'text-slate-300'}>{item.isolationRisk}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  Medical Facilities: {item.location.exposure.hospitals} Hospitals
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
