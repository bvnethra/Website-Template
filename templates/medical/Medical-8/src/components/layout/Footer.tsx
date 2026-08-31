import React from 'react';
import Link from 'next/link';
import { MEDICAL_DISCLAIMER } from '@/lib/constants';

const footerLinks = {
  'Shop': [
    { label: 'All Medicines', href: '/category/pain-relief' },
    { label: 'Wellness Products', href: '/category/nutrition' },
    { label: 'Lab Tests', href: '/lab-tests' },
    { label: 'Medical Devices', href: '/category/medical-devices' },
    { label: 'Ayurveda', href: '/category/ayurveda' },
    { label: 'Baby Care', href: '/category/baby-care' },
  ],
  'Healthcare': [
    { label: 'Doctor Consultation', href: '/doctors' },
    { label: 'Upload Prescription', href: '/prescription' },
    { label: 'Health Records', href: '/health-records' },
    { label: 'Health Library', href: '/health-library' },
    { label: 'Find a Store', href: '/stores' },
  ],
  'My Account': [
    { label: 'My Orders', href: '/account/orders' },
    { label: 'My Prescriptions', href: '/account/prescriptions' },
    { label: 'My Addresses', href: '/account/addresses' },
    { label: 'Refill Reminders', href: '/account/reminders' },
    { label: 'Saved Products', href: '/account' },
  ],
  'Company': [
    { label: 'About MediNova', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Partner With Us', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white pb-20 lg:pb-0" aria-label="Site footer">
      {/* Main Footer */}
      <div className="container-page pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-400 to-mint-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-jakarta)' }}>M</span>
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
                Medi<span className="text-mint-400">Nova</span>
              </span>
            </Link>
            <p className="text-sm text-navy-300 leading-relaxed mb-6 max-w-xs">
              Your trusted digital healthcare marketplace for medicines, wellness products, diagnostics, and everyday healthcare.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-mint-600 flex items-center justify-center transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-xs font-bold uppercase text-navy-300 hover:text-white">
                    {social[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-300 hover:text-mint-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="border-t border-navy-800">
        <div className="container-page py-4">
          <p className="text-xs text-navy-400 leading-relaxed max-w-4xl">
            <strong className="text-navy-300">Medical Disclaimer:</strong> {MEDICAL_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy-400">
          <p>© {new Date().getFullYear()} MediNova Healthcare Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-mint-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-mint-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-mint-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
