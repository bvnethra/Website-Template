import React from 'react';
import { Sparkles, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent-indigo/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-indigo to-accent-purple p-0.5 shadow-md">
                <div className="w-full h-full bg-navy rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Polar<span className="text-accent-indigo">.</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering modern engineering teams with ultra-smooth React animations, light theme aesthetics, and robust stateless Java Spring Boot API architectures.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Mail' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-accent-indigo text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Features', href: '#features' },
                { name: 'Services', href: '#services' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-400 hover:text-accent-cyan transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h5>
            <ul className="space-y-2.5 text-sm">
              {['Web Development', 'UI/UX Design', 'Digital Solutions', 'Business Analytics', 'Cloud Architecture', 'API Consulting'].map((item) => (
                <li key={item}>
                  <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-slate-400 hover:text-accent-cyan transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h5>
            <ul className="space-y-2.5 text-sm">
              {['Documentation', 'Spring REST API', 'Framer Motion Specs', 'System Status', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-accent-cyan transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Polar Platform Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
