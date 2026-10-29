// Reference copy of the test the AI agent writes in the video (chapter 14).
import { test, expect } from '@playwright/test';

test('customer can order two pizzas', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add Margherita' }).click();
  await page.getByRole('button', { name: 'Add Pepperoni' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('2');
  await expect(page.getByTestId('cart-total')).toHaveText('$25');

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByLabel('Name').fill('Sam');
  await page.getByLabel('Phone').fill('555-0100');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
  await expect(page.getByText('2 pizzas')).toBeVisible();
});
