# Playwright demo: Tony's Pizza

A tiny pizza-ordering app for learning **Playwright** (end-to-end tests and
design screenshots) and **Playwright MCP** (letting an AI agent drive the browser).

The app is plain HTML and JavaScript with no framework, so you can focus on
Playwright. Everything here works the same way with React, Angular, Vue or any
other web app.

## What's inside

| Path | What it is |
|---|---|
| `app/` | The Tony's Pizza app: menu, cart, checkout, confirmation |
| `app/api/menu.json` | The menu the app loads (we fake this in a test) |
| `app/design/track-order.html` | A design mockup of a page that isn't built yet |
| `playwright.config.ts` | Browsers to test, the app address, and how to start the app |
| `tests/order.spec.ts` | Your first test: order a pizza |
| `tests/superpowers.spec.ts` | Network mocking, API testing, visual comparison |
| `tests/proposal-screenshots.spec.ts` | Design screenshots at 3 sizes, light and dark |
| `.vscode/mcp.json` | Adds the Playwright MCP server to VS Code |
| `solutions/` | Answers to the exercises below |

## Quick start

You need [Node.js](https://nodejs.org) 18 or newer and [VS Code](https://code.visualstudio.com).

```sh
git clone https://github.com/mailgopalv/yt-demos.git
cd yt-demos/playwright-demo
npm install
npx playwright install
npx playwright test
```

You should see all tests pass in Chromium, Firefox, WebKit and Mobile Safari.
Playwright starts the app for you (see `webServer` in `playwright.config.ts`).

To look at the app yourself: `npm start`, then open http://localhost:3000.

In VS Code, install the **Playwright Test for VSCode** extension (by Microsoft),
then open the Testing panel (the beaker icon) to run, debug and record tests.

## Useful commands

| Command | What it does |
|---|---|
| `npx playwright test` | Run every test in every browser (headless) |
| `npx playwright test --project=chromium` | Run in one browser |
| `npx playwright test --headed` | Watch the browser while tests run |
| `npx playwright test --ui` | UI mode: run tests and time-travel through each step |
| `npx playwright show-report` | Open the HTML report from the last run |
| `npx playwright codegen localhost:3000` | Record a test by clicking through the app |
| `npm run screenshots` | Save design screenshots into `screenshots/` |
| `npm run visual:update` | Save the baseline image for the visual comparison test |

## Playwright MCP

`.vscode/mcp.json` registers the Playwright MCP server:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Open this folder in VS Code and start the server from the MCP servers list (or
the Start link above the server in `mcp.json`). Then ask your AI agent
(Claude Code in VS Code, or GitHub Copilot agent mode) things like:

```text
Use the Playwright MCP to open http://localhost:3000/design/track-order.html.
Take a full-page screenshot at 1280 by 800 and another at 390 by 844.
Save them as screenshots/mcp-desktop.png and screenshots/mcp-mobile.png.
```

```text
Use the Playwright MCP to explore the checkout at http://localhost:3000.
Then write a Playwright test in tests/two-pizzas.spec.ts that orders a
Margherita and a Pepperoni, checks the cart shows 2, and checks the order
is confirmed. Use getByRole and getByLabel locators.
```

Run `npm start` first so the app is up at http://localhost:3000.

**Rule of thumb:** use MCP to explore, reproduce bugs and draft tests. Keep
Playwright tests for anything that should run on every change: they're fast,
repeatable, and need no AI.

## Cheat sheet: why Playwright

The numbers match the badges in the video.

**Runs everywhere**
- 1 · Real browsers: Chromium (Chrome, Edge), Firefox, WebKit (Safari's engine)
- 2 · Your language: TypeScript/JavaScript, Python, Java, .NET
- 3 · Free and open source (by Microsoft)
- 14 · Phone and device emulation: screen size, touch, dark mode, locale, time zone
- 19 · CI-ready: headless by default, GitHub Actions workflow in one step

**Easy to write**
- 4 · Record instead of writing (codegen / Record new)
- 5 · VS Code extension: run, debug, pick locators
- 6 · User-facing locators: `getByRole`, `getByLabel`, `getByText`, `getByTestId`
- 10 · Starts your app for you (`webServer`)

**Stable**
- 7 · Auto-waiting: no `sleep()` calls
- 8 · Retrying assertions: `expect` keeps checking for a few seconds
- 9 · Isolated, parallel tests: a fresh browser context per test
- 15 · Network mocking: `page.route()` fakes any request
- 18 · Log in once and reuse it (`storageState`)

**Easy to debug**
- 11 · UI mode: time travel through every step
- 12 · Trace viewer: DOM, network and console for each step, even from CI
- 13 · Screenshots, videos and an HTML report on failure
- 16 · Visual comparison: `toHaveScreenshot()`
- 17 · API testing in the same tool (`request`)

**Beyond tests**
- 20 · Design proposal screenshots at every screen size
- 21 · Playwright MCP: an AI agent drives a real browser using the page structure
- 22 · Draft tests with AI, then keep them as fast tests that need no AI

## Every test has the same shape

```ts
test('customer can order a pizza', async ({ page }) => {
  await page.goto('/');                                             // go somewhere
  await page.getByRole('button', { name: 'Add Margherita' }).click(); // do something
  await expect(page.getByTestId('cart-count')).toHaveText('1');      // expect something
});
```

Pick locators in this order: `getByRole` → `getByLabel` → `getByText` →
`getByTestId`. They find things the way a person (or a screen reader) does, so
tests survive restyling.

## Exercises

Copy a solution into `tests/` only after you've tried it yourself.

1. **Remove a pizza.** Add two pizzas, remove one, and check the cart count
   and total. Hint: the cart has "Remove Margherita" buttons.
   (`solutions/remove-from-cart.spec.ts`)
2. **More screen sizes.** Add a 1920×1080 desktop and a Pixel 7 phone
   (412×915) to `tests/proposal-screenshots.spec.ts`.
3. **One browser at a time.** Run only Firefox, then only Mobile Safari.
   Hint: `--project`.
4. **A slow menu.** Use `page.route()` to delay the menu by 2 seconds and
   check that "Loading menu..." appears. (`solutions/slow-menu.spec.ts`)
5. **Find the planted bug.** Ask your AI agent to use the Playwright MCP to
   try checking out in unusual ways. Hint: what happens with no name? Write a
   test that fails because of the bug, then fix the app so it passes.
   (`solutions/empty-name.spec.ts`)

## Learn more

- Playwright docs: https://playwright.dev
- Playwright MCP: https://github.com/microsoft/playwright-mcp
