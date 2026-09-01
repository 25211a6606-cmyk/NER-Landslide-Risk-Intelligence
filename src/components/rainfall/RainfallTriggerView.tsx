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
}

export const RainfallTriggerView: React.FC<RainfallTriggerViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation
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
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <CloudRain className="w-4 h-4" />
            Meteorological & Hydrological Engine
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
            Rainfall Threshold & Trigger Dynamics
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analysis of IMD radar, GPM satellite 0.1° grids, antecedent precipitation decay, and empirical Caine Intensity-Duration (I-D) thresholds.
          </p>
        </div>

        {/* Location Selector Dropdown */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <select
            value={activeLoc.id}
            onChange={(e) => {
              setSelectedLocId(e.target.value);
              const found = locations.find((l) => l.id === e.target.value);
              if (found) onSelectLocation(found);
            }}
            className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                {loc.name} ({loc.state}) - {loc.rainfall.today}mm 24h
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 4 Quick Summary Badges for active location */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">24-Hour Rainfall</span>
          <div className="text-xl font-extrabold text-cyan-400 mt-0.5">
            {activeLoc.rainfall.today} <span className="text-xs font-normal">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">IMD Auto Weather Station</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">7-Day Cumulative</span>
          <div className="text-xl font-extrabold text-slate-100 mt-0.5">
            {activeLoc.rainfall.last7Days} <span className="text-xs font-normal">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">GPM Satellite 0.1° Raster</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Antecedent Index (API)</span>
          <div className="text-xl font-extrabold text-amber-400 mt-0.5">
            {Math.round(activeLoc.rainfall.antecedentRainfallIndex)} <span className="text-xs font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Decay Factor $k=0.85$</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Dynamic Trigger State</span>
          <div className={`text-xl font-extrabold mt-0.5 ${
            activeLoc.rainfall.triggerLevel === 'CRITICAL'
              ? 'text-rose-400'
              : activeLoc.rainfall.triggerLevel === 'HIGH'
              ? 'text-amber-400'
              : 'text-emerald-400'
          }`}>
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
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono">
                Intensity-Duration (I-D) Empirical Threshold
              </h3>
              <p className="text-[11px] text-slate-400">
                Formula: $I = 14.82 \times D^{'{'}-0.39{'}'}$ (Caine 1980 / GSI Calibrated)
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              {activeLoc.name}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={idData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="durationHours" label={{ value: 'Duration (Hours)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis label={{ value: 'Intensity (mm/hr)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="thresholdIntensityMmHr" name="Landslide Trigger Threshold (mm/hr)" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="actualIntensityMmHr" name="Observed Actual Intensity (mm/hr)" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4, fill: '#06b6d4' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-cyan-400 inline mr-1" />
            When observed rainfall intensity points lie <strong>above</strong> the dashed red threshold curve, the probability of sudden slope failure exceeds <strong>85%</strong>.
          </div>
        </div>

        {/* Chart 2: Top Regional Rainfall Hotspots */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono">
                Top 8 Regional Rainfall Hotspots (24h vs 7-Day)
              </h3>
              <p className="text-[11px] text-slate-400">
                Comparing current daily intensity against weekly ground saturation
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRainfallLocations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="today" name="24h Rainfall (mm)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="last7Days" name="7-Day Saturation (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            <Droplets className="w-3.5 h-3.5 text-cyan-400 inline mr-1" />
            Mangan, Noney, and Cherrapunji are displaying rapid ground saturation exceeding <strong>400 mm</strong> 7-day cumulative thresholds.
          </div>
        </div>
      </div>

      {/* Full Width Chart: 30-Day Historical Soil Saturation & API Trend */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono">
              30-Day Rainfall & Soil Moisture Saturation Trend: {activeLoc.name}
            </h3>
            <p className="text-[11px] text-slate-400">
              Antecedent Index decay reflects exponential moisture dissipation in hill slope overburden
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="dayLabel" tick={{ fontSize: 9, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="rainfallMm" name="Daily Rainfall (mm)" fill="#0284c7" radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="antecedentIndex" name="Antecedent Saturation (API)" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="riskScore" name="Computed Risk Score (/100)" stroke="#ef4444" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
