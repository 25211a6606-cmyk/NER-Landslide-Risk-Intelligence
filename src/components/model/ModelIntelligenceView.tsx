import React, { useState } from 'react';
import {
  BrainCircuit,
  Cpu,
  Sliders,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Zap,
  Info,
  BarChart2,
  Layers,
  Sparkles
} from 'lucide-react';
import { ML_MODEL_SPECS } from '../../data/modelSpecs';
import { PredictionEngine } from '../../services/predictionService';

export const ModelIntelligenceView: React.FC<ModelIntelligenceViewProps> = () => {
  // Interactive Live GeoAI Inference Simulator State
  const [simElevation, setSimElevation] = useState(1400);
  const [simSlope, setSimSlope] = useState(42);
  const [simRainfall24h, setSimRainfall24h] = useState(125);
  const [simRainfall7d, setSimRainfall7d] = useState(380);
  const [simFaultDistance, setSimFaultDistance] = useState(1.8);
  const [simAntecedent, setSimAntecedent] = useState(78);

  // Compute live prediction using PredictionEngine formula
  const simSusceptibility = PredictionEngine.calculateSusceptibility({
    elevation: simElevation,
    slope: simSlope,
    aspect: 'S',
    geology: 'Disang Group (Splintery Shale & Siltstone)',
    soil: 'Clayey Loam',
    landCover: 'Degraded Forest',
    faultDistanceKm: simFaultDistance
  });

  const simTriggerScore = PredictionEngine.calculateRainfallTrigger(
    simRainfall24h,
    simRainfall7d,
    simAntecedent
  );

  const simRiskScore = Math.round(
    simSusceptibility * 0.45 * 100 + simTriggerScore * 0.4 * 100 + 0.15 * 65
  );

  const simRiskLevel =
    simRiskScore >= 70 ? 'WARNING' : simRiskScore >= 40 ? 'WATCH' : 'NORMAL';

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <BrainCircuit className="w-4 h-4" />
            Machine Learning & Explainable AI (XAI)
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
            GeoAI Prediction Engine & SHAP Explainability
          </h1>
          <p className="text-xs text-slate-400">
            Ensemble of Gradient Boosted Decision Trees (XGBoost v2.4) and Random Forest trained on 3,418 Geological Survey of India (GSI) landslide inventory occurrences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-mono font-bold">
            ROC-AUC: 0.942 • F1: 91.2%
          </span>
        </div>
      </div>

      {/* Model Performance & Architecture Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Model Type</span>
          <div className="text-sm font-extrabold text-white mt-0.5">{ML_MODEL_SPECS.modelName}</div>
          <div className="text-[10px] text-slate-500 mt-1">Version {ML_MODEL_SPECS.version}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Training Dataset</span>
          <div className="text-sm font-extrabold text-cyan-400 mt-0.5">
            {ML_MODEL_SPECS.trainingDataset.historicalEventsCount.toLocaleString()} Events
          </div>
          <div className="text-[10px] text-slate-500 mt-1">All 8 NER States (2010–2025)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Classification Accuracy</span>
          <div className="text-sm font-extrabold text-emerald-400 mt-0.5">
            {(ML_MODEL_SPECS.metrics.accuracy * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Precision: {(ML_MODEL_SPECS.metrics.precision * 100).toFixed(1)}%</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase">Inference Latency</span>
          <div className="text-sm font-extrabold text-amber-400 mt-0.5">
            {ML_MODEL_SPECS.inferenceLatencyMs} ms
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Real-time edge ready</div>
        </div>
      </div>

      {/* Interactive Live GeoAI Inference Simulator */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide font-mono">
              Live Interactive GeoAI Inference Simulator
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Adjust sliders to simulate dynamic slope failure inference
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Slope Gradient:</span>
                <span className="font-mono font-bold text-cyan-400">{simSlope}°</span>
              </div>
              <input
                type="range"
                min={5}
                max={65}
                value={simSlope}
                onChange={(e) => setSimSlope(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">24-Hour Rainfall Surge:</span>
                <span className="font-mono font-bold text-cyan-400">{simRainfall24h} mm</span>
              </div>
              <input
                type="range"
                min={0}
                max={350}
                value={simRainfall24h}
                onChange={(e) => setSimRainfall24h(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">7-Day Cumulative Saturation:</span>
                <span className="font-mono font-bold text-cyan-400">{simRainfall7d} mm</span>
              </div>
              <input
                type="range"
                min={10}
                max={600}
                value={simRainfall7d}
                onChange={(e) => setSimRainfall7d(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Antecedent Precipitation Index (API):</span>
                <span className="font-mono font-bold text-amber-400">{simAntecedent} / 100</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={simAntecedent}
                onChange={(e) => setSimAntecedent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Distance to Major Geological Fault Line:</span>
                <span className="font-mono font-bold text-slate-200">{simFaultDistance} km</span>
              </div>
              <input
                type="range"
                step={0.1}
                min={0.2}
                max={15}
                value={simFaultDistance}
                onChange={(e) => setSimFaultDistance(Number(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Inference Result Card (5 Cols) */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Live Model Output</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-bold text-slate-200">Predicted Risk Level</span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                    simRiskLevel === 'WARNING'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : simRiskLevel === 'WATCH'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  {simRiskLevel} ({simRiskScore}/100)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Terrain Susceptibility ($W_S=0.45$):</span>
                <span className="text-slate-200 font-bold">{Math.round(simSusceptibility * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rainfall Trigger ($W_R=0.40$):</span>
                <span className="text-cyan-400 font-bold">{Math.round(simTriggerScore * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Exposure Index ($W_E=0.15$):</span>
                <span className="text-amber-400 font-bold">65%</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-snug">
              {simRiskScore >= 70
                ? 'CRITICAL TRIGGER: Combined slope angle and 24h rainfall intensity have breached the dynamic Caine stability threshold. Immediate warning required.'
                : simRiskScore >= 40
                ? 'ELEVATED WATCH: High antecedent moisture with moderate slope triggers elevated watch status.'
                : 'STABLE: Environmental parameters indicate nominal slope equilibrium.'}
            </div>
          </div>
        </div>
      </div>

      {/* Global SHAP Feature Importance Ranking */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide font-mono">
              Global Feature Importance Ranking (SHAP TreeExplainer)
            </h3>
            <p className="text-[11px] text-slate-400">
              Mean absolute SHAP value impact across 3,418 training instances
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {ML_MODEL_SPECS.featureImportance.map((f, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold">{f.feature}</span>
                <span className="text-amber-400 font-bold">{f.importancePercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full"
                  style={{ width: `${f.importancePercentage * 3.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ModelIntelligenceViewProps {}
