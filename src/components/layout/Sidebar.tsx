import React from 'react';
import {
  LayoutDashboard,
  Map,
  Crosshair,
  Layers,
  CloudRain,
  ShieldAlert,
  BellRing,
  MessageSquarePlus,
  History,
  BrainCircuit,
  DatabaseZap,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Truck,
  Ambulance
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'map'
  | 'location'
  | 'explorer'
  | 'rainfall'
  | 'infrastructure'
  | 'road-connectivity'
  | 'emergency-response'
  | 'alerts'
  | 'subscribe'
  | 'history'
  | 'model'
  | 'data-status'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeWarningsCount: number;
  activeWatchesCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isLightMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  activeWarningsCount,
  activeWatchesCount,
  isCollapsed,
  onToggleCollapse,
  isLightMode = true
}) => {
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Overview Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />
    },
    {
      id: 'map',
      label: 'Live GIS Risk Map',
      icon: <Map className="w-4 h-4 shrink-0" />,
      badge: `${activeWarningsCount} Alert`,
      badgeColor: 'bg-rose-100 text-rose-800 border border-rose-300'
    },
    {
      id: 'explorer',
      label: 'Location & Site Explorer',
      icon: <Layers className="w-4 h-4 shrink-0" />
    },
    {
      id: 'location',
      label: 'Location Intelligence',
      icon: <Crosshair className="w-4 h-4 shrink-0" />
    },
    {
      id: 'rainfall',
      label: 'Rainfall & Trigger Radar',
      icon: <CloudRain className="w-4 h-4 shrink-0" />
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure Exposure',
      icon: <ShieldAlert className="w-4 h-4 shrink-0" />
    },
    {
      id: 'road-connectivity',
      label: 'Highway Lifelines & Connectivity',
      icon: <Truck className="w-4 h-4 shrink-0" />,
      badge: 'BRO Live',
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'emergency-response',
      label: 'Emergency Response Prioritisation',
      icon: <Ambulance className="w-4 h-4 shrink-0" />,
      badge: 'NDRF Triage',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'alerts',
      label: 'Alerts Center & Dispatch',
      icon: <BellRing className="w-4 h-4 shrink-0" />,
      badge: activeWarningsCount,
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'subscribe',
      label: 'SMS Alert Subscription',
      icon: <MessageSquarePlus className="w-4 h-4 shrink-0" />
    },
    {
      id: 'history',
      label: 'Historical Landslide Log',
      icon: <History className="w-4 h-4 shrink-0" />
    },
    {
      id: 'model',
      label: 'Model Explainability (GeoAI)',
      icon: <BrainCircuit className="w-4 h-4 shrink-0" />
    },
    {
      id: 'data-status',
      label: 'Data Source Feeds',
      icon: <DatabaseZap className="w-4 h-4 shrink-0" />
    },
    {
      id: 'settings',
      label: 'System & Risk Thresholds',
      icon: <Sliders className="w-4 h-4 shrink-0" />
    }
  ];

  return (
    <aside
      className={`border-r flex flex-col justify-between transition-all duration-300 z-20 shrink-0 ${
        isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900/95 border-slate-800/80 text-slate-100'
      } ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Navigation List */}
      <div className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Operational Modules
          </div>
        )}

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? isLightMode
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs font-semibold'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold'
                  : isLightMode
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <div
                className={
                  isActive
                    ? isLightMode
                      ? 'text-emerald-700'
                      : 'text-emerald-400'
                    : isLightMode
                    ? 'text-slate-500 group-hover:text-slate-800'
                    : 'text-slate-400 group-hover:text-slate-200'
                }
              >
                {item.icon}
              </div>

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.badgeColor || (isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Collapsed Active Indicator Pill */}
              {isCollapsed && isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-500 rounded-r-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / Collapse Toggle */}
      <div
        className={`p-2 border-t ${
          isLightMode ? 'border-slate-200 bg-slate-50' : 'border-slate-800/80 bg-slate-950/40'
        }`}
      >
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs transition-colors ${
            isLightMode
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-mono">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
