import React from 'react';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { CategoryPageClient } from './CategoryPageClient';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} Essentials — MediNova Pharmacy`,
    description: category.description,
    openGraph: {
      title: `${category.name} | MediNova Pharmacy`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Get products of this category
  const products = getProductsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-brand-bg py-6 sm:py-10">
      <div className="container-page">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-navy-400 font-semibold mb-6">
          <Link href="/" className="hover:text-mint-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-navy-300" />
          <span className="text-navy-700">{category.name}</span>
        </div>

        {/* Header Block */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-1.5 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Client Interactive Filtering Grid */}
        <CategoryPageClient 
          category={category} 
          initialProducts={products} 
        />
      </div>
    </div>
  );
}
