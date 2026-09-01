import React from 'react';
import {
  DatabaseZap,
  CheckCircle2,
  Server,
  CloudRain,
  Radio,
  Cpu,
  Layers,
  RefreshCw,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface DataStatusViewProps {
  onManualRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

export const DataStatusView: React.FC<DataStatusViewProps> = ({
  onManualRefresh,
  isRefreshing,
  lastUpdated
}) => {
  const dataSources = [
    {
      name: 'GSI Landslide Inventory & Geodatabase',
      category: 'Geological Layer',
      status: 'OPERATIONAL',
      records: '3,418 verified events (2010–2025)',
      latency: 'Static Geopackage / GSI Portal',
      coverage: 'All 8 North-Eastern States',
      description: 'Historical landslide catalog, fault line distance vectors, and lithology formations.'
    },
    {
      name: 'IMD AWS Radar & GPM Satellite Grid',
      category: 'Meteorological Trigger',
      status: 'OPERATIONAL',
      records: '0.1° Spatial Grid Resolution',
      latency: '15 Minutes Sync Interval',
      coverage: 'Continuous NER Telemetry',
      description: 'Dynamic 24h, 3-day, 7-day cumulative precipitation raster with antecedent decay tracking.'
    },
    {
      name: 'Sentinel-1/2 & SRTM 30m Digital Elevation Model',
      category: 'Terrain Morphometry',
      status: 'OPERATIONAL',
      records: '30m Resolution DEM',
      latency: 'Daily Sentinel-2 NDVI Revisit',
      coverage: 'Eastern Himalayas / Patkai Range',
      description: 'High-precision slope angles, curvature, aspect orientation, and vegetation index.'
    },
    {
      name: 'PostgreSQL 16 + PostGIS Spatial Engine',
      category: 'Database & GIS Spatial Index',
      status: 'CONNECTED',
      records: '12 Spatial Tables (EPSG:4326)',
      latency: '3 ms Query Time',
      coverage: 'GIST Spatial Indexes',
      description: 'High-speed hazard buffer radius queries for subscriber proximity filtering.'
    },
    {
      name: 'XGBoost v2.4 GeoAI Inference Core',
      category: 'Machine Learning Model',
      status: 'ONLINE',
      records: 'ROC-AUC: 0.942 / F1: 91.2%',
      latency: '18 ms Inference Latency',
      coverage: '38 Monitored Sites',
      description: 'Dynamic landslide risk classification with SHAP factor explainability.'
    },
    {
      name: 'BSNL NER Telecom & Twilio SMS Gateway',
      category: 'Early Warning Dispatch',
      status: 'ONLINE (MOCK + API READY)',
      records: '18 Active Verified Subscribers',
      latency: '420 ms Average Delivery',
      coverage: 'Pan-India Mobile Reach',
      description: 'Automated radius broadcast early warning SMS with failure fallback queue.'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto h-full text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <DatabaseZap className="w-4 h-4" />
            Infrastructure & Sensor Health
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-0.5">
            Data Feeds & Service Architecture Status
          </h1>
          <p className="text-xs text-slate-400">
            Real-time health monitoring of geological rasters, meteorological radars, ML inference microservices, and SMS gateways.
          </p>
        </div>

        <button
          onClick={onManualRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          Force Telemetry Sync
        </button>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.map((source, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                    {source.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-100 mt-0.5">{source.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  {source.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{source.description}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Records / Spec:</span>
                <span className="text-slate-300 font-semibold">{source.records}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sync Latency:</span>
                <span className="text-amber-400 font-semibold">{source.latency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Coverage:</span>
                <span className="text-emerald-400 font-semibold">{source.coverage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
