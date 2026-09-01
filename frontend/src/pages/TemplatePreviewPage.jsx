import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import TemplatePreviewWrapper from '../components/TemplatePreviewWrapper';

export default function TemplatePreviewPage() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract route parameters
  const categorySlug = params.categorySlug || searchParams.get('category') || '';
  const templateSlug = params.templateSlug || params.slug || searchParams.get('slug') || '';
  const queryUrl = searchParams.get('url') || '';
  const queryName = searchParams.get('name') || '';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const lookupSlug = templateSlug || (params.slug ? params.slug : '');

    if (lookupSlug) {
      api.getTemplateBySlug(lookupSlug)
        .then(res => {
          if (isMounted && res) {
            setTemplate(res);
            setLoading(false);
          }
        })
        .catch(() => {
          // If not found by direct slug, look in all templates list
          api.getTemplates()
            .then(templates => {
              if (!isMounted) return;
              const found = templates.find(t => 
                t.slug === lookupSlug || 
                (categorySlug && t.category?.slug === categorySlug && t.demoUrl?.includes(lookupSlug))
              );
              if (found) {
                setTemplate(found);
              }
              setLoading(false);
            })
            .catch(() => {
              if (isMounted) setLoading(false);
            });
        });
    } else {
      setLoading(false);
    }

    return () => { isMounted = false; };
  }, [categorySlug, templateSlug, params.slug]);

  // Determine fallback demoUrl if not found in database/mock data
  let resolvedDemoUrl = template?.demoUrl || queryUrl;
  if (!resolvedDemoUrl && categorySlug && templateSlug) {
    resolvedDemoUrl = `/templates/${categorySlug}/${templateSlug}/index.html`;
  } else if (!resolvedDemoUrl && templateSlug) {
    resolvedDemoUrl = `/templates/${templateSlug}/index.html`;
  }

  // Format title & category name
  const formattedCategory = template?.category?.name || (categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : '');
  const formattedTitle = template?.name || queryName || (templateSlug ? templateSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Template Preview');

  return (
    <TemplatePreviewWrapper
      templateTitle={formattedTitle}
      categoryName={formattedCategory}
      categorySlug={template?.category?.slug || categorySlug}
      templateSlug={template?.slug || templateSlug}
      demoUrl={resolvedDemoUrl}
      detailsUrl={template ? `/templates/${template.slug}` : (templateSlug ? `/templates/${templateSlug}` : '/templates')}
    />
  );
}
