import React, { useState, useEffect } from 'react';

/**
 * SafeImage Component
 * Prevents broken image icons by trying multiple fallback URLs in sequence.
 * 
 * Props:
 * - src: String (Original image source)
 * - alt: String (Alt text)
 * - fallback: String (Optional custom fallback)
 * - templateSlug: String (Optional template slug to try local preview first)
 * - categorySlug: String (Optional category slug to try local preview first)
 * - style: Object (Inline styles)
 * - className: String (CSS class names)
 * - loading: String ('lazy' or 'eager')
 */
export default function SafeImage({
  src,
  alt,
  fallback,
  templateSlug,
  categorySlug,
  style,
  className,
  loading = 'lazy',
  ...rest
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(-1);
  const [fallbacksList, setFallbacksList] = useState([]);

  // Generate fallback list when props change
  useEffect(() => {
    setCurrentSrc(src);
    setFallbackIndex(-1);

    const list = [];

    // 1. Add custom fallback if provided
    if (fallback) {
      list.push(fallback);
    }

    // 2. Add local preview path if category and template slug/num are available
    if (categorySlug && templateSlug) {
      // Extract number from templateSlug (e.g. medical-1 -> 1, medicio-healthcare -> 2, etc.)
      let numMatch = templateSlug.match(/(\d+)$/);
      let templateNum = numMatch ? parseInt(numMatch[1], 10) : null;
      if (!templateNum) {
        numMatch = templateSlug.match(/\d+/);
        if (numMatch) {
          templateNum = parseInt(numMatch[0], 10);
        }
      }

      if (templateNum) {
        // Construct standard local preview filename pattern
        // e.g. /templates/medical/medical-1-preview.png
        let localPreview = `/templates/${categorySlug}/${categorySlug}-${templateNum}-preview.png`;
        
        // Handle special category prefix naming cases
        if (categorySlug === 'block-magazine') {
          localPreview = `/templates/block-magazine/blog-${templateNum}-preview.png`;
        } else if (categorySlug === 'travels') {
          localPreview = `/templates/travels/travel-${templateNum}-preview.png`;
        } else if (categorySlug === 'buisness') {
          localPreview = `/templates/buisness/Business-${templateNum}-preview.png`;
        } else if (categorySlug === 'comming-soon') {
          // Check if it's one of the special named ones
          if (templateSlug === 'coming-soon-template') {
            localPreview = `/templates/comming-soon/coming-soon-template-preview.png`;
          } else if (templateSlug === 'nova-x1-template') {
            localPreview = `/templates/comming-soon/cm-2-preview.png`;
          } else if (templateSlug === 'aura-sky-template') {
            localPreview = `/templates/comming-soon/cm-3-preview.png`;
          } else if (templateSlug === 'botanical-studies-template') {
            localPreview = `/templates/comming-soon/cm-4-preview.png`;
          } else if (templateSlug === 'aurelia-chronos-template') {
            localPreview = `/templates/comming-soon/cm-5-preview.png`;
          } else {
            localPreview = `/templates/comming-soon/comingsoon-${templateNum}-preview.png`;
          }
        }
        
        list.push(localPreview);
      }
    }

    // 3. Add generic high-quality placeholder image
    list.push('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80');

    // 4. Add platform logo or favicon
    list.push('/logo.png');
    list.push('/favicon.svg');

    // 5. Hard fallback to 1x1 transparent pixel data URL to prevent broken icon display
    list.push('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

    setFallbacksList(list);
  }, [src, fallback, templateSlug, categorySlug]);

  const handleError = () => {
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < fallbacksList.length) {
      setFallbackIndex(nextIndex);
      setCurrentSrc(fallbacksList[nextIndex]);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || 'Template Preview'}
      style={style}
      className={className}
      onError={handleError}
      loading={loading}
      {...rest}
    />
  );
}
