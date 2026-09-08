import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  Car,
  AlertTriangle,
  MapPin,
  Compass,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';

interface InfrastructureExposureViewProps {
  locations: MonitoredLocation[];
  onSelectLocation: (loc: MonitoredLocation) => void;
  isLightMode?: boolean;
}

export const InfrastructureExposureView: React.FC<InfrastructureExposureViewProps> = ({
  locations,
  onSelectLocation,
  isLightMode = false
}) => {
  const [filterVulnerability, setFilterVulnerability] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all highway segments from all locations
  const allRoads = locations.flatMap((loc) =>
    loc.exposure.roadSegments.map((road) => ({
      ...road,
      locationId: loc.id,
      locationName: loc.name,
      state: loc.state,
      district: loc.district,
      riskScore: loc.prediction.riskScore,
      riskLevel: loc.prediction.riskLevel,
      locationObj: loc
    }))
  );

  const filteredRoads = allRoads.filter((r) => {
    if (filterVulnerability !== 'ALL' && r.trafficVulnerability !== filterVulnerability) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.locationName.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const highVulnCount = allRoads.filter((r) => r.trafficVulnerability === 'HIGH').length;
  const totalHospitals = locations.reduce((sum, l) => sum + l.exposure.hospitals, 0);
  const totalSchools = locations.reduce((sum, l) => sum + l.exposure.schools, 0);
  const totalPopulation = locations.reduce(
    (sum, l) => sum + l.exposure.estimatedVulnerablePopulation,
    0
  );

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'text-slate-800' : 'text-slate-100'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="text-[11px] font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Infrastructure & Critical Assets Exposure
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            National Highways, Lifelines & Population Exposure
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
            Vulnerability mapping of strategic mountain corridors (NH-10, NH-29, NH-102, NH-37), bridges, hospitals, power grids, and high-density settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-lg text-xs font-mono font-bold">
            {highVulnCount} High-Exposure Corridors
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Highway Corridors</span>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {allRoads.length} Segments
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Across 8 North-Eastern States</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Critical Medical Centers</span>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {totalHospitals} Facilities
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Hospitals & Trauma Centers</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Educational Facilities</span>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
            {totalSchools} Schools/Colleges
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Evacuation Staging Zones</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Vulnerable Population</span>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
            {(totalPopulation / 1000).toFixed(0)}k Residents
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Census 2024 / Spatial Density</div>
        </div>
      </div>

      {/* Highway Exposure Table */}
      <div
        className={`p-4 rounded-xl border space-y-4 shadow-sm ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search highway (e.g. NH-10, NH-29) or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none transition-colors ${
                isLightMode
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  : 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">Vulnerability:</span>
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterVulnerability(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                  filterVulnerability === lvl
                    ? 'bg-indigo-600 text-white'
                    : isLightMode
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
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
                <th className="p-3">Highway Corridor</th>
                <th className="p-3">State & District</th>
                <th className="p-3">Daily Traffic (PCU)</th>
                <th className="p-3">Vulnerability</th>
                <th className="p-3">Hazard Risk Score</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isLightMode ? 'divide-slate-100' : 'divide-slate-800/80'
              }`}
            >
              {filteredRoads.map((road, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      {road.name}
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {road.locationName}, {road.district} ({road.state})
                  </td>
                  <td className="p-3 font-mono text-slate-700 dark:text-slate-300">
                    {road.dailyTrafficVolume.toLocaleString()} vehicles/day
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
                      className={`font-bold ${
                        road.riskLevel === 'WARNING'
                          ? 'text-rose-600 dark:text-rose-400'
                          : road.riskLevel === 'WATCH'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {road.riskScore}/100 ({road.riskLevel})
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectLocation(road.locationObj)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-400 hover:text-white rounded-md text-[11px] font-semibold transition-all"
                    >
                      Inspect Site
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
