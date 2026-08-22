import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Laptop,
  Smartphone,
  Globe,
  MapPin,
  Clock,
  KeyRound,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SecurityView: React.FC = () => {
  const { loginHistory, terminateSession, terminateOtherSessions, currentUser } = useAuth();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    if (!currentPin) {
      setPinError('Please enter your existing security PIN');
      return;
    }
    if (newPin.length < 6) {
      setPinError('New security PIN must contain at least 6 alphanumeric characters');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('Confirmation PIN does not match');
      return;
    }

    setPinChangeSuccess(true);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinChangeSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Cryptographic Identity & Terminal Auditing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Login History & Security Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time audit log of authenticated sessions, authorized IP addresses, and credential management.
          </p>
        </div>

        <button
          onClick={terminateOtherSessions}
          className="px-5 py-3 rounded-2xl bg-red-900 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-300" />
          <span>Terminate All Other Sessions</span>
        </button>
      </div>

      {/* Grid: Login History Audit Log (7 cols) vs Security PIN Update (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Audit Log (7 cols) */}
        <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Active & Historic Terminal Sessions
              </h3>
              <p className="text-xs text-slate-500">
                Authorized access instances on Eduvora Central ERP
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {loginHistory.length} Sessions Logged
            </span>
          </div>

          <div className="space-y-3.5">
            {loginHistory.map((session) => (
              <div
                key={session.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  session.isCurrent
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/40'
                    : 'bg-white border-[#EAE4D7]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        session.isCurrent
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#0D2F2F] text-[#FF6B4A]'
                      }`}
                    >
                      {session.device.toLowerCase().includes('phone') ||
                      session.device.toLowerCase().includes('android') ||
                      session.device.toLowerCase().includes('iphone') ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#0D2F2F]">{session.device}</span>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-700 text-white flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Current Active Session
                          </span>
                        )}
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            session.status === 'Active'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>

                      <p className="text-[11px] font-mono text-slate-500 mt-1">
                        IP: {session.ipAddress} • {session.browser}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && session.status === 'Active' && (
                    <button
                      onClick={() => terminateSession(session.id)}
                      className="px-2.5 py-1 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-[11px] font-bold"
                    >
                      Revoke
                    </button>
                  )}
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>{session.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{session.timestamp}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Security Settings & Password Update (5 cols) */}
        <div className="lg:col-span-5 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
              Change Portal Security PIN
            </h3>
            <p className="text-xs text-slate-500">
              Update institutional authentication PIN/password
            </p>
          </div>

          {pinChangeSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Security PIN successfully changed and re-encrypted.</span>
            </div>
          )}

          {pinError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{pinError}</span>
            </div>
          )}

          <form onSubmit={handlePinChange} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Current Security PIN / Password
              </label>
              <input
                type="password"
                required
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                New Security PIN
              </label>
              <input
                type="password"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Confirm New Security PIN
              </label>
              <input
                type="password"
                required
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Re-enter new PIN"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#FF6B4A]" />
              <span>Update Credentials</span>
            </button>
          </form>

          {/* Security Best Practices */}
          <div className="p-4 rounded-2xl bg-[#EAE4D7]/50 border border-[#DDD6C8] text-xs text-slate-700 space-y-2">
            <span className="font-bold text-[#0D2F2F] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Security Recommendations:</span>
            </span>
            <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
              <li>Never share your student PIN with unauthorized individuals.</li>
              <li>Always sign out when accessing portal via public campus kiosks.</li>
              <li>Report unrecognized terminal IP addresses immediately to IT Security.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
