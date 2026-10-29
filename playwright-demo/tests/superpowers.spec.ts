import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Network mocking: answer the menu request ourselves with a server error.
test('shows a message when the kitchen is closed', async ({ page }) => {
  await page.route('**/api/menu.json', (route) => route.fulfill({ status: 500 }));

  await page.goto('/');

  await expect(page.getByRole('alert')).toHaveText(/the kitchen is closed/);
});

// API testing: call the menu endpoint directly, no browser page needed.
test('menu API lists the Margherita', async ({ request }) => {
  const response = await request.get('/api/menu.json');

  expect(response.ok()).toBeTruthy();
  const menu = await response.json();
  expect(menu.pizzas.map((pizza) => pizza.name)).toContain('Margherita');
});

// Visual comparison: compare the menu with a saved screenshot, pixel by pixel.
// Create the saved screenshot first with: npm run visual:update
test('menu looks the same as last time', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'One browser is enough for visual checks');
  const baseline = testInfo.snapshotPath('menu.png', { kind: 'screenshot' });
  const updating = ['all', 'changed'].includes(testInfo.config.updateSnapshots);
  test.skip(!fs.existsSync(baseline) && !updating, 'No saved screenshot yet: run npm run visual:update');

  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Add Margherita' })).toBeVisible();

  await expect(page).toHaveScreenshot('menu.png');
});
