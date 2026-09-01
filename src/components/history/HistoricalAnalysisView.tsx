import React, { useState } from 'react';
import {
  History,
  Clock,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CloudRain,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';
import { RainfallService } from '../../services/rainfallService';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Area
} from 'recharts';

interface HistoricalAnalysisViewProps {
  locations: MonitoredLocation[];
  selectedLocation: MonitoredLocation;
  onSelectLocation: (loc: MonitoredLocation) => void;
}

export const HistoricalAnalysisView: React.FC<HistoricalAnalysisViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation
}) => {
  const [selectedLocId, setSelectedLocId] = useState(selectedLocation.id);
  const [timeframe, setTimeframe] = useState<7 | 30 | 90 | 365>(30);

  const activeLoc = locations.find((l) => l.id === selectedLocId) || selectedLocation;
  const timeSeriesData = RainfallService.getHistoricalTimeSeries(activeLoc, timeframe);

  const peakRainfall = Math.max(...timeSeriesData.map((d) => d.rainfallMm));
  const avgRisk = Math.round(
    timeSeriesData.reduce((sum, d) => sum + d.riskScore, 0) / timeSeriesData.length
  );
  const warningBreachDays = timeSeriesData.filter((d) => d.riskScore >= 70).length;

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4" />
            Hydrometeorological Trend Analysis
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
            Historical Landslide Risk & Rainfall Dynamics
          </h1>
          <p className="text-xs text-slate-400">
            Multi-temporal analysis of rainfall triggers, soil saturation degradation, and historical threshold breach events.
          </p>
        </div>

        {/* Controls: Location + Timeframe */}
        <div className="flex flex-wrap items-center gap-3">
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
                  {loc.name} ({loc.state})
                </option>
              ))}
            </select>
          </div>

          <div className="flex bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-xs font-mono">
            {([7, 30, 90, 365] as const).map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days)}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeframe === days
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {days === 365 ? '1 Year' : `${days}D`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Monitored Window</span>
          <div className="text-xl font-extrabold text-white mt-0.5">{timeframe} Days</div>
          <div className="text-[10px] text-slate-500 mt-1">{activeLoc.name}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Peak 1-Day Rainfall</span>
          <div className="text-xl font-extrabold text-cyan-400 mt-0.5">
            {peakRainfall} <span className="text-xs font-normal">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Single-day monsoon surge</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Warning Breach Days</span>
          <div className="text-xl font-extrabold text-rose-400 mt-0.5">
            {warningBreachDays} <span className="text-xs font-normal">Days (Score &ge; 70)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">High slope failure risk</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Average Risk Score</span>
          <div className="text-xl font-extrabold text-amber-400 mt-0.5">
            {avgRisk} <span className="text-xs font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Temporal baseline</div>
        </div>
      </div>

      {/* Main Historical Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono">
              Rainfall vs Antecedent Index (API) vs Computed Risk ({timeframe}-Day Timeline)
            </h3>
            <p className="text-[11px] text-slate-400">
              Interactive timeline correlating daily rainfall pulses with progressive slope saturation
            </p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="dayLabel" tick={{ fontSize: 9, fill: '#64748b' }} />
              <YAxis yAxisId="left" label={{ value: 'Rainfall / API (mm)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: 'Risk Score (/100)', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 10 }} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="rainfallMm" name="Daily Rainfall (mm)" fill="#06b6d4" radius={[2, 2, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="antecedentIndex" name="Antecedent Saturation (API)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="riskScore" name="Computed Risk Score" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
