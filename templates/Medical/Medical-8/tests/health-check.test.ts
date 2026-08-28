import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// All routes to test based on the actual app structure
// Categories from src/data/categories.ts
const categorySlugs = [
  'pain-relief',
  'cold-allergy',
  'diabetes-care',
  'heart-care',
  'digestive-health',
  'womens-health',
  'mens-health',
  'baby-care',
  'skin-care',
  'hair-care',
  'nutrition',
  'fitness',
  'first-aid',
  'medical-devices',
  'ayurveda',
  'elder-care',
];

const routes = [
  '/',
  '/cart',
  '/checkout',
  '/prescription',
  '/health-library',
  '/lab-tests',
  '/doctors',
  '/stores',
  '/account',
  '/auth/login',
  '/auth/signup',
  // Category pages
  ...categorySlugs.map(slug => `/category/${slug}`),
];

test.describe('Health Check - 404 Detection', () => {
  test('check all routes for 404 errors', async ({ page }) => {
    const failedRoutes: { route: string; status: number; error?: string }[] = [];
    
    for (const route of routes) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        
        const status = response?.status() || 0;
        
        if (status === 404) {
          failedRoutes.push({ route, status });
          console.log(`❌ 404: ${route}`);
        } else if (status >= 500) {
          failedRoutes.push({ route, status, error: 'Server error' });
          console.log(`❌ ${status}: ${route}`);
        } else {
          console.log(`✅ ${status}: ${route}`);
        }
      } catch (error) {
        failedRoutes.push({ 
          route, 
          status: 0, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        console.log(`❌ ERROR: ${route} - ${error}`);
      }
    }
    
    // Also check API routes
    const apiRoutes = [
      '/api/placeholder/test-product',
    ];
    
    for (const route of apiRoutes) {
      try {
        const response = await page.goto(`${BASE_URL}${route}`, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        
        const status = response?.status() || 0;
        
        if (status === 404) {
          failedRoutes.push({ route, status });
          console.log(`❌ 404: ${route}`);
        } else if (status >= 500) {
          failedRoutes.push({ route, status, error: 'Server error' });
          console.log(`❌ ${status}: ${route}`);
        } else {
          console.log(`✅ ${status}: ${route}`);
        }
      } catch (error) {
        failedRoutes.push({ 
          route, 
          status: 0, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        console.log(`❌ ERROR: ${route} - ${error}`);
      }
    }
    
    // Print summary
    console.log('\n=== SUMMARY ===');
    console.log(`Total routes tested: ${routes.length + apiRoutes.length}`);
    console.log(`Failed routes: ${failedRoutes.length}`);
    
    if (failedRoutes.length > 0) {
      console.log('\nFailed routes:');
      failedRoutes.forEach(f => {
        console.log(`  ${f.route} - Status: ${f.status}${f.error ? ` - ${f.error}` : ''}`);
      });
    }
    
    // Fail the test if there are any 404s
    expect(failedRoutes.length).toBe(0);
  });
});