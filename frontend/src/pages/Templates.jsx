import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { api, extractTemplateNumber } from '../services/api';
import { Search, SlidersHorizontal } from 'lucide-react';
import SafeImage from '../components/SafeImage';


const categoryThemes = {
  travels: {
    accent: '#0284c7',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    cardBorder: 'rgba(2, 132, 199, 0.18)',
    cardHoverBorder: 'rgba(2, 132, 199, 0.45)',
    badgeColor: '#0284c7',
    badgeBg: '#f0f9ff'
  },
  ecommerce: {
    accent: '#ec4899',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    cardBorder: 'rgba(236, 72, 153, 0.18)',
    cardHoverBorder: 'rgba(236, 72, 153, 0.45)',
    badgeColor: '#ec4899',
    badgeBg: '#fdf2f8'
  },
  medical: {
    accent: '#0d9488',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)',
    cardBorder: 'rgba(13, 148, 136, 0.18)',
    cardHoverBorder: 'rgba(13, 148, 136, 0.45)',
    badgeColor: '#0d9488',
    badgeBg: '#f0fdf4'
  },
  photography: {
    accent: '#8b5cf6',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    cardBorder: 'rgba(139, 92, 246, 0.18)',
    cardHoverBorder: 'rgba(139, 92, 246, 0.45)',
    badgeColor: '#8b5cf6',
    badgeBg: '#faf5ff'
  },
  hotel: {
    accent: '#d97706',
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    cardBorder: 'rgba(217, 119, 6, 0.18)',
    cardHoverBorder: 'rgba(217, 119, 6, 0.45)',
    badgeColor: '#d97706',
    badgeBg: '#fffbeb'
  },
  default: {
    accent: '#0066ff',
    background: '#f8fafc',
    cardBorder: '#e2e8f0',
    cardHoverBorder: 'rgba(0, 102, 255, 0.35)',
    badgeColor: '#1d4ed8',
    badgeBg: '#eff6ff'
  }
};

const renderCategoryAnimation = (categorySlug) => {
  if (categorySlug === 'travels') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Airplane drift */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '-50px',
          animation: 'planeCruise 8s linear infinite',
          fontSize: '24px'
        }}>✈️</div>
        {/* Cloud drift */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '110%',
          animation: 'cloudDrift 14s linear infinite',
          opacity: 0.35,
          fontSize: '32px'
        }}>☁️</div>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '110%',
          animation: 'cloudDrift 19s linear infinite',
          animationDelay: '-5s',
          opacity: 0.25,
          fontSize: '24px'
        }}>☁️</div>
      </div>
    );
  }
  if (categorySlug === 'ecommerce') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Floating shopping cart */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '-40px',
          animation: 'cartSlide 6s ease-in-out infinite',
          fontSize: '22px'
        }}>🛒</div>
        {/* Sparkly discounts */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          animation: 'sparkleRotate 3s linear infinite',
          fontSize: '20px'
        }}>🏷️</div>
      </div>
    );
  }
  if (categorySlug === 'medical') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Pulsing heart */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          animation: 'pulseScale 2s ease-in-out infinite',
          fontSize: '24px'
        }}>❤️</div>
        {/* Healthcare cross */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          right: '15px',
          animation: 'pulseScale 2s ease-in-out infinite',
          animationDelay: '1s',
          fontSize: '22px'
        }}>🏥</div>
      </div>
    );
  }
  if (categorySlug === 'photography') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden'
      }}>
        {/* Rotating aperture */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          animation: 'rotateAperture 4s linear infinite',
          fontSize: '22px'
        }}>📷</div>
        {/* Flash bulb glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '60px',
          height: '60px',
          background: 'rgba(139, 92, 246, 0.08)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: 'flashGlow 4s infinite'
        }} />
      </div>
    );
  }
  return null;
};

export default function Templates() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  
  // States for filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || searchParams.get('category') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    // Sync state if search params or route params change
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(categorySlug || searchParams.get('category') || 'all');
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams, categorySlug]);

  useEffect(() => {
    // Fetch categories
    api.getCategories().then(setCategories).catch(err => console.error(err));
    // Fetch all templates to calculate category counts
    api.getTemplates({}).then(setAllTemplates).catch(err => console.error(err));
  }, []);

  const getCategoryCount = (slug) => {
    if (slug === 'all') return allTemplates.length;
    return allTemplates.filter(t => t.category && t.category.slug === slug).length;
  };

  useEffect(() => {
    // Fetch filtered templates
    const filterParams = {};
    if (selectedCategory !== 'all') filterParams.category = selectedCategory;
    if (selectedType !== 'all') filterParams.type = selectedType;
    if (searchQuery) filterParams.search = searchQuery;

    api.getTemplates(filterParams)
      .then(setTemplates)
      .catch(err => console.error(err));
  }, [selectedCategory, selectedType, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('search', e.target.value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    if (slug !== 'all') {
      navigate(`/templates/${slug}`);
    } else {
      navigate(`/templates`);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    const params = new URLSearchParams(searchParams);
    if (type !== 'all') {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    setSearchParams(params);
  };

  // Sorting
  const sortedTemplates = [...templates].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.downloadsCount || 0) - (a.downloadsCount || 0);
    } else if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    const catA = (a.category?.slug || a.category?.name || '').toLowerCase();
    const catB = (b.category?.slug || b.category?.name || '').toLowerCase();
    if (catA !== catB) {
      return catA.localeCompare(catB);
    }
    const numA = extractTemplateNumber(a);
    const numB = extractTemplateNumber(b);
    return numA - numB;
  });

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', padding: '30px 0' }}>
      <div style={{ marginBottom: 35 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Browse Website Templates</h1>
        <p style={{ color: 'var(--text-muted)' }}>Discover modern, responsive layouts for your next business, dashboard or creative project.</p>
      </div>

      <div style={{
        display: 'flex',
        gap: 40,
        alignItems: 'flex-start',
        marginTop: 20
      }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '280px',
          flexShrink: 0,
          background: 'var(--header-capsule-bg)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.02)',
          position: 'sticky',
          top: 100,
          boxSizing: 'border-box'
        }}>
          {/* Search input in sidebar */}
          <div style={{ position: 'relative', marginBottom: 24 }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              aria-label="Search templates"
              onChange={handleSearchChange}
              style={{
                padding: '10px 16px 10px 42px',
                width: '100%',
                borderRadius: '99px',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem',
                outline: 'none',
                background: 'var(--bg-primary)',
                color: 'var(--text-main)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Categories List */}
          <div style={{ marginBottom: 30 }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '480px', overflowY: 'auto', paddingRight: 4 }}>
              {/* All Categories Row */}
              <button
                onClick={() => handleCategorySelect('all')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedCategory === 'all' ? '#e0f2fe' : 'transparent',
                  color: selectedCategory === 'all' ? 'var(--primary-color)' : 'var(--text-muted)',
                  fontWeight: selectedCategory === 'all' ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== 'all') e.currentTarget.style.background = 'var(--bg-primary)';
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== 'all') e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>All Categories</span>
                <span style={{
                  fontSize: '0.75rem',
                  background: selectedCategory === 'all' ? 'rgba(2, 132, 199, 0.15)' : 'var(--border-color)',
                  color: selectedCategory === 'all' ? 'var(--primary-color)' : 'var(--text-muted)',
                  padding: '2px 8px',
                  borderRadius: '99px',
                  fontWeight: 700
                }}>
                  {getCategoryCount('all')}
                </span>
              </button>

              {/* Individual Category Rows */}
              {categories.map(cat => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: isActive ? '#e0f2fe' : 'transparent',
                      color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'var(--bg-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                    title={cat.name}
                  >
                    <span style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '160px'
                    }}>
                      {cat.name}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      background: isActive ? 'rgba(2, 132, 199, 0.15)' : 'var(--border-color)',
                      color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {getCategoryCount(cat.slug)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* License Type section inside Sidebar bottom */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>License Type</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === 'all'}
                  onChange={() => handleTypeSelect('all')}
                  style={{ accentColor: 'var(--primary-color)' }}
                />
                All Licenses
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === 'FREE'}
                  onChange={() => handleTypeSelect('FREE')}
                  style={{ accentColor: 'var(--primary-color)' }}
                />
                Free Download
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500, color: 'var(--text-muted)' }}>
                <input
                  type="radio"
                  name="type"
                  checked={selectedType === 'PREMIUM'}
                  onChange={() => handleTypeSelect('PREMIUM')}
                  style={{ accentColor: 'var(--primary-color)' }}
                />
                Premium Templates
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Showing Count / Sorting Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 25,
            paddingBottom: 15,
            borderBottom: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing <strong>{sortedTemplates.length}</strong> matching templates
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Releases</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Vertical Stack of Large Horizontal Cards */}
          {sortedTemplates.length > 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {sortedTemplates.map(template => {
                const categorySlug = template.category.slug;
                const theme = categoryThemes[categorySlug] || categoryThemes.default;
                return (
                  <div
                    key={template.id}
                    className="template-card"
                    style={{
                      backgroundColor: 'var(--header-capsule-bg, #ffffff)',
                      border: `1px solid var(--border-color)`,
                      borderRadius: '24px',
                      padding: '32px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                      gap: '36px',
                      alignItems: 'center',
                      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                      width: '100%',
                      transition: 'all 0.3s ease-in-out',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.cardHoverBorder;
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = theme.cardBorder;
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.03)';
                    }}
                  >
                    {/* Left Section: Browser Mockup Showcase with Hover Scroll */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/11',
                      boxSizing: 'border-box'
                    }}>
                      <div className="browser-mockup">
                        <div className="browser-topbar">
                          <div className="browser-dots">
                            <span className="browser-dot red"></span>
                            <span className="browser-dot yellow"></span>
                            <span className="browser-dot green"></span>
                          </div>
                          <span className="browser-address">
                            preview-{template.category.slug || 'template'}-{template.id}.html
                          </span>
                        </div>
                        <div className="browser-content">
                          <SafeImage 
                            className="browser-preview-img"
                            src={template.previewImage} 
                            alt={`${template.name} Preview`}
                            templateSlug={template.slug}
                            categorySlug={categorySlug}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Information & Action */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      
                      {/* 1. Small feature/category badges at the top */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '99px',
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeColor,
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {template.category.name}
                        </span>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '99px',
                          backgroundColor: template.templateType === 'FREE' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(234, 179, 8, 0.08)',
                          color: template.templateType === 'FREE' ? '#22c55e' : '#ca8a04',
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {template.templateType === 'FREE' ? 'Free' : 'Premium'}
                        </span>
                      </div>

                      {/* 2. Template Name & details link */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{
                          fontSize: '1.6rem',
                          fontWeight: '800',
                          color: 'var(--text-main, #0f172a)',
                          margin: 0,
                          fontFamily: 'var(--font-title)',
                          lineHeight: '1.25'
                        }}>
                          <Link 
                            to={`/templates/${template.slug}`} 
                            style={{ color: 'var(--text-main, #0f172a)', transition: 'color 0.2s', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-main, #0f172a)'}
                          >
                            {template.name}
                          </Link>
                        </h3>
                        
                        {/* Updated metadata */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                          <i className="fa-regular fa-clock" style={{ fontSize: '0.85rem' }}></i>
                          <span>Updated recently</span>
                        </div>

                        {/* Display Technologies, Page Count and Features */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '15px',
                          alignItems: 'center',
                          marginTop: '6px',
                          padding: '8px 0',
                          borderTop: '1px solid var(--border-color, #f1f5f9)',
                          borderBottom: '1px solid var(--border-color, #f1f5f9)'
                        }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                            <strong>Pages:</strong> {template.pagesCount || 1}
                          </div>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                            <strong>Stack:</strong> {template.bootstrapVersion}
                          </div>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                            <strong>Downloads:</strong> {template.downloadsCount}
                          </div>
                        </div>

                        {/* 4. Short Description of the Template */}
                        <p style={{
                          fontSize: '0.88rem',
                          color: 'var(--text-muted, #64748b)',
                          lineHeight: '1.7',
                          margin: '6px 0 0 0',
                          fontWeight: 400
                        }}>
                          {template.description}
                        </p>
                      </div>

                      {/* 5. Live Demo Button */}
                      <div style={{ marginTop: '10px' }}>
                        <a
                          href={template.demoUrl}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '12px 24px',
                            backgroundColor: theme.accent,
                            color: 'white',
                            borderRadius: '99px',
                            border: 'none',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textDecoration: 'none',
                            boxShadow: `0 4px 12px ${theme.accent}40`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'none';
                          }}
                        >
                          Live Demo <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '10px' }}></i>
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--header-capsule-bg, white)',
              borderRadius: 16,
              border: '1px dashed var(--border-color, #cbd5e1)'
            }}>
              <h3 style={{ marginBottom: 10, color: 'var(--text-main)' }}>No Templates Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try modifying your filter settings or search query keywords.</p>
            </div>
          )}
        </div> {/* closes Right Main Content Area */}
      </div> {/* closes display: flex container */}
    </div>
  );
}
