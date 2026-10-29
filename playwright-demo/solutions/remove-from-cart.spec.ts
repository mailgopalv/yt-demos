// Exercise 1: remove a pizza from the cart.
import { test, expect } from '@playwright/test';

test('customer can remove a pizza from the cart', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Add Margherita' }).click();
  await page.getByRole('button', { name: 'Add Pepperoni' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('2');

  await page.getByRole('button', { name: 'Remove Margherita' }).click();

  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await expect(page.getByTestId('cart-total')).toHaveText('$13');
});
