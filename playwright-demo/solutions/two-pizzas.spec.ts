// Reference copy of the test the AI agent writes in the video (chapter 14).
import { test, expect } from '@playwright/test';

test('orders a Margherita and a Pepperoni', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add Margherita' }).click();
  await page.getByRole('button', { name: 'Add Pepperoni' }).click();

  // The cart count badge has no role of its own, so check it via the banner.
  await expect(page.getByRole('banner')).toContainText('Cart 2');
  await expect(page.getByRole('complementary').getByRole('listitem')).toHaveCount(2);

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByLabel('Name').fill('Sam');
  await page.getByLabel('Phone').fill('555-0100');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
  await expect(page.getByText('Thanks, Sam! Order #1001 (2 pizzas)')).toBeVisible();
});
