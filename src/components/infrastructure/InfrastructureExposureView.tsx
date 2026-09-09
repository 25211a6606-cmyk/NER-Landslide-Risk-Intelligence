import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Building2,
  Car,
  AlertTriangle,
  MapPin,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  Download,
  School,
  Landmark,
  Map,
  Users,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MonitoredLocation, NERState } from '../../types/location';

interface InfrastructureExposureViewProps {
  locations: MonitoredLocation[];
  onSelectLocation: (loc: MonitoredLocation) => void;
  onNavigateToMap?: (loc: MonitoredLocation) => void;
  isLightMode?: boolean;
}

type ExposureTab = 'corridors' | 'settlements' | 'facilities' | 'state-matrix';

export const InfrastructureExposureView: React.FC<InfrastructureExposureViewProps> = ({
  locations,
  onSelectLocation,
  onNavigateToMap,
  isLightMode = false
}) => {
  const [activeTab, setActiveTab] = useState<ExposureTab>('corridors');
  const [filterVulnerability, setFilterVulnerability] = useState('ALL');
  const [filterState, setFilterState] = useState<string>('ALL');
  const [filterRoadType, setFilterRoadType] = useState<string>('ALL');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all highway and road segments safely from all locations
  const allRoads = useMemo(() => {
    return locations.flatMap((loc) =>
      (loc.exposure?.roadSegments || []).map((road) => ({
        ...road,
        locationId: loc.id,
        locationName: loc.name,
        state: loc.state,
        district: loc.district,
        riskScore: loc.prediction?.riskScore ?? 50,
        riskLevel: loc.prediction?.riskLevel ?? 'NORMAL',
        rainfallToday: loc.rainfall?.today ?? 0,
        triggerLevel: loc.rainfall?.triggerLevel ?? 'NORMAL',
        criticalBridges: loc.exposure?.criticalBridges ?? 0,
        locationObj: loc
      }))
    );
  }, [locations]);

  // Extract all settlements across all locations
  const allSettlements = useMemo(() => {
    return locations.flatMap((loc) =>
      (loc.exposure?.settlements || []).map((set) => ({
        ...set,
        locationId: loc.id,
        locationName: loc.name,
        state: loc.state,
        district: loc.district,
        riskScore: loc.prediction?.riskScore ?? 50,
        riskLevel: loc.prediction?.riskLevel ?? 'NORMAL',
        triggerLevel: loc.rainfall?.triggerLevel ?? 'NORMAL',
        totalExposedPopulation: loc.exposure?.estimatedVulnerablePopulation ?? set.population,
        hospitals: loc.exposure?.hospitals ?? 0,
        schools: loc.exposure?.schools ?? 0,
        locationObj: loc
      }))
    );
  }, [locations]);

  // Extract critical facility nodes
  const criticalFacilitySites = useMemo(() => {
    return locations.filter(
      (loc) =>
        (loc.exposure?.hospitals ?? 0) > 0 ||
        (loc.exposure?.schools ?? 0) > 0 ||
        (loc.exposure?.criticalBridges ?? 0) > 0
    );
  }, [locations]);

  // State-by-State Exposure Aggregations
  const stateMatrix = useMemo(() => {
    const states: NERState[] = [
      'Arunachal Pradesh',
      'Assam',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Sikkim',
      'Tripura'
    ];

    return states.map((state) => {
      const stateLocs = locations.filter((l) => l.state === state);
      const totalRoads = stateLocs.reduce((sum, l) => sum + (l.exposure?.roadSegments?.length || 0), 0);
      const highVulnRoads = stateLocs.reduce(
        (sum, l) =>
          sum +
          (l.exposure?.roadSegments?.filter((r) => r.trafficVulnerability === 'HIGH').length || 0),
        0
      );
      const bridges = stateLocs.reduce((sum, l) => sum + (l.exposure?.criticalBridges || 0), 0);
      const hospitals = stateLocs.reduce((sum, l) => sum + (l.exposure?.hospitals || 0), 0);
      const schools = stateLocs.reduce((sum, l) => sum + (l.exposure?.schools || 0), 0);
      const population = stateLocs.reduce(
        (sum, l) => sum + (l.exposure?.estimatedVulnerablePopulation || 0),
        0
      );
      const warningCount = stateLocs.filter((l) => l.prediction?.riskLevel === 'WARNING').length;
      const watchCount = stateLocs.filter((l) => l.prediction?.riskLevel === 'WATCH').length;
      const avgRisk =
        stateLocs.length > 0
          ? Math.round(
              stateLocs.reduce((sum, l) => sum + (l.prediction?.riskScore || 0), 0) / stateLocs.length
            )
          : 0;

      return {
        state,
        siteCount: stateLocs.length,
        totalRoads,
        highVulnRoads,
        bridges,
        hospitals,
        schools,
        population,
        warningCount,
        watchCount,
        avgRisk
      };
    });
  }, [locations]);

  // Filtered Road Corridors
  const filteredRoads = useMemo(() => {
    return allRoads.filter((r) => {
      if (filterVulnerability !== 'ALL' && r.trafficVulnerability !== filterVulnerability) {
        return false;
      }
      if (filterState !== 'ALL' && r.state !== filterState) {
        return false;
      }
      if (filterRoadType !== 'ALL' && r.type !== filterRoadType) {
        return false;
      }
      if (filterRiskLevel !== 'ALL' && r.riskLevel !== filterRiskLevel) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.locationName.toLowerCase().includes(q) ||
          r.state.toLowerCase().includes(q) ||
          r.district.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allRoads, filterVulnerability, filterState, filterRoadType, filterRiskLevel, searchQuery]);

  // Filtered Settlements
  const filteredSettlements = useMemo(() => {
    return allSettlements.filter((s) => {
      if (filterState !== 'ALL' && s.state !== filterState) {
        return false;
      }
      if (filterRiskLevel !== 'ALL' && s.riskLevel !== filterRiskLevel) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.locationName.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allSettlements, filterState, filterRiskLevel, searchQuery]);

  // Filtered Facilities
  const filteredFacilities = useMemo(() => {
    return criticalFacilitySites.filter((f) => {
      if (filterState !== 'ALL' && f.state !== filterState) {
        return false;
      }
      if (filterRiskLevel !== 'ALL' && f.prediction?.riskLevel !== filterRiskLevel) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          f.name.toLowerCase().includes(q) ||
          f.state.toLowerCase().includes(q) ||
          f.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [criticalFacilitySites, filterState, filterRiskLevel, searchQuery]);

  // Aggregate Key Metrics
  const highVulnCount = allRoads.filter((r) => r.trafficVulnerability === 'HIGH').length;
  const totalHospitals = locations.reduce((sum, l) => sum + (l.exposure?.hospitals || 0), 0);
  const totalSchools = locations.reduce((sum, l) => sum + (l.exposure?.schools || 0), 0);
  const totalBridges = locations.reduce((sum, l) => sum + (l.exposure?.criticalBridges || 0), 0);
  const totalPopulation = locations.reduce(
    (sum, l) => sum + (l.exposure?.estimatedVulnerablePopulation || 0),
    0
  );

  // Safe daily PCU estimator
  const getEstimatedVolume = (type: string, vuln: string): string => {
    if (type === 'Railway Track') return '36 trains/day';
    let base = 3500;
    if (type === 'National Highway') base = 14500;
    else if (type === 'State Highway') base = 7200;
    else if (type === 'Strategic Road') base = 4800;
    else if (type === 'City Arterial') base = 11000;

    const mult = vuln === 'HIGH' ? 1.2 : vuln === 'MEDIUM' ? 1.0 : 0.8;
    return `${Math.round(base * mult).toLocaleString()} PCU/day`;
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = [
      'Corridor Name',
      'Type',
      'Vulnerability',
      'Distance to Hazard (m)',
      'Monitored Site',
      'District',
      'State',
      'Hazard Risk Level',
      'Risk Score (/100)',
      'Critical Bridges',
      'Hospitals in Zone',
      'Schools in Zone',
      'Vulnerable Population'
    ];

    const rows = allRoads.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.type}"`,
      `"${r.trafficVulnerability}"`,
      r.distanceMeters,
      `"${r.locationName.replace(/"/g, '""')}"`,
      `"${r.district}"`,
      `"${r.state}"`,
      `"${r.riskLevel}"`,
      r.riskScore,
      r.criticalBridges,
      r.locationObj.exposure?.hospitals || 0,
      r.locationObj.exposure?.schools || 0,
      r.locationObj.exposure?.estimatedVulnerablePopulation || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NER_Infrastructure_Exposure_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setFilterVulnerability('ALL');
    setFilterState('ALL');
    setFilterRoadType('ALL');
    setFilterRiskLevel('ALL');
    setSearchQuery('');
  };

  const hasActiveFilters =
    filterVulnerability !== 'ALL' ||
    filterState !== 'ALL' ||
    filterRoadType !== 'ALL' ||
    filterRiskLevel !== 'ALL' ||
    searchQuery.trim().length > 0;

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'text-slate-800' : 'text-slate-100'
      }`}
    >
      {/* 1. Header & Quick Actions */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Infrastructure & Critical Assets Exposure Module
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            National Highways, Lifelines, Bridges & Habitat Exposure
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl mt-0.5">
            Multi-hazard exposure analysis integrating National Highways (NH-10, NH-29, NH-102, NH-37), strategic border axes, Himalayan river gorge bridges, trauma care centers, and high-density settlements across all 8 NER states.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all ${
              isLightMode
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            Export Asset Registry (CSV)
          </button>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono font-bold">
            {highVulnCount} Critical Lifelines at High Risk
          </span>
        </div>
      </div>

      {/* 2. Key Metrics Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Highway Corridors</span>
            <Car className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {allRoads.length} Segments
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            <span className="text-rose-600 dark:text-rose-400 font-bold">{highVulnCount} High</span> • {allRoads.length - highVulnCount} Med/Low
          </div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Critical Bridges</span>
            <Landmark className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {totalBridges} Bridges
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Gorge Spans & River Crossings</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Trauma & Hospitals</span>
            <Building2 className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">
            {totalHospitals} Facilities
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Within 1km Hazard Buffer</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Relief Shelters</span>
            <School className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalSchools} Centers
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Designated Evacuation Schools</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border col-span-2 sm:col-span-1 ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase">Vulnerable Population</span>
            <Users className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
            {(totalPopulation / 1000).toFixed(1)}k Residents
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Across {allSettlements.length} Habitat Zones</div>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 border-b pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('corridors')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'corridors'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>Transport Corridors & Highways</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-inherit">
            {allRoads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('settlements')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'settlements'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Vulnerable Settlements & Habitats</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-inherit">
            {allSettlements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('facilities')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'facilities'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Critical Facilities (Bridges, Hospitals, Schools)</span>
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-inherit">
            {criticalFacilitySites.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('state-matrix')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'state-matrix'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isLightMode
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>State-by-State Exposure Matrix</span>
        </button>
      </div>

      {/* 4. Filter Toolbar (Applicable across views) */}
      {activeTab !== 'state-matrix' && (
        <div
          className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeTab === 'corridors'
                  ? 'Search highway (e.g. NH-10, NH-29, Border corridor)...'
                  : activeTab === 'settlements'
                  ? 'Search village, town, or settlement...'
                  : 'Search location or district...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg pl-8 pr-8 py-1.5 text-xs focus:outline-none transition-colors ${
                isLightMode
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                  : 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-indigo-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns & Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* State Filter */}
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium focus:outline-none ${
                isLightMode
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All 8 States</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tripura">Tripura</option>
            </select>

            {/* Vulnerability Filter (Only for corridors) */}
            {activeTab === 'corridors' && (
              <select
                value={filterVulnerability}
                onChange={(e) => setFilterVulnerability(e.target.value)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium focus:outline-none ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-slate-950 border-slate-700 text-slate-200'
                }`}
              >
                <option value="ALL">All Vulnerabilities</option>
                <option value="HIGH">High Vulnerability</option>
                <option value="MEDIUM">Medium Vulnerability</option>
                <option value="LOW">Low Vulnerability</option>
              </select>
            )}

            {/* Risk Level Filter */}
            <select
              value={filterRiskLevel}
              onChange={(e) => setFilterRiskLevel(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium focus:outline-none ${
                isLightMode
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="WARNING">WARNING (70-100)</option>
              <option value="WATCH">WATCH (40-69)</option>
              <option value="NORMAL">NORMAL (0-39)</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. TAB 1: Corridors & Highways View */}
      {activeTab === 'corridors' && (
        <div
          className={`p-4 rounded-xl border space-y-3 shadow-xs ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              Showing {filteredRoads.length} of {allRoads.length} Highway Segments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-mono uppercase ${
                  isLightMode
                    ? 'bg-slate-50 text-slate-500 border-slate-200'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <tr>
                  <th className="p-3">Corridor & Highway</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">State & District</th>
                  <th className="p-3">Hazard Proximity</th>
                  <th className="p-3">Est. Traffic Volume</th>
                  <th className="p-3">Vulnerability</th>
                  <th className="p-3">Site Hazard Risk</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isLightMode ? 'divide-slate-100' : 'divide-slate-800/80'
                }`}
              >
                {filteredRoads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                      No road segments match the selected criteria.
                      <div className="mt-2">
                        <button
                          onClick={handleResetFilters}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold"
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRoads.map((road, idx) => (
                    <tr
                      key={`${road.locationId}-${idx}`}
                      className={`transition-colors ${
                        isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                        <div className="flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <div>
                            <div>{road.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal">
                              Monitored Site: {road.locationName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            road.type === 'National Highway'
                              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                              : road.type === 'Strategic Road'
                              ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                              : isLightMode
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {road.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {road.state}
                        </div>
                        <div className="text-[10px] text-slate-500">{road.district}</div>
                      </td>
                      <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1 font-semibold">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          {road.distanceMeters} m from scarp
                        </div>
                      </td>
                      <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                        {getEstimatedVolume(road.type, road.trafficVulnerability)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            road.trafficVulnerability === 'HIGH'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                              : road.trafficVulnerability === 'MEDIUM'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {road.trafficVulnerability}
                        </span>
                      </td>
                      <td className="p-3 font-mono">
                        <span
                          className={`font-bold inline-flex items-center gap-1 ${
                            road.riskLevel === 'WARNING'
                              ? 'text-rose-600 dark:text-rose-400'
                              : road.riskLevel === 'WATCH'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {road.riskLevel === 'WARNING' && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                          )}
                          {road.riskScore}/100 ({road.riskLevel})
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onNavigateToMap && (
                            <button
                              onClick={() => onNavigateToMap(road.locationObj)}
                              title="View on Map"
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
                            >
                              <Map className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onSelectLocation(road.locationObj)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-400 hover:text-white rounded-md text-[11px] font-semibold transition-all"
                          >
                            Inspect Site
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB 2: Vulnerable Settlements & Habitats */}
      {activeTab === 'settlements' && (
        <div
          className={`p-4 rounded-xl border space-y-3 shadow-xs ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              Showing {filteredSettlements.length} of {allSettlements.length} Habitat Zones
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-mono uppercase ${
                  isLightMode
                    ? 'bg-slate-50 text-slate-500 border-slate-200'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <tr>
                  <th className="p-3">Settlement & Habitat</th>
                  <th className="p-3">State & District</th>
                  <th className="p-3">Inhabitant Population</th>
                  <th className="p-3">Distance to Landslide</th>
                  <th className="p-3">Local Facilities</th>
                  <th className="p-3">Hazard Risk Level</th>
                  <th className="p-3">NDRF Advisory Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isLightMode ? 'divide-slate-100' : 'divide-slate-800/80'
                }`}
              >
                {filteredSettlements.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                      No settlements match the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredSettlements.map((set, idx) => (
                    <tr
                      key={`${set.locationId}-${idx}`}
                      className={`transition-colors ${
                        isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <div>
                            <div>{set.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal">
                              Monitored Site: {set.locationName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{set.state}</div>
                        <div className="text-[10px] text-slate-500">{set.district}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {set.population.toLocaleString()} residents
                      </td>
                      <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                        <span className="font-semibold">{set.distanceMeters} m</span> from slide axis
                      </td>
                      <td className="p-3 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        {set.hospitals > 0 && <span className="text-cyan-600 dark:text-cyan-400 font-bold">{set.hospitals} Hosp </span>}
                        {set.schools > 0 && <span className="text-emerald-600 dark:text-emerald-400 font-bold">{set.schools} School</span>}
                        {set.hospitals === 0 && set.schools === 0 && <span className="text-slate-400">None directly in zone</span>}
                      </td>
                      <td className="p-3 font-mono">
                        <span
                          className={`font-bold ${
                            set.riskLevel === 'WARNING'
                              ? 'text-rose-600 dark:text-rose-400'
                              : set.riskLevel === 'WATCH'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {set.riskScore}/100 ({set.riskLevel})
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            set.riskLevel === 'WARNING'
                              ? 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
                              : set.riskLevel === 'WATCH'
                              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                          }`}
                        >
                          {set.riskLevel === 'WARNING' ? 'PRE-EVACUATION ACTIVE' : set.riskLevel === 'WATCH' ? 'HEIGHTENED WATCH' : 'NORMAL MONITORING'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onSelectLocation(set.locationObj)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-400 hover:text-white rounded-md text-[11px] font-semibold transition-all"
                        >
                          Inspect Site
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. TAB 3: Critical Facilities (Bridges, Hospitals, Schools) */}
      {activeTab === 'facilities' && (
        <div
          className={`p-4 rounded-xl border space-y-3 shadow-xs ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>
              Showing {filteredFacilities.length} Sites with Critical Bridges, Healthcare or Staging Facilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.map((loc) => {
              const exp = loc.exposure;
              return (
                <div
                  key={loc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isLightMode
                      ? 'bg-slate-50/70 border-slate-200 hover:border-indigo-300'
                      : 'bg-slate-950/60 border-slate-800 hover:border-indigo-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-500 font-bold">
                        {loc.id} • {loc.state}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                        {loc.name}
                      </h3>
                      <div className="text-xs text-slate-500">{loc.district} District</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        loc.prediction.riskLevel === 'WARNING'
                          ? 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
                          : loc.prediction.riskLevel === 'WATCH'
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                      }`}
                    >
                      {loc.prediction.riskLevel}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center font-mono">
                    <div className={`p-2 rounded-lg ${isLightMode ? 'bg-white' : 'bg-slate-900'}`}>
                      <div className="text-[9px] text-slate-400 uppercase">Bridges</div>
                      <div className="text-base font-extrabold text-amber-500 mt-0.5">
                        {exp.criticalBridges}
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${isLightMode ? 'bg-white' : 'bg-slate-900'}`}>
                      <div className="text-[9px] text-slate-400 uppercase">Hospitals</div>
                      <div className="text-base font-extrabold text-cyan-500 mt-0.5">
                        {exp.hospitals}
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${isLightMode ? 'bg-white' : 'bg-slate-900'}`}>
                      <div className="text-[9px] text-slate-400 uppercase">Schools</div>
                      <div className="text-base font-extrabold text-emerald-500 mt-0.5">
                        {exp.schools}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2">
                    <span className="text-slate-500 font-mono text-[11px]">
                      {(exp.estimatedVulnerablePopulation / 1000).toFixed(1)}k vulnerable pop
                    </span>
                    <button
                      onClick={() => onSelectLocation(loc)}
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-xs"
                    >
                      Inspect
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. TAB 4: State-by-State Exposure Matrix */}
      {activeTab === 'state-matrix' && (
        <div
          className={`p-4 rounded-xl border space-y-4 shadow-xs ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Comprehensive State-by-State Critical Infrastructure Exposure
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparative analysis across all 8 North Eastern Region (NER) states.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
              8 States • {locations.length} Sites Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-mono uppercase ${
                  isLightMode
                    ? 'bg-slate-50 text-slate-500 border-slate-200'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <tr>
                  <th className="p-3">State</th>
                  <th className="p-3">Monitored Sites</th>
                  <th className="p-3">High-Risk Road Corridors</th>
                  <th className="p-3">River Bridges</th>
                  <th className="p-3">Hospitals</th>
                  <th className="p-3">Schools (Shelters)</th>
                  <th className="p-3">Exposed Population</th>
                  <th className="p-3">Avg Risk Score</th>
                  <th className="p-3 text-right">Active Warnings</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isLightMode ? 'divide-slate-100' : 'divide-slate-800/80'
                }`}
              >
                {stateMatrix.map((st) => (
                  <tr
                    key={st.state}
                    className={`transition-colors ${
                      isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      {st.state}
                    </td>
                    <td className="p-3 font-mono">{st.siteCount} sites</td>
                    <td className="p-3 font-mono">
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        {st.highVulnRoads}
                      </span>
                      <span className="text-slate-400 text-[10px]"> / {st.totalRoads}</span>
                    </td>
                    <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      {st.bridges}
                    </td>
                    <td className="p-3 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      {st.hospitals}
                    </td>
                    <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {st.schools}
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                      {(st.population / 1000).toFixed(1)}k
                    </td>
                    <td className="p-3 font-mono">
                      <span
                        className={`font-bold ${
                          st.avgRisk >= 70
                            ? 'text-rose-600 dark:text-rose-400'
                            : st.avgRisk >= 40
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {st.avgRisk}/100
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono">
                      {st.warningCount > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                          {st.warningCount} WARNINGS
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          CLEAR
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
