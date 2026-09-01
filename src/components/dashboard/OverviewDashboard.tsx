import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Mountain,
  CloudRain,
  Building2,
  Radio,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Send,
  Sparkles,
  Compass,
  Search,
  Filter,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { MonitoredLocation, NERState, StateStats } from '../../types/location';
import { AlertItem } from '../../types/alert';
import { ActiveTab } from '../layout/Sidebar';
import { WholeIndiaMap } from '../map/WholeIndiaMap';

interface OverviewDashboardProps {
  locations: MonitoredLocation[];
  activeAlerts: AlertItem[];
  stateStats: Record<NERState, StateStats>;
  onNavigateTab: (tab: ActiveTab) => void;
  onFilterRiskOnMap: (risk: string) => void;
  onSelectLocation: (loc: MonitoredLocation) => void;
  onSelectState: (state: NERState) => void;
  isLightMode?: boolean;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  locations,
  activeAlerts,
  stateStats,
  onNavigateTab,
  onFilterRiskOnMap,
  onSelectLocation,
  onSelectState,
  isLightMode = true
}) => {
  const [siteSearch, setSiteSearch] = useState('');
  const [siteRiskFilter, setSiteRiskFilter] = useState<'ALL' | 'WARNING' | 'WATCH' | 'NORMAL'>('ALL');

  const totalLocations = locations.length;
  const warningLocations = locations.filter((l) => l.prediction.riskLevel === 'WARNING');
  const watchLocations = locations.filter((l) => l.prediction.riskLevel === 'WATCH');
  const normalLocations = locations.filter((l) => l.prediction.riskLevel === 'NORMAL');

  const totalRoads = locations.reduce((sum, l) => sum + l.exposure.roadSegments.length, 0);
  const totalSettlements = locations.reduce((sum, l) => sum + l.exposure.settlements.length, 0);
  const totalVulnerablePop = locations.reduce(
    (sum, l) => sum + l.exposure.estimatedVulnerablePopulation,
    0
  );

  // Filter locations for the live pinpoint matrix
  const filteredSites = locations.filter((loc) => {
    if (siteRiskFilter !== 'ALL' && loc.prediction.riskLevel !== siteRiskFilter) return false;
    if (siteSearch) {
      const q = siteSearch.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.exposure.roadSegments.some((r) => r.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'text-slate-900 bg-slate-50/50' : 'text-slate-100 bg-slate-950'
      }`}
    >
      {/* Header Operational Banner */}
      <div
        className={`p-5 md:p-6 rounded-2xl border transition-colors ${
          isLightMode
            ? 'bg-white border-slate-200 shadow-xs'
            : 'bg-slate-900 border-slate-800 shadow-lg'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              National Landslide Risk & Early Warning Network
            </div>
            <h1
              className={`text-xl md:text-2xl font-extrabold tracking-tight ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Location-Wise Real-Time Landslide Intelligence
            </h1>
            <p className={`text-xs md:text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Continuous pinpoint hazard telemetry integrating terrain slope, lithology, 24h satellite rainfall triggers, and national highway exposure across every monitored station.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('explorer')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Location Explorer
            </button>
            <button
              onClick={() => onNavigateTab('map')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              Launch GIS Map
            </button>
          </div>
        </div>

        {/* Prediction Formula Strip */}
        <div
          className={`mt-4 pt-3.5 border-t flex flex-wrap items-center gap-2 text-[11px] font-mono ${
            isLightMode ? 'border-slate-100 text-slate-600' : 'border-slate-800/80 text-slate-400'
          }`}
        >
          <span className="font-semibold text-slate-500">Hazard Weighting:</span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            Static Susceptibility (45%)
          </span>
          <span className="text-slate-400 font-bold">+</span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isLightMode ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 'bg-slate-950 border-slate-800 text-cyan-300'
            }`}
          >
            Dynamic Rainfall (40%)
          </span>
          <span className="text-slate-400 font-bold">+</span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isLightMode ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-950 border-slate-800 text-amber-300'
            }`}
          >
            Infrastructure Exposure (15%)
          </span>
          <span className="text-slate-400 font-bold">=</span>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-300 font-bold">
            Location Risk Score (0–100)
          </span>
        </div>
      </div>

      {/* 8 Clickable Key Operational Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* 1. Total Monitored Sites */}
        <button
          onClick={() => onNavigateTab('explorer')}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Total Sites</div>
          <div className={`text-xl font-extrabold mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            {totalLocations}
          </div>
          <div className="text-[10px] text-slate-500 group-hover:underline mt-1 font-medium">All Stations &rarr;</div>
        </button>

        {/* 2. High Risk / Warning Sites */}
        <button
          onClick={() => {
            onFilterRiskOnMap('WARNING');
            onNavigateTab('map');
          }}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-200 shadow-xs'
              : 'bg-rose-950/30 hover:bg-rose-950/50 border-rose-500/40'
          }`}
        >
          <div className="text-[10px] font-mono text-rose-700 uppercase font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Warning Sites
          </div>
          <div className="text-xl font-extrabold text-rose-700 mt-1">{warningLocations.length}</div>
          <div className="text-[10px] text-rose-700 group-hover:underline mt-1 font-medium">Filter Map &rarr;</div>
        </button>

        {/* 3. Watch Sites */}
        <button
          onClick={() => {
            onFilterRiskOnMap('WATCH');
            onNavigateTab('map');
          }}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-200 shadow-xs'
              : 'bg-amber-950/30 hover:bg-amber-950/50 border-amber-500/40'
          }`}
        >
          <div className="text-[10px] font-mono text-amber-800 uppercase font-semibold">Watch Sites</div>
          <div className="text-xl font-extrabold text-amber-800 mt-1">{watchLocations.length}</div>
          <div className="text-[10px] text-amber-800 group-hover:underline mt-1 font-medium">Filter Map &rarr;</div>
        </button>

        {/* 4. Normal Sites */}
        <button
          onClick={() => {
            onFilterRiskOnMap('NORMAL');
            onNavigateTab('map');
          }}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 shadow-xs'
              : 'bg-emerald-950/30 hover:bg-emerald-950/50 border-emerald-500/40'
          }`}
        >
          <div className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">Normal Sites</div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">{normalLocations.length}</div>
          <div className="text-[10px] text-emerald-700 group-hover:underline mt-1 font-medium">Filter Map &rarr;</div>
        </button>

        {/* 5. Active Early Warning Dispatches */}
        <button
          onClick={() => onNavigateTab('alerts')}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Active Alerts</div>
          <div className={`text-xl font-extrabold mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            {activeAlerts.length}
          </div>
          <div className="text-[10px] text-slate-500 group-hover:underline mt-1 font-medium">Alerts Log &rarr;</div>
        </button>

        {/* 6. Exposed Road Corridors */}
        <button
          onClick={() => onNavigateTab('infrastructure')}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Exposed NH</div>
          <div className={`text-xl font-extrabold mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            {totalRoads}
          </div>
          <div className="text-[10px] text-slate-500 group-hover:underline mt-1 font-medium">Corridors &rarr;</div>
        </button>

        {/* 7. Exposed Settlements */}
        <button
          onClick={() => onNavigateTab('infrastructure')}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Settlements</div>
          <div className={`text-xl font-extrabold mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            {totalSettlements}
          </div>
          <div className="text-[10px] text-slate-500 group-hover:underline mt-1 font-medium">Exposure &rarr;</div>
        </button>

        {/* 8. Vulnerable Population Covered */}
        <button
          onClick={() => onNavigateTab('subscribe')}
          className={`p-3 border rounded-xl text-left transition-all group ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-slate-900 hover:bg-slate-850 border-slate-800'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Pop. Covered</div>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">
            {(totalVulnerablePop / 1000).toFixed(0)}k
          </div>
          <div className="text-[10px] text-emerald-600 group-hover:underline mt-1 font-medium">SMS Ready</div>
        </button>
      </div>

      {/* Live Pinpoint Location Directory & Hazard Matrix */}
      <div
        className={`p-5 rounded-2xl border transition-colors ${
          isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <h2
                className={`text-sm font-bold uppercase tracking-wide font-mono ${
                  isLightMode ? 'text-slate-900' : 'text-slate-100'
                }`}
              >
                Pinpoint Landslide Monitoring Stations ({filteredSites.length})
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Direct live telemetry, dynamic risk score, 24h rainfall, and terrain gradient per station.
            </p>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Risk Tier Chips */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {(['ALL', 'WARNING', 'WATCH', 'NORMAL'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSiteRiskFilter(lvl)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                    siteRiskFilter === lvl
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search station or NH..."
                value={siteSearch}
                onChange={(e) => setSiteSearch(e.target.value)}
                className={`border rounded-lg pl-8 pr-3 py-1 text-xs focus:outline-none focus:border-slate-400 font-mono ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    : 'bg-slate-950 border-slate-700 text-slate-200 placeholder-slate-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
          {filteredSites.slice(0, 12).map((loc) => {
            const isWarning = loc.prediction.riskLevel === 'WARNING';
            const isWatch = loc.prediction.riskLevel === 'WATCH';
            return (
              <div
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onNavigateTab('location');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2.5 group ${
                  isLightMode
                    ? 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase truncate">
                      {loc.district} • {loc.state}
                    </div>
                    <h3
                      className={`font-bold text-xs transition-colors truncate ${
                        isLightMode ? 'text-slate-900 group-hover:text-emerald-700' : 'text-slate-100 group-hover:text-emerald-400'
                      }`}
                    >
                      {loc.name}
                    </h3>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      isWarning
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : isWatch
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {loc.prediction.riskLevel} {loc.prediction.riskScore}
                  </span>
                </div>

                {/* Telemetry Metric Pair */}
                <div
                  className={`grid grid-cols-2 gap-1.5 p-2 rounded-lg border text-[11px] font-mono ${
                    isLightMode ? 'bg-white border-slate-200/80' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-slate-400 text-[10px] block">Rain 24h</span>
                    <strong className="text-cyan-700">{loc.rainfall.today} mm</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Slope / Elev</span>
                    <strong className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>
                      {loc.environmental.slope}° / {loc.environmental.elevation}m
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="truncate">
                    NH: {loc.exposure.roadSegments[0]?.name || 'Local Route'}
                  </span>
                  <span className="text-emerald-600 font-semibold group-hover:underline flex items-center gap-0.5 shrink-0">
                    Inspect <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSites.length > 12 && (
          <div className="pt-4 text-center">
            <button
              onClick={() => onNavigateTab('explorer')}
              className="text-xs text-emerald-600 hover:underline font-semibold font-mono"
            >
              View all {filteredSites.length} monitored locations in Location Explorer &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Prominent Interactive GIS Map Embed */}
      <div className="w-full">
        <WholeIndiaMap
          locations={locations}
          selectedLocation={null}
          onSelectLocation={onSelectLocation}
          selectedState="ALL"
          onSelectState={(st) => {
            onSelectState(st as NERState);
            onNavigateTab('explorer');
          }}
          onNavigateToGis={() => onNavigateTab('map')}
          isLightMode={isLightMode}
        />
      </div>

      {/* Two Column Section: Top Critical Locations + Active Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Column 1: Highest Risk Priority Locations */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h3
                className={`font-bold text-xs uppercase tracking-wide font-mono ${
                  isLightMode ? 'text-slate-900' : 'text-slate-100'
                }`}
              >
                Critical High-Risk Stations ({warningLocations.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('map')}
              className="text-[11px] text-emerald-600 hover:underline font-semibold"
            >
              Open Full GIS Map &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {warningLocations.slice(0, 4).map((loc) => (
              <div
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onNavigateTab('location');
                }}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  isLightMode
                    ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    : 'bg-slate-950 hover:bg-slate-800 border-slate-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse" />
                  <div>
                    <div
                      className={`font-bold text-xs ${
                        isLightMode ? 'text-slate-900 hover:text-emerald-700' : 'text-slate-100 hover:text-emerald-400'
                      }`}
                    >
                      {loc.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {loc.district}, {loc.state} • Elev: {loc.environmental.elevation}m
                    </div>
                    <div className="text-[10px] text-cyan-700 font-mono mt-0.5">
                      Rain 24h: {loc.rainfall.today}mm • Antecedent Index: {Math.round(loc.rainfall.antecedentRainfallIndex)}/100
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    SCORE {loc.prediction.riskScore}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {loc.prediction.confidence * 100}% Conf
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Recent Early Warning Dispatches */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-600" />
              <h3
                className={`font-bold text-xs uppercase tracking-wide font-mono ${
                  isLightMode ? 'text-slate-900' : 'text-slate-100'
                }`}
              >
                Recent Location Early Warning Dispatches
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-[11px] text-cyan-600 hover:underline font-semibold"
            >
              Alerts Center &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {activeAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigateTab('alerts')}
                className={`p-3 rounded-xl border cursor-pointer space-y-1.5 transition-all ${
                  isLightMode
                    ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    {alert.riskLevel} • {alert.state}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(alert.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                  </span>
                </div>

                <div className={`text-xs font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>
                  {alert.locationName}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {alert.triggerReason}
                </p>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                  <span>Radius: {alert.affectedRadiusKm} km</span>
                  <span className="text-emerald-700 font-bold">
                    {alert.affectedSubscribersCount} Subscribers Notified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
