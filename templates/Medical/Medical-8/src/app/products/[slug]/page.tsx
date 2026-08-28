import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { ProductDetailClient } from './ProductDetailClient';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — Order Online`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | MediNova Pharmacy`,
      description: product.shortDescription,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, exclude current)
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.imageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.salePrice,
      priceCurrency: 'INR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="min-h-screen bg-brand-bg py-6 sm:py-10">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-page">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-navy-500 hover:text-mint-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Client Product Layout (handles state, image switching, cart interaction) */}
        <ProductDetailClient product={product} />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <ProductCarousel
              title="Related Products"
              description="Similar health and wellness items chosen for you"
              products={relatedProducts}
            />
          </div>
        )}

        {/* Clinical Disclaimer Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-navy-50 rounded-2xl p-6 border border-brand-border text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
                Medical Disclaimer & Verification
              </h4>
              <p className="text-xs text-navy-500 leading-relaxed">
                The information provided above is based on official manufacturer details and clinical databases. It is intended for general understanding only and must not replace professional medical advice, diagnosis, or treatment. Always consult a qualified physician or healthcare specialist before starting, changing, or stopping any healthcare regimen or medication. MediNova does not assume liability for self-medication decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
