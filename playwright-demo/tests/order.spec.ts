import { test, expect } from '@playwright/test';

test('customer can order a pizza', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add Margherita' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByLabel('Name').fill('Sam');
  await page.getByLabel('Phone').fill('555-0100');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
});
