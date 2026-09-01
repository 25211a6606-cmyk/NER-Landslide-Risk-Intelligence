import React, { useState } from 'react';
import {
  MessageSquarePlus,
  Phone,
  User,
  MapPin,
  Compass,
  Radio,
  CheckCircle2,
  ShieldCheck,
  Search,
  Send,
  Sparkles,
  AlertOctagon
} from 'lucide-react';
import { Subscriber } from '../../types/alert';
import { MonitoredLocation, NERState } from '../../types/location';
import { alertService } from '../../services/alertService';
import { smsService } from '../../services/smsService';
import { NER_STATES_INFO } from '../../data/nerLocations';

interface AlertSubscriptionProps {
  locations: MonitoredLocation[];
  onSubscriberAdded?: () => void;
  isLightMode?: boolean;
}

export const AlertSubscription: React.FC<AlertSubscriptionProps> = ({
  locations,
  onSubscriberAdded,
  isLightMode = true
}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(alertService.getSubscribers());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<NERState>('Sikkim');
  const [district, setDistrict] = useState('');
  const [alertRadiusKm, setAlertRadiusKm] = useState(10);
  const [alertType, setAlertType] = useState<'WARNING' | 'WATCH' | 'BOTH'>('BOTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [testSMSMessage, setTestSMSMessage] = useState<string | null>(null);

  const allStates = Object.keys(NER_STATES_INFO) as NERState[];
  const stateLocations = locations.filter((l) => l.state === state);
  const availableDistricts = Array.from(new Set(stateLocations.map((l) => l.district)));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Pick first location in district for coordinates
    const matchedLoc = stateLocations.find((l) => l.district === district) || stateLocations[0];
    const lat = matchedLoc ? matchedLoc.latitude : 27.3389;
    const lng = matchedLoc ? matchedLoc.longitude : 88.6065;

    const newSub = alertService.addSubscriber({
      name: name.trim(),
      phone: phone.startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      state,
      district: district || availableDistricts[0] || 'Statewide',
      locationArea: district || 'Central District Corridor',
      latitude: lat,
      longitude: lng,
      alertRadiusKm,
      alertType
    });

    setSubscribers(alertService.getSubscribers());
    setSuccessMessage(
      `Registration successful! ${newSub.name} will receive automated early warning SMS for ${newSub.district}, ${newSub.state}.`
    );
    setName('');
    setPhone('');
    if (onSubscriberAdded) onSubscriberAdded();
  };

  const handleSendTestSMS = async (sub: Subscriber) => {
    setTestSMSMessage(`Dispatching test verification SMS to ${sub.phone}...`);
    const mockAlert = alertService.getActiveAlerts()[0] || {
      id: 'TEST_ALT',
      locationId: 'TEST_LOC',
      locationName: `${sub.district} Sector`,
      state: sub.state,
      district: sub.district,
      riskLevel: 'WARNING' as const,
      riskScore: 88,
      triggerReason: 'Simulated high-intensity rainfall trigger test',
      affectedRadiusKm: sub.alertRadiusKm,
      affectedSubscribersCount: 1,
      recommendedAction: 'Testing active gateway link.',
      timestamp: new Date().toISOString(),
      status: 'ACTIVE' as const,
      smsDispatchedCount: 1,
      coordinates: [sub.latitude, sub.longitude] as [number, number]
    };

    const res = await smsService.sendSMS({
      recipientPhone: sub.phone,
      recipientName: sub.name,
      messageText: `[GEOALERT TEST] Landslide Early Warning gateway verification for ${sub.district}, ${sub.state}. Carrier link active.`,
      locationName: mockAlert.locationName,
      riskLevel: mockAlert.riskLevel,
      alertId: mockAlert.id,
      subscriberId: sub.id
    });
    setTestSMSMessage(
      `Test SMS ${res.status}! Delivered to ${sub.name} (${sub.phone}) in ${res.latencyMs}ms via ${res.carrierGateway}.`
    );
    setTimeout(() => setTestSMSMessage(null), 5000);
  };

  const filteredSubscribers = subscribers.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      s.district.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`p-4 md:p-6 space-y-6 overflow-y-auto h-full transition-colors ${
        isLightMode ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquarePlus className="w-4 h-4" />
            Public Safety & Officer Alert Subscription
          </div>
          <h1
            className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            SMS Early Warning Subscriber Registry
          </h1>
          <p className="text-xs text-slate-500">
            Register citizens, road transport operators, SDMA disaster officials, and PWD engineers to receive radius-targeted SMS warnings during extreme rainfall surges.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Registration Form + Subscriber Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Registration Form (5 Cols) */}
        <div
          className={`lg:col-span-5 p-5 rounded-2xl border space-y-4 shadow-xl ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-slate-200/50'
              : 'bg-slate-900 border-slate-800 shadow-black/40'
          }`}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2
              className={`text-sm font-bold uppercase tracking-wide font-mono ${
                isLightMode ? 'text-slate-900' : 'text-slate-100'
              }`}
            >
              Register New Subscriber
            </h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-600 font-semibold block mb-1">
                Full Name / Designation:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tenzing Lepcha (PWD Inspector)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-700 text-slate-100'
                }`}
              />
            </div>

            <div>
              <label className="text-slate-600 font-semibold block mb-1">
                Mobile Phone Number (+91):
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-700 text-slate-100'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">State:</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value as NERState);
                    setDistrict('');
                  }}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  {allStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">District:</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  <option value="">All / Priority District</option>
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">
                  Alert Buffer Radius:
                </label>
                <select
                  value={alertRadiusKm}
                  onChange={(e) => setAlertRadiusKm(Number(e.target.value))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  <option value={5}>5 km Radius</option>
                  <option value={10}>10 km (Standard)</option>
                  <option value={25}>25 km (District Wide)</option>
                  <option value={50}>50 km (Regional)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">
                  Alert Level Preference:
                </label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value as any)}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                >
                  <option value="BOTH">WATCH + WARNING (All)</option>
                  <option value="WARNING">WARNING Only (High Hazard)</option>
                  <option value="WATCH">WATCH Only</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Activate SMS Subscription
            </button>
          </form>

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Column 2: Active Subscribers List (7 Cols) */}
        <div
          className={`lg:col-span-7 p-5 rounded-2xl border space-y-4 shadow-xl flex flex-col justify-between ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-slate-200/50'
              : 'bg-slate-900 border-slate-800 shadow-black/40'
          }`}
        >
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h2
                  className={`text-sm font-bold uppercase tracking-wide font-mono ${
                    isLightMode ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  Registered Subscribers Directory ({filteredSubscribers.length})
                </h2>
                <p className="text-[11px] text-slate-500">
                  Targeted disaster responders, transport unions & citizens
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`border rounded-lg pl-8 pr-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isLightMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-700 text-slate-200'
                  }`}
                />
              </div>
            </div>

            {testSMSMessage && (
              <div className="p-2.5 bg-cyan-50 border border-cyan-300 text-cyan-900 text-xs rounded-lg flex items-center gap-2 animate-in fade-in">
                <Send className="w-3.5 h-3.5 text-cyan-600" />
                <span>{testSMSMessage}</span>
              </div>
            )}

            {/* Subscribers List */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredSubscribers.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    isLightMode
                      ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold text-xs ${
                          isLightMode ? 'text-slate-900' : 'text-slate-100'
                        }`}
                      >
                        {sub.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 text-[10px] rounded font-mono border ${
                          isLightMode
                            ? 'bg-slate-200 text-slate-700 border-slate-300'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {sub.alertType}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-700 font-bold mt-0.5">
                      {sub.phone}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {sub.district}, {sub.state} • Radius: {sub.alertRadiusKm} km
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendTestSMS(sub)}
                    className={`px-2.5 py-1.5 border rounded-lg text-xs font-mono flex items-center gap-1 transition-all active:scale-95 shrink-0 ${
                      isLightMode
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Send className="w-3 h-3 text-cyan-600" />
                    Test SMS
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border text-[11px] font-mono flex items-center justify-between ${
              isLightMode
                ? 'bg-slate-50 border-slate-200 text-slate-600'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <span>Total Registered Subscribers: {subscribers.length}</span>
            <span className="text-emerald-600 font-semibold">Telecom Gateway Link Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
