import { test, expect } from '@playwright/test';

test('App should login and verify Pricing Page', async ({ page }) => {
    // 1. Go to Login Page
    await page.goto('/login');

    // 2. Fill Login Form
    // Input uses type="text" for username/email
    await page.fill('input[placeholder="Username or Email"]', 'admin@nytvnt.dev');
    await page.fill('input[type="password"]', 'nytvnt@207');

    // Click Sign In
    await page.click('button:has-text("Authenticate")'); // Updated button text based on Login.jsx

    // 3. Wait for Dashboard (or redirect)
    await expect(page).toHaveURL('/');

    // 4. Navigate to Pricing
    await page.goto('/subscription');

    // 5. Verify Page Content
    await expect(page.locator('text=ACCESS PROTOCOLS')).toBeVisible({ timeout: 15000 });

    console.log('Successfully accessed Pricing Page as Admin');

    // 6. Verify Pricing Plans
    await expect(page.locator('text=Starter Agent')).toBeVisible();
    await expect(page.locator('text=Elite Operative')).toBeVisible();
    await expect(page.locator('text=Cyber Warlord')).toBeVisible();
});
