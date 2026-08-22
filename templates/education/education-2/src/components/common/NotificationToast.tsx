import React from 'react';
import { CheckCircle, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useTheme();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const getIcon = () => {
          switch (n.type) {
            case 'success':
              return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          }
        };

        return (
          <div
            key={n.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-4 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-start gap-3">
              {getIcon()}
              <div>
                <h5 className="text-xs font-bold text-slate-900">{n.title}</h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-slate-600 p-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
