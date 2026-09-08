import React, { useState } from 'react';
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
  MapPin
} from 'lucide-react';
import { NER_HIGHWAY_LIFELINES, HighwayLifeline, HighwayStatus } from '../../data/roadConnectivity';

interface RoadConnectivityViewProps {
  isLightMode?: boolean;
}

export const RoadConnectivityView: React.FC<RoadConnectivityViewProps> = ({ isLightMode = false }) => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedHighway, setSelectedHighway] = useState<HighwayLifeline>(NER_HIGHWAY_LIFELINES[0]);

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

  return (
    <div className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full ${isLightMode ? 'text-slate-800' : 'text-slate-100'}`}>
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-rose-500/20 text-rose-500 border border-rose-500/30">
              Live BRO & NHIDCL Feeds
            </span>
            <span className="text-xs text-slate-400">Telemetry Sync: 1 min ago</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-1 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-500" />
            North-East Highway Lifelines & Road Connectivity Status
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl">
            Real-time tracking of strategic mountain transport arteries, landslide blockage points, single-lane restrictions, active clearance task forces, and alternate detour routes across all 8 NER states.
          </p>
        </div>

        {/* Quick Stat Summary */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-rose-500 font-bold uppercase">Blocked</div>
            <div className="text-xl font-black text-rose-500">{blockedCount}</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-amber-500 font-bold uppercase">Restricted</div>
            <div className="text-xl font-black text-amber-500">{restrictedCount}</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-orange-400 font-bold uppercase">Watch</div>
            <div className="text-xl font-black text-orange-400">{watchCount}</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-emerald-500 font-bold uppercase">Clear</div>
            <div className="text-xl font-black text-emerald-500">{clearCount}</div>
          </div>
          <div className={`px-3 py-2 rounded-lg border text-center ${isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <div className="text-xs text-slate-400 font-bold uppercase">Stranded</div>
            <div className="text-xl font-black text-indigo-400">{totalStranded}</div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          <span className="font-semibold text-slate-400">State:</span>
          {['ALL', 'Sikkim', 'Nagaland', 'Meghalaya', 'Mizoram', 'Arunachal Pradesh', 'Manipur', 'Assam', 'Tripura'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedState === st
                  ? 'bg-emerald-600 text-white shadow-sm'
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
          <span className="font-semibold text-slate-400">Status:</span>
          {['ALL', 'BLOCKED', 'RESTRICTED', 'HIGH_RISK_WATCH', 'CLEAR'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedStatus === st
                  ? 'bg-indigo-600 text-white shadow-sm'
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

      {/* Main Grid: Corridor List + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Highway Cards List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredHighways.map((hwy) => {
            const isSelected = selectedHighway.id === hwy.id;
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
                    ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
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
                  <span className="text-emerald-500 hover:underline font-semibold flex items-center gap-1">
                    View Detour & Sensors
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Highway Detailed Telemetry & Bypass Advisor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 rounded-xl border sticky top-4 space-y-5 ${isLightMode ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800 shadow-xl'}`}>
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
                <div className="text-sm font-semibold text-slate-100">{selectedHighway.blockageLocation.name}</div>
                <div className="text-xs text-slate-400 font-mono">
                  Coordinates: {selectedHighway.blockageLocation.latitude.toFixed(4)}°N, {selectedHighway.blockageLocation.longitude.toFixed(4)}°E ({selectedHighway.blockageLocation.chainageKm})
                </div>
                {selectedHighway.debrisVolumeEstimatedM3 && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-rose-500/20 text-xs">
                    <div>
                      <span className="text-slate-400">Est. Debris Volume:</span>
                      <div className="font-bold text-slate-200">{selectedHighway.debrisVolumeEstimatedM3.toLocaleString()} m³</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Est. Clearance Time:</span>
                      <div className="font-bold text-amber-300">{selectedHighway.estimatedRestorationHours} Hours</div>
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
                <span className="font-bold text-indigo-300">+{selectedHighway.bypassDistanceAddedKm} km detour</span>
              </div>
            </div>

            {/* Active Geotechnical & CCTV Monitoring Sensors */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                Live Corridor Telemetry Sensors
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="font-bold text-base text-emerald-400">{selectedHighway.activeMonitoringSensors.piezometers}</div>
                  <div className="text-[11px] text-slate-400">Pore Piezometers</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="font-bold text-base text-cyan-400">{selectedHighway.activeMonitoringSensors.tiltmeters}</div>
                  <div className="text-[11px] text-slate-400">Tiltmeters</div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                  <div className={`font-bold text-base ${selectedHighway.activeMonitoringSensors.cctvMonitoring ? 'text-emerald-400' : 'text-slate-500'}`}>
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
  );
};
