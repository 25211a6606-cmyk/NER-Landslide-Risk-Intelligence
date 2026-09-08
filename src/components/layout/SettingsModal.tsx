import React from 'react';
import {
  X,
  Sliders,
  Layers,
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Gauge,
  Sun,
  Moon
} from 'lucide-react';
import { SystemSettingsState, MapTileStyle, RiskThresholdConfig } from '../../types/config';
import { MonitoredLocation } from '../../types/location';
import { PredictionEngine } from '../../services/predictionService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettingsState;
  onUpdateSettings: (newSettings: Partial<SystemSettingsState>) => void;
  onResetDefaults: () => void;
  locations?: MonitoredLocation[];
  isLightMode?: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetDefaults,
  locations = [],
  isLightMode = false
}) => {
  if (!isOpen) return null;

  // Calculate live preview distribution of risk categories with current slider values
  const previewStats = React.useMemo(() => {
    if (!locations.length) return { normal: 0, watch: 0, warning: 0, total: 0 };
    let normal = 0;
    let watch = 0;
    let warning = 0;

    for (const loc of locations) {
      const pred = PredictionEngine.evaluateRisk(
        loc.environmental,
        loc.rainfall,
        loc.exposure,
        settings.riskThresholds
      );
      if (pred.riskLevel === 'WARNING') warning++;
      else if (pred.riskLevel === 'WATCH') watch++;
      else normal++;
    }

    return { normal, watch, warning, total: locations.length };
  }, [locations, settings.riskThresholds]);

  // Scientific Presets for SIH & Disaster Management
  const applyPreset = (preset: 'standard' | 'rain_surge' | 'steep_slope' | 'infra_priority') => {
    let newThresholds: RiskThresholdConfig;
    switch (preset) {
      case 'rain_surge':
        newThresholds = {
          ...settings.riskThresholds,
          susceptibilityWeight: 0.30,
          rainfallWeight: 0.55,
          exposureWeight: 0.15,
          normalMax: 35,
          watchMax: 64,
          warningMin: 65
        };
        break;
      case 'steep_slope':
        newThresholds = {
          ...settings.riskThresholds,
          susceptibilityWeight: 0.60,
          rainfallWeight: 0.25,
          exposureWeight: 0.15,
          normalMax: 40,
          watchMax: 69,
          warningMin: 70
        };
        break;
      case 'infra_priority':
        newThresholds = {
          ...settings.riskThresholds,
          susceptibilityWeight: 0.35,
          rainfallWeight: 0.35,
          exposureWeight: 0.30,
          normalMax: 38,
          watchMax: 67,
          warningMin: 68
        };
        break;
      case 'standard':
      default:
        newThresholds = {
          ...settings.riskThresholds,
          susceptibilityWeight: 0.45,
          rainfallWeight: 0.40,
          exposureWeight: 0.15,
          normalMax: 39,
          watchMax: 69,
          warningMin: 70
        };
        break;
    }
    onUpdateSettings({ riskThresholds: newThresholds });
  };

  // Helper to adjust weights proportionally
  const handleWeightChange = (
    key: 'susceptibilityWeight' | 'rainfallWeight' | 'exposureWeight',
    val: number
  ) => {
    const current = { ...settings.riskThresholds };
    current[key] = val;

    // Normalize other two weights so sum is 1.0
    const otherKeys = (
      ['susceptibilityWeight', 'rainfallWeight', 'exposureWeight'] as const
    ).filter((k) => k !== key);

    const remaining = Math.max(0.01, 1.0 - val);
    const sumOthers = current[otherKeys[0]] + current[otherKeys[1]] || 1;
    current[otherKeys[0]] = +(
      (current[otherKeys[0]] / sumOthers) *
      remaining
    ).toFixed(2);
    current[otherKeys[1]] = +(
      remaining - current[otherKeys[0]]
    ).toFixed(2);

    onUpdateSettings({ riskThresholds: current });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border ${
          isLightMode
            ? 'bg-white border-slate-300 text-slate-800'
            : 'bg-slate-900 border-slate-700 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base">System & Risk Thresholds Engine</h2>
              <p className="text-[11px] text-slate-400">
                Calibrate ML cutoffs, formula weights, live telemetry stream, and GIS styles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isLightMode
                ? 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                : 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-6 text-xs">
          {/* Section 1: Real-Time ML Risk Thresholds & Impact Preview */}
          <div
            className={`p-4 rounded-xl border space-y-4 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="font-bold text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Multi-Hazard Risk Threshold Cutoffs</span>
              </label>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                Live Re-evaluation: Active
              </span>
            </div>

            {/* Visual Risk Bands with Live Dynamic Counts */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div
                className={`p-2.5 rounded-xl border ${
                  isLightMode
                    ? 'bg-emerald-50/80 border-emerald-200'
                    : 'bg-emerald-950/30 border-emerald-500/30'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  NORMAL
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  0 – {settings.riskThresholds.normalMax}
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium mt-1">
                  {previewStats.normal} locations ({Math.round((previewStats.normal / (previewStats.total || 1)) * 100)}%)
                </div>
              </div>

              <div
                className={`p-2.5 rounded-xl border ${
                  isLightMode
                    ? 'bg-amber-50/80 border-amber-200'
                    : 'bg-amber-950/30 border-amber-500/30'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  WATCH
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {settings.riskThresholds.normalMax + 1} – {settings.riskThresholds.watchMax}
                </div>
                <div className="text-[10px] text-amber-700 dark:text-amber-300 font-medium mt-1">
                  {previewStats.watch} locations ({Math.round((previewStats.watch / (previewStats.total || 1)) * 100)}%)
                </div>
              </div>

              <div
                className={`p-2.5 rounded-xl border ${
                  isLightMode
                    ? 'bg-rose-50/80 border-rose-200'
                    : 'bg-rose-950/30 border-rose-500/30'
                }`}
              >
                <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">
                  WARNING
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {settings.riskThresholds.warningMin} – 100
                </div>
                <div className="text-[10px] text-rose-700 dark:text-rose-300 font-medium mt-1">
                  {previewStats.warning} locations ({Math.round((previewStats.warning / (previewStats.total || 1)) * 100)}%)
                </div>
              </div>
            </div>

            {/* Threshold Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    Normal / Watch Cutoff Score:
                  </span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {settings.riskThresholds.normalMax}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={55}
                  value={settings.riskThresholds.normalMax}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const newWatchMax = Math.max(val + 1, settings.riskThresholds.watchMax);
                    onUpdateSettings({
                      riskThresholds: {
                        ...settings.riskThresholds,
                        normalMax: val,
                        watchMax: newWatchMax
                      }
                    });
                  }}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                  <span>20 (Aggressive Sensitivity)</span>
                  <span>Default: 39</span>
                  <span>55 (Conservative Sensitivity)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    Watch / Warning Emergency Cutoff:
                  </span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    {settings.riskThresholds.warningMin}
                  </span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={85}
                  value={settings.riskThresholds.warningMin}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onUpdateSettings({
                      riskThresholds: {
                        ...settings.riskThresholds,
                        warningMin: val,
                        watchMax: val - 1
                      }
                    });
                  }}
                  className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                  <span>55 (Earlier Warning Triggers)</span>
                  <span>Default: 70</span>
                  <span>85 (Extreme Threshold Only)</span>
                </div>
              </div>
            </div>

            {/* Unified Formula Weights & Presets */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-500" />
                  Unified Risk Formula Weights Calibration
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400">
                  Risk = (W<sub>S</sub> × Susceptibility) + (W<sub>R</sub> × Rainfall) + (W<sub>E</sub> × Exposure)
                </span>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPreset('standard')}
                  className="px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 text-slate-700 dark:text-slate-200"
                >
                  Standard GSI / NDMA (45/40/15)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('rain_surge')}
                  className="px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-cyan-500 text-slate-700 dark:text-slate-200"
                >
                  Monsoon Cloudburst Focus (30/55/15)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('steep_slope')}
                  className="px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-500 text-slate-700 dark:text-slate-200"
                >
                  Geotechnical / Slope Focus (60/25/15)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('infra_priority')}
                  className="px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-500 text-slate-700 dark:text-slate-200"
                >
                  Population & Road Priority (35/35/30)
                </button>
              </div>

              {/* Dynamic Weight Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-slate-500">W<sub>S</sub> Susceptibility</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {Math.round(settings.riskThresholds.susceptibilityWeight * 100)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.8}
                    step={0.05}
                    value={settings.riskThresholds.susceptibilityWeight}
                    onChange={(e) =>
                      handleWeightChange('susceptibilityWeight', Number(e.target.value))
                    }
                    className="w-full accent-emerald-500 cursor-pointer h-1.5"
                  />
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-slate-500">W<sub>R</sub> Rainfall Trigger</span>
                    <strong className="text-cyan-600 dark:text-cyan-400 font-mono">
                      {Math.round(settings.riskThresholds.rainfallWeight * 100)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.8}
                    step={0.05}
                    value={settings.riskThresholds.rainfallWeight}
                    onChange={(e) =>
                      handleWeightChange('rainfallWeight', Number(e.target.value))
                    }
                    className="w-full accent-cyan-500 cursor-pointer h-1.5"
                  />
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-slate-500">W<sub>E</sub> Exposure</span>
                    <strong className="text-purple-600 dark:text-purple-400 font-mono">
                      {Math.round(settings.riskThresholds.exposureWeight * 100)}%
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.5}
                    step={0.05}
                    value={settings.riskThresholds.exposureWeight}
                    onChange={(e) =>
                      handleWeightChange('exposureWeight', Number(e.target.value))
                    }
                    className="w-full accent-purple-500 cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Real-Time Telemetry & Live Polling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-500" />
                  Live Telemetry Stream
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ liveSimulationActive: !settings.liveSimulationActive })
                  }
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all border ${
                    settings.liveSimulationActive
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {settings.liveSimulationActive ? 'STREAMING ACTIVE' : 'PAUSED'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Receives simulated live IMD weather station telemetry and piezometer pore-pressure pulses.
              </p>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  Telemetry Refresh Frequency
                </label>
                <select
                  value={settings.autoRefreshIntervalSeconds}
                  onChange={(e) =>
                    onUpdateSettings({ autoRefreshIntervalSeconds: Number(e.target.value) })
                  }
                  className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:border-emerald-500 ${
                    isLightMode
                      ? 'bg-white border-slate-300 text-slate-800'
                      : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  <option value={0}>Manual Trigger Only</option>
                  <option value={10}>Every 10 Seconds (Fast Demo Simulation)</option>
                  <option value={20}>Every 20 Seconds (Interactive Monitoring)</option>
                  <option value={60}>Every 60 Seconds (Standard Radar Interval)</option>
                  <option value={300}>Every 5 Minutes (Battery Optimized)</option>
                </select>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <label className="font-bold text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Alerts & Audio Settings
              </label>
              <p className="text-[11px] text-slate-500">
                Trigger audible warning chimes when locations surpass the emergency threshold.
              </p>

              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({ soundAlertsEnabled: !settings.soundAlertsEnabled })
                }
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  settings.soundAlertsEnabled
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500'
                }`}
              >
                <span className="flex items-center gap-2">
                  {settings.soundAlertsEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  )}
                  Critical Warning Audio Beeps
                </span>
                <span className="font-mono font-bold">
                  {settings.soundAlertsEnabled ? 'ENABLED' : 'MUTED'}
                </span>
              </button>
            </div>
          </div>

          {/* Section 3: GIS Map Base Layer */}
          <div>
            <label className="font-bold text-xs flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              GIS Cartographic Map Base Layer
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'carto-dark', label: 'Carto Dark GIS', desc: 'High-contrast base' },
                { id: 'osm-standard', label: 'OpenStreetMap', desc: 'Standard topographic' },
                { id: 'esri-satellite', label: 'ESRI Satellite', desc: 'High-res satellite' },
                { id: 'opentopo', label: 'OpenTopo Relief', desc: 'Elevation contours' }
              ].map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => onUpdateSettings({ mapStyle: tile.id as MapTileStyle })}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    settings.mapStyle === tile.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-white shadow-xs font-semibold'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-slate-500 hover:border-slate-400 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs">{tile.label}</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{tile.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className={`p-4 border-t flex items-center justify-between ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          <button
            type="button"
            onClick={onResetDefaults}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              isLightMode
                ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Standard Defaults
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-emerald-500/20 transition-all"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
