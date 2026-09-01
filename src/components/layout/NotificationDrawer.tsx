import React from 'react';
import {
  X,
  Bell,
  CheckCheck,
  AlertTriangle,
  AlertOctagon,
  MessageSquare,
  Info,
  ArrowRight
} from 'lucide-react';
import { SystemNotification } from '../../types/alert';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllAsRead: () => void;
  onSelectLocationId?: (locationId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectLocationId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-sm text-slate-100">Live Warning & Dispatch Center</h2>
              <p className="text-[11px] text-slate-400">Real-time alerts, SMS triggers & telemetry</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              title="Mark all notifications as read"
              className="p-1.5 text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Read all</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/40">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No recent notifications or alerts.
            </div>
          ) : (
            notifications.map((n) => {
              const isWarning = n.type === 'WARNING';
              const isWatch = n.type === 'WATCH';
              const isSMS = n.type === 'SMS';

              return (
                <div
                  key={n.id}
                  className={`pt-3 first:pt-0 ${
                    !n.read ? 'bg-slate-800/30 -mx-2 px-2 py-2.5 rounded-lg border-l-2 border-emerald-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {isWarning && <AlertOctagon className="w-4 h-4 text-rose-400" />}
                      {isWatch && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      {isSMS && <MessageSquare className="w-4 h-4 text-cyan-400" />}
                      {!isWarning && !isWatch && !isSMS && <Info className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{n.message}</p>

                      {n.actionLocationId && onSelectLocationId && (
                        <button
                          onClick={() => {
                            onSelectLocationId(n.actionLocationId!);
                            onClose();
                          }}
                          className="mt-2 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                        >
                          View Location Intelligence <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-center text-[10px] text-slate-500 font-mono">
          SIH Landslide Early Warning Engine • Auto-Refreshes on Threshold Breach
        </div>
      </div>
    </div>
  );
};
