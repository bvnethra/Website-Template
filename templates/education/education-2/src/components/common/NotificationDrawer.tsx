import React from 'react';
import { X, Bell, CheckCircle, Info, AlertTriangle, Clock, Trash2, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationsDrawerOpen, closeNotificationsDrawer, notifications, removeNotification, openApplyModal, theme } = useTheme();

  if (!isNotificationsDrawerOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeNotificationsDrawer}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div
            style={{ backgroundColor: theme.primary }}
            className="p-5 text-white flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10">
                <Bell className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base">Campus Alerts & Updates</h3>
                <span className="text-xs text-slate-300">Live Academy Bulletins & Reminders</span>
              </div>
            </div>
            <button
              onClick={closeNotificationsDrawer}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Pill Banner */}
          <div className="p-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-950">2026–2027 Admission Cycle Active</span>
            <button
              onClick={() => {
                closeNotificationsDrawer();
                openApplyModal();
              }}
              className="font-bold text-amber-900 hover:underline flex items-center gap-1"
            >
              <span>Apply</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Bell className="w-10 h-10 stroke-1 mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">All caught up!</p>
                <p className="text-xs text-slate-400 mt-1">No unread notices or active announcements at this time.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="pt-3 first:pt-0 group relative flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{notif.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="absolute top-3 right-0 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                    title="Dismiss"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <span className="text-slate-500">{notifications.length} active updates</span>
            <button
              onClick={closeNotificationsDrawer}
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};