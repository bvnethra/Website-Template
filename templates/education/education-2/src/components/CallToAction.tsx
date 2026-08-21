import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Code2, 
  Award, 
  Flame,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface CallToActionProps {
  onStartLearning: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onStartLearning,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="rounded-[36px] bg-[#0e2942] border border-slate-800 p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Floating background pill 1 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-8 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-amber-300 font-semibold shadow-lg"
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>14-Day Streak Bonus</span>
          </motion.div>

          {/* Floating background pill 2 */}
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 right-10 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-teal-300 font-semibold shadow-lg"
          >
            <Code2 className="w-4 h-4 text-teal-400" />
            <span>Live Interactive Sandbox</span>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Join 12,000+ Active Builders</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.15]">
              Your Next Skill Starts Here.
            </h2>

            <p className="mt-5 text-sm sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Step into interactive code execution, verified certifications, and world-class curricula. No credit card required to begin.
            </p>

            {/* Email quick start */}
            <form onSubmit={handleSubscribe} className="mt-9 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              {subscribed ? (
                <div className="w-full p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Welcome aboard! Check your email for instant sandbox access.</span>
                </div>
              ) : (
                <>
                  <input
                    id="cta-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or student email..."
                    className="flex-1 px-5 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="submit"
                    className="px-7 py-4 rounded-2xl bg-[#fa5a1e] hover:bg-[#e04812] text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Instant sandbox access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Free introductory modules
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Cancel anytime
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
