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
  ShieldCheck
} from 'lucide-react';
import { SystemSettingsState, MapTileStyle } from '../../types/config';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettingsState;
  onUpdateSettings: (newSettings: Partial<SystemSettingsState>) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetDefaults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-sm text-slate-100">System & Risk Engine Settings</h2>
              <p className="text-[11px] text-slate-400">Configure ML thresholds, map layers, and sync frequencies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Section 1: Map Tile Styles */}
          <div>
            <label className="font-semibold text-slate-200 flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              GIS Map Tile Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'carto-dark', label: 'Carto Dark GIS', desc: 'High contrast dark base' },
                { id: 'osm-standard', label: 'OpenStreetMap', desc: 'Standard topographic' },
                { id: 'esri-satellite', label: 'ESRI Satellite', desc: 'Satellite imagery' },
                { id: 'opentopo', label: 'OpenTopo Terrain', desc: 'Elevation contours' }
              ].map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => onUpdateSettings({ mapStyle: tile.id as MapTileStyle })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    settings.mapStyle === tile.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs">{tile.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{tile.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Configurable Risk Thresholds */}
          <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Calibrated ML Risk Thresholds
              </label>
              <span className="text-[10px] font-mono text-slate-500">Configurable for SIH validation</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">NORMAL</div>
                <div className="text-sm font-bold text-white mt-1">
                  0 – {settings.riskThresholds.normalMax}
                </div>
              </div>
              <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">WATCH</div>
                <div className="text-sm font-bold text-white mt-1">
                  {settings.riskThresholds.normalMax + 1} – {settings.riskThresholds.watchMax}
                </div>
              </div>
              <div className="p-2 rounded bg-rose-950/30 border border-rose-500/30">
                <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">WARNING</div>
                <div className="text-sm font-bold text-white mt-1">
                  {settings.riskThresholds.warningMin} – 100
                </div>
              </div>
            </div>

            {/* Threshold Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Normal / Watch Cutoff Score:</span>
                  <span className="font-mono font-bold text-amber-400">{settings.riskThresholds.normalMax}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={55}
                  value={settings.riskThresholds.normalMax}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onUpdateSettings({
                      riskThresholds: {
                        ...settings.riskThresholds,
                        normalMax: val
                      }
                    });
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Watch / Warning Emergency Cutoff:</span>
                  <span className="font-mono font-bold text-rose-400">{settings.riskThresholds.warningMin}</span>
                </div>
                <input
                  type="range"
                  min={60}
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
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Weights Breakdown */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-300 mb-2">
                Unified Risk Formula Weights ($W_S$ Susceptibility, $W_R$ Dynamic Rainfall, $W_E$ Exposure):
              </div>
              <div className="flex gap-2 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">
                  Susceptibility: <strong className="text-emerald-400">{Math.round(settings.riskThresholds.susceptibilityWeight * 100)}%</strong>
                </span>
                <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">
                  Rainfall Trigger: <strong className="text-cyan-400">{Math.round(settings.riskThresholds.rainfallWeight * 100)}%</strong>
                </span>
                <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">
                  Exposure: <strong className="text-amber-400">{Math.round(settings.riskThresholds.exposureWeight * 100)}%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Auto-Refresh & Sound */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-200 flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Live Polling Interval
              </label>
              <select
                value={settings.autoRefreshIntervalSeconds}
                onChange={(e) =>
                  onUpdateSettings({ autoRefreshIntervalSeconds: Number(e.target.value) })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value={0}>Manual Refresh Only</option>
                <option value={15}>Every 15 Seconds (Rapid Demo)</option>
                <option value={30}>Every 30 Seconds</option>
                <option value={60}>Every 60 Seconds (Default)</option>
                <option value={300}>Every 5 Minutes (Production Mode)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-200 flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Audio & Visual Alerts
              </label>
              <button
                onClick={() =>
                  onUpdateSettings({ soundAlertsEnabled: !settings.soundAlertsEnabled })
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all ${
                  settings.soundAlertsEnabled
                    ? 'border-emerald-500 bg-emerald-500/10 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-2">
                  {settings.soundAlertsEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  )}
                  Audible Warning Beeps
                </span>
                <span className="font-mono font-bold">
                  {settings.soundAlertsEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  );
};
