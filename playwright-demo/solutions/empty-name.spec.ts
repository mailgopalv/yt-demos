// Exercise 5: the planted bug. An order goes through with no name.
// This test FAILS on the original app. Make it pass by fixing the app
// (hint: look at the Name input in app/index.html).
import { test, expect } from '@playwright/test';

test('an order needs a name', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add Margherita' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByLabel('Phone').fill('555-0100');
  await page.getByRole('button', { name: 'Place order' }).click();

  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeHidden();
});
