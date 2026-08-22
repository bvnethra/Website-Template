import React from 'react';
import { 
  Code2, 
  Cpu, 
  HelpCircle, 
  Award, 
  Video, 
  Compass, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Terminal,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturesSectionProps {
  onOpenAITutor: () => void;
  onOpenCertificate: () => void;
  onOpenLiveLab: () => void;
  onExplorePaths: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenAITutor,
  onOpenCertificate,
  onOpenLiveLab,
  onExplorePaths,
}) => {
  const features = [
    {
      icon: Code2,
      title: 'Interactive Code Sandboxes',
      description: 'Run Python, TypeScript, and SQL code natively inside the browser with zero dev environment setup or Docker overhead.',
      badge: 'Zero Setup',
      iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
      action: onOpenLiveLab,
      actionLabel: 'Launch Lab',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Study Buddy',
      description: 'Get instant 24/7 conceptual explanations, code debugging suggestions, and personalized memory retention flashcards.',
      badge: 'Gemini AI',
      iconBg: 'bg-orange-50 text-[#fa5a1e] border border-orange-100',
      action: onOpenAITutor,
      actionLabel: 'Try AI Buddy',
    },
    {
      icon: HelpCircle,
      title: 'Smart Adaptive Quizzes',
      description: 'Dynamic knowledge checkpoints that adapt to your weaknesses and reinforce core architectural insights.',
      badge: 'Auto-Graded',
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      action: onOpenLiveLab,
      actionLabel: 'Practice Quiz',
    },
    {
      icon: Award,
      title: 'Industry-Recognized Certificates',
      description: 'Cryptographically verifiable digital certificates with unique hash IDs ready to attach to LinkedIn & resumes.',
      badge: 'Verifiable',
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      action: onOpenCertificate,
      actionLabel: 'Preview Certificate',
    },
    {
      icon: Video,
      title: 'Live Interactive Masterclasses',
      description: 'Weekly live code reviews, system design teardowns, and AMA sessions with senior engineers from top tech labs.',
      badge: 'Weekly Streams',
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
      action: onOpenLiveLab,
      actionLabel: 'View Schedule',
    },
    {
      icon: Compass,
      title: 'Personalized Career Paths',
      description: 'Step-by-step guided roadmaps tailored to your career ambitions from junior engineer to staff architect.',
      badge: 'Curated Roadmaps',
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      action: onExplorePaths,
      actionLabel: 'Explore Paths',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      
      {/* Background soft teal/orange radial highlights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-100/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Engineered for Maximum Retention</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2942] font-display tracking-tight leading-tight">
            Why Students Excel on Learnora
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We replaced passive video-watching with active hands-on building, instant evaluation engines, and AI mentorship.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white border border-slate-200/80 hover:border-teal-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle top corner gradient */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-teal-50/60 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  {/* Top Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-13 h-13 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-600">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Trigger Action */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Interactive Module</span>
                  
                  <button
                    onClick={feature.action}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 group-hover:text-[#fa5a1e] group-hover:translate-x-1 transition-all"
                  >
                    <span>{feature.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
