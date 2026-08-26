import React, { useState, useEffect } from 'react';
import './App.css';

const CODE_EXAMPLES = {
  api: [
    { type: 'comment', text: '// Initialize Aetheris weightless compute instance' },
    { type: 'keyword', text: 'import' },
    { type: 'plain', text: ' { AetherisClient } ' },
    { type: 'keyword', text: 'from' },
    { type: 'string', text: ' "@aetheris/sdk-edge"' },
    { type: 'plain', text: ';' },
    { type: 'newline' },
    { type: 'keyword', text: 'const' },
    { type: 'plain', text: ' client = ' },
    { type: 'keyword', text: 'new' },
    { type: 'builtin', text: ' AetherisClient' },
    { type: 'plain', text: '({ token: process.env.AETHERIS_KEY });' },
    { type: 'newline' },
    { type: 'keyword', text: 'async' },
    { type: 'plain', text: ' ' },
    { type: 'keyword', text: 'function' },
    { type: 'builtin', text: ' deployCompute' },
    { type: 'plain', text: '(request) {' },
    { type: 'plain', text: '  ' },
    { type: 'keyword', text: 'const' },
    { type: 'plain', text: ' node = ' },
    { type: 'keyword', text: 'await' },
    { type: 'plain', text: ' client.nodes.create({' },
    { type: 'plain', text: '    region: ' },
    { type: 'string', text: '"global-mesh-zero"' },
    { type: 'plain', text: ',' },
    { type: 'plain', text: '    frictionless: ' },
    { type: 'keyword', text: 'true' },
    { type: 'plain', text: ',' },
    { type: 'plain', text: '    memoryPool: ' },
    { type: 'string', text: '"128GB-ZeroG"' },
    { type: 'plain', text: ',' },
    { type: 'plain', text: '  });' },
    { type: 'newline' },
    { type: 'plain', text: '  ' },
    { type: 'keyword', text: 'return' },
    { type: 'keyword', text: ' await' },
    { type: 'plain', text: ' node.execute(request.handler);' },
    { type: 'plain', text: '}' }
  ],
  telemetry: [
    { type: 'comment', text: '# Aetheris Live Mesh Telemetry Configuration' },
    { type: 'tag', text: 'version' },
    { type: 'plain', text: ': ' },
    { type: 'string', text: '3.0.0' },
    { type: 'newline' },
    { type: 'tag', text: 'telemetry' },
    { type: 'plain', text: ':' },
    { type: 'newline' },
    { type: 'plain', text: '  ' },
    { type: 'tag', text: 'p99_latency_alert' },
    { type: 'plain', text: ': ' },
    { type: 'string', text: '1.2ms' },
    { type: 'newline' },
    { type: 'plain', text: '  ' },
    { type: 'tag', text: 'sample_rate' },
    { type: 'plain', text: ': ' },
    { type: 'variable', text: '1.0' },
    { type: 'newline' },
    { type: 'plain', text: '  ' },
    { type: 'tag', text: 'auto_rebalance' },
    { type: 'plain', text: ': ' },
    { type: 'keyword', text: 'true' },
    { type: 'newline' },
    { type: 'tag', text: 'clusters' },
    { type: 'plain', text: ':' },
    { type: 'newline' },
    { type: 'plain', text: '  - ' },
    { type: 'tag', text: 'id' },
    { type: 'plain', text: ': ' },
    { type: 'string', text: '"orbital-cluster-alpha"' },
    { type: 'newline' },
    { type: 'plain', text: '    ' },
    { type: 'tag', text: 'failover_threshold' },
    { type: 'plain', text: ': ' },
    { type: 'variable', text: '0.4ms' },
    { type: 'newline' },
    { type: 'plain', text: '    ' },
    { type: 'tag', text: 'healing' },
    { type: 'plain', text: ': ' },
    { type: 'keyword', text: 'autonomous' }
  ],
  iac: [
    { type: 'keyword', text: 'resource' },
    { type: 'string', text: ' "aetheris_cluster"' },
    { type: 'string', text: ' "galactic_mesh"' },
    { type: 'plain', text: ' {' },
    { type: 'newline' },
    { type: 'plain', text: '  name        = ' },
    { type: 'string', text: '"orbital-edge-mesh"' },
    { type: 'newline' },
    { type: 'plain', text: '  tier        = ' },
    { type: 'string', text: '"orbital-scale"' },
    { type: 'newline' },
    { type: 'plain', text: '  reliability = ' },
    { type: 'string', text: '"99.999"' },
    { type: 'newline' },
    { type: 'newline' },
    { type: 'plain', text: '  ' },
    { type: 'keyword', text: 'features' },
    { type: 'plain', text: ' {' },
    { type: 'newline' },
    { type: 'plain', text: '    zerog_cache     = ' },
    { type: 'keyword', text: 'true' },
    { type: 'newline' },
    { type: 'plain', text: '    quantum_balance = ' },
    { type: 'keyword', text: 'true' },
    { type: 'newline' },
    { type: 'plain', text: '    self_healing    = ' },
    { type: 'keyword', text: 'true' },
    { type: 'newline' },
    { type: 'plain', text: '  }' },
    { type: 'newline' },
    { type: 'plain', text: '}' }
  ]
};

const FAQ_ITEMS = [
  {
    question: "What exactly is a Zero-G & Zero-Resistance Cloud Platform?",
    answer: "Aetheris uses a customized, decentralized global server mesh that bypasses traditional server-side connection bottlenecks. By pooling active memory channels globally and routing computations over ultra-low-latency physical optics lines, we eliminate standard resource congestion, giving your compute commands near weightless, instant response speeds."
  },
  {
    question: "How does Zero-G Memory Caching guarantee 0.4ms response speeds?",
    answer: "Our caching engine stores high-frequency application logic in pre-allocated, volatile memory rings that spin on edge compute hubs. These nodes are direct-mapped to our orbital DNS network, allowing operations to skip standard DB roundtrips and execute with virtually zero friction."
  },
  {
    question: "Can I migrate my existing Terraform or Kubernetes configuration easily?",
    answer: "Absolutely. Aetheris supports full declarative setup via IaC providers. Our native configurations adapt straight from standard Kubernetes YAML or Terraform definitions, and our automated container migration tools convert existing deployments seamlessly."
  },
  {
    question: "Is there support for automated rollbacks during cluster deployments?",
    answer: "Yes. Every cluster deployment utilizes double-buffered node groups. If any telemetry signal registers a spike exceeding our 1.2ms global P99 threshold during release, the traffic routes back instantly without dropouts."
  },
  {
    question: "Does Aetheris offer enterprise compliance and data protection agreements?",
    answer: "We support end-to-end data encryption with customizable data-sovereignty keys. Enterprise licenses have dedicated compliance vaults, ISO/IEC 27001 certifications, and full GDPR audit reports ready for download."
  }
];

export default function AetherisApp() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('api');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Dynamic values state
  const [latencyVal, setLatencyVal] = useState(0.42);
  const [p99Val, setP99Val] = useState(1.12);
  const [containersCount, setContainersCount] = useState(50143890);
  const [throughputVal, setThroughputVal] = useState(128.05);

  // Simulated live client clusters data
  const [clusters, setClusters] = useState([
    { id: 1, name: 'Cluster Alpha (US-East Edge)', region: 'us-east-1', uptime: '99.999%', load: 24, latency: 0.38, image: '/aetheris_cluster_alpha.jpg' },
    { id: 2, name: 'Cluster Beta (EU-Central Node)', region: 'eu-central-1', uptime: '100.00%', load: 41, latency: 0.44, image: '/aetheris_cluster_beta.jpg' },
    { id: 3, name: 'Cluster Gamma (Asia-South Hub)', region: 'ap-south-1', uptime: '99.998%', load: 12, latency: 0.52, image: '/aetheris_cluster_gamma.jpg' },
    { id: 4, name: 'Cluster Delta (Oceania Edge)', region: 'ap-southeast-2', uptime: '99.999%', load: 8, latency: 0.48, image: '/aetheris_cluster_delta.jpg' }
  ]);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', tier: 'developer', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Scroll listener to update active tab link highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'features', 'services', 'portfolio', 'pricing', 'architecture', 'faq', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fluctuating metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyVal(parseFloat((0.38 + Math.random() * 0.08).toFixed(3)));
      setP99Val(parseFloat((1.05 + Math.random() * 0.2).toFixed(2)));
      setThroughputVal(parseFloat((127.8 + Math.random() * 0.6).toFixed(2)));
      setContainersCount((prev) => prev + Math.floor(Math.random() * 3) + 1);

      // Fluctuate cluster loads and latencies slightly
      setClusters((prevClusters) =>
        prevClusters.map((c) => ({
          ...c,
          load: Math.max(5, Math.min(95, c.load + Math.floor(Math.random() * 5) - 2)),
          latency: parseFloat((c.latency + (Math.random() * 0.04 - 0.02)).toFixed(2))
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Ping handler when a user clicks a cluster card
  const handlePingCluster = (id) => {
    setClusters((prevClusters) =>
      prevClusters.map((c) => {
        if (c.id === id) {
          return { ...c, latency: parseFloat((0.25 + Math.random() * 0.1).toFixed(2)) };
        }
        return c;
      })
    );
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleFaqToggle = (index) => {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', subject: '', tier: 'developer', message: '' });
      }, 5000);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className={`aetheris-scope ${theme}-theme`} id="home">
      {/* Elevate Top Bar */}
      <div className="top-bar-elevate">
        <span className="top-bar-arrow" onClick={() => alert("Loading previous platform preview...")}>‹</span>
        <span className="top-bar-title">Elevate</span>
        <span className="top-bar-arrow" onClick={() => alert("Loading next platform preview...")}>›</span>
      </div>

      {/* Floating Glass Navigation Pill */}
      <div className="nav-pill-wrapper">
        <nav className="nav-pill">
          <a href="#home" className="nav-logo">
            <div className="nav-logo-icon">
              <div className="nav-logo-orbit"></div>
              <div className="nav-logo-core"></div>
            </div>
            Aetheris
          </a>

          <ul className="nav-links">
            <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#features" className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a></li>
            <li><a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a></li>
            <li><a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}>Portfolio</a></li>
            <li><a href="#pricing" className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}>Pricing</a></li>
            <li className="nav-item-dropdown">
              <a href="#architecture" className="nav-link">
                Dropdown 
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </a>
              <div className="dropdown-menu">
                <a href="#architecture" className="dropdown-item">Edge API Spec</a>
                <a href="#benchmarks" className="dropdown-item">Mesh Telemetry</a>
                <a href="#faq" className="dropdown-item">Platform FAQ</a>
              </div>
            </li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button className="btn btn-primary-glow" onClick={() => alert("Launching Console Node...")}>
              Launch Console
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </button>
            <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown flyout */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#home" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#features" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
            <li><a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#portfolio" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Portfolio</a></li>
            <li><a href="#pricing" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a></li>
            <li>
              <div className="mobile-nav-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
                Dropdown
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {mobileDropdownOpen && (
                <div className="mobile-dropdown-items">
                  <a href="#architecture" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Edge API Spec</a>
                  <a href="#benchmarks" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Mesh Telemetry</a>
                  <a href="#faq" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Platform FAQ</a>
                </div>
              )}
            </li>
            <li><a href="#contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '10px' }}>
            <button className="theme-toggle-btn" style={{ flexShrink: 0 }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button className="btn btn-primary-glow" style={{ flex: 1 }} onClick={() => { setMobileMenuOpen(false); alert("Launching Console Node..."); }}>
              Launch Console
            </button>
          </div>
        </div>
      </div>

      {/* 1. Hero Section (Home) */}
      <section className="container hero-section">
        <div className="hero-content">
          <div className="live-badge">
            <span className="pulsing-dot"></span>
            ⚡ Aetheris 3.0 • Zero Friction Engine
          </div>
          <h1 className="hero-title">
            Compute Infrastructure Freed from the Pull of Latency.
          </h1>
          <p className="hero-subtitle">
            Deploy hyper-scale nodes inside a decentralized memory mesh. Benefit from instant, zero-resistance query execution, autonomous resource distribution, and weightless caching.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary-glow hero-btn-primary" onClick={() => alert("Initializing Free Node deployment...")}>
              Deploy Free Node
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <a href="#architecture" className="btn btn-ghost hero-btn-ghost">
              View Live Cluster
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mockup-container">
            <div className="glass-card mockup-main">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <div className="mockup-dot cyan"></div>
                  <div className="mockup-dot purple"></div>
                  <div className="mockup-dot"></div>
                </div>
                <div className="mockup-title">mesh-console://metrics</div>
              </div>
              <div className="mockup-image-wrapper">
                <img src="/aetheris_hero_mesh.jpg" alt="Aetheris Mesh Dashboard" className="mockup-img" />
              </div>
              <div className="mockup-metrics">
                <div className="mockup-metric-card">
                  <div className="mockup-metric-label">Memory Friction</div>
                  <div className="mockup-metric-val">0.00%</div>
                </div>
                <div className="mockup-metric-card">
                  <div className="mockup-metric-label">Bandwidth</div>
                  <div className="mockup-metric-val">10.4 GB/s</div>
                </div>
              </div>
              <div className="mockup-chart">
                <div className="mockup-chart-bar" style={{ '--bar-height': '35%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '62%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '47%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '85%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '53%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '92%' }}></div>
                <div className="mockup-chart-bar" style={{ '--bar-height': '72%' }}></div>
              </div>
            </div>

            <div className="glass-card satellite-card sat-1">
              <div className="sat-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div className="sat-details">
                <span className="sat-num">{latencyVal}ms</span>
                <span className="sat-label">Core Latency</span>
              </div>
            </div>

            <div className="glass-card satellite-card sat-2">
              <div className="sat-icon-wrapper purple">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <div className="sat-details">
                <span className="sat-num">Zero-G</span>
                <span className="sat-label">Memory Pool</span>
              </div>
            </div>

            <div className="glass-card satellite-card sat-3">
              <div className="sat-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div className="sat-details">
                <span className="sat-num">Active</span>
                <span className="sat-label">Global Mesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section */}
      <section className="container section" id="about">
        <div className="section-header">
          <div className="section-badge">About Us</div>
          <h2 className="section-title">The Philosophy of Weightless Code.</h2>
          <p className="section-subtitle">
            Aetheris was founded on a simple question: What if computing could escape standard network bottlenecks?
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Traditional hosting infrastructure is bound by geographical hardware clusters, slow connection loops, and heavy disk write limits. This is what we call "network gravity."
            </p>
            <p>
              By decoupling application runtimes from rigid machine architectures, Aetheris activates compute routines globally in pre-allocated memory rings. Runtimes spin on edge nodes, resulting in speed limits reaching near-zero friction.
            </p>
            <p>
              Our global team of core engineers, cloud architects, and hardware designers continues to construct the next era of edge computation. Join us in setting your code free.
            </p>
            <div className="about-image-wrapper">
              <img src="/aetheris_about_wave.jpg" alt="Weightless Computing Concept" className="about-img" />
            </div>
          </div>

          <div className="about-stack">
            <div className="stack-layer">
              <span className="stack-num">L1</span>
              <div className="stack-info">
                <h4>Edge DNS Router</h4>
                <p>Translates query addresses in under 0.1ms via orbital DNS chains.</p>
              </div>
            </div>
            <div className="stack-layer">
              <span className="stack-num">L2</span>
              <div className="stack-info">
                <h4>Memory Ring Cache</h4>
                <p>Serves pre-allocated RAM structures directly on edge compute networks.</p>
              </div>
            </div>
            <div className="stack-layer">
              <span className="stack-num">L3</span>
              <div className="stack-info">
                <h4>Autonomous Micro-VMs</h4>
                <p>Compiles and executes functions in isolated zero-resistance runtimes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section (Bento Box) */}
      <section className="container section" id="features">
        <div className="section-header">
          <div className="section-badge">Capabilities</div>
          <h2 className="section-title">Engineered to Disregard Network Resistance.</h2>
          <p className="section-subtitle">
            Experience our six pillars of zero-gravity technology designed to host fast, responsive applications anywhere.
          </p>
        </div>

        <div className="bento-grid">
          <div className="glass-card bento-card bento-large-h" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Zero-G Caching</h3>
              <p className="bento-desc">
                High-performance RAM pooling that routes requests through active memory channels, skipping traditional disk operations and physical DB delays to ensure immediate, zero-friction content loading globally.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card purple-theme" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Quantum Balancing</h3>
              <p className="bento-desc">
                Dynamic load distribution that automatically routes traffic to nodes with matching response parameters.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card emerald-theme" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Frictionless Deploy</h3>
              <p className="bento-desc">
                Deploy full-stack scripts instantly. Zero warm-up latency, built-in edge compilation, and global mesh activation in milliseconds.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Automated Rollbacks</h3>
              <p className="bento-desc">
                Integrated health monitors rollback code revisions instantly if connection thresholds are breached. Traffic flows back to previous active clusters immediately.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card purple-theme" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Multi-Region Mesh</h3>
              <p className="bento-desc">
                Synchronized node communication forming a unified grid, sharing data stores seamlessly across continents.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card emerald-theme" onMouseMove={handleMouseMove}>
            <div className="bento-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <div className="bento-info">
              <h3 className="bento-title">Self-Healing Clusters</h3>
              <p className="bento-desc">
                Intelligent micro-agents monitor system health, hot-swapping failing virtual runtimes without connection disruptions.
              </p>
            </div>
          </div>

          <div className="glass-card bento-card bento-large-h bento-image-card">
            <img src="/aetheris_bento_sphere.jpg" alt="Global Mesh Telemetry Sphere" />
            <div className="bento-image-overlay">
              <h3 className="bento-title">Global Telemetry Sphere</h3>
              <p className="bento-desc">Real-time telemetry tracking query streams across active server orbits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section className="container section" id="services">
        <div className="section-header">
          <div className="section-badge">Services</div>
          <h2 className="section-title">Mesh Compute Offerings.</h2>
          <p className="section-subtitle">
            Leverage our specialized architectural services built to host weightless application modules.
          </p>
        </div>

        <div className="services-grid">
          <div className="glass-card service-card">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 17 10 11 16 17 20 11"></polyline><path d="M12 2v6M2 12h6M16 12h6M12 16v6"></path></svg>
            </div>
            <h3 className="service-title">Zero-G Compute</h3>
            <p className="service-desc">
              Execute heavy dynamic application handlers in isolated RAM spaces with 0% memory overhead.
            </p>
          </div>

          <div className="glass-card service-card purple-theme">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h3 className="service-title">Mesh Storage</h3>
            <p className="service-desc">
              Store stateful transactional DB documents replicated across multi-regional memory vaults instantly.
            </p>
          </div>

          <div className="glass-card service-card">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <h3 className="service-title">Autonomous CDN</h3>
            <p className="service-desc">
              Skip geographical routing delays. Active caches auto-rebalance requests dynamically.
            </p>
          </div>

          <div className="glass-card service-card purple-theme">
            <div className="service-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 className="service-title">Compliance Vaults</h3>
            <p className="service-desc">
              End-to-end data encryption mapped directly to sovereignty laws with automatic compliance certificates.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Portfolio Section */}
      <section className="container section" id="portfolio">
        <div className="section-header">
          <div className="section-badge">Portfolio</div>
          <h2 className="section-title">Live Active Clusters.</h2>
          <p className="section-subtitle">
            Observe running client meshes displaying real-time telemetry metrics. Click any card to trigger a network ping.
          </p>
        </div>

        <div className="portfolio-grid">
          {clusters.map((c) => (
            <div
              key={c.id}
              className="glass-card portfolio-card active-cluster"
              onClick={() => handlePingCluster(c.id)}
              title="Click to ping cluster and test response time"
            >
              <div className="portfolio-image-container">
                <img src={c.image} alt={c.name} className="portfolio-thumb" />
              </div>

              <div className="portfolio-info">
                <h3 className="portfolio-cluster-title">{c.name}</h3>
                <span className="portfolio-region">Zone ID: {c.region}</span>
                <div className="portfolio-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Latency: <strong style={{ color: '#fff' }}>{c.latency}ms</strong>
                </div>
                <div className="portfolio-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
                  Uptime: <strong style={{ color: 'var(--accent-emerald)' }}>{c.uptime}</strong>
                </div>
              </div>

              <div className="portfolio-status-bar">
                <div className="status-ring-label">Cluster Active Load</div>
                <span className="status-ring-val">{c.load}%</span>
                <div className="status-load-bar">
                  <div className="status-load-progress" style={{ '--load-width': `${c.load}%` }}></div>
                </div>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px', cursor: 'pointer' }}>
                  ⚡ Click to trigger traceping
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pricing Matrix */}
      <section className="container section" id="pricing">
        <div className="section-header">
          <div className="section-badge">Pricing Matrix</div>
          <h2 className="section-title">Transparent Scaling. Zero Overhead.</h2>
          <p className="section-subtitle">
            Choose a suitable compute tier for your node clusters. Save 20% by subscribing to annual billing.
          </p>
        </div>

        <div className="billing-switcher">
          <span className={`billing-label ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly Billing</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={billingCycle === 'annual'}
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className={`billing-label ${billingCycle === 'annual' ? 'active' : ''}`}>
            Annual Billing <span className="discount-badge">-20% Save</span>
          </span>
        </div>

        <div className="pricing-grid">
          <div className="glass-card pricing-card">
            <div className="pricing-tier">Developer</div>
            <div className="pricing-price-wrapper">
              <span className="pricing-symbol">$</span>
              <span className="pricing-amount">{billingCycle === 'monthly' ? '19' : '15'}</span>
              <span className="pricing-period">/mo</span>
            </div>
            <p className="pricing-desc">
              Perfect for deploying experimental nodes, testing Edge API configurations, and evaluating telemetry metrics.
            </p>
            <ul className="pricing-features">
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Up to 3 Active Nodes
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                500 GB Zero-G Cache Limit
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Standard Telemetry alerts
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Community SLA channels
              </li>
            </ul>
            <button className="btn btn-ghost pricing-btn" onClick={() => alert("Initiated Developer Sign-up...")}>
              Get Developer Node
            </button>
          </div>

          <div className="pricing-card popular">
            <div className="popular-inner">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-tier">Orbital Scale</div>
              <div className="pricing-price-wrapper">
                <span className="pricing-symbol">$</span>
                <span className="pricing-amount">{billingCycle === 'monthly' ? '79' : '63'}</span>
                <span className="pricing-period">/mo</span>
              </div>
              <p className="pricing-desc">
                Ideal for production cluster architectures requiring automated rebalancing, self-healing nodes, and compliance vaults.
              </p>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Unlimited Edge Nodes
                </li>
                <li className="pricing-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  4 TB Shared Memory Cache
                </li>
                <li className="pricing-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Instant Rollback Telemetry
                </li>
                <li className="pricing-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  99.999% SLA Uptime Guarantee
                </li>
                <li className="pricing-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  24/7 Dedicated Support
                </li>
              </ul>
              <button className="btn btn-primary-glow pricing-btn" onClick={() => alert("Initiated Orbital Scale Sign-up...")}>
                Deploy Orbital Mesh
              </button>
            </div>
          </div>

          <div className="glass-card pricing-card">
            <div className="pricing-tier">Galactic Enterprise</div>
            <div className="pricing-price-wrapper">
              <span className="pricing-symbol">$</span>
              <span className="pricing-amount">{billingCycle === 'monthly' ? '299' : '239'}</span>
              <span className="pricing-period">/mo</span>
            </div>
            <p className="pricing-desc">
              Customized solutions for massive enterprise networks needing isolated mesh zones and custom security modules.
            </p>
            <ul className="pricing-features">
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Dedicated Isolated Meshes
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Custom Memory Ring Pools
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Compliance Vault integrations
              </li>
              <li className="pricing-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Dedicated Infrastructure Engineers
              </li>
            </ul>
            <button className="btn btn-ghost pricing-btn" onClick={() => alert("Connecting to Aetheris Sales...")}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 7. Architecture / Tabbed Showcase (Dropdown Content) */}
      <section className="container section" id="architecture">
        <div className="section-header">
          <div className="section-badge">Architecture</div>
          <h2 className="section-title">Zero Friction. Complete Control.</h2>
          <p className="section-subtitle">
            Use declarative configuration keys to orchestrate nodes, inspect mesh paths, and run edge handlers easily.
          </p>
        </div>

        <div className="showcase-wrapper">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`}
              onClick={() => setActiveTab('api')}
            >
              <div className="tab-btn-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div>
                <span className="tab-btn-title">Edge API Client</span>
                <span className="tab-btn-desc">Initialize dynamic compute requests</span>
              </div>
            </button>

            <button
              className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
              onClick={() => setActiveTab('telemetry')}
            >
              <div className="tab-btn-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div>
                <span className="tab-btn-title">Live Telemetry</span>
                <span className="tab-btn-desc">Configure performance triggers</span>
              </div>
            </button>

            <button
              className={`tab-btn ${activeTab === 'iac' ? 'active' : ''}`}
              onClick={() => setActiveTab('iac')}
            >
              <div className="tab-btn-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
              </div>
              <div>
                <span className="tab-btn-title">Infrastructure as Code</span>
                <span className="tab-btn-desc">Declare mesh components declaratively</span>
              </div>
            </button>
          </div>

          <div className="glass-card code-editor">
            <div className="editor-header">
              <span className="editor-filename">
                {activeTab === 'api' && 'deploy.js'}
                {activeTab === 'telemetry' && 'telemetry.yaml'}
                {activeTab === 'iac' && 'main.tf'}
              </span>
              <span className="editor-filename" style={{ color: 'var(--accent-cyan)' }}>UTF-8</span>
            </div>
            <div className="editor-body">
              {CODE_EXAMPLES[activeTab].map((line, idx) => {
                if (line.type === 'newline') {
                  return <div key={idx} className="code-line"><span className="line-num">{idx + 1}</span><span className="line-content"> </span></div>;
                }
                return (
                  <div key={idx} className="code-line">
                    <span className="line-num">{idx + 1}</span>
                    <span className="line-content">
                      <span className={`code-${line.type}`}>{line.text}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Benchmarks / Trust & Live Metrics Bar (Dropdown Content) */}
      <section className="metrics-section" id="benchmarks">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-number">99.999%</div>
              <div className="metric-label">Uptime SLA Reliability</div>
            </div>
            <div className="metric-item">
              <div className="metric-number">&lt;{p99Val}ms</div>
              <div className="metric-label">Global P99 Node Latency</div>
            </div>
            <div className="metric-item">
              <div className="metric-number">{throughputVal}Tbps</div>
              <div className="metric-label">Edge Mesh Network Throughput</div>
            </div>
            <div className="metric-item">
              <div className="metric-number">
                {containersCount.toLocaleString()}
              </div>
              <div className="metric-label">Live Active Compute Units</div>
            </div>
          </div>

          <div className="trust-bar">
            <div className="trust-title">Empowering the World's Fastest Networks</div>
            <div className="trust-logos">
              <div className="trust-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 22 12 18 22 22"></polygon></svg>
                ApexFlow
              </div>
              <div className="trust-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                QuantScale
              </div>
              <div className="trust-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
                HelixMesh
              </div>
              <div className="trust-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                VeloCloud
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section (Dropdown Content) */}
      <section className="container section" id="faq">
        <div className="section-header">
          <div className="section-badge">FAQ</div>
          <h2 className="section-title">Common Orbital Inquiries.</h2>
          <p className="section-subtitle">
            Have questions about how Aetheris provides zero-friction latency hosting? Browse answers below.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => handleFaqToggle(idx)}>
                {item.question}
                <svg className="faq-toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Contact Section */}
      <section className="container section" id="contact">
        <div className="section-header">
          <div className="section-badge">Contact Us</div>
          <h2 className="section-title">Interface with Cluster Control.</h2>
          <p className="section-subtitle">
            Need custom orbital parameters or galactic pricing? Connect directly with our platform engineers.
          </p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="contact-info-detail">
                <h4>System Telemetry Address</h4>
                <p>control-node@aetheris.sh</p>
                <p>inquire@aetheris.sh</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <div className="contact-info-detail">
                <h4>Decentralized Headquarters</h4>
                <p>Node Orbit Alpha-4, Sector 7</p>
                <p>Grid Zone 12-B, Low Orbit</p>
              </div>
            </div>
          </div>

          <div className="glass-card contact-form-card">
            {formSubmitted ? (
              <div className="form-success-alert">
                <h4>⚡ Connection Established!</h4>
                <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                  Telemetry link synced successfully. An infrastructure representative will contact your console shortly.
                </p>
              </div>
            ) : null}

            <form onSubmit={handleFormSubmit}>
              <div className="form-grid">
                <div>
                  <label className="form-label" htmlFor="name">Console Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter name..."
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Comms Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group-full">
                  <label className="form-label" htmlFor="subject">Subject Topic</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Custom node scaling request..."
                    value={formData.subject}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group-full">
                  <label className="form-label" htmlFor="tier">Target Cluster Tier</label>
                  <select
                    id="tier"
                    name="tier"
                    className="form-input"
                    value={formData.tier}
                    onChange={handleFormChange}
                  >
                    <option value="developer">Developer ($19/mo)</option>
                    <option value="orbital">Orbital Scale ($79/mo)</option>
                    <option value="galactic">Galactic Enterprise ($299/mo)</option>
                  </select>
                </div>
                <div className="form-group-full">
                  <label className="form-label" htmlFor="message">Message Payload</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-input"
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    placeholder="Describe your scaling requirements..."
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary-glow contact-submit-btn">
                Establish Connection Link
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="container">
        <div className="glass-card footer-banner">
          <h2 className="banner-title">Ready to launch your applications into orbit?</h2>
          <p className="banner-desc">
            Deploy your code to Aetheris nodes inside 10 seconds. Join thousands of creators executing zero-resistance computing.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your developer email..."
              className="newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary-glow newsletter-btn">
              {newsletterSubmitted ? "Successfully Joined!" : "Get Started"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer Links & Sitemaps */}
      <footer className="container">
        <div className="footer-links-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">Aetheris</a>
            <p className="footer-tagline">
              Weightless compute infrastructure built for hyper-scale networks globally.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Github link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-col-links">
              <li><a href="#features" className="footer-col-link">Features</a></li>
              <li><a href="#architecture" className="footer-col-link">Edge API</a></li>
              <li><a href="#benchmarks" className="footer-col-link">Telemetry</a></li>
              <li><a href="#pricing" className="footer-col-link">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-col-links">
              <li><a href="#" className="footer-col-link">Developer Docs</a></li>
              <li><a href="#" className="footer-col-link">System Status</a></li>
              <li><a href="#" className="footer-col-link">IaC Registry</a></li>
              <li><a href="#" className="footer-col-link">SLA Agreement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-col-links">
              <li><a href="#about" className="footer-col-link">About Us</a></li>
              <li><a href="#" className="footer-col-link">Careers</a></li>
              <li><a href="#portfolio" className="footer-col-link">Client Mesh Portfolio</a></li>
              <li><a href="#contact" className="footer-col-link">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-col-links">
              <li><a href="#" className="footer-col-link">Terms of Service</a></li>
              <li><a href="#" className="footer-col-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-col-link">Security Policies</a></li>
              <li><a href="#" className="footer-col-link">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Aetheris Platform Inc. All rights reserved.</span>
          <span>Designed with Zero Gravity &bull; Powered by TechnoSprint Templates.</span>
        </div>
      </footer>
    </div>
  );
}
