import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Globe, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  LogOut, 
  KeyRound,
  Lock,
  Sparkles
} from 'lucide-react';

export const SecurityView: React.FC = () => {
  const { loginHistory, terminateOtherSessions, currentUser } = useAuth();
  const { addToast } = useApp();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleTerminateOtherSessions = () => {
    terminateOtherSessions();
    addToast({
      type: 'success',
      title: 'Sessions Terminated',
      message: 'All other active desktop and mobile device sessions have been revoked.'
    });
  };

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    addToast({
      type: 'info',
      title: !twoFactorEnabled ? '2FA Enabled' : '2FA Disabled',
      message: !twoFactorEnabled 
        ? 'University Authenticator / SMS 2FA is now active for all exam portal actions.' 
        : 'Two-Factor verification has been deactivated.'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
            Session Audit Log & Portal Security Center
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D4E]">
            Monitor active device authorizations, geolocated login timestamps, and security configurations.
          </p>
        </div>

        <button
          onClick={handleTerminateOtherSessions}
          id="btn-terminate-other-sessions"
          className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 self-start"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminate Other Sessions</span>
        </button>
      </div>

      {/* Security Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Security Posture</span>
            <div className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>High (Protected)</span>
            </div>
            <span className="text-[10px] text-[#4A5D4E] mt-0.5 block">256-Bit SSL • Audit Monitored</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Two-Factor Auth (2FA)</span>
            <div className="text-base font-bold text-[#0D2F2F] mt-1">
              {twoFactorEnabled ? 'Enabled via Eduvora OTP' : 'Disabled'}
            </div>
            <button
              onClick={toggle2FA}
              className="text-[10px] font-bold text-[#FF6B4A] hover:underline mt-0.5 block"
            >
              {twoFactorEnabled ? 'Configure Settings' : 'Enable 2FA'}
            </button>
          </div>
          <div className="p-3 bg-[#F4F1EA] text-[#0D2F2F] rounded-xl">
            <KeyRound className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Primary Identity</span>
            <div className="text-sm font-mono font-bold text-[#0D2F2F] mt-1">
              {currentUser.studentId}
            </div>
            <span className="text-[10px] text-[#4A5D4E] mt-0.5 block">{currentUser.email}</span>
          </div>
          <div className="p-3 bg-[#F4F1EA] text-[#0D2F2F] rounded-xl">
            <Lock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Login History Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Recent Device Access & Authentication Audit Trail
            </h3>
            <p className="text-xs text-[#4A5D4E]">
              Every portal login is logged with timestamp, client IP, OS, and device fingerprint.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#E8EAE3]">
          {loginHistory.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#F4F1EA] rounded-xl text-[#0D2F2F] shrink-0 mt-0.5">
                  {item.device.includes('iPhone') || item.device.includes('Android') ? (
                    <Smartphone className="w-5 h-5" />
                  ) : item.device.includes('MacBook') || item.device.includes('Laptop') ? (
                    <Laptop className="w-5 h-5" />
                  ) : (
                    <Monitor className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#0D2F2F]">{item.device}</span>
                    {item.isCurrent ? (
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current Active Session
                      </span>
                    ) : item.status === 'Terminated' ? (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold text-[10px] rounded-full">
                        Terminated
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#F4F1EA] text-[#4A5D4E] font-medium text-[10px] rounded-full">
                        Session Closed
                      </span>
                    )}
                  </div>

                  <p className="text-[#4A5D4E] mt-0.5">
                    {item.browser} • {item.os}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#4A5D4E] mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#4A5D4E]" /> IP: <strong>{item.ip}</strong>
                    </span>
                    <span>•</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[11px] text-[#4A5D4E] flex items-center sm:justify-end gap-1">
                  <Clock className="w-3 h-3 text-[#4A5D4E]" /> {item.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
