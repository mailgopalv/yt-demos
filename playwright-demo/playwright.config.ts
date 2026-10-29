import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /proposal-screenshots/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /proposal-screenshots/ },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] }, testIgnore: /proposal-screenshots/ },
  ],

  webServer: {
    command: 'npx serve app -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
