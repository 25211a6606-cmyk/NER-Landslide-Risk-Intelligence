import React, { useState, useEffect } from 'react';
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Navigation,
  Shield,
  Filter,
  Car,
  HardHat,
  Eye,
  ArrowRight,
  Sparkles,
  MapPin,
  Plus,
  ThumbsUp,
  MessageSquarePlus,
  Radio,
  Search,
  Check,
  Flame,
  Droplets,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { NER_HIGHWAY_LIFELINES, HighwayLifeline, HighwayStatus } from '../../data/roadConnectivity';
import {
  RoadHazardReportService,
  RoadHazardReport,
  RoadHazardCategory
} from '../../services/roadHazardReportService';
import { RoadHazardReportModal } from './RoadHazardReportModal';

interface RoadConnectivityViewProps {
  isLightMode?: boolean;
}

export const RoadConnectivityView: React.FC<RoadConnectivityViewProps> = ({ isLightMode = false }) => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedHighway, setSelectedHighway] = useState<HighwayLifeline>(NER_HIGHWAY_LIFELINES[0]);

  // Tab mode: Official Highway Corridors vs Commuter Hazard Reports Feed
  const [viewMode, setViewMode] = useState<'corridors' | 'community_reports'>('corridors');

  // Community Reports State
  const [reports, setReports] = useState<RoadHazardReport[]>([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [preSelectedHighwayForReport, setPreSelectedHighwayForReport] = useState<HighwayLifeline | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchReportQuery, setSearchReportQuery] = useState('');
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  useEffect(() => {
    setReports(RoadHazardReportService.getReports());
  }, []);

  const handleReportSubmitted = (newReport: RoadHazardReport) => {
    setReports(RoadHazardReportService.getReports());
    setRecentNotification(`Report for ${newReport.highwayCode} (${newReport.landmarkOrChainage}) published successfully.`);
    setTimeout(() => setRecentNotification(null), 5000);
  };

  const handleUpvote = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = RoadHazardReportService.upvoteReport(reportId);
    setReports(updated);
  };

  const handleMarkCleared = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = RoadHazardReportService.markAsCleared(reportId, 'Commuter Verified / Road Crew');
    setReports(updated);
  };

  // Filtered highways
  const filteredHighways = NER_HIGHWAY_LIFELINES.filter((hwy) => {
    const matchesState = selectedState === 'ALL' || hwy.connectingStates.includes(selectedState);
    const matchesStatus = selectedStatus === 'ALL' || hwy.status === selectedStatus;
    return matchesState && matchesStatus;
  });

  const blockedCount = NER_HIGHWAY_LIFELINES.filter((h) => h.status === 'BLOCKED').length;
  const restrictedCount = NER_HIGHWAY_LIFELINES.filter((h) => h.status === 'RESTRICTED').length;
  const watchCount = NER_HIGHWAY_LIFELINES.filter((h) => h.status === 'HIGH_RISK_WATCH').length;
  const clearCount = NER_HIGHWAY_LIFELINES.filter((h) => h.status === 'CLEAR').length;
  const totalStranded = NER_HIGHWAY_LIFELINES.reduce((sum, h) => sum + (h.strandedVehiclesCount || 0), 0);

  // Active community reports count & specific highway reports
  const activeReports = reports.filter((r) => r.status !== 'CLEARED_REPAIRED');
  const potholeReportsCount = reports.filter((r) => r.category === 'POTHOLES_CRATERS').length;
  const blockageReportsCount = reports.filter((r) => r.category === 'ROAD_BLOCKED').length;

  const getReportsForHighway = (highwayId: string, highwayCode: string) => {
    return reports.filter(
      (r) => r.highwayId === highwayId || r.highwayCode.toLowerCase() === highwayCode.toLowerCase()
    );
  };

  const selectedHighwayReports = getReportsForHighway(selectedHighway.id, selectedHighway.highwayCode);

  // Filtered community reports for the dedicated feed tab
  const filteredReports = reports.filter((r) => {
    if (selectedState !== 'ALL' && r.state !== selectedState) return false;
    if (categoryFilter !== 'ALL' && r.category !== categoryFilter) return false;
    if (searchReportQuery.trim()) {
      const q = searchReportQuery.toLowerCase();
      return (
        r.highwayCode.toLowerCase().includes(q) ||
        r.landmarkOrChainage.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: HighwayStatus) => {
    switch (status) {
      case 'BLOCKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            BLOCKED / SEVERED
          </span>
        );
      case 'RESTRICTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            1-LANE RESTRICTED
          </span>
        );
      case 'HIGH_RISK_WATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-500 border border-orange-500/30">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            HIGH RISK WATCH
          </span>
        );
      case 'CLEAR':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            CLEAR & OPEN
          </span>
        );
    }
  };

  const getCategoryIcon = (category: RoadHazardCategory) => {
    switch (category) {
      case 'ROAD_BLOCKED':
        return '⛔';
      case 'POTHOLES_CRATERS':
        return '🕳️';
      case 'ROCKFALL_BOULDERS':
        return '🪨';
      case 'ROAD_SUBSIDENCE':
        return '📉';
      case 'WATER_MUD_SLURRY':
        return '🌊';
      case 'RETAINING_WALL_COLLAPSE':
        return '🧱';
      default:
        return '⚠️';
    }
  };

  const getPassabilityBadge = (passability: RoadHazardReport['passability']) => {
    switch (passability) {
      case 'COMPLETELY_BLOCKED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-500 border border-rose-500/30">
            Blocked (0 Lanes)
          </span>
        );
      case 'SINGLE_LANE_RESTRICTED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            1-Lane Restricted
          </span>
        );
      case 'PASSABLE_WITH_CAUTION':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-yellow-500/15 text-yellow-500 border border-yellow-500/30">
            Passable (Caution)
          </span>
        );
      case 'HAZARD_DEVELOPING':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            Developing Hazard
          </span>
        );
    }
  };

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'text-slate-800' : 'text-slate-100'
      }`}
    >
      {/* Toast Notification */}
      {recentNotification && (
        <div className="fixed top-18 right-6 z-40 p-3.5 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{recentNotification}</span>
          <button onClick={() => setRecentNotification(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner & Action Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-rose-500/20 text-rose-500 border border-rose-500/30">
              Live BRO & NHIDCL Feeds
            </span>
            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              Crowdsourced Commuter Telemetry
            </span>
            <span className="text-xs text-slate-400">Real-time sync</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight mt-1 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-500" />
            North-East Highway Lifelines & Road Connectivity Status
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-0.5">
            Real-time tracking of strategic mountain transport arteries, landslide blockages, potholes, single-lane bottlenecks, and active clearance taskforces across all 8 NER states.
          </p>
        </div>

        {/* Action Button to Report Problem */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setPreSelectedHighwayForReport(selectedHighway);
              setIsReportModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Blocked Road or Potholes</span>
          </button>
        </div>
      </div>

      {/* Quick Stat Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div
          className={`p-3 rounded-xl border text-center ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="text-[10px] text-rose-500 font-bold uppercase">Blocked Highways</div>
          <div className="text-xl font-black text-rose-500 mt-0.5">{blockedCount} Corridors</div>
        </div>
        <div
          className={`p-3 rounded-xl border text-center ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="text-[10px] text-amber-500 font-bold uppercase">Restricted</div>
          <div className="text-xl font-black text-amber-500 mt-0.5">{restrictedCount} 1-Lane</div>
        </div>
        <div
          className={`p-3 rounded-xl border text-center ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="text-[10px] text-orange-400 font-bold uppercase">High Risk Watch</div>
          <div className="text-xl font-black text-orange-400 mt-0.5">{watchCount} Passes</div>
        </div>
        <div
          className={`p-3 rounded-xl border text-center ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="text-[10px] text-emerald-500 font-bold uppercase">Clear Corridors</div>
          <div className="text-xl font-black text-emerald-500 mt-0.5">{clearCount} Open</div>
        </div>
        <div
          className={`p-3 rounded-xl border text-center ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="text-[10px] text-slate-400 font-bold uppercase">Stranded Vehicles</div>
          <div className="text-xl font-black text-indigo-400 mt-0.5">{totalStranded}</div>
        </div>
        <div
          onClick={() => setViewMode('community_reports')}
          className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
            viewMode === 'community_reports'
              ? 'ring-2 ring-rose-500 bg-rose-500/10 border-rose-500'
              : isLightMode
              ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="text-[10px] text-rose-500 font-bold uppercase flex items-center justify-center gap-1">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            Citizen Reports
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            {reports.length} Reports
          </div>
          <div className="text-[9px] text-slate-400">
            {blockageReportsCount} blocked • {potholeReportsCount} potholes
          </div>
        </div>
      </div>

      {/* Main Mode Switcher: Highway Lifeline Corridors vs Live Commuter Reports Feed */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setViewMode('corridors')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              viewMode === 'corridors'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isLightMode
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Strategic Highway Corridors ({NER_HIGHWAY_LIFELINES.length})</span>
          </button>

          <button
            onClick={() => setViewMode('community_reports')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
              viewMode === 'community_reports'
                ? 'bg-rose-600 text-white shadow-xs'
                : isLightMode
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-inherit" />
            <span>Live Commuter Hazard Reports ({reports.length})</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-mono">
              Live
            </span>
          </button>
        </div>

        <button
          onClick={() => {
            setPreSelectedHighwayForReport(null);
            setIsReportModalOpen(true);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
            isLightMode
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
        >
          <Plus className="w-3.5 h-3.5 text-rose-500" />
          <span>Add Road Report</span>
        </button>
      </div>

      {/* VIEW 1: Highway Corridors + Telemetry Panel */}
      {viewMode === 'corridors' && (
        <div className="space-y-6">
          {/* Filter Row */}
          <div
            className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-slate-400 mr-1" />
              <span className="font-semibold text-slate-400">State:</span>
              {['ALL', 'Sikkim', 'Nagaland', 'Meghalaya', 'Mizoram', 'Arunachal Pradesh', 'Manipur', 'Assam', 'Tripura'].map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      selectedState === st
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isLightMode
                        ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-400">Status:</span>
              {['ALL', 'BLOCKED', 'RESTRICTED', 'HIGH_RISK_WATCH', 'CLEAR'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedStatus === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isLightMode
                      ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {st === 'HIGH_RISK_WATCH' ? 'WATCH' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Corridor List (7 cols) + Detail Panel (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Highway Cards List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {filteredHighways.map((hwy) => {
                const isSelected = selectedHighway.id === hwy.id;
                const hwyReports = getReportsForHighway(hwy.id, hwy.highwayCode);

                return (
                  <div
                    key={hwy.id}
                    onClick={() => setSelectedHighway(hwy)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? isLightMode
                          ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-1 ring-emerald-400'
                          : 'bg-emerald-950/20 border-emerald-500 shadow-lg ring-1 ring-emerald-500/40'
                        : isLightMode
                        ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 font-mono text-xs font-bold rounded bg-slate-800 text-amber-300 border border-slate-700">
                            {hwy.highwayCode}
                          </span>
                          <span className="font-bold text-base">{hwy.name}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-mono">
                          <Navigation className="w-3 h-3 text-emerald-500" />
                          {hwy.route}
                        </p>
                      </div>
                      <div>{getStatusBadge(hwy.status)}</div>
                    </div>

                    <div className="mt-3 p-2.5 rounded-lg text-xs border border-dashed border-slate-700/50 bg-slate-800/30">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="font-semibold text-slate-300 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          Critical Section: {hwy.criticalSection}
                        </span>
                        <span className="text-[11px] text-slate-400">{hwy.lastUpdated}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{hwy.statusDescription}</p>
                    </div>

                    {/* Community Report Badge Indicator on Highway Card */}
                    {hwyReports.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/30 text-[11px] font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          {hwyReports.length} Commuter Hazard Reports ({hwyReports.map((r) => getCategoryIcon(r.category)).join(' ')})
                        </span>
                        <span className="text-[11px] text-slate-500 truncate">
                          Latest: {hwyReports[0].landmarkOrChainage}
                        </span>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <HardHat className="w-3.5 h-3.5 text-orange-400" />
                          {hwy.clearingAgency}
                        </span>
                        {hwy.strandedVehiclesCount && (
                          <span className="flex items-center gap-1 text-rose-400 font-semibold">
                            <Car className="w-3.5 h-3.5" />
                            {hwy.strandedVehiclesCount} vehicles held
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreSelectedHighwayForReport(hwy);
                            setIsReportModalOpen(true);
                          }}
                          className="text-xs text-rose-500 hover:text-rose-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Report Problem
                        </button>
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          View Details & Reports
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Highway Detailed Telemetry & Commuter Reports (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-5 rounded-xl border sticky top-4 space-y-5 ${
                  isLightMode ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800 shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {selectedHighway.highwayCode}
                      </span>
                      <span className="text-xs text-slate-400">Length: {selectedHighway.totalLengthKm} km</span>
                    </div>
                    <h2 className="text-lg font-bold mt-1">{selectedHighway.name}</h2>
                  </div>
                  <div>{getStatusBadge(selectedHighway.status)}</div>
                </div>

                {/* Blockage Spot Telemetry */}
                {selectedHighway.blockageLocation && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      Active Landslide Obstruction Location
                    </div>
                    <div className="text-sm font-semibold text-slate-100">
                      {selectedHighway.blockageLocation.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Coordinates: {selectedHighway.blockageLocation.latitude.toFixed(4)}°N,{' '}
                      {selectedHighway.blockageLocation.longitude.toFixed(4)}°E (
                      {selectedHighway.blockageLocation.chainageKm})
                    </div>
                    {selectedHighway.debrisVolumeEstimatedM3 && (
                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-rose-500/20 text-xs">
                        <div>
                          <span className="text-slate-400">Est. Debris Volume:</span>
                          <div className="font-bold text-slate-200">
                            {selectedHighway.debrisVolumeEstimatedM3.toLocaleString()} m³
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-400">Est. Clearance Time:</span>
                          <div className="font-bold text-amber-300">
                            {selectedHighway.estimatedRestorationHours} Hours
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Alternate Bypass Route Advisor */}
                <div className="p-3.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4" />
                    Civil & Emergency Detour Bypass
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    {selectedHighway.alternateBypassRoute}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-indigo-500/20">
                    <span className="text-slate-400">Additional Detour Distance:</span>
                    <span className="font-bold text-indigo-300">
                      +{selectedHighway.bypassDistanceAddedKm} km detour
                    </span>
                  </div>
                </div>

                {/* Commuter Field Reports for Selected Highway */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-rose-400" />
                      <span>Commuter Reports for {selectedHighway.highwayCode}</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-slate-300">
                        {selectedHighwayReports.length}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setPreSelectedHighwayForReport(selectedHighway);
                        setIsReportModalOpen(true);
                      }}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Report Problem
                    </button>
                  </div>

                  {selectedHighwayReports.length === 0 ? (
                    <div className="p-3 rounded-lg border border-dashed border-slate-800 text-center text-xs text-slate-500">
                      No citizen reports logged yet for this highway section.
                      <div className="mt-1">
                        <button
                          onClick={() => {
                            setPreSelectedHighwayForReport(selectedHighway);
                            setIsReportModalOpen(true);
                          }}
                          className="text-rose-400 hover:underline font-semibold"
                        >
                          Be the first to report road conditions
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {selectedHighwayReports.map((rep) => (
                        <div
                          key={rep.id}
                          className={`p-2.5 rounded-lg border text-xs space-y-1.5 transition-all ${
                            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-bold flex items-center gap-1 text-slate-900 dark:text-slate-100">
                              <span>{getCategoryIcon(rep.category)}</span>
                              <span>{rep.landmarkOrChainage}</span>
                            </div>
                            {getPassabilityBadge(rep.passability)}
                          </div>
                          <p className="text-slate-400 text-[11px] leading-snug">{rep.description}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-700/30">
                            <span>
                              By {rep.reportedBy} ({rep.reporterRole}) • {rep.timeAgo}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleUpvote(rep.id, e)}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono ${
                                  rep.userUpvoted
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                                }`}
                              >
                                <ThumbsUp className="w-2.5 h-2.5" />
                                <span>{rep.upvotes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Geotechnical & CCTV Monitoring Sensors */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    Live Corridor Telemetry Sensors
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-base text-emerald-400">
                        {selectedHighway.activeMonitoringSensors.piezometers}
                      </div>
                      <div className="text-[11px] text-slate-400">Pore Piezometers</div>
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-base text-cyan-400">
                        {selectedHighway.activeMonitoringSensors.tiltmeters}
                      </div>
                      <div className="text-[11px] text-slate-400">Tiltmeters</div>
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'
                      }`}
                    >
                      <div
                        className={`font-bold text-base ${
                          selectedHighway.activeMonitoringSensors.cctvMonitoring
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {selectedHighway.activeMonitoringSensors.cctvMonitoring ? 'ONLINE' : 'NONE'}
                      </div>
                      <div className="text-[11px] text-slate-400">CCTV Surveillance</div>
                    </div>
                  </div>
                </div>

                {/* Clearing Agency Action Dispatch */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Taskforce: <strong className="text-slate-200">{selectedHighway.clearingAgency}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
                    Priority: {selectedHighway.trafficPriority.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Live Commuter Hazard Reports Feed */}
      {viewMode === 'community_reports' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Filter Bar for Community Reports */}
          <div
            className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
              isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search report (e.g. NH-10, 29th Mile, potholes, boulders)..."
                value={searchReportQuery}
                onChange={(e) => setSearchReportQuery(e.target.value)}
                className={`w-full border rounded-lg pl-8 pr-8 py-1.5 text-xs focus:outline-none transition-colors ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    : 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
                }`}
              />
              {searchReportQuery && (
                <button
                  onClick={() => setSearchReportQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-semibold mr-1">Issue:</span>
              {[
                { id: 'ALL', label: 'All Issues' },
                { id: 'ROAD_BLOCKED', label: '⛔ Blockages' },
                { id: 'POTHOLES_CRATERS', label: '🕳️ Potholes' },
                { id: 'ROCKFALL_BOULDERS', label: '🪨 Rockfall' },
                { id: 'ROAD_SUBSIDENCE', label: '📉 Sinking' },
                { id: 'WATER_MUD_SLURRY', label: '🌊 Slurry' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-rose-600 text-white'
                      : isLightMode
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium focus:outline-none ${
                isLightMode
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All 8 States</option>
              {['Sikkim', 'Nagaland', 'Meghalaya', 'Mizoram', 'Arunachal Pradesh', 'Manipur', 'Assam', 'Tripura'].map(
                (st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.length === 0 ? (
              <div className="col-span-full p-12 text-center font-mono text-slate-500 border border-dashed rounded-xl">
                No commuter road reports match the selected filters.
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setCategoryFilter('ALL');
                      setSelectedState('ALL');
                      setSearchReportQuery('');
                    }}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold mr-2"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => {
                      setPreSelectedHighwayForReport(null);
                      setIsReportModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold"
                  >
                    + Submit New Report
                  </button>
                </div>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                    isLightMode
                      ? 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Category Icon & Passability Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCategoryIcon(report.category)}</span>
                        <div>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                            {report.highwayCode}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1.5">
                            {report.state}
                          </span>
                        </div>
                      </div>
                      {getPassabilityBadge(report.passability)}
                    </div>

                    {/* Landmark & Chainage */}
                    <div className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{report.landmarkOrChainage}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      District: {report.district}
                      {report.latitude && report.longitude && (
                        <span> • ({report.latitude.toFixed(3)}°N, {report.longitude.toFixed(3)}°E)</span>
                      )}
                    </div>

                    {/* Pothole Tag if applicable */}
                    {report.potholeSeverity && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        Pothole Depth: {report.potholeSeverity.replace(/_/g, ' ')}
                      </span>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                      {report.description}
                    </p>

                    {/* Stranded Vehicles notice */}
                    {report.estimatedStrandedVehicles && report.estimatedStrandedVehicles > 0 && (
                      <div className="flex items-center gap-1 text-xs text-rose-500 font-semibold font-mono">
                        <Car className="w-3.5 h-3.5" />
                        <span>~{report.estimatedStrandedVehicles} vehicles stranded / queued</span>
                      </div>
                    )}
                  </div>

                  {/* Footer: Reporter, Timestamp, Upvote & Clear Actions */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        Reported by <strong className="text-slate-300">{report.reportedBy}</strong> ({report.reporterRole})
                      </span>
                      <span>{report.timeAgo}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={(e) => handleUpvote(report.id, e)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono border transition-all ${
                          report.userUpvoted
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : isLightMode
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                        title="Confirm this hazard / Upvote"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Confirm ({report.upvotes})</span>
                      </button>

                      {report.status !== 'CLEARED_REPAIRED' ? (
                        <button
                          onClick={(e) => handleMarkCleared(report.id, e)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30 transition-all"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark Cleared</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Road Cleared
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Crowdsourced Hazard Report Modal */}
      <RoadHazardReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        preSelectedHighway={preSelectedHighwayForReport}
        onReportSubmitted={handleReportSubmitted}
        isLightMode={isLightMode}
      />
    </div>
  );
};
