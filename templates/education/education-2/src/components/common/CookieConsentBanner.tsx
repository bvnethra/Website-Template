import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const accepted = localStorage.getItem('edunexa_cookie_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('edunexa_cookie_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-200 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <h4 className="font-bold text-slate-900 text-sm mb-1">Academic Data & Privacy</h4>
          <p className="text-slate-600 leading-relaxed">
            Edunexa uses cookies and telemetry to personalize academic program discovery, secure portal sessions, and optimize educational insights.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleAccept}
              style={{ backgroundColor: theme.primary }}
              className="px-4 py-2 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
            >
              Accept All Cookies
            </button>
            <button
              onClick={() => setVisible(false)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-700 p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};