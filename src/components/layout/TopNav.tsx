import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Bell,
  Sliders,
  RefreshCw,
  Zap,
  Code2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sun,
  Moon,
  X,
  Camera,
  Globe2,
  Wifi,
  WifiOff
} from 'lucide-react';
import { MonitoredLocation } from '../../types/location';
import { SystemNotification } from '../../types/alert';
import { SupportedLanguage } from '../../services/multilingualService';

interface TopNavProps {
  locations: MonitoredLocation[];
  onSelectLocation: (location: MonitoredLocation) => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenDevGuide: () => void;
  notifications: SystemNotification[];
  lastUpdated: string;
  onManualRefresh: () => void;
  isRefreshing: boolean;
  onTriggerDemoSurge: () => void;
  isLightMode?: boolean;
  onToggleLightMode?: () => void;
  onOpenFieldReport?: () => void;
  isOnline?: boolean;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  locations,
  onSelectLocation,
  onOpenNotifications,
  onOpenSettings,
  onOpenDevGuide,
  notifications,
  lastUpdated,
  onManualRefresh,
  isRefreshing,
  onTriggerDemoSurge,
  isLightMode = true,
  onToggleLightMode,
  onOpenFieldReport,
  isOnline = true,
  currentLanguage = 'en',
  onLanguageChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredSuggestions = searchQuery.trim()
    ? locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.exposure.roadSegments.some((r) =>
            r.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`h-16 border-b px-4 md:px-6 flex items-center justify-between z-30 shrink-0 select-none transition-colors ${
        isLightMode
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-xs'
          : 'bg-slate-900/90 backdrop-blur-md border-slate-800/80'
      }`}
    >
      {/* Brand & Project Identity */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
            isLightMode
              ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
              : 'bg-emerald-600 border-emerald-500 text-white'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1
              className={`font-extrabold text-sm md:text-base tracking-tight flex items-center gap-1.5 ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              GEOALERT
              <span
                className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isLightMode
                    ? 'bg-slate-100 text-slate-700 border border-slate-300'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                EARLY WARNING SYSTEM
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY
            </span>
            <span>•</span>
            <span className="hidden md:inline">
              Updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Center Search Bar with suggestions */}
      <div className="relative flex-1 max-w-md mx-4 hidden lg:block" ref={searchRef}>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pinpoint location, highway (e.g. Ranipool, NH-29, Cherrapunji)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className={`w-full border rounded-lg pl-9 pr-8 py-1.5 text-xs focus:outline-none focus:ring-1 transition-all ${
              isLightMode
                ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:ring-slate-300'
                : 'bg-slate-950/80 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-emerald-500/80 focus:ring-emerald-500/50'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isSearchOpen && filteredSuggestions.length > 0 && (
          <div
            className={`absolute left-0 right-0 top-full mt-1.5 border rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto z-50 divide-y ${
              isLightMode
                ? 'bg-white border-slate-200 divide-slate-100 text-slate-900'
                : 'bg-slate-900 border-slate-700 divide-slate-800 text-slate-100'
            }`}
          >
            {filteredSuggestions.map((loc) => {
              const isWarning = loc.prediction.riskLevel === 'WARNING';
              const isWatch = loc.prediction.riskLevel === 'WATCH';
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectLocation(loc);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors group ${
                    isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    <div>
                      <div
                        className={`text-xs font-bold ${
                          isLightMode ? 'text-slate-900' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {loc.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {loc.district}, {loc.state} • Elev: {loc.environmental.elevation}m • 24h Rain: {loc.rainfall.today}mm
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        isWarning
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : isWatch
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {loc.prediction.riskLevel} {loc.prediction.riskScore}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Controls & Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Multilingual Selector */}
        {onLanguageChange && (
          <div className="hidden md:flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              title="Change Alert & Notification Language"
              className={`text-[11px] font-bold rounded-lg px-2 py-1.5 border focus:outline-none transition-all ${
                isLightMode
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <option value="en">EN</option>
              <option value="as">অসমীয়া</option>
              <option value="hi">हिन्दी</option>
              <option value="mni">মৈতৈ</option>
              <option value="lus">Mizo</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        )}

        {/* Field Incident Reporting Trigger Button */}
        {onOpenFieldReport && (
          <button
            onClick={onOpenFieldReport}
            title="Submit Ground Hazard Observation / Incident Report (Offline-Capable)"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all active:scale-95 shadow-xs ${
              isLightMode
                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-emerald-950/40 hover:bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline font-mono text-[11px]">Field Report</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              title={isOnline ? 'Online Sync Active' : 'Offline Queue Active'}
            />
          </button>
        )}

        {/* Light Mode / Dark Mode Toggle Button */}
        {onToggleLightMode && (
          <button
            onClick={onToggleLightMode}
            title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 shadow-xs ${
              isLightMode
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            {isLightMode ? <Sun className="w-3.5 h-3.5 text-amber-600" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            <span className="hidden sm:inline font-mono text-[11px]">
              {isLightMode ? 'Light' : 'Dark'}
            </span>
          </button>
        )}

        {/* Quick Storm Spike Simulation Button */}
        <button
          onClick={onTriggerDemoSurge}
          title="Simulate sudden cloudburst rainfall surge & trigger automated warning SMS"
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-95 shadow-xs ${
            isLightMode
              ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800'
              : 'bg-rose-950/40 hover:bg-rose-950/60 border-rose-500/40 text-rose-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span className="font-mono text-[11px]">Surge Test</span>
        </button>

        {/* Manual Refresh Button */}
        <button
          onClick={onManualRefresh}
          disabled={isRefreshing}
          title="Fetch latest radar & dynamic prediction updates"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95 disabled:opacity-50 ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
          <span className="hidden xl:inline text-[11px]">Refresh</span>
        </button>

        {/* Developer / Code Architecture Modal Toggle */}
        <button
          onClick={onOpenDevGuide}
          title="View Python FastAPI, XGBoost & PostGIS Integration Guide"
          className={`p-2 rounded-lg border transition-all active:scale-95 ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-cyan-400'
          }`}
        >
          <Code2 className="w-4 h-4" />
        </button>

        {/* Notification Bell with Badge */}
        <button
          onClick={onOpenNotifications}
          title="Open Early Warnings & Notification Center"
          className={`p-2 rounded-lg border transition-all active:scale-95 relative ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* System Settings Button */}
        <button
          onClick={onOpenSettings}
          title="System Settings & Risk Threshold Config"
          className={`p-2 rounded-lg border transition-all active:scale-95 ${
            isLightMode
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
          }`}
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
