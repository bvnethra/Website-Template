import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  Trash2, 
  Clock, 
  MapPin, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Globe,
  Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SecurityLoginHistory: React.FC = () => {
  const { loginHistory, revokeSession, twoFactorEnabled, setTwoFactorEnabled } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');

  const handleRevoke = (id: string) => {
    revokeSession(id);
    setSuccessMsg('Remote session successfully terminated.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleToggle2FA = () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    setSuccessMsg(next ? 'Two-Factor Authentication (2FA) enabled.' : 'Two-Factor Authentication disabled.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Identity & Access Audit Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Security & Login Session History
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Monitor real-time IP allocations, device fingerprints, TLS handshake sessions, and 2FA settings.
          </p>
        </div>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {/* Security Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Security Health */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5DFD5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A9E9E] font-bold uppercase block">Security Rating</span>
            <div className="text-2xl font-black text-emerald-600 font-display mt-0.5">
              98% Protected
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* 2FA Status Toggle Card */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5DFD5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A9E9E] font-bold uppercase block">Two-Factor Auth</span>
            <div className="text-sm font-bold text-[#0D2F2F] mt-0.5">
              {twoFactorEnabled ? 'SMS / OTP Enabled' : 'Disabled (Recommended)'}
            </div>
          </div>

          <button
            onClick={handleToggle2FA}
            className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
              twoFactorEnabled ? 'bg-[#FF6B4A] justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <motion.div
              layout
              className="w-5 h-5 rounded-full bg-white shadow-xs"
            />
          </button>
        </div>

        {/* Active Sessions Count */}
        <div className="bg-white p-5 rounded-3xl border border-[#E5DFD5] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8A9E9E] font-bold uppercase block">Active Devices</span>
            <div className="text-2xl font-black text-[#0D2F2F] font-display mt-0.5">
              {loginHistory.filter(s => s.status === 'Active').length} Concurrent
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#0D2F2F]/5 text-[#0D2F2F] flex items-center justify-center">
            <Radio className="w-6 h-6 text-[#FF6B4A]" />
          </div>
        </div>

      </div>

      {/* Session Audit History List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#0D2F2F] font-display">
              Authentication Audit Trail & Devices
            </h3>
            <p className="text-xs text-[#476666] mt-0.5">
              Every authenticated login records mock IP geolocation and user agent signatures.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#E5DFD5]">
          {loginHistory.map((sess) => {
            const isMobile = sess.device.toLowerCase().includes('phone') || sess.device.toLowerCase().includes('ipad');

            return (
              <div
                key={sess.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-[#0D2F2F] flex items-center justify-center shrink-0 mt-0.5">
                    {isMobile ? (
                      <Smartphone className="w-5 h-5 text-[#FF6B4A]" />
                    ) : (
                      <Laptop className="w-5 h-5 text-[#0D2F2F]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="text-xs text-[#0D2F2F] font-bold">
                        {sess.device}
                      </strong>

                      {sess.isCurrent && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Current Device
                        </span>
                      )}

                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        sess.status === 'Active' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {sess.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#476666]">
                      <span className="flex items-center gap-1 font-mono">
                        <Globe className="w-3 h-3 text-[#8A9E9E]" />
                        {sess.ipAddress}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8A9E9E]" />
                        {sess.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#8A9E9E]">
                        <Clock className="w-3 h-3" />
                        {sess.timestamp}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#8A9E9E] font-mono">
                      Browser: {sess.browser}
                    </div>
                  </div>
                </div>

                {/* Revoke Action */}
                {!sess.isCurrent && sess.status === 'Active' && (
                  <button
                    onClick={() => handleRevoke(sess.id)}
                    className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke Access</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
