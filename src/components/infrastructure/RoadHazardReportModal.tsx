import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  MapPin,
  Car,
  Send,
  CheckCircle2,
  Phone,
  User,
  Navigation,
  HardHat,
  Radio,
  Flame,
  Droplets,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  RoadHazardReportService,
  RoadHazardReport,
  RoadHazardCategory,
  PassabilityStatus
} from '../../services/roadHazardReportService';
import { NER_HIGHWAY_LIFELINES, HighwayLifeline } from '../../data/roadConnectivity';

interface RoadHazardReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedHighway?: HighwayLifeline | null;
  onReportSubmitted: (newReport: RoadHazardReport) => void;
  isLightMode?: boolean;
}

const CATEGORIES: {
  id: RoadHazardCategory;
  label: string;
  sublabel: string;
  icon: string;
  badgeColor: string;
}[] = [
  {
    id: 'ROAD_BLOCKED',
    label: 'Total Road Blockage',
    sublabel: 'Landslide debris, mudflow or wash-away cutting off all traffic',
    icon: '⛔',
    badgeColor: 'border-rose-500/40 bg-rose-500/10 text-rose-500'
  },
  {
    id: 'POTHOLES_CRATERS',
    label: 'Severe Potholes & Craters',
    sublabel: 'Deep water-filled holes, road surface breakdown, undercarriage scraping',
    icon: '🕳️',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-500'
  },
  {
    id: 'ROCKFALL_BOULDERS',
    label: 'Active Rockfall / Boulders',
    sublabel: 'Rolling rocks or large boulders occupying lanes on mountain cuts',
    icon: '🪨',
    badgeColor: 'border-orange-500/40 bg-orange-500/10 text-orange-400'
  },
  {
    id: 'ROAD_SUBSIDENCE',
    label: 'Road Sinking & Subsidence',
    sublabel: 'Valley-side pavement sinking, deep longitudinal cracks, edge drop',
    icon: '📉',
    badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-400'
  },
  {
    id: 'WATER_MUD_SLURRY',
    label: 'Mud Slurry & Culvert Overflow',
    sublabel: 'Flooding over carriageway, torrential sediment deposition',
    icon: '🌊',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
  },
  {
    id: 'RETAINING_WALL_COLLAPSE',
    label: 'Retaining Wall / Edge Collapse',
    sublabel: 'Breast wall bulging or collapsed gabion baskets threatening road',
    icon: '🧱',
    badgeColor: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-500'
  }
];

export const RoadHazardReportModal: React.FC<RoadHazardReportModalProps> = ({
  isOpen,
  onClose,
  preSelectedHighway,
  onReportSubmitted,
  isLightMode = false
}) => {
  const [category, setCategory] = useState<RoadHazardCategory>('ROAD_BLOCKED');
  const [passability, setPassability] = useState<PassabilityStatus>('COMPLETELY_BLOCKED');
  const [selectedHighwayId, setSelectedHighwayId] = useState<string>(
    preSelectedHighway ? preSelectedHighway.id : 'HWY_NH10_SIK'
  );
  const [customHighwayCode, setCustomHighwayCode] = useState('');
  const [state, setState] = useState(preSelectedHighway?.connectingStates[0] || 'Sikkim');
  const [district, setDistrict] = useState('');
  const [landmark, setLandmark] = useState('');
  const [latitude, setLatitude] = useState<number>(27.062);
  const [longitude, setLongitude] = useState<number>(88.468);
  const [isLocating, setIsLocating] = useState(false);
  const [potholeSeverity, setPotholeSeverity] = useState<'SHALLOW' | 'DEEP_DANGEROUS' | 'TIRE_DAMAGE_CRATERS'>('DEEP_DANGEROUS');
  const [description, setDescription] = useState('');
  const [strandedVehicles, setStrandedVehicles] = useState<number>(0);
  const [reporterName, setReporterName] = useState('');
  const [reporterRole, setReporterRole] = useState<RoadHazardReport['reporterRole']>('Commuter / Driver');
  const [contactPhone, setContactPhone] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (preSelectedHighway) {
      setSelectedHighwayId(preSelectedHighway.id);
      setState(preSelectedHighway.connectingStates[0]);
      if (preSelectedHighway.blockageLocation) {
        setLatitude(preSelectedHighway.blockageLocation.latitude);
        setLongitude(preSelectedHighway.blockageLocation.longitude);
        setLandmark(preSelectedHighway.blockageLocation.name);
      } else {
        setLandmark(preSelectedHighway.criticalSection);
      }
    }
  }, [preSelectedHighway, isOpen]);

  if (!isOpen) return null;

  const handleDetectGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(+pos.coords.latitude.toFixed(4));
          setLongitude(+pos.coords.longitude.toFixed(4));
          setIsLocating(false);
        },
        () => {
          // Fallback location near highway corridor
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedHwyObj = NER_HIGHWAY_LIFELINES.find((h) => h.id === selectedHighwayId);
    const code = selectedHighwayId === 'CUSTOM'
      ? (customHighwayCode || 'State Hill Road')
      : (selectedHwyObj?.highwayCode || 'NH-10');
    const hwyName = selectedHighwayId === 'CUSTOM'
      ? 'Custom Mountain Corridor'
      : (selectedHwyObj?.name || 'Highway Corridor');

    const createdReport = RoadHazardReportService.addReport({
      highwayId: selectedHighwayId !== 'CUSTOM' ? selectedHighwayId : undefined,
      highwayCode: code,
      highwayName: hwyName,
      category,
      passability,
      state: state || 'Sikkim',
      district: district || 'East Sikkim',
      landmarkOrChainage: landmark || 'Near critical slope section',
      latitude,
      longitude,
      description: description || 'Reported road blockage / hazard due to recent rainfall and landslide movement.',
      reportedBy: reporterName.trim() || 'Commuter on Route',
      reporterRole,
      contactPhone: contactPhone || undefined,
      potholeSeverity: category === 'POTHOLES_CRATERS' ? potholeSeverity : undefined,
      estimatedStrandedVehicles: strandedVehicles > 0 ? strandedVehicles : undefined
    });

    setSubmitSuccess(true);
    onReportSubmitted(createdReport);

    setTimeout(() => {
      setSubmitSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl max-h-[90vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-col transition-all ${
          isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 border border-rose-500/30 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Report Road Hazard / Blockage / Potholes
              </h2>
              <p className="text-[11px] text-slate-400">
                Crowdsourced live highway telemetry for BRO, PWD, and fellow North-East commuters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center gap-3 animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <div>
                <div className="font-bold text-sm">Road Hazard Report Submitted!</div>
                <div className="text-xs text-emerald-300/90">
                  Broadcasted to the live commuter feed, local PWD control desk, and BRO quick-response network.
                </div>
              </div>
            </div>
          )}

          {/* 1. Hazard Category Selection Grid */}
          <div className="space-y-2">
            <label className="font-bold uppercase tracking-wider text-[11px] text-slate-400 flex items-center justify-between">
              <span>Select Road Hazard Category *</span>
              <span className="text-[10px] text-indigo-400 font-mono">Step 1 of 4</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      if (cat.id === 'ROAD_BLOCKED') setPassability('COMPLETELY_BLOCKED');
                      else if (cat.id === 'POTHOLES_CRATERS') setPassability('PASSABLE_WITH_CAUTION');
                      else if (cat.id === 'ROCKFALL_BOULDERS') setPassability('SINGLE_LANE_RESTRICTED');
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? isLightMode
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                          : 'border-indigo-500 bg-indigo-950/40 shadow-sm ring-1 ring-indigo-500/50'
                        : isLightMode
                        ? 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80'
                        : 'border-slate-800 bg-slate-950/40 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{cat.icon}</span>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        {cat.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                        {cat.sublabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Corridor & Location Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800/60">
            <label className="font-bold uppercase tracking-wider text-[11px] text-slate-400 flex items-center justify-between">
              <span>Highway Corridor & Location *</span>
              <span className="text-[10px] text-indigo-400 font-mono">Step 2 of 4</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Highway Corridor</label>
                <select
                  value={selectedHighwayId}
                  onChange={(e) => {
                    setSelectedHighwayId(e.target.value);
                    const match = NER_HIGHWAY_LIFELINES.find((h) => h.id === e.target.value);
                    if (match) {
                      setState(match.connectingStates[0]);
                      if (match.blockageLocation) {
                        setLandmark(match.blockageLocation.name);
                        setLatitude(match.blockageLocation.latitude);
                        setLongitude(match.blockageLocation.longitude);
                      }
                    }
                  }}
                  className={`w-full p-2.5 rounded-lg border text-xs font-mono font-medium focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  {NER_HIGHWAY_LIFELINES.map((hwy) => (
                    <option key={hwy.id} value={hwy.id}>
                      {hwy.highwayCode} — {hwy.name} ({hwy.connectingStates.join(', ')})
                    </option>
                  ))}
                  <option value="CUSTOM">+ Other State Highway / Hill Road</option>
                </select>
              </div>

              {selectedHighwayId === 'CUSTOM' && (
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Road / Highway Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mangan-Chungthang Road, SH-12, Border Arterial"
                    value={customHighwayCode}
                    onChange={(e) => setCustomHighwayCode(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none ${
                      isLightMode
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  {['Sikkim', 'Nagaland', 'Meghalaya', 'Mizoram', 'Arunachal Pradesh', 'Manipur', 'Assam', 'Tripura'].map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">District / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Kalimpong, Pakyong, Chumoukedima, East Jaintia"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Exact Landmark / Chainage / Mile Marker *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 29th Mile near Teesta Bridge, Km 18.2 Pagla Pahar"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>

            {/* GPS Detector button */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-mono text-[11px]">
                  Coordinates: {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
                </span>
              </div>
              <button
                type="button"
                onClick={handleDetectGPS}
                disabled={isLocating}
                className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-semibold transition-all flex items-center gap-1"
              >
                <Radio className="w-3 h-3" />
                {isLocating ? 'Acquiring GPS...' : 'Use My GPS Location'}
              </button>
            </div>
          </div>

          {/* 3. Passability & Impact Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800/60">
            <label className="font-bold uppercase tracking-wider text-[11px] text-slate-400 flex items-center justify-between">
              <span>Passability & Vehicle Impact *</span>
              <span className="text-[10px] text-indigo-400 font-mono">Step 3 of 4</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'COMPLETELY_BLOCKED', label: 'Blocked (0 Lanes)', icon: '🛑', color: 'text-rose-500 border-rose-500/40' },
                { id: 'SINGLE_LANE_RESTRICTED', label: '1 Lane Open', icon: '⚠️', color: 'text-amber-500 border-amber-500/40' },
                { id: 'PASSABLE_WITH_CAUTION', label: 'Passable (Caution)', icon: '🟡', color: 'text-yellow-400 border-yellow-500/40' },
                { id: 'HAZARD_DEVELOPING', label: 'Developing Danger', icon: 'ℹ️', color: 'text-cyan-400 border-cyan-500/40' }
              ].map((p) => {
                const isSelected = passability === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setPassability(p.id as PassabilityStatus)}
                    className={`p-2 rounded-lg border text-center font-bold text-xs transition-all ${
                      isSelected
                        ? isLightMode
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : isLightMode
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-base mb-0.5">{p.icon}</div>
                    <div className="text-[11px]">{p.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Special Pothole Depth selector if Potholes chosen */}
            {category === 'POTHOLES_CRATERS' && (
              <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 space-y-1.5 animate-in fade-in duration-150">
                <label className="text-[11px] font-bold text-amber-400">Pothole Cluster Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'SHALLOW', label: 'Moderate Uneven Surface' },
                    { id: 'DEEP_DANGEROUS', label: 'Deep Craters (>15cm depth)' },
                    { id: 'TIRE_DAMAGE_CRATERS', label: 'Rim & Axle Damage Danger' }
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setPotholeSeverity(lvl.id as any)}
                      className={`p-1.5 rounded text-[10px] font-semibold border transition-all ${
                        potholeSeverity === lvl.id
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Observed Stranded / Held Vehicles</label>
                <input
                  type="number"
                  min={0}
                  step={5}
                  value={strandedVehicles}
                  onChange={(e) => setStrandedVehicles(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="e.g. 25"
                  className={`w-full p-2 rounded-lg border text-xs font-mono focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Description & On-Site Conditions *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50m mud stretch, deep holes, single lane moving slowly..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 4. Reporter Identity */}
          <div className="space-y-3 pt-2 border-t border-slate-800/60">
            <label className="font-bold uppercase tracking-wider text-[11px] text-slate-400 flex items-center justify-between">
              <span>Reporter Identification (Optional)</span>
              <span className="text-[10px] text-indigo-400 font-mono">Step 4 of 4</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tashi Bhutia / Anonymous"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Your Role</label>
                <select
                  value={reporterRole}
                  onChange={(e) => setReporterRole(e.target.value as any)}
                  className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  <option value="Commuter / Driver">Commuter / Private Driver</option>
                  <option value="Local Taxi Operator">Local Taxi Operator</option>
                  <option value="Commercial Trucker">Commercial Trucker / Goods Carrier</option>
                  <option value="Local Resident">Local Resident / Villager</option>
                  <option value="PWD / Field Volunteer">PWD / Disaster Volunteer</option>
                  <option value="BRO Patrol Scout">BRO Patrol Scout</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Contact Phone (For verification)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className={`w-full p-2 rounded-lg border text-xs focus:outline-none font-mono ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isLightMode ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitSuccess}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Publish Road Hazard Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
