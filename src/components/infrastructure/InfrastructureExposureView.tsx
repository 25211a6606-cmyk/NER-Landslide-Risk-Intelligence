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
}

export const InfrastructureExposureView: React.FC<InfrastructureExposureViewProps> = ({
  locations,
  onSelectLocation
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
  const totalBridges = locations.reduce((sum, l) => sum + l.exposure.bridges, 0);

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            Infrastructure & Critical Assets Exposure
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
            National Highway Corridors & Settlement Vulnerability
          </h1>
          <p className="text-xs text-slate-400">
            Monitoring lifeline connectivity across arterial mountain highways (NH-10, NH-29, NH-6, NH-37) and vulnerable hillside settlements.
          </p>
        </div>
      </div>

      {/* Top 4 Quick Impact Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40">
          <span className="text-[10px] text-rose-400 uppercase font-semibold">High Vulnerability Roads</span>
          <div className="text-2xl font-extrabold text-rose-300 mt-0.5">
            {highVulnCount} <span className="text-xs font-normal">Corridors</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">High traffic blockage risk</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Exposed Hospitals</span>
          <div className="text-2xl font-extrabold text-cyan-400 mt-0.5">
            {totalHospitals} <span className="text-xs font-normal">Facilities</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Within 5km hazard buffer</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Schools & Colleges</span>
          <div className="text-2xl font-extrabold text-amber-400 mt-0.5">
            {totalSchools} <span className="text-xs font-normal">Institutions</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Evacuation priority assets</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Mountain Bridges</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
            {totalBridges} <span className="text-xs font-normal">Spans</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">River & gorge crossings</div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterVulnerability}
            onChange={(e) => setFilterVulnerability(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Vulnerability Tiers ({allRoads.length} segments)</option>
            <option value="HIGH">High Vulnerability ({highVulnCount} segments)</option>
            <option value="MODERATE">Moderate Vulnerability</option>
            <option value="LOW">Low Vulnerability</option>
          </select>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search road name or highway corridor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Road Network & Highway Corridors Table */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400" />
            Monitored Lifeline Highway & Road Segments ({filteredRoads.length})
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Live Traffic Vulnerability Index</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[10px] uppercase font-mono text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Highway / Road Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Monitored Location</th>
                <th className="px-4 py-3">State & District</th>
                <th className="px-4 py-3 text-center">Distance</th>
                <th className="px-4 py-3 text-center">Vulnerability</th>
                <th className="px-4 py-3 text-center">Hazard Risk</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRoads.map((road, idx) => {
                const isHigh = road.trafficVulnerability === 'HIGH';
                const isWarning = road.riskLevel === 'WARNING';
                return (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    onClick={() => onSelectLocation(road.locationObj)}
                  >
                    <td className="px-4 py-3 font-bold text-slate-100 group-hover:text-emerald-400">
                      {road.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">{road.type}</td>
                    <td className="px-4 py-3 font-semibold text-slate-300">{road.locationName}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {road.district}, {road.state}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-slate-400">
                      {road.distanceMeters} m
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isHigh
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {road.trafficVulnerability}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isWarning
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {road.riskLevel} {road.riskScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-400 group-hover:underline">
                      Inspect &rarr;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
