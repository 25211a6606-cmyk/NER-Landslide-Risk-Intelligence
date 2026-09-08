import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Camera,
  Wifi,
  WifiOff,
  CloudUpload,
  CheckCircle2,
  AlertTriangle,
  Send,
  FileText,
  User,
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';
import { FieldReportService, FieldReport } from '../../services/fieldReportService';

interface FieldReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  isLightMode?: boolean;
}

export const FieldReportingModal: React.FC<FieldReportingModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  isLightMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'list'>('submit');
  const [reporterName, setReporterName] = useState('');
  const [reporterRole, setReporterRole] = useState<FieldReport['reporterRole']>('Citizen Scout');
  const [contactPhone, setContactPhone] = useState('');
  const [state, setState] = useState('Sikkim');
  const [district, setDistrict] = useState('East Sikkim');
  const [landmark, setLandmark] = useState('');
  const [latitude, setLatitude] = useState<number>(27.33);
  const [longitude, setLongitude] = useState<number>(88.61);
  const [hazardType, setHazardType] = useState<FieldReport['hazardType']>('Tension Cracks on Hillside');
  const [severity, setSeverity] = useState<FieldReport['severity']>('HIGH');
  const [roadBlocked, setRoadBlocked] = useState(false);
  const [blockedHighway, setBlockedHighway] = useState('');
  const [estimatedHouseholds, setEstimatedHouseholds] = useState(25);
  const [notes, setNotes] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reports, setReports] = useState<FieldReport[]>([]);

  useEffect(() => {
    if (isOpen) {
      setReports(FieldReportService.getReports());
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(+pos.coords.latitude.toFixed(5));
          setLongitude(+pos.coords.longitude.toFixed(5));
          setIsLocating(false);
        },
        () => {
          // Fallback to Gangtok coords if permission denied in iframe
          setLatitude(27.3314);
          setLongitude(88.6138);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    FieldReportService.addReport(
      {
        reporterName: reporterName || 'Anonymous Scout',
        reporterRole,
        contactPhone: contactPhone || '+91 98765 43210',
        state,
        district,
        landmark: landmark || 'Slope above village stream',
        latitude,
        longitude,
        hazardType,
        severity,
        roadBlocked,
        blockedHighway: roadBlocked ? blockedHighway || 'State Hill Road' : undefined,
        estimatedAffectedHouseholds: estimatedHouseholds,
        notes: notes || 'Observed progressive ground movement and fissures during morning patrol.'
      },
      isOnline
    );

    setReports(FieldReportService.getReports());
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setActiveTab('list');
    }, 1200);
  };

  const handleSyncAll = () => {
    FieldReportService.syncPendingReports();
    setReports(FieldReportService.getReports());
  };

  const pendingCount = reports.filter((r) => !r.syncedToCloud).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-2xl max-h-[90vh] rounded-2xl border flex flex-col overflow-hidden shadow-2xl ${
          isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Field Hazard & Landslide Incident Reporting</h2>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isOnline
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {isOnline ? (
                    <>
                      <Wifi className="w-3 h-3" /> Online Sync Ready
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3" /> Offline Queue Active
                    </>
                  )}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct incident telemetry for DDMA, BRO engineers, Gaon Burhas, and remote citizens.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('submit')}
            className={`pb-2 px-3 border-b-2 transition-all ${
              activeTab === 'submit'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Submit Incident Report
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Report Log ({reports.length})
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
                {pendingCount} Pending Sync
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'submit' ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {submitSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Report filed successfully! {isOnline ? 'Synced to Cloud Database.' : 'Stored in Local Offline Queue.'}
                </div>
              )}

              {/* Reporter Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Your Name / Call Sign</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tenzing Norbu"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Role / Affiliation</label>
                  <select
                    value={reporterRole}
                    onChange={(e) => setReporterRole(e.target.value as FieldReport['reporterRole'])}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  >
                    <option value="Citizen Scout">Citizen Scout / Resident</option>
                    <option value="Village Gaon Burha">Village Gaon Burha / Council</option>
                    <option value="DDMA Official">DDMA / SDMA Officer</option>
                    <option value="BRO Engineer">BRO Engineer / Road Patrol</option>
                    <option value="NDRF Patrol">NDRF / SDRF Unit Scout</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94360 00000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  />
                </div>
              </div>

              {/* Hazard Type & Severity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Observed Hazard Indicator</label>
                  <select
                    value={hazardType}
                    onChange={(e) => setHazardType(e.target.value as FieldReport['hazardType'])}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  >
                    <option value="Tension Cracks on Hillside">Tension Cracks on Hillside / Creep</option>
                    <option value="Mud / Slurry Seepage from Slope Toe">Mud / Slurry Seepage from Slope Toe</option>
                    <option value="Minor Rockfall / Boulder Inundation">Minor Rockfall / Boulder Roll</option>
                    <option value="Road Subsidence / Sinking Pavement">Road Subsidence / Sinking Pavement</option>
                    <option value="Culvert / Mountain Drain Blockage">Culvert / Mountain Drain Blockage</option>
                    <option value="Retaining Wall Bulging / Shear Failure">Retaining Wall Bulging / Crack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Estimated Severity</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as const).map((sev) => (
                      <button
                        type="button"
                        key={sev}
                        onClick={() => setSeverity(sev)}
                        className={`p-2 rounded-lg font-bold text-center border transition-all ${
                          severity === sev
                            ? sev === 'CRITICAL'
                              ? 'bg-rose-600 text-white border-rose-500'
                              : sev === 'HIGH'
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-emerald-600 text-white border-emerald-500'
                            : isLightMode
                            ? 'bg-white border-slate-200 text-slate-600'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Coordinates & Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  >
                    {['Sikkim', 'Meghalaya', 'Assam', 'Arunachal Pradesh', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura'].map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">District / Village</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mangan / Chumoukedima"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 font-semibold">GPS Coordinates</label>
                    <button
                      type="button"
                      onClick={handleGetCurrentLocation}
                      disabled={isLocating}
                      className="text-[11px] text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      {isLocating ? 'Capturing...' : 'Fetch GPS'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      step="0.0001"
                      value={latitude}
                      onChange={(e) => setLatitude(+e.target.value)}
                      className={`p-2 rounded-lg border text-center font-mono ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}
                    />
                    <input
                      type="number"
                      step="0.0001"
                      value={longitude}
                      onChange={(e) => setLongitude(+e.target.value)}
                      className={`p-2 rounded-lg border text-center font-mono ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Road Blocked Toggle */}
              <div className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roadBlocked}
                    onChange={(e) => setRoadBlocked(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-semibold text-slate-200">Is Transport Road or Mountain Highway Blocked?</span>
                </label>
                {roadBlocked && (
                  <input
                    type="text"
                    placeholder="Highway code (e.g. NH-10, NH-29, SH-5)"
                    value={blockedHighway}
                    onChange={(e) => setBlockedHighway(e.target.value)}
                    className={`p-2 rounded-lg border text-xs ${isLightMode ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}
                  />
                )}
              </div>

              {/* Field Notes */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Field Observations & Remarks</label>
                <textarea
                  rows={3}
                  placeholder="Describe slope movement, water clarity, cracking width, or sounds heard..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                  }`}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isOnline ? 'Submit to Central Command' : 'Save in Local Offline Queue'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Sync Action Header */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700">
                <div>
                  <div className="text-xs font-bold text-slate-200">Local Report Storage</div>
                  <div className="text-xs text-slate-400">{pendingCount} reports awaiting cloud sync</div>
                </div>
                <button
                  onClick={handleSyncAll}
                  disabled={pendingCount === 0 || !isOnline}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    pendingCount > 0 && isOnline
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  <CloudUpload className="w-4 h-4" />
                  Sync to Cloud Now
                </button>
              </div>

              {/* Report List */}
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-800/60 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{rep.hazardType}</span>
                          <span
                            className={`px-2 py-0.2 rounded font-bold text-[10px] ${
                              rep.severity === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : rep.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {rep.severity}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 font-mono">
                          {rep.district}, {rep.state} • {rep.latitude.toFixed(4)}°N, {rep.longitude.toFixed(4)}°E
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          rep.syncedToCloud
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {rep.syncedToCloud ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Synced
                          </>
                        ) : (
                          <>
                            <WifiOff className="w-3 h-3" /> Queued
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">{rep.notes}</p>

                    <div className="pt-1.5 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Reporter: {rep.reporterName} ({rep.reporterRole})</span>
                      <span>{new Date(rep.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
