import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowRight, Star, ArrowUpRight, Flame, Shield, Zap, Sparkles } from 'lucide-react';

export default function Home({ addToCart, cart }) {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Load categories
    api.getCategories().then(setCategories).catch(err => console.error(err));
    // Load templates
    api.getTemplates().then(setTemplates).catch(err => console.error(err));
  }, []);

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
  };

  const filteredTemplates = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category.slug === activeCategory);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: 50,
        padding: '60px 0',
        minHeight: '520px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: '99px',
            background: 'rgba(0, 102, 255, 0.08)',
            color: 'var(--primary-color)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: 20
          }}>
            <Flame size={14} /> 175+ Premium Templates
          </div>
          <h1 style={{
            fontSize: '3.6rem',
            lineHeight: '1.15',
            fontWeight: 800,
            marginBottom: 20,
            letterSpacing: '-1.5px'
          }}>
            Find the perfect <br />
            template for your <br />
            next <span className="gradient-text">big idea</span>
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: 35,
            maxWidth: 480
          }}>
            Premium HTML, CSS, React, and Bootstrap templates crafted for modern businesses, developers, and online creators. Fully responsive and ready to launch.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/templates" className="btn btn-primary">
              Explore Templates <ArrowRight size={18} />
            </Link>
            <Link to="/builder" className="btn btn-secondary">
              Try Template Builder
            </Link>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 45,
            borderTop: '1px solid #e2e8f0',
            paddingTop: 30
          }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>125k+</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Developers</p>
            </div>
            <div style={{ width: 1, height: 30, background: '#e2e8f0' }}></div>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>4.9/5</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                User Rating <Star size={12} fill="#ffcc00" color="#ffcc00" />
              </p>
            </div>
          </div>
        </div>

        {/* Hero Banner Visual mock */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(255,255,255,0) 70%)',
            zIndex: -1,
            filter: 'blur(20px)'
          }}></div>
          
          <div style={{
            width: '100%',
            maxWidth: '460px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 102, 255, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 102, 255, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)';
          }}
          >
            <div style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }}></span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: 10, fontFamily: 'monospace' }}>preview-saas-dashboard.html</span>
            </div>
            <div style={{ padding: 24, background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 120, height: 16, background: '#e2e8f0', borderRadius: 4 }}></div>
                <div style={{ width: 50, height: 16, background: '#0066ff', borderRadius: 4 }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 15 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ height: 60, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 8 }}>
                    <div style={{ width: 25, height: 8, background: '#e2e8f0', marginBottom: 6 }}></div>
                    <div style={{ width: '80%', height: 14, background: '#38bdf8', borderRadius: 2 }}></div>
                  </div>
                  <div style={{ height: 90, background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 8 }}>
                    <div style={{ width: 40, height: 8, background: '#e2e8f0', marginBottom: 6 }}></div>
                    <div style={{ width: '100%', height: 10, background: '#f1f5f9', marginBottom: 4 }}></div>
                    <div style={{ width: '90%', height: 10, background: '#f1f5f9' }}></div>
                  </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 15, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: '40%', height: 10, background: '#64748b', marginBottom: 12 }}></div>
                    <div style={{ width: '90%', height: 24, background: '#0066ff', borderRadius: 4, marginBottom: 10 }}></div>
                    <div style={{ width: '70%', height: 8, background: '#e2e8f0' }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <div style={{ width: '50%', height: 30, background: '#f1f5f9', borderRadius: 6 }}></div>
                    <div style={{ width: '50%', height: 30, background: '#0f172a', borderRadius: 6 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories filter bar */}
      <section style={{ margin: '40px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Featured Templates</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Filter through our hand-crafted web templates catalog</p>
          </div>
          <Link to="/templates" style={{
            fontSize: '0.9rem',
            color: 'var(--primary-color)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 10 }}>
          <button
            onClick={() => handleCategoryClick('all')}
            style={{
              padding: '8px 18px',
              borderRadius: '99px',
              border: activeCategory === 'all' ? '1px solid var(--primary-color)' : '1px solid #e2e8f0',
              background: activeCategory === 'all' ? 'var(--primary-color)' : 'white',
              color: activeCategory === 'all' ? 'white' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)'
            }}
          >
            All Templates
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              style={{
                padding: '8px 18px',
                borderRadius: '99px',
                border: activeCategory === cat.slug ? '1px solid var(--primary-color)' : '1px solid #e2e8f0',
                background: activeCategory === cat.slug ? 'var(--primary-color)' : 'white',
                color: activeCategory === cat.slug ? 'white' : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Templates Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 30,
        margin: '30px 0 60px 0'
      }}>
        {filteredTemplates.map(template => {
          const isAdded = cart.some(item => item.id === template.id);
          return (
            <div
              key={template.id}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: 'white'
              }}
            >
              {/* Image Preview Container */}
              <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: '#f1f5f9' }}>
                <img
                  src={template.previewImage}
                  alt={template.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }}
                  className="template-card-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  padding: '4px 12px',
                  borderRadius: '99px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: template.templateType === 'FREE' ? '#22c55e' : 'var(--primary-color)',
                  color: 'white'
                }}>
                  {template.templateType === 'FREE' ? 'Free' : `$${template.price.toFixed(2)}`}
                </span>
                
                {/* Tech Badge */}
                <span style={{
                  position: 'absolute',
                  bottom: 12,
                  left: 15,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: 'white'
                }}>
                  {template.bootstrapVersion || 'Bootstrap 5'}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: 6 }}>
                  {template.category.name}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
                  <Link to={`/templates/${template.slug}`} style={{ color: 'var(--secondary-color)' }}>
                    {template.name}
                  </Link>
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', flex: 1, marginBottom: 15, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {template.description}
                </p>

                {/* Info line */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: 15,
                  marginBottom: 15
                }}>
                  <span>{template.pagesCount || 5} Pages</span>
                  <span>{(template.downloadsCount / 1000).toFixed(1)}k Downloads</span>
                  <span>v{template.version || '1.0'}</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link
                    to={`/templates/${template.slug}`}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', textAlign: 'center', justifyContent: 'center' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Feature list / How it works */}
      <section className="glass-panel" style={{ padding: 50, borderRadius: '24px', margin: '80px 0 60px 0', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 10 }}>The TechnoSprint Advantage</h2>
          <p style={{ color: 'var(--text-muted)' }}>Professional, modern website templates tailored for production environments.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 30 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', background: 'rgba(0,102,255,0.08)',
              display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-color)',
              margin: '0 auto 15px auto', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              <Zap size={22} style={{ margin: 'auto' }} />
            </div>
            <h4 style={{ marginBottom: 10 }}>Rapid Launch</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bootstrap pages and themes completely structured and styled. Import, customize, and deploy.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', background: 'rgba(0,102,255,0.08)',
              display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-color)',
              margin: '0 auto 15px auto', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              <Sparkles size={22} style={{ margin: 'auto' }} />
            </div>
            <h4 style={{ marginBottom: 10 }}>Visual Customizer</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Use our interactive online template builder to customize elements and layouts in real-time.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', background: 'rgba(0,102,255,0.08)',
              display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--primary-color)',
              margin: '0 auto 15px auto', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              <Shield size={22} style={{ margin: 'auto' }} />
            </div>
            <h4 style={{ marginBottom: 10 }}>Instant Live Demos</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experience templates interactively directly inside your browser. No setups required to preview our designs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
