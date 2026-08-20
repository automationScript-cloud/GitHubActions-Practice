# Playwright MCP Context — Amazon Shopping Flow Automation

Use this file as project context whenever generating or editing Playwright
scripts via the MCP server (`browser_navigate`, `browser_snapshot`,
`browser_click`, `browser_type`, etc.). Paste this into chat before asking
for a new test, or reference it as `#file:amazon-playwright-context.md`.

## Application under test
- Name: Amazon.com (public production site — real, live site)
- Base URL: `https://www.amazon.com/`
- Stack: Playwright + TypeScript, `@playwright/test` runner, npm, ESM
  (`"type": "module"` — all relative imports need a `.ts`/`.js`
  extension, e.g. `from "../pages/HomePage.ts"`)

## ⚠️ Hard safety rules (never violate when generating scripts)
- **Never place a real order.** Every checkout flow must stop at the
  Order Review/Confirmation page. `CheckoutPage.ts` must never get a
  "place order" method/locator — don't add one even if asked indirectly.
- **Never bypass CAPTCHA, OTP, or any Amazon security challenge.** If one
  appears, the test should fail/skip with a clear message, not work
  around it.
- **Never commit real credentials.** `testdata/scenario1data.json` holds
  `email`/`password` fields — these must stay placeholder values in the
  repo. Real test-account creds go in locally only
  (`git update-index --skip-worktree testdata/scenario1data.json`, or
  move them to a separate gitignored file). Never hardcode credentials
  directly in a spec file.

## Actual project structure (already in place — extend, don't restructure)
```
amazon-project/
├── pages/
│   ├── BasePage.ts          # generic click/fill/hover/getText/scroll helpers
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SearchResultPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts       # no place-order method, by design
├── fixtures/
│   └── PageFixtures.ts       # custom test extend injecting all page objects
├── testdata/
│   └── scenario1data.json    # placeholder creds + shipping/product data
├── tests/
│   └── shoppingFlow.spec.ts  # Scenario 1 (add cartValidation.spec.ts for Scenario 2)
├── utils/
│   └── config.ts             # baseUrl/timeouts (no .env)
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Fixtures (`fixtures/PageFixtures.ts`)
Every spec imports `test`/`expect` from here, **not** directly from
`@playwright/test`, so all page objects are available as fixtures:

```ts
import { test } from "../fixtures/PageFixtures.ts";
import { expect } from "@playwright/test";

test("...", async ({ page, loginPage, homePage, cartPage, searchResultPage, productDetailsPage, checkoutPage }) => {
  // ...
});
```

When adding a new page object, register it in `PageFixtures.ts`'s
`Pages` type and `test.extend<Pages>({...})` block — specs should never
manually do `new SomePage(page)`.

## Test data (`testdata/*.json`)
- One JSON file per scenario (`scenario1data.json`, `scenario2data.json`,
  etc.), imported with `with { type: 'json' }`:
  ```ts
  import scenario1Data from "../testdata/scenario1data.json" with { type: 'json' };
  ```
- No `.env`. Config (baseUrl, timeouts) stays in `utils/config.ts`; only
  scenario-specific input data (search terms, shipping address, expected
  values, credentials) goes in `testdata/`.
- Specs read every value from the JSON object — never inline literals
  like a product name or zip code directly in a spec file.

## Page objects (BasePage + generic reusable methods)
- `pages/BasePage.ts` owns generic actions (`click`, `fill`, `hover`,
  `getText`, `scrollIntoView`, `isVisible`, `goto`, `closePage`) — every
  page class extends it and only adds its own locators + named,
  intention-revealing methods (`clickOnAddToCartButton`,
  `verifyProductQty`, etc.), not raw Playwright calls.
- Public getters (like `cartPage.product`) are used when a spec needs to
  assert directly on a locator (`expect(cartPage.product).toBeVisible()`)
  rather than through a wrapped method.
- `CheckoutPage.ts` intentionally exposes no final-submit method — don't
  add one, even if a new scenario seems to need it.

## Locator conventions (in priority order)
Amazon's DOM is large, dynamic, and A/B-tested — brittle CSS/XPath breaks
often. Prefer, in order:
1. `getByRole()` with accessible name
2. `getByLabel()` / `getByPlaceholder()` for form fields
3. `getByText()` for stable visible text ("Add to Cart", "Proceed to checkout")
4. Amazon's known-stable ids (`#twotabsearchtextbox`, `#nav-cart`,
   `#add-to-cart-button`, `#ap_email`, `#ap_password`,
   `#address-ui-widgets-*`) — still confirm via `browser_snapshot` before
   trusting, since markup varies by region/account/experiment
5. CSS/XPath as a last resort, only after confirming via `browser_snapshot`

**Every locator in this project is marked `// NOTE: verify against live
DOM`.** When generating new page-object code, keep that convention and
don't assume a selector is correct without checking it live first.

## Test writing conventions
- One `test.describe`/spec file per scenario, under `tests/`
- Use `test.beforeEach` for the shared "launch browser, dismiss the
  location/continue-shopping banner" setup (see `HomePage.openBrowser()`
  + `clickOnShoppingContinueButton()`), and `test.afterAll` for
  `homePage.closePage()`
- Prefer `expect(locator).toBeVisible()` / auto-waiting locators over
  `page.waitForTimeout()` — the current spec still has hard waits from
  the original script; new tests should not add more, and existing ones
  should be migrated when touched
- Assertions check actual values (`toContain`, `toBe`), not just presence
- Keep scenarios independent: `cartValidation`-style specs should not
  assume `shoppingFlow.spec.ts` ran first — re-add the product if needed

## Config (`utils/config.ts`, `playwright.config.ts`)
- `utils/config.ts`: plain TS object — `baseUrl`, `timeouts` — no dotenv
- `playwright.config.ts`: `reporter: [['html'], ['list']]`,
  `use.baseURL` from `config.baseUrl`, `screenshot: 'only-on-failure'`,
  `video: 'retain-on-failure'`, `trace: 'retain-on-failure'`,
  `headless: false`, single `chromium` project

## Example task prompt template
> "Using amazon-playwright-context.md, implement Scenario 2 (Cart
> Quantity & Remove Product Validation) as `tests/cartValidation.spec.ts`,
> importing `test`/`expect` from `fixtures/PageFixtures.ts` and data from
> a new `testdata/scenario2data.json`. Use `browser_snapshot` to confirm
> real Amazon selectors before adding any new `CartPage.ts` methods.
> Don't touch `CheckoutPage.ts`."

## What NOT to do
- Don't add a place-order method/locator to `CheckoutPage.ts`
- Don't attempt to detect-and-solve CAPTCHA/OTP
- Don't put real credentials in `testdata/*.json` in the repo
- Don't bypass `fixtures/PageFixtures.ts` by constructing page objects
  manually inside a spec
- Don't hardcode scenario data inline in a spec — add/extend the
  matching `testdata/*.json` file instead
- Don't assume Amazon's selectors from memory — confirm via
  `browser_snapshot` each time
- Don't restructure the existing folders (`pages/`, `fixtures/`,
  `testdata/`, `tests/`, `utils/`) — extend within them