import { test } from '@playwright/test';

// Design proposal screenshots: one picture per screen size, light and dark.
const screens = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'phone', width: 390, height: 844 },
];

const themes = ['light', 'dark'] as const;

for (const screen of screens) {
  for (const theme of themes) {
    test(`track-order proposal: ${screen.name}, ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: screen.width, height: screen.height });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/design/track-order.html');

      await page.screenshot({
        path: `screenshots/track-order-${screen.name}-${theme}.png`,
        fullPage: true,
      });
    });
  }
}
