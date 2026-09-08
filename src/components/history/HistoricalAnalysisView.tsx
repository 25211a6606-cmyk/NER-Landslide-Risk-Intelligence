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
  isLightMode?: boolean;
}

export const HistoricalAnalysisView: React.FC<HistoricalAnalysisViewProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  isLightMode = false
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
          <div className="text-[11px] font-mono font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4" />
            Hydrometeorological Trend Analysis
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Historical Retrospective & Antecedent Time Series
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
            Multi-temporal analysis of precipitation events, soil moisture accumulation, and risk index trajectories across historical landslide periods.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Location Selector */}
          <div
            className={`flex items-center gap-2 border rounded-xl px-3 py-1.5 ${
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
                  {loc.name} ({loc.state})
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe selector */}
          <div
            className={`flex items-center gap-1 border rounded-xl p-1 text-xs font-mono font-semibold ${
              isLightMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-700'
            }`}
          >
            {([7, 30, 90, 365] as const).map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeframe === days
                    ? 'bg-amber-500 text-white font-bold'
                    : isLightMode
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {days === 365 ? '1 Year' : `${days} Days`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Selected Station</span>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 truncate">
            {activeLoc.name}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{activeLoc.state}</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Peak 24h Rainfall</span>
          <div className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {peakRainfall.toFixed(1)} mm
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Within selected period</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Average Risk Score</span>
          <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
            {avgRisk} / 100
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Mean model risk</div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            isLightMode ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <span className="text-[10px] text-slate-400 uppercase">Threshold Breach Days</span>
          <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
            {warningBreachDays} Days
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Days with Warning ≥ 70</div>
        </div>
      </div>

      {/* Main Dual-Axis Chart: Rainfall Bars & Risk Score Line */}
      <div
        className={`p-5 rounded-2xl border space-y-4 shadow-sm ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3
              className={`font-bold text-xs uppercase tracking-wide font-mono ${
                isLightMode ? 'text-slate-800' : 'text-slate-100'
              }`}
            >
              Precipitation vs. Unified Landslide Risk Trajectory
            </h3>
            <p className="text-[11px] text-slate-500">
              Correlating daily precipitation events with predictive slope failure probabilities over time.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={timeSeriesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isLightMode ? '#e2e8f0' : '#1e293b'} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: isLightMode ? '#64748b' : '#94a3b8' }}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: 'Rainfall (mm)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: isLightMode ? '#64748b' : '#94a3b8',
                  fontSize: 10
                }}
                tick={{ fontSize: 10, fill: isLightMode ? '#64748b' : '#94a3b8' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                label={{
                  value: 'Risk Score (0-100)',
                  angle: 90,
                  position: 'insideRight',
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
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar
                yAxisId="left"
                dataKey="rainfallMm"
                name="Daily Rainfall (mm)"
                fill="#38bdf8"
                radius={[3, 3, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="riskScore"
                name="Landslide Risk Score"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
