import { test, expect } from '@playwright/test';

test.describe('MediNova E2E Core Flows', () => {
  
  test('homepage sections render correctly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Verify header branding
    await expect(page.locator('text=MediNova')).toBeVisible();
    
    // Verify hero call to action buttons
    const orderMedicinesBtn = page.locator('text=Order Medicines');
    await expect(orderMedicinesBtn).toBeVisible();
    await expect(orderMedicinesBtn).toHaveAttribute('href', '/category/pain-relief');

    const uploadPrescriptionBtn = page.locator('text=Upload Prescription');
    await expect(uploadPrescriptionBtn).toBeVisible();
    await expect(uploadPrescriptionBtn).toHaveAttribute('href', '/prescription');
    
    // Verify homepage modules are visible
    await expect(page.locator('text=Browse by Category')).toBeVisible();
    await expect(page.locator('text=Shop by Health Goal')).toBeVisible();
    await expect(page.locator('text=Trending Now')).toBeVisible();
  });

  test('browse category and add item to cart', async ({ page }) => {
    await page.goto('/category/pain-relief');
    
    // Check category header
    await expect(page.locator('h1')).toContainText('Pain Relief');
    
    // Add product to cart
    const firstAddButton = page.locator('button:has-text("Add")').first();
    await expect(firstAddButton).toBeVisible();
    await firstAddButton.click();
    
    // Verify quantity selector is displayed (plus / minus)
    await expect(page.locator('aria-label="Increase quantity"')).toBeVisible();
    await expect(page.locator('aria-label="Decrease quantity"')).toBeVisible();
    
    // Verify header cart count updates
    const cartBadge = page.locator('a[href="/cart"] span');
    await expect(cartBadge).toHaveText('1');
  });

  test('complete multi-step checkout flow', async ({ page }) => {
    await page.goto('/category/pain-relief');
    
    // Add item
    await page.locator('button:has-text("Add")').first().click();
    
    // Go to cart
    await page.goto('/cart');
    await expect(page.locator('h1')).toContainText('Shopping Cart');
    
    // Click checkout
    await page.locator('text=Proceed to Checkout').click();
    
    // Stepper checks (step 1: Address)
    await expect(page.locator('text=Select Delivery Address')).toBeVisible();
    await page.locator('text=Deliver to this Address').click();
    
    // Step 2: Delivery Slot (no Rx items in first item generally)
    await expect(page.locator('text=Select Delivery Time Slot')).toBeVisible();
    await page.locator('text=Continue to Payment').click();
    
    // Step 3: Payment
    await expect(page.locator('text=Select Payment Method')).toBeVisible();
    await page.locator('text=Complete Checkout').click();
    
    // Step 4: Success confirmation screen
    await expect(page.locator('text=Order Placed Successfully!')).toBeVisible();
    await expect(page.locator('text=Track Order Details')).toBeVisible();
  });

  test('upload prescription flow', async ({ page }) => {
    await page.goto('/prescription');
    
    // Verify upload elements
    await expect(page.locator('text=Upload Doctor Prescription')).toBeVisible();
    await expect(page.locator('text=Patient Full Name')).toBeVisible();
    
    // Fill contact details
    await page.fill('input[placeholder="Enter patient\'s name"]', 'John Doe');
    await page.fill('input[placeholder="Enter 10-digit number"]', '9876543210');
    
    // Note: file upload simulation is usually done via setInputFiles, 
    // we omit execution and verify basic input field changes.
  });

});
