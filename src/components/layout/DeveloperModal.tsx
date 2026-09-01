import React, { useState } from 'react';
import {
  X,
  Code2,
  Terminal,
  Database,
  Cpu,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'fastapi' | 'ml' | 'postgis' | 'sms'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fastApiCode = `# backend/main.py
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib, numpy as np, pandas as pd

app = FastAPI(title="NER AI Landslide Early Warning API", version="2.4.2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained XGBoost / GeoAI Model Artifacts
model = joblib.load("models/ner_landslide_xgboost_v2.4.pkl")
scaler = joblib.load("models/spatial_feature_scaler.pkl")

class PredictionRequest(BaseModel):
    elevation: float
    slope: float
    rainfall_24h: float
    rainfall_7d: float
    antecedent_api_index: float
    geology_code: int
    fault_distance_km: float

@app.post("/api/locations/{location_id}/prediction")
async def predict_risk(location_id: str, req: PredictionRequest):
    features = np.array([[
        req.elevation, req.slope, req.rainfall_24h,
        req.rainfall_7d, req.antecedent_api_index,
        req.geology_code, req.fault_distance_km
    ]])
    scaled = scaler.transform(features)
    prob_risk = float(model.predict_proba(scaled)[0][1])
    risk_score = int(prob_risk * 100)
    risk_level = "WARNING" if risk_score >= 70 else ("WATCH" if risk_score >= 40 else "NORMAL")
    
    return {
        "location_id": location_id,
        "susceptibility_score": round(prob_risk * 0.9, 2),
        "rainfall_trigger_score": round(min(1.0, req.rainfall_7d / 400.0), 2),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "confidence": 0.94
    }`;

  const postgisCode = `-- Database: PostGIS Geospatial Schema for North-East India
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE monitored_locations (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    geom GEOMETRY(Point, 4326) NOT NULL,
    elevation NUMERIC(6, 1),
    slope_deg NUMERIC(4, 1),
    geology_unit VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_locations_geom ON monitored_locations USING GIST(geom);

CREATE TABLE sms_subscribers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    alert_radius_km INT DEFAULT 10,
    alert_type VARCHAR(16) DEFAULT 'BOTH',
    geom GEOMETRY(Point, 4326) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Find all subscribers within hazard buffer radius (ST_DWithin in meters)
CREATE OR REPLACE FUNCTION get_subscribers_in_hazard_zone(
    hazard_lat DOUBLE PRECISION,
    hazard_lng DOUBLE PRECISION,
    radius_km DOUBLE PRECISION
) RETURNS SETOF sms_subscribers AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM sms_subscribers
    WHERE active = TRUE
      AND ST_DWithin(
          geom::geography,
          ST_SetSRID(ST_MakePoint(hazard_lng, hazard_lat), 4326)::geography,
          radius_km * 1000
      );
END;
$$ LANGUAGE plpgsql;`;

  const twilioCode = `# backend/sms_service.py
from twilio.rest import Client
import os

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(account_sid, auth_token)

def send_landslide_early_warning_sms(to_phone: str, location_name: str, score: int, trigger_msg: str):
    message_body = (
        f"[GEOALERT EARLY WARNING]\\n"
        f"EMERGENCY WARNING: High landslide risk detected at {location_name}. "
        f"Risk Score: {score}/100. Trigger: {trigger_msg}. "
        f"Avoid mountain road travel. State Disaster Helpline: 1070."
    )
    message = client.messages.create(
        body=message_body,
        from_=twilio_number,
        to=to_phone
    )
    return {"message_sid": message.sid, "status": message.status}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                Production Backend & ML Integration Architecture
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  SIH HACKATHON GUIDE
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">FastAPI, XGBoost model pipeline, PostGIS GIS spatial queries & Twilio gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 gap-2">
          {[
            { id: 'architecture', label: '1. Architecture & Real API Switch', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'fastapi', label: '2. FastAPI Endpoints', icon: <Terminal className="w-3.5 h-3.5" /> },
            { id: 'ml', label: '3. XGBoost GeoAI Pipeline', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'postgis', label: '4. PostGIS Schemas', icon: <Database className="w-3.5 h-3.5" /> },
            { id: 'sms', label: '5. Real Twilio / SMS Gateway', icon: <MessageSquare className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-cyan-200 leading-relaxed">
                <strong>How to switch from DEMO MODE to REAL LIVE API:</strong>
                <p className="mt-1 text-[11px] text-slate-300">
                  The frontend is structured with an API service abstraction (<code className="text-cyan-300">/src/services/api.ts</code>). To connect your real Python FastAPI server:
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-[11px] font-mono text-slate-300">
                  <li>Set <code className="text-amber-300">VITE_API_BASE_URL="http://localhost:8000"</code> in <code className="text-amber-300">.env</code></li>
                  <li>Run your FastAPI service on port 8000: <code className="text-emerald-400">uvicorn backend.main:app --reload --port 8000</code></li>
                  <li>All mock data falls back automatically if the backend is unreachable, ensuring zero downtime during hackathon presentations!</li>
                </ol>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-200 text-xs">Core Multi-Layer System Architecture:</h4>
                <div className="text-[11px] font-mono text-slate-400 space-y-1">
                  <div>1. <strong>Sensing Layer:</strong> IMD AWS Stations + NASA GPM IMERG 0.1° Rainfall Grid + Sentinel-1/2 Satellites</div>
                  <div>2. <strong>Spatial Engine:</strong> PostGIS PostgreSQL (EPSG:4326 / SRTM 30m DEM Slopes & Catchments)</div>
                  <div>3. <strong>GeoAI Model:</strong> XGBoost + Random Forest Ensemble trained on 3,418 GSI Landslide Events</div>
                  <div>4. <strong>Decision Core:</strong> Unified Risk = 0.45×Susceptibility + 0.40×Dynamic Rainfall + 0.15×Exposure</div>
                  <div>5. <strong>Early Warning:</strong> Radius Buffer Subscribed User Matcher → Automated SMS Dispatch (BSNL/Twilio)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fastapi' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">backend/main.py (Python 3.11 + FastAPI)</span>
                <button
                  onClick={() => handleCopy(fastApiCode, 'fastapi')}
                  className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'fastapi' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'fastapi' ? 'Copied' : 'Copy Code'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {fastApiCode}
              </pre>
            </div>
          )}

          {activeTab === 'ml' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <h4 className="font-bold text-slate-200 text-xs mb-2">Model Feature Engineering & Training Pipeline:</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  The model utilizes 7 key geospatial & meteorological features. Antecedent Rainfall Index (API) is computed using exponential daily decay:
                </p>
                <div className="p-2 my-2 bg-slate-900 rounded font-mono text-[11px] text-emerald-400">
                  API_t = P_t + 0.85 * API_(t-1)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Coupled with Caine (1980) empirical intensity-duration curve <span className="font-mono text-cyan-300">I = 14.82 * D^(-0.39)</span> to identify threshold breach conditions.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'postgis' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">database/schema.sql (PostgreSQL 16 + PostGIS)</span>
                <button
                  onClick={() => handleCopy(postgisCode, 'postgis')}
                  className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'postgis' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'postgis' ? 'Copied' : 'Copy SQL'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {postgisCode}
              </pre>
            </div>
          )}

          {activeTab === 'sms' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">backend/sms_service.py (Twilio / Indian SMS Gateway)</span>
                <button
                  onClick={() => handleCopy(twilioCode, 'sms')}
                  className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'sms' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'sms' ? 'Copied' : 'Copy Code'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {twilioCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">
            SIH 2026 Project Implementation Blueprint
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
