import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
}) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Free',
      description: 'Ideal for curious beginners exploring programming & basic AI concepts.',
      monthlyPrice: 0,
      annualPrice: 0,
      badge: 'Free Forever',
      popular: false,
      features: [
        'Access to 25+ introductory sandbox lessons',
        'Basic Python & JS in-browser code editor',
        'Community discussion forum support',
        'Standard completion badges',
      ],
      cta: 'Start Free Today',
      ctaStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',
    },
    {
      name: 'Pro Learner',
      description: 'Full unlimited access to our flagship masterclasses, roadmaps & AI mentor.',
      monthlyPrice: 29,
      annualPrice: 19,
      badge: 'Most Popular',
      popular: true,
      features: [
        'Unlimited access to all 500+ premium courses',
        'Interactive AI Study Buddy with 24/7 explanations',
        'Full PyTorch, React 19 & Kubernetes sandboxes',
        'Cryptographically verifiable digital certificates',
        'Weekly live interactive masterclasses with Q&A',
        'Offline video downloads & mobile app sync',
      ],
      cta: 'Unlock Pro Access',
      ctaStyle: 'bg-[#fa5a1e] hover:bg-[#e04812] text-white shadow-lg shadow-orange-500/25',
    },
    {
      name: 'Team & Enterprise',
      description: 'For engineering teams scaling their modern AI & software capabilities.',
      monthlyPrice: 79,
      annualPrice: 59,
      badge: 'For Teams',
      popular: false,
      features: [
        'Everything in Pro Learner for all team seats',
        'Dedicated learning path customization',
        'Enterprise SSO, SCIM & LMS integrations',
        'Team progress analytics & skill matrix reports',
        'Private Slack AMA channels with instructors',
        'Custom invoicing & dedicated account manager',
      ],
      cta: 'Contact Enterprise Sales',
      ctaStyle: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Transparent Investment in Your Future</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2942] font-display tracking-tight leading-tight">
            Simple, Transparent Membership
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Gain unlimited access to cutting-edge tech curricula with no hidden fees or locked paywalls.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#0e2942] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                SAVE 35%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#fa5a1e] shadow-2xl shadow-orange-500/10 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-sm'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#fa5a1e] text-white font-extrabold text-xs uppercase tracking-wider shadow-md">
                    ★ Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-xl font-display">{plan.name}</h3>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {plan.monthlyPrice === 0 ? 'forever' : isAnnual ? '/ month (billed yearly)' : '/ month'}
                      </span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                      What's included:
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${plan.ctaStyle}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
