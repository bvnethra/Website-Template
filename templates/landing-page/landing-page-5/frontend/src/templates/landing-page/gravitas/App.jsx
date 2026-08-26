import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Orbit, ArrowRight, Play, CheckCircle2, ExternalLink,
  Globe, Cpu, Layers, Bot, Box, Cloud, Star, Send, Mail, MapPin,
  Phone, Code2, AtSign, Link2, Share2, ChevronRight, Sun, Moon
} from 'lucide-react';
import './App.css';

/* ============================================================
   THEME CONTEXT
   ============================================================ */
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = [
  { label: 'Home',     href: 'hero' },
  { label: 'About',    href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Work',     href: 'portfolio' },
  { label: 'Reviews',  href: 'testimonials' },
  { label: 'Contact',  href: 'contact' },
];

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: 'Spatial Web Experiences',
    desc: 'We craft immersive browser environments that dissolve the line between digital and physical — WebXR, 3D portals, and depth-driven UIs.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Cpu size={22} />,
    title: 'Next-Gen Fullstack Engineering',
    desc: 'Zero-latency APIs, edge-deployed runtimes, and distributed data layers that keep your product ahead of gravity.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Layers size={22} />,
    title: 'Kinetic UI/UX & Motion Systems',
    desc: 'Choreographed micro-interactions and physics-based motion design that turn interfaces into living, breathing products.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Bot size={22} />,
    title: 'Neural & AI Automation Interfaces',
    desc: 'Intelligent dashboards, LLM-powered workflows, and real-time AI pipelines designed with human-first clarity.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Box size={22} />,
    title: 'WebGL / 3D Product Visuals',
    desc: 'Hyper-realistic product configurators and 3D brand assets rendered at 60fps directly in the browser.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: <Cloud size={22} />,
    title: 'Cloud Micro-Architectures',
    desc: 'Serverless-first, auto-scaling infrastructure built for the age of spatial compute — from edge nodes to global mesh.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
  },
];

const PORTFOLIO_CATEGORIES = ['All', 'Spatial 3D', 'AI Systems', 'Kinetic Apps', 'FinTech'];

const PROJECTS = [
  {
    id: 1,
    title: 'NebulaOS Dashboard',
    category: 'AI Systems',
    tags: ['React', 'TensorFlow', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Orbita Commerce 3D',
    category: 'Spatial 3D',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Flux Finance Platform',
    category: 'FinTech',
    tags: ['Next.js', 'D3.js', 'Rust'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Kinesis Motion Studio',
    category: 'Kinetic Apps',
    tags: ['Framer', 'React', 'GLSL'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'VoidSpace XR Portal',
    category: 'Spatial 3D',
    tags: ['WebXR', 'Babylon.js', 'Node'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'PulseAI Neural Interface',
    category: 'AI Systems',
    tags: ['Python', 'React', 'LLM'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
  },
];

const TESTIMONIALS = [
  {
    quote: "Gravitas didn't just build us a website — they launched a dimension. The spatial interactions are unlike anything our users have ever experienced.",
    name: 'Zara Novak',
    role: 'CTO, Orbita Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b4c5?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: "The motion system they designed has become our most-discussed brand asset. Every detail defies expectation and sets a new benchmark for digital craft.",
    name: 'Marcus Chen',
    role: 'Design Director, NeoCorp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  {
    quote: "From architecture to deployment, they operate at a completely different altitude. The performance metrics alone justified tripling our investment.",
    name: 'Leila Hartmann',
    role: 'VP Product, Flux Financial',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  },
];

const STATS = [
  { value: '140+',  label: 'Launches Delivered',   color: '#00f0ff' },
  { value: '15ms',  label: 'Avg Edge Latency',      color: '#8b5cf6' },
  { value: '99.9%', label: 'Uptime Across Nodes',   color: '#00f0ff' },
  { value: '28+',   label: 'Global Deploy Regions', color: '#8b5cf6' },
];

const FOOTER_LINKS = {
  Services: ['Spatial Web', 'Fullstack Eng.', 'Motion Systems', 'AI Interfaces', 'WebGL 3D', 'Cloud Infra'],
  Company:  ['About Us', 'Case Studies', 'Careers', 'Press Kit', 'Blog'],
  Legal:    ['Privacy Policy', 'Terms of Use', 'License', 'Cookie Settings'],
};

const SOCIAL_ICONS = [
  { icon: <Code2 size={16} />,  label: 'GitHub' },
  { icon: <AtSign size={16} />, label: 'X / Twitter' },
  { icon: <Link2 size={16} />,  label: 'LinkedIn' },
  { icon: <Share2 size={16} />, label: 'Dribbble' },
];

/* ============================================================
   UTILITIES
   ============================================================ */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   HOOKS
   ============================================================ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ag-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ag-reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  return scrolled;
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

/* ── Navbar ── */
function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useNavScroll();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleNavClick = (href) => {
    setDrawerOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <nav className={`ag-nav${scrolled ? ' ag-nav--scrolled' : ''}`}>
        {/* Brand */}
        <button className="ag-nav__brand" onClick={() => scrollTo('hero')}>
          <div className="ag-nav__orbital">
            <div className="ag-nav__orbital-ring" />
            <div className="ag-nav__orbital-core">
              <Orbit size={12} color="#08090e" strokeWidth={2.5} />
            </div>
          </div>
          <span className="ag-nav__logo-text">Gravitas</span>
        </button>

        {/* Desktop links */}
        <ul className="ag-nav__links">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button className="ag-nav__link" onClick={() => handleNavClick(link.href)}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right-side controls */}
        <div className="ag-nav__controls">
          {/* Day / Night toggle */}
          <button
            className={`ag-theme-toggle${theme === 'light' ? ' ag-theme-toggle--light' : ''}`}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
            title={theme === 'dark' ? 'Day Mode' : 'Night Mode'}
          >
            <span className="ag-theme-toggle__track">
              <span className="ag-theme-toggle__thumb">
                {theme === 'dark'
                  ? <Moon size={11} strokeWidth={2.5} />
                  : <Sun size={11} strokeWidth={2.5} />}
              </span>
            </span>
          </button>

          {/* CTA */}
          <button className="ag-nav__cta" onClick={() => scrollTo('contact')}>
            Launch Orbit <ChevronRight size={14} />
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`ag-hamburger${drawerOpen ? ' ag-hamburger--open' : ''}`}
          onClick={() => setDrawerOpen(p => !p)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`ag-drawer${drawerOpen ? ' ag-drawer--open' : ''}`}>
        {NAV_LINKS.map(link => (
          <button key={link.href} className="ag-drawer__link" onClick={() => handleNavClick(link.href)}>
            {link.label}
          </button>
        ))}

        {/* Day / Night toggle in drawer */}
        <div className="ag-drawer__theme-row">
          <span className="ag-drawer__theme-label">
            {theme === 'dark' ? '🌙 Night Mode' : '☀️ Day Mode'}
          </span>
          <button
            className={`ag-theme-toggle${theme === 'light' ? ' ag-theme-toggle--light' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="ag-theme-toggle__track">
              <span className="ag-theme-toggle__thumb">
                {theme === 'dark'
                  ? <Moon size={11} strokeWidth={2.5} />
                  : <Sun size={11} strokeWidth={2.5} />}
              </span>
            </span>
          </button>
        </div>

        <button className="ag-drawer__cta" onClick={() => handleNavClick('contact')}>
          <Orbit size={16} /> Launch Orbit
        </button>
      </div>
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="ag-hero ag-hero--image-bg" id="hero">
      {/* Background image & overlay */}
      <div className="ag-hero__bg-img-wrap">
        <img
          className="ag-hero__bg-img"
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Gravitas space network background"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80'; }}
        />
        <div className="ag-hero__bg-overlay" />
      </div>

      {/* Centered content */}
      <div className="ag-hero__container ag-reveal">
        <div className="ag-hero__badge" style={{ margin: '0 auto 28px' }}>
          <span className="ag-hero__badge-dot" />
          Digital Design &amp; Spatial Technology Agency
        </div>

        <h1 className="ag-h1 ag-hero__headline" style={{ textAlign: 'center' }}>
          Defy the Standard.{' '}
          <span className="ag-gradient-text">Elevate Digital</span>{' '}
          Dimensions.
        </h1>

        <p className="ag-hero__subtitle" style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 700 }}>
          We architect hyper-immersive web experiences where performance meets spatial intelligence —
          propelling brands beyond the gravitational pull of ordinary digital.
        </p>

        <div className="ag-hero__ctas" style={{ justifyContent: 'center' }}>
          <button className="ag-btn ag-btn--primary" onClick={() => scrollTo('portfolio')}>
            Explore Portfolio <ArrowRight size={16} />
          </button>
          <button className="ag-btn ag-btn--ghost" onClick={() => scrollTo('about')}>
            <Play size={15} style={{ fill: 'currentColor' }} /> Watch Showreel
          </button>
        </div>

        <div className="ag-hero__metrics" style={{ justifyContent: 'center', marginTop: 48 }}>
          {[
            { icon: '⚡', label: 'Zero-G Performance' },
            { icon: '🌊', label: '99.9% Fluid Motion' },
            { icon: '🌐', label: 'Global Reach' },
          ].map(chip => (
            <div key={chip.label} className="ag-hero__chip">
              <span className="ag-hero__chip-icon">{chip.icon}</span>
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  const checks = [
    'Spatial computing meets fullstack engineering',
    'Physics-based UI motion systems at 120fps',
    'Edge-first architecture with 15ms global latency',
    'AI-native workflow automation built-in from day one',
    'WebGL rendering pipelines for photorealistic output',
  ];

  return (
    <section className="ag-section" id="about">
      <div className="ag-section__header ag-reveal">
        <span className="ag-label">Who We Are</span>
        <h2 className="ag-h2">Innovation at <span className="ag-gradient-text">Escape Velocity</span></h2>
        <p>We are a tight-knit collective of engineers, designers, and spatial architects pushing the boundary of what the web can feel like.</p>
      </div>

      <div className="ag-about__grid">
        {/* Visual */}
        <div className="ag-reveal ag-reveal--delay-1">
          <div className="ag-about__visual ag-glass">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
              alt="Futuristic workspace"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80'; }}
            />
            <div className="ag-about__visual-overlay" />
            {/* Floating status chips */}
            <div className="ag-about__chip ag-about__chip--tl">✦ Active Projects: 12</div>
            <div className="ag-about__chip ag-about__chip--br">🚀 Deploy: Ready</div>
            <div className="ag-about__chip ag-about__chip--ml">⚡ Latency: 12ms</div>
          </div>
        </div>

        {/* Content */}
        <div className="ag-about__content ag-reveal ag-reveal--delay-2">
          <div>
            <span className="ag-label" style={{ marginBottom: 10, display: 'block' }}>Our Approach</span>
            <h2 className="ag-h2" style={{ marginBottom: 16 }}>
              Built for the <span className="ag-gradient-text">Next Orbit</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              Every project we take on becomes an obsessive exercise in precision and wonder. We combine
              spatial logic, motion choreography, and distributed systems thinking into products that
              feel ahead of their time.
            </p>
          </div>

          {/* Checklist */}
          <div className="ag-about__checklist">
            {checks.map(item => (
              <div key={item} className="ag-about__check">
                <span className="ag-about__check-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Counters */}
          <div className="ag-about__counters">
            {[
              { value: '140+', label: 'Projects\nLaunched' },
              { value: '15ms', label: 'Avg\nLatency' },
              { value: '24/7', label: 'Global\nNodes' },
            ].map(c => (
              <div key={c.label} className="ag-about__counter ag-glass">
                <div className="ag-about__counter-value">{c.value}</div>
                <div className="ag-about__counter-label" style={{ whiteSpace: 'pre-line' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ── */
function Services() {
  return (
    <section className="ag-section" id="services" style={{ background: 'rgba(14,17,30,0.5)' }}>
      <div className="ag-section__header ag-reveal">
        <span className="ag-label">Core Capabilities</span>
        <h2 className="ag-h2">What We <span className="ag-gradient-text">Architect</span></h2>
        <p>Six core disciplines that combine into one cohesive force — propelling your digital presence into a new orbit.</p>
      </div>

      <div className="ag-services__grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`ag-service-card ag-glass ag-reveal ag-reveal--delay-${(i % 3) + 1}`}
          >
            {/* Background image — fades in on hover */}
            <div className="ag-service-card__bg">
              <img
                src={s.image}
                alt={s.title}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=600&q=80'; }}
              />
            </div>
            {/* Content */}
            <div className="ag-service-card__content">
              <div className="ag-service-card__icon">{s.icon}</div>
              <div className="ag-service-card__title">{s.title}</div>
              <div className="ag-service-card__desc">{s.desc}</div>
              <div className="ag-service-card__link">
                Explore <ArrowRight size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Portfolio ── */
function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active);

  return (
    <section className="ag-section" id="portfolio">
      <div className="ag-section__header ag-reveal">
        <span className="ag-label">Selected Work</span>
        <h2 className="ag-h2">Launch <span className="ag-gradient-text">Archive</span></h2>
        <p>A curated showcase of spatial experiences, AI interfaces, and kinetic applications that redefined their markets.</p>
      </div>

      {/* Filter pills */}
      <div className="ag-portfolio__filters ag-reveal">
        {PORTFOLIO_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`ag-filter-pill${active === cat ? ' ag-filter-pill--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="ag-portfolio__grid">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={`ag-project-card ag-reveal ag-reveal--delay-${(i % 3) + 1}`}
            style={{ transition: 'opacity 0.3s ease' }}
          >
            <img
              className="ag-project-card__img"
              src={project.image}
              alt={project.title}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80'; }}
            />
            {/* Static label (visible without hover) */}
            <div className="ag-project-card__static">
              <div className="ag-project-card__static-title">{project.title}</div>
              <div className="ag-project-card__static-cat">{project.category}</div>
            </div>
            {/* Hover overlay */}
            <div className="ag-project-card__overlay">
              <div className="ag-project-card__category">{project.category}</div>
              <div className="ag-project-card__title">{project.title}</div>
              <div className="ag-project-card__tags">
                {project.tags.map(tag => (
                  <span key={tag} className="ag-project-card__tag">{tag}</span>
                ))}
              </div>
              <div className="ag-project-card__launch">
                <ExternalLink size={13} /> View Project
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Stats ── */
function StatsRow() {
  return (
    <section className="ag-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="ag-stats__row ag-reveal">
        {STATS.map(s => (
          <div key={s.label} className="ag-stat">
            <div className="ag-stat__value" style={{ color: s.color }}>{s.value}</div>
            <div className="ag-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  return (
    <section className="ag-section" id="testimonials" style={{ background: 'rgba(14,17,30,0.5)' }}>
      <div className="ag-section__header ag-reveal">
        <span className="ag-label">Client Reviews</span>
        <h2 className="ag-h2">Orbital <span className="ag-gradient-text">Testimonials</span></h2>
        <p>Voices from founders, directors, and leaders who escaped digital mediocrity with us.</p>
      </div>

      <div className="ag-testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name}
            className={`ag-testimonial-card ag-glass ag-reveal ag-reveal--delay-${i + 1}`}
          >
            {/* Stars */}
            <div className="ag-testimonial-card__stars">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            {/* Quote */}
            <p className="ag-testimonial-card__quote">"{t.quote}"</p>
            {/* Author */}
            <div className="ag-testimonial-card__author">
              <img
                className="ag-testimonial-card__avatar"
                src={t.avatar}
                alt={t.name}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'; }}
              />
              <div>
                <div className="ag-testimonial-card__name">{t.name}</div>
                <div className="ag-testimonial-card__role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(''); }
  };

  return (
    <section className="ag-section">
      <div className="ag-cta ag-reveal">
        <span className="ag-label" style={{ marginBottom: 16, display: 'block' }}>Start Your Mission</span>
        <h2 className="ag-h2 ag-cta__heading">
          Ready to break away from{' '}
          <span className="ag-gradient-text">digital gravity?</span>
        </h2>
        <p className="ag-cta__sub">
          Drop your email and we'll reach out within 24 hours with a custom orbit plan for your project.
        </p>

        {sent ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', borderRadius: 10,
            background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)',
            color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem',
          }}>
            <CheckCircle2 size={18} /> We've got your signal. Launching soon ✦
          </div>
        ) : (
          <form className="ag-cta__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="ag-cta__input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="ag-btn ag-btn--primary">
              <Send size={15} /> Launch Inquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="ag-section" id="contact">
      <div className="ag-section__header ag-reveal">
        <span className="ag-label">Get in Touch</span>
        <h2 className="ag-h2">Open a <span className="ag-gradient-text">Channel</span></h2>
        <p>Whether you have a project brief or just a raw idea, we're ready to receive your signal.</p>
      </div>

      <div className="ag-contact__grid">
        {/* Info */}
        <div className="ag-contact__info ag-reveal ag-reveal--delay-1">
          {[
            { icon: <Mail size={18} />,    label: 'Email',    value: 'hello@gravitas.studio' },
            { icon: <Phone size={18} />,   label: 'Comms',   value: '+1 (555) 000-ZERO' },
            { icon: <MapPin size={18} />,  label: 'Base',    value: 'San Francisco, CA — and beyond' },
            { icon: <Globe size={18} />,   label: 'Network', value: '28 edge nodes worldwide' },
          ].map(item => (
            <div key={item.label} className="ag-contact__info-item">
              <div className="ag-contact__info-icon">{item.icon}</div>
              <div>
                <div className="ag-contact__info-label">{item.label}</div>
                <div className="ag-contact__info-value">{item.value}</div>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {SOCIAL_ICONS.map(s => (
              <button key={s.label} className="ag-footer__social" title={s.label}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="ag-reveal ag-reveal--delay-2">
          {submitted ? (
            <div className="ag-glass" style={{
              padding: '60px 40px', textAlign: 'center', borderRadius: 16
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🛸</div>
              <h3 className="ag-h3" style={{ marginBottom: 10, color: 'var(--accent-cyan)' }}>Message Transmitted!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                We've received your signal. Our team will establish contact within 24 hours.
              </p>
            </div>
          ) : (
            <form className="ag-form ag-glass" style={{ padding: '36px 32px', borderRadius: 20 }} onSubmit={handleSubmit}>
              <div className="ag-form__row">
                <div className="ag-form__field">
                  <label className="ag-form__label">Full Name</label>
                  <input
                    className="ag-form__input"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ag-form__field">
                  <label className="ag-form__label">Work Email</label>
                  <input
                    className="ag-form__input"
                    type="email"
                    name="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="ag-form__field">
                <label className="ag-form__label">Service Interest</label>
                <select
                  className="ag-form__select"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a capability...</option>
                  {SERVICES.map(s => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="ag-form__field">
                <label className="ag-form__label">Project Details</label>
                <textarea
                  className="ag-form__textarea"
                  name="details"
                  placeholder="Tell us about your mission — timeline, scope, vision..."
                  value={form.details}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="ag-btn ag-btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={16} /> Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const [newsletter, setNewsletter] = useState('');

  return (
    <footer className="ag-footer">
      <div className="ag-footer__grid">
        {/* Brand column */}
        <div className="ag-footer__brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Orbit size={16} color="#08090e" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em' }}>Gravitas</span>
          </div>
          <p className="ag-footer__brand-desc">
            A spatial technology agency designing experiences that operate beyond the limits of conventional digital gravity.
          </p>
          <div className="ag-footer__newsletter">
            <input
              type="email"
              placeholder="Stay in orbit — your email"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
            />
            <button onClick={() => setNewsletter('')}>Subscribe</button>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="ag-footer__col">
            <h4>{heading}</h4>
            <ul>
              {links.map(link => (
                <li key={link}>
                  <button>{link}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="ag-footer__bottom">
        <span className="ag-footer__copy">
          © {new Date().getFullYear()} Gravitas Studio. All rights reserved. Built beyond Earth's atmosphere.
        </span>
        <div className="ag-footer__socials">
          {SOCIAL_ICONS.map(s => (
            <button key={s.label} className="ag-footer__social" title={s.label}>
              {s.icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function GravitasApp() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ag_theme') || 'dark'; } catch { return 'dark'; }
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('ag_theme', next); } catch {}
      return next;
    });
  };

  useScrollReveal();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`gravitas-scope${theme === 'light' ? ' ag-light' : ''}`}>
        {/* Ambient background */}
        <div className="ag-bg" aria-hidden="true">
          <div className="ag-bg-grid" />
          <div className="ag-bg-orb ag-bg-orb--1" />
          <div className="ag-bg-orb ag-bg-orb--2" />
          <div className="ag-bg-orb ag-bg-orb--3" />
        </div>

        <Navbar />
        <Hero />

        <div className="ag-divider" />
        <About />

        <div className="ag-divider" />
        <Services />

        <div className="ag-divider" />
        <Portfolio />

        <StatsRow />

        <div className="ag-divider" />
        <Testimonials />

        <div className="ag-divider" />
        <CTABanner />

        <div className="ag-divider" />
        <Contact />

        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
