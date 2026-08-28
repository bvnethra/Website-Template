import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Studio', href: '#studio' },
    { label: 'Approach', href: '#approach' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-charcoal/90 backdrop-blur-md border-b border-soft-white/10 py-4 shadow-xl'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex flex-col tracking-widest text-soft-white uppercase font-sans"
          >
            <span className="font-semibold text-sm md:text-base tracking-[0.25em] group-hover:text-deep-earth transition-colors">
              ATELIER NORTH
            </span>
            <span className="font-mono-tech text-[9px] text-arch-gray tracking-widest -mt-0.5">
              ARCH & SPATIAL
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-soft-white/80 hover:text-soft-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-deep-earth hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={onOpenContact}
              data-cursor="OPEN"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] px-5 py-2.5 border border-soft-white/30 text-soft-white hover:bg-soft-white hover:text-charcoal transition-all duration-300 group"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-arch-gray group-hover:text-charcoal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-soft-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-soft-white" />
            ) : (
              <Menu className="w-6 h-6 text-soft-white" />
            )}
          </button>
        </div>
      </header>

      {/* Editorial Full-Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 bg-charcoal text-soft-white flex flex-col justify-between p-8 md:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Top structural accent line */}
        <div className="pt-20 pb-4 border-b border-soft-white/10 flex justify-between items-center font-mono-tech text-[10px] text-arch-gray uppercase tracking-widest">
          <span>01 // NAVIGATION</span>
          <span>STUDIO INDEX</span>
        </div>

        <nav className="flex flex-col space-y-6 my-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-baseline justify-between border-b border-soft-white/10 pb-4"
            >
              <span className="font-editorial text-4xl text-soft-white group-hover:text-deep-earth transition-colors italic">
                {link.label}
              </span>
              <span className="font-mono-tech text-xs text-arch-gray">
                0{idx + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="space-y-6 border-t border-soft-white/10 pt-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-4 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center space-x-2"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <div className="flex justify-between font-mono-tech text-[10px] text-arch-gray">
            <span>ATELIER NORTH © 2026</span>
            <span>NORTHWOOD // WESTHAVEN</span>
          </div>
        </div>
      </div>
    </>
  );
}
