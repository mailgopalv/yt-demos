// Exercise 4: make the menu slow and check the loading message.
import { test, expect } from '@playwright/test';

test('shows a loading message while the menu is slow', async ({ page }) => {
  await page.route('**/api/menu.json', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.continue();
  });

  await page.goto('/');

  await expect(page.getByRole('status')).toHaveText('Loading menu...');
  await expect(page.getByRole('button', { name: 'Add Margherita' })).toBeVisible();
});
