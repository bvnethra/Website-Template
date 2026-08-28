'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    // Simulate login delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/account');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg py-12 flex flex-col justify-center items-center text-left">
      <div className="w-full max-w-md bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center mx-auto shadow-sm mb-3">
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-jakarta)' }}>M</span>
          </div>
          <h2 className="text-xl font-extrabold text-navy-900 tracking-tight">
            Log In to MediNova
          </h2>
          <p className="text-xs text-navy-400 mt-1">
            Access secure vault, order history & health records.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 pl-10 pr-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Password</label>
              <a href="#" className="text-[10px] font-bold text-mint-600 hover:underline">Forgot?</a>
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 pl-10 pr-10 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm pt-0.5"
          >
            {isSubmitting ? (
              <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Secure Log In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-brand-muted text-center text-xs text-navy-500">
          <span>Don&apos;t have an account?</span>{' '}
          <Link href="/auth/signup" className="font-bold text-mint-600 hover:underline">Create Account</Link>
        </div>

      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-navy-400 font-semibold mt-4">
        <ShieldCheck className="w-3.5 h-3.5 text-mint-500" />
        <span>MediNova Cryptographical Vault Protected</span>
      </div>
    </div>
  );
}
