import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  Mountain,
  CloudRain,
  ShieldAlert,
  ArrowRight,
  Filter,
  Search,
  Crosshair,
  Compass,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
  AlertTriangle,
  Radio,
  Send,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { MonitoredLocation, NERState } from '../../types/location';
import { NER_STATES_INFO } from '../../data/nerLocations';
import { WholeIndiaMap } from '../map/WholeIndiaMap';

interface StateDistrictExplorerProps {
  locations: MonitoredLocation[];
  selectedState: NERState;
  onSelectState: (state: NERState) => void;
  onSelectLocation: (loc: MonitoredLocation) => void;
  onViewOnMap: (state: NERState) => void;
  isLightMode?: boolean;
}

type SortField = 'riskScore' | 'rainfall' | 'slope' | 'elevation' | 'population' | 'name';
type SortOrder = 'asc' | 'desc';

export const StateDistrictExplorer: React.FC<StateDistrictExplorerProps> = ({
  locations,
  selectedState,
  onSelectState,
  onSelectLocation,
  onViewOnMap,
  isLightMode = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'WARNING' | 'WATCH' | 'NORMAL'>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [rainFilter, setRainFilter] = useState<'ALL' | 'HEAVY' | 'MODERATE' | 'LIGHT'>('ALL');
  const [slopeFilter, setSlopeFilter] = useState<'ALL' | 'STEEP' | 'MODERATE' | 'GENTLE'>('ALL');
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');
  const [sortField, setSortField] = useState<SortField>('riskScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  const allStates = Object.keys(NER_STATES_INFO) as NERState[];

  // Filter locations by all active constraints
  const filteredLocations = locations.filter((loc) => {
    if (riskFilter !== 'ALL' && loc.prediction.riskLevel !== riskFilter) return false;
    if (stateFilter !== 'ALL' && loc.state !== stateFilter) return false;

    if (rainFilter === 'HEAVY' && loc.rainfall.today < 80) return false;
    if (rainFilter === 'MODERATE' && (loc.rainfall.today < 30 || loc.rainfall.today >= 80)) return false;
    if (rainFilter === 'LIGHT' && loc.rainfall.today >= 30) return false;

    if (slopeFilter === 'STEEP' && loc.environmental.slope < 30) return false;
    if (slopeFilter === 'MODERATE' && (loc.environmental.slope < 20 || loc.environmental.slope >= 30)) return false;
    if (slopeFilter === 'GENTLE' && loc.environmental.slope >= 20) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.environmental.geology.toLowerCase().includes(q) ||
        loc.exposure.roadSegments.some((r) => r.name.toLowerCase().includes(q)) ||
        loc.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort locations
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'riskScore':
        comparison = a.prediction.riskScore - b.prediction.riskScore;
        break;
      case 'rainfall':
        comparison = a.rainfall.today - b.rainfall.today;
        break;
      case 'slope':
        comparison = a.environmental.slope - b.environmental.slope;
        break;
      case 'elevation':
        comparison = a.environmental.elevation - b.environmental.elevation;
        break;
      case 'population':
        comparison = a.exposure.estimatedVulnerablePopulation - b.exposure.estimatedVulnerablePopulation;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const warningCount = locations.filter((l) => l.prediction.riskLevel === 'WARNING').length;
  const watchCount = locations.filter((l) => l.prediction.riskLevel === 'WATCH').length;
  const normalCount = locations.filter((l) => l.prediction.riskLevel === 'NORMAL').length;
  const totalPop = locations.reduce((sum, l) => sum + l.exposure.estimatedVulnerablePopulation, 0);

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'bg-slate-50/50 text-slate-800' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Header & Overview KPIs */}
      <div
        className={`p-5 rounded-2xl border transition-colors ${
          isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Pinpoint Geospatial Hazard Directory
            </div>
            <h1
              className={`text-xl md:text-2xl font-extrabold tracking-tight ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Location & Site Hazard Explorer
            </h1>
            <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Direct inspection of all {locations.length} landslide monitoring sites across India. Filter by slope, rainfall intensity, or highway corridor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowInteractiveMap(!showInteractiveMap)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                showInteractiveMap
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              {showInteractiveMap ? 'Hide Map Overview' : 'Show Map Overview'}
            </button>
            <button
              onClick={() => onViewOnMap(selectedState)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
            >
              <Crosshair className="w-3.5 h-3.5" />
              Open Live GIS Map
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t ${
            isLightMode ? 'border-slate-100' : 'border-slate-800'
          }`}
        >
          <div
            onClick={() => setRiskFilter('ALL')}
            className="cursor-pointer p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Stations</span>
            <strong className="text-sm font-bold text-slate-900">{locations.length} Sites</strong>
          </div>
          <div
            onClick={() => setRiskFilter('WARNING')}
            className="cursor-pointer p-2.5 rounded-lg border border-rose-200 bg-rose-50/60 hover:bg-rose-100/60 transition-colors"
          >
            <span className="text-[10px] font-mono text-rose-700 block uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Warning Level
            </span>
            <strong className="text-sm font-bold text-rose-700">{warningCount} Sites</strong>
          </div>
          <div
            onClick={() => setRiskFilter('WATCH')}
            className="cursor-pointer p-2.5 rounded-lg border border-amber-200 bg-amber-50/60 hover:bg-amber-100/60 transition-colors"
          >
            <span className="text-[10px] font-mono text-amber-800 block uppercase">Watch Level</span>
            <strong className="text-sm font-bold text-amber-800">{watchCount} Sites</strong>
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Protected Pop.</span>
            <strong className="text-sm font-bold text-emerald-700">{(totalPop / 1000).toFixed(0)}k Residents</strong>
          </div>
        </div>
      </div>

      {/* Embedded Map Section Toggle */}
      {showInteractiveMap && (
        <div className="w-full">
          <WholeIndiaMap
            locations={locations}
            selectedLocation={null}
            onSelectLocation={onSelectLocation}
            selectedState="ALL"
            onSelectState={(st) => {
              if (st !== 'ALL') {
                setStateFilter(st);
              } else {
                setStateFilter('ALL');
              }
            }}
            onNavigateToGis={() => onViewOnMap(selectedState)}
            isLightMode={isLightMode}
          />
        </div>
      )}

      {/* Filter Toolbar */}
      <div
        className={`p-4 rounded-xl border space-y-3 ${
          isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station name, district, state, NH corridor, or geology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-slate-400 font-mono ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                  : 'bg-slate-950 border-slate-700 text-slate-200 placeholder-slate-500'
              }`}
            />
          </div>

          {/* View Layout Toggle & Count */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <span className="text-xs font-mono text-slate-500">
              Showing <strong>{sortedLocations.length}</strong> of {locations.length}
            </span>
            <div className="flex items-center border rounded-lg p-0.5 bg-slate-100">
              <button
                onClick={() => setViewLayout('grid')}
                title="Card Grid View"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewLayout === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewLayout('table')}
                title="Data Table View"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewLayout === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {/* Risk Level Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-slate-500">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className={`border rounded-md px-2 py-1 text-xs font-mono focus:outline-none ${
                isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All Risk Levels ({locations.length})</option>
              <option value="WARNING">Warning ({warningCount})</option>
              <option value="WATCH">Watch ({watchCount})</option>
              <option value="NORMAL">Normal ({normalCount})</option>
            </select>
          </div>

          {/* State / Sector Tag Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-slate-500">State:</span>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className={`border rounded-md px-2 py-1 text-xs font-mono focus:outline-none ${
                isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All States ({locations.length})</option>
              {allStates.map((st) => (
                <option key={st} value={st}>
                  {st} ({locations.filter((l) => l.state === st).length})
                </option>
              ))}
            </select>
          </div>

          {/* Rainfall Intensity Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-slate-500">Rainfall:</span>
            <select
              value={rainFilter}
              onChange={(e) => setRainFilter(e.target.value as any)}
              className={`border rounded-md px-2 py-1 text-xs font-mono focus:outline-none ${
                isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All Rainfall</option>
              <option value="HEAVY">Heavy / Cloudburst (&gt;80mm)</option>
              <option value="MODERATE">Moderate (30–80mm)</option>
              <option value="LIGHT">Light (&lt;30mm)</option>
            </select>
          </div>

          {/* Slope Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-slate-500">Slope:</span>
            <select
              value={slopeFilter}
              onChange={(e) => setSlopeFilter(e.target.value as any)}
              className={`border rounded-md px-2 py-1 text-xs font-mono focus:outline-none ${
                isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
            >
              <option value="ALL">All Slopes</option>
              <option value="STEEP">Steep / Escarpment (&gt;30°)</option>
              <option value="MODERATE">Moderate (20–30°)</option>
              <option value="GENTLE">Gentle (&lt;20°)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(riskFilter !== 'ALL' || stateFilter !== 'ALL' || rainFilter !== 'ALL' || slopeFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setRiskFilter('ALL');
                setStateFilter('ALL');
                setRainFilter('ALL');
                setSlopeFilter('ALL');
                setSearchQuery('');
              }}
              className="text-[11px] text-rose-600 hover:underline font-mono ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Card Grid View */}
      {viewLayout === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedLocations.map((loc) => {
            const isWarning = loc.prediction.riskLevel === 'WARNING';
            const isWatch = loc.prediction.riskLevel === 'WATCH';
            return (
              <div
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 group ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Station Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                      {loc.district}, {loc.state} • ID: {loc.id}
                    </div>
                    <h3
                      className={`font-bold text-sm transition-colors ${
                        isLightMode ? 'text-slate-900 group-hover:text-emerald-700' : 'text-slate-100 group-hover:text-emerald-400'
                      }`}
                    >
                      {loc.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
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

                {/* Key Geospatial Metrics Grid */}
                <div
                  className={`grid grid-cols-3 gap-2 text-[11px] font-mono p-2.5 rounded-lg border ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-slate-400 text-[10px] block">Rain 24h</span>
                    <strong className="text-cyan-700">{loc.rainfall.today} mm</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Antecedent</span>
                    <strong className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>
                      {Math.round(loc.rainfall.antecedentRainfallIndex)}/100
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Slope / Elev</span>
                    <strong className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>
                      {loc.environmental.slope}° / {loc.environmental.elevation}m
                    </strong>
                  </div>
                </div>

                {/* Exposure & Geology */}
                <div className="space-y-1 text-[11px] text-slate-500">
                  <div className="line-clamp-1">
                    Highway: <strong className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>{loc.exposure.roadSegments[0]?.name || 'Local Mountain Pass'}</strong>
                  </div>
                  <div className="line-clamp-1">
                    Geology: <span className={isLightMode ? 'text-slate-600' : 'text-slate-400'}>{loc.environmental.geology}</span>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div
                  className={`flex items-center justify-between pt-2.5 border-t text-[11px] ${
                    isLightMode ? 'border-slate-100' : 'border-slate-800'
                  }`}
                >
                  <span className="text-slate-500 font-mono">
                    Pop: <strong className={isLightMode ? 'text-slate-800' : 'text-slate-200'}>{loc.exposure.estimatedVulnerablePopulation}</strong>
                  </span>
                  <span className="text-emerald-600 font-semibold group-hover:underline flex items-center gap-0.5">
                    Inspect Telemetry &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content: High-Density Data Table View */}
      {viewLayout === 'table' && (
        <div
          className={`border rounded-xl overflow-hidden shadow-xs ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b font-mono uppercase text-[10px] ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                  >
                    <div className="flex items-center gap-1">
                      Station / Location <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('riskScore')}
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                  >
                    <div className="flex items-center gap-1">
                      Risk Score & Tier <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('rainfall')}
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                  >
                    <div className="flex items-center gap-1">
                      24h Rain <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3.5">Antecedent Index</th>
                  <th
                    onClick={() => handleSort('slope')}
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                  >
                    <div className="flex items-center gap-1">
                      Slope / Elev <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3.5">Primary Highway</th>
                  <th
                    onClick={() => handleSort('population')}
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                  >
                    <div className="flex items-center gap-1">
                      Pop. Exposed <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {sortedLocations.map((loc) => {
                  const isWarning = loc.prediction.riskLevel === 'WARNING';
                  const isWatch = loc.prediction.riskLevel === 'WATCH';
                  return (
                    <tr
                      key={loc.id}
                      onClick={() => onSelectLocation(loc)}
                      className={`cursor-pointer transition-colors ${
                        isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/60'
                      }`}
                    >
                      <td className="py-3 px-3.5 font-sans">
                        <div className="font-bold text-slate-900">{loc.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {loc.district}, {loc.state}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isWarning
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : isWatch
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {loc.prediction.riskLevel} {loc.prediction.riskScore}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-cyan-700 font-bold">
                        {loc.rainfall.today} mm
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        {Math.round(loc.rainfall.antecedentRainfallIndex)}/100
                      </td>
                      <td className="py-3 px-3.5 text-slate-700">
                        {loc.environmental.slope}° / {loc.environmental.elevation}m
                      </td>
                      <td className="py-3 px-3.5 text-slate-600 font-sans truncate max-w-[150px]">
                        {loc.exposure.roadSegments[0]?.name || 'Local Mountain Route'}
                      </td>
                      <td className="py-3 px-3.5 text-slate-700">
                        {loc.exposure.estimatedVulnerablePopulation}
                      </td>
                      <td className="py-3 px-3.5 text-right font-sans">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLocation(loc);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold transition-all"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
