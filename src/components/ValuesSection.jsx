import React from 'react';
import { ShieldCheck, Scale, Cpu, Leaf } from 'lucide-react';

export const ValuesSection = () => {
  const values = [
    {
      num: "01",
      title: "QUALITY",
      icon: ShieldCheck,
      desc: "Every detail matters. We maintain rigorous quality standards from foundation to finishing."
    },
    {
      num: "02",
      title: "INTEGRITY",
      icon: Scale,
      desc: "Transparent communication and responsible execution define every relationship we build."
    },
    {
      num: "03",
      title: "INNOVATION",
      icon: Cpu,
      desc: "We embrace modern construction technologies, materials and design methodologies."
    },
    {
      num: "04",
      title: "SUSTAINABILITY",
      icon: Leaf,
      desc: "We create efficient buildings designed to minimize environmental impact and maximize long-term value."
    }
  ];

  return (
    <section className="section-padding" style={{ background: '#F8F7F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Company Core Values">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">OUR PRINCIPLES</div>
          <h2 className="section-heading-lg">
            Core Values That <span className="gold-text">Define Our Craft</span>
          </h2>
          <p className="section-subtext mx-auto">
            Disciplined standards guiding every foundation we pour, every blueprint we draft, and every client relationship we nurture.
          </p>
        </div>

        <div className="grid-4">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.num} className="value-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="value-num">{val.num} — {val.title}</div>
                  <Icon size={22} color="var(--gold-primary)" />
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">"{val.desc}"</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
