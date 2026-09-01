import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ArrowLeft, RotateCw, RefreshCw } from 'lucide-react';

const categoryThemes = {
  travels: {
    accent: '#0284c7',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    badgeColor: '#0284c7',
    badgeBg: '#f0f9ff',
    border: '#bae6fd'
  },
  ecommerce: {
    accent: '#ec4899',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    badgeColor: '#ec4899',
    badgeBg: '#fdf2f8',
    border: '#fbcfe8'
  },
  medical: {
    accent: '#0d9488',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)',
    badgeColor: '#0d9488',
    badgeBg: '#f0fdf4',
    border: '#99f6e4'
  },
  photography: {
    accent: '#8b5cf6',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    badgeColor: '#8b5cf6',
    badgeBg: '#faf5ff',
    border: '#e9d5ff'
  },
  hotel: {
    accent: '#d97706',
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    badgeColor: '#d97706',
    badgeBg: '#fffbeb',
    border: '#fde68a'
  },
  admin: {
    accent: '#0066ff',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    badgeColor: '#1d4ed8',
    badgeBg: '#eff6ff',
    border: '#bfdbfe'
  },
  portfolio: {
    accent: '#6366f1',
    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    badgeColor: '#4f46e5',
    badgeBg: '#eef2ff',
    border: '#c7d2fe'
  },
  agency: {
    accent: '#06b6d4',
    background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    badgeColor: '#0891b2',
    badgeBg: '#ecfeff',
    border: '#a5f3fc'
  },
  education: {
    accent: '#10b981',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    badgeColor: '#059669',
    badgeBg: '#ecfdf5',
    border: '#a7f3d0'
  },
  restaurant: {
    accent: '#ea580c',
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    badgeColor: '#c2410c',
    badgeBg: '#fff7ed',
    border: '#fed7aa'
  },
  default: {
    accent: '#0066ff',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    badgeColor: '#1d4ed8',
    badgeBg: '#eff6ff',
    border: '#e2e8f0'
  }
};

export default function TemplatePreviewWrapper({
  children,
  templateTitle = '',
  categoryName = '',
  categorySlug = '',
  templateSlug = '',
  demoUrl = '',
  downloadUrl = '',
  detailsUrl = ''
}) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const iframeRef = useRef(null);
  const isIframe = window.self !== window.top || searchParams.get('iframe') === 'true';

  // Always default to desktop view when entering any template
  const [viewMode, setViewMode] = useState('desktop');
  const [isLandscape, setIsLandscape] = useState(false);
  const [keyCounter, setKeyCounter] = useState(0);

  // Reset to desktop view mode whenever entering a new template
  useEffect(() => {
    setViewMode('desktop');
    setIsLandscape(false);
  }, [location.pathname, templateSlug]);

  const handleModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleRotate = () => {
    setIsLandscape(prev => !prev);
  };

  const handleReload = () => {
    setKeyCounter(prev => prev + 1);
  };

  // If inside iframe, render raw children directly
  if (isIframe) {
    return <>{children}</>;
  }

  // Derive template information if not passed explicitly as props
  const pathParts = location.pathname.split('/').filter(Boolean);
  let derivedCategory = categoryName;
  let derivedCategorySlug = categorySlug;
  let derivedTemplateSlug = templateSlug;
  let derivedTitle = templateTitle;

  // Check query params first
  const queryUrl = searchParams.get('url');
  const queryName = searchParams.get('name');
  const queryCategory = searchParams.get('category');
  const querySlug = searchParams.get('slug');

  if (queryName && !derivedTitle) derivedTitle = queryName;
  if (queryCategory && !derivedCategory) {
    derivedCategory = queryCategory.charAt(0).toUpperCase() + queryCategory.slice(1);
    derivedCategorySlug = queryCategory;
  }
  if (querySlug && !derivedTemplateSlug) derivedTemplateSlug = querySlug;

  // Fallback parsing from route path
  if (!derivedTemplateSlug && pathParts.length > 0) {
    const last = pathParts[pathParts.length - 1];
    if (last === 'index.html' && pathParts.length > 1) {
      derivedTemplateSlug = pathParts[pathParts.length - 2];
      if (pathParts.length > 2) derivedCategorySlug = pathParts[pathParts.length - 3];
    } else {
      derivedTemplateSlug = last;
      if (pathParts.length > 1 && pathParts[0] === 'preview') {
        derivedCategorySlug = pathParts[1] !== derivedTemplateSlug ? pathParts[1] : '';
      }
    }
  }

  if (!derivedCategory && derivedCategorySlug) {
    derivedCategory = derivedCategorySlug.charAt(0).toUpperCase() + derivedCategorySlug.slice(1);
  }

  if (!derivedTitle && derivedTemplateSlug) {
    derivedTitle = derivedTemplateSlug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // Determine iframe source
  let resolvedIframeSrc = demoUrl || queryUrl;
  if (!resolvedIframeSrc) {
    resolvedIframeSrc = `${location.pathname}?iframe=true${location.hash || ''}`;
  } else if (!resolvedIframeSrc.includes('iframe=true')) {
    resolvedIframeSrc += (resolvedIframeSrc.includes('?') ? '&' : '?') + 'iframe=true';
  }

  // Retrieve theme for active category
  const themeKey = (derivedCategorySlug || '').toLowerCase();
  const theme = categoryThemes[themeKey] || categoryThemes.default;
  const backHref = derivedCategorySlug ? `/templates/${derivedCategorySlug}` : '/templates';

  // Realistic Dimensions & Frame Configurations without intrusive overlays
  const getDeviceDimensions = () => {
    if (viewMode === 'desktop') {
      return {
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        borderRadius: '0px',
        isFrame: false
      };
    }

    if (viewMode === 'tablet') {
      if (isLandscape) {
        return {
          width: 'min(1024px, 94vw)',
          maxWidth: '1024px',
          height: 'min(768px, 86vh)',
          maxHeight: 'calc(100vh - 100px)',
          borderRadius: '24px',
          borderWidth: '12px',
          isFrame: true,
          type: 'tablet'
        };
      }
      return {
        width: 'min(768px, 90vw)',
        maxWidth: '768px',
        height: 'min(980px, 86vh)',
        maxHeight: 'calc(100vh - 100px)',
        borderRadius: '24px',
        borderWidth: '12px',
        isFrame: true,
        type: 'tablet'
      };
    }

    // Mobile mode
    if (isLandscape) {
      return {
        width: 'min(844px, 94vw)',
        maxWidth: '844px',
        height: 'min(390px, 82vh)',
        maxHeight: 'calc(100vh - 100px)',
        borderRadius: '32px',
        borderWidth: '10px',
        isFrame: true,
        type: 'mobile'
      };
    }
    return {
      width: 'min(390px, 90vw)',
      maxWidth: '390px',
      height: 'min(844px, 86vh)',
      maxHeight: 'calc(100vh - 100px)',
      borderRadius: '36px',
      borderWidth: '10px',
      isFrame: true,
      type: 'mobile'
    };
  };

  const dim = getDeviceDimensions();

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: '#f8fafc',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* 1. Responsive Viewport Toolbar */}
      <header id="preview-viewport-toolbar" style={{
        minHeight: '60px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '8px 20px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        zIndex: 99999,
        position: 'relative',
        boxSizing: 'border-box',
        color: '#0f172a',
        gap: '12px'
      }}>
        {/* Left Side: Back Navigation, Brand & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <Link
            to={backHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            title="Back to Templates"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e2e8f0';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.color = '#475569';
            }}
          >
            <ArrowLeft size={16} />
          </Link>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="TechnoSprint Logo"
              style={{ height: '26px', borderRadius: '4px' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </Link>

          {/* Breadcrumb Hierarchy */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap'
          }}>
            {derivedCategory && (
              <>
                <Link
                  to={derivedCategorySlug ? `/templates/${derivedCategorySlug}` : '/templates'}
                  style={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'color 0.2s',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: theme.badgeBg,
                    color: theme.badgeColor,
                    fontSize: '0.78rem'
                  }}
                >
                  {derivedCategory}
                </Link>
                <span style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>/</span>
              </>
            )}
            <span style={{
              color: '#0f172a',
              fontWeight: 700,
              maxWidth: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {derivedTitle || 'Template Preview'}
            </span>
          </div>
        </div>

        {/* Center: Responsive Viewport Switcher Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f1f5f9',
          padding: '3px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          gap: '3px',
          margin: '0 auto'
        }}>
          {/* Desktop Toggle */}
          <button
            onClick={() => handleModeChange('desktop')}
            title="Desktop View (100% / 1440px)"
            style={{
              background: viewMode === 'desktop' ? '#ffffff' : 'transparent',
              color: viewMode === 'desktop' ? '#0066ff' : '#64748b',
              border: viewMode === 'desktop' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.82rem',
              fontWeight: viewMode === 'desktop' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: viewMode === 'desktop' ? '0 1px 4px rgba(0, 102, 255, 0.12)' : 'none'
            }}
          >
            <Monitor size={15} />
            <span>Desktop</span>
          </button>

          {/* Tablet Toggle */}
          <button
            onClick={() => handleModeChange('tablet')}
            title="Tablet View (768px)"
            style={{
              background: viewMode === 'tablet' ? '#ffffff' : 'transparent',
              color: viewMode === 'tablet' ? '#0066ff' : '#64748b',
              border: viewMode === 'tablet' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.82rem',
              fontWeight: viewMode === 'tablet' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: viewMode === 'tablet' ? '0 1px 4px rgba(0, 102, 255, 0.12)' : 'none'
            }}
          >
            <Tablet size={15} />
            <span>Tablet</span>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => handleModeChange('mobile')}
            title="Mobile View (375px)"
            style={{
              background: viewMode === 'mobile' ? '#ffffff' : 'transparent',
              color: viewMode === 'mobile' ? '#0066ff' : '#64748b',
              border: viewMode === 'mobile' ? '1px solid #bfdbfe' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '0.82rem',
              fontWeight: viewMode === 'mobile' ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxShadow: viewMode === 'mobile' ? '0 1px 4px rgba(0, 102, 255, 0.12)' : 'none'
            }}
          >
            <Smartphone size={15} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right Side: Orientation and Reload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {viewMode !== 'desktop' && (
            <button
              onClick={handleRotate}
              title={`Rotate to ${isLandscape ? 'Portrait' : 'Landscape'}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: isLandscape ? '#0066ff' : '#475569',
                border: isLandscape ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCw size={13} style={{ transform: isLandscape ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s ease' }} />
              <span>{isLandscape ? 'Landscape' : 'Portrait'}</span>
            </button>
          )}

          <button
            onClick={handleReload}
            title="Reload Preview"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </header>

      {/* 2. Non-Overlapping Clean Canvas */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: viewMode === 'desktop' ? '#f8fafc' : theme.background,
        padding: viewMode === 'desktop' ? '0' : '20px',
        boxSizing: 'border-box',
        overflow: 'auto',
        position: 'relative',
        transition: 'background 0.3s ease'
      }}>
        {/* Dot pattern texture */}
        {viewMode !== 'desktop' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
            opacity: 0.7
          }} />
        )}

        {/* Clean Device Chassis: Unobstructed full-bleed screen with sleek hardware bezel */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: dim.width,
          maxWidth: dim.maxWidth,
          height: dim.height,
          maxHeight: dim.maxHeight,
          borderRadius: dim.borderRadius,
          border: dim.isFrame ? `${dim.borderWidth} solid #0f172a` : 'none',
          backgroundColor: '#0f172a',
          boxShadow: dim.isFrame
            ? '0 20px 40px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            : 'none',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease'
        }}>
          {/* Inner Clean Viewport Container */}
          <div style={{
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: 0,
            position: 'relative',
            backgroundColor: '#ffffff',
            overflow: 'hidden'
          }}>
            {children ? (
              <div style={{ width: '100%', height: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
                {children}
              </div>
            ) : (
              <iframe
                key={keyCounter}
                ref={iframeRef}
                id="template-preview-iframe"
                title={`${derivedTitle} Preview`}
                src={resolvedIframeSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '100%',
                  border: 'none',
                  display: 'block',
                  backgroundColor: '#ffffff'
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
