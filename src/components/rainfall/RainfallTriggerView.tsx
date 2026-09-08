import React, { useState } from 'react';
import {
  CloudRain,
  TrendingUp,
  AlertTriangle,
  Layers,
  MapPin,
  Clock,
  Info,
  Droplets,
  Activity
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';
import { RainfallService } from '../../services/rainfallService';
import {
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Area
} from 'recharts';

interface RainfallTriggerViewProps {
  locations: MonitoredLocation[];
  selectedLocation: MonitoredLocation;
  onSelectLocation: (loc: MonitoredLocation) => void;
  isLightMode?: boolean;
}

export const RainfallTriggerView: React.FC<RainfallTriggerViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  isLightMode = false
}) => {
  const [selectedLocId, setSelectedLocId] = useState(selectedLocation.id);

  const activeLoc = locations.find((l) => l.id === selectedLocId) || selectedLocation;

  // Multi-day accumulation comparison data for top 8 rainfall locations
  const topRainfallLocations = [...locations]
    .sort((a, b) => b.rainfall.today - a.rainfall.today)
    .slice(0, 8)
    .map((l) => ({
      name: l.name.length > 14 ? l.name.substring(0, 12) + '...' : l.name,
      fullName: l.name,
      state: l.state,
      today: l.rainfall.today,
      last3Days: l.rainfall.last3Days,
      last7Days: l.rainfall.last7Days,
      antecedent: Math.round(l.rainfall.antecedentRainfallIndex)
    }));

  // Intensity-Duration curve data for the active location
  const idData = RainfallService.getIntensityDurationPoints(activeLoc);

  // 30-Day Antecedent Decay Time Series
  const timeSeriesData = RainfallService.getHistoricalTimeSeries(activeLoc, 30);

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
          <div className="text-[11px] font-mono font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <CloudRain className="w-4 h-4" />
            Meteorological & Hydrological Engine
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Rainfall Threshold & Trigger Dynamics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
            Real-time analysis of IMD radar, GPM satellite 0.1° grids, antecedent precipitation decay, and empirical Caine Intensity-Duration (I-D) thresholds for all 70 monitored sites.
          </p>
        </div>

        {/* Location Selector Dropdown */}
        <div
          className={`flex items-center gap-2 border rounded-xl px-3 py-2 ${
            isLightMode ? 'bg-white border-slate-300 shadow-xs' : 'bg-slate-900 border-slate-700'
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <select
            value={activeLoc.id}
            onChange={(e) => {
              setSelectedLocId(e.target.value);
              const found = locations.find((l) => l.id === e.target.value);
              if (found) onSelectLocation(found);
            }}
            className={`bg-transparent text-xs focus:outline-none cursor-pointer font-medium ${
              isLightMode ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            {locations.map((loc) => (
              <option
                key={loc.id}
                value={loc.id}
                className={isLightMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-200'}
              >
                {loc.name} ({loc.state}) - {loc.rainfall.today}mm 24h
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 Quick Summary Badges for active location */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">24-Hour Rainfall</span>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {activeLoc.rainfall.today} <span className="text-xs font-normal">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">IMD Auto Weather Station</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">7-Day Cumulative</span>
          <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
            {activeLoc.rainfall.last7Days} <span className="text-xs font-normal">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">GPM Satellite 0.1° Raster</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Antecedent Index (API)</span>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
            {Math.round(activeLoc.rainfall.antecedentRainfallIndex)}{' '}
            <span className="text-xs font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Decay Factor $k=0.85$</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Dynamic Trigger State</span>
          <div
            className={`text-xl font-extrabold mt-0.5 ${
              activeLoc.rainfall.triggerLevel === 'CRITICAL'
                ? 'text-rose-600 dark:text-rose-400'
                : activeLoc.rainfall.triggerLevel === 'HIGH'
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {activeLoc.rainfall.triggerLevel}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Threshold {activeLoc.rainfall.today > 100 ? 'BREACHED' : 'NOMINAL'}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Intensity-Duration Curve + Cumulative Comparison Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: Intensity-Duration (I-D) Threshold Curve */}
        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-2 border-b ${
              isLightMode ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <div>
              <h3
                className={`font-bold text-xs uppercase tracking-wide font-mono ${
                  isLightMode ? 'text-slate-800' : 'text-slate-100'
                }`}
              >
                Intensity-Duration (I-D) Empirical Threshold
              </h3>
              <p className="text-[11px] text-slate-500">
                Formula: $I = 14.82 \times D^{'-0.39'}$ (Caine 1980 / GSI Calibrated)
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              {activeLoc.name}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={idData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isLightMode ? '#e2e8f0' : '#1e293b'} />
                <XAxis
                  dataKey="durationHours"
                  label={{
                    value: 'Duration (Hours)',
                    position: 'insideBottomRight',
                    offset: -5,
                    fill: isLightMode ? '#64748b' : '#94a3b8',
                    fontSize: 10
                  }}
                  tick={{ fontSize: 10, fill: isLightMode ? '#64748b' : '#94a3b8' }}
                />
                <YAxis
                  label={{
                    value: 'Intensity (mm/hr)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: isLightMode ? '#64748b' : '#94a3b8',
                    fontSize: 10
                  }}
                  tick={{ fontSize: 10, fill: isLightMode ? '#64748b' : '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    background: isLightMode ? '#ffffff' : '#0f172a',
                    borderColor: isLightMode ? '#cbd5e1' : '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: isLightMode ? '#0f172a' : '#f8fafc'
                  }}
                  labelStyle={{ color: isLightMode ? '#475569' : '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="thresholdIntensityMmHr"
                  name="Trigger Threshold (mm/hr)"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actualIntensityMmHr"
                  name="Observed Intensity (mm/hr)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#06b6d4' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Top Regional Rainfall Hotspots Bar Chart */}
        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-2 border-b ${
              isLightMode ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <div>
              <h3
                className={`font-bold text-xs uppercase tracking-wide font-mono ${
                  isLightMode ? 'text-slate-800' : 'text-slate-100'
                }`}
              >
                Top Precipitation Hotspots Across NER (24h mm)
              </h3>
              <p className="text-[11px] text-slate-500">
                Sorted by highest daily rainfall across all 8 states
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Live Sensor Sync
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topRainfallLocations}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isLightMode ? '#e2e8f0' : '#1e293b'} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: isLightMode ? '#64748b' : '#94a3b8' }}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 10, fill: isLightMode ? '#64748b' : '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    background: isLightMode ? '#ffffff' : '#0f172a',
                    borderColor: isLightMode ? '#cbd5e1' : '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: isLightMode ? '#0f172a' : '#f8fafc'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="today" name="24h Today (mm)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="last3Days"
                  name="3-Day Cum. (mm)"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
