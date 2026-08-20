Playwright MCP Context — Vtiger CRM Automation
Use this file as project context whenever generating or editing Playwright
scripts via the MCP server (`browser_navigate`, `browser_snapshot`,
`browser_click`, `browser_type`, etc.). Paste this into chat before asking
for a new test, or reference it as `#file:vtiger-playwright-context.md`.
Application under test
Name: Vtiger CRM (on-prem/local install)
Base URL: `http://localhost:8888/`
Login page: `http://localhost:8888/index.php`
Stack: Playwright + TypeScript, `@playwright/test` runner
Actual project setup (already configured — don't regenerate these)
`package.json`: `"type": "module"` → this is an ESM project. All
relative imports inside `.ts` files must include the `.js` extension
(e.g. `import { BasePage } from "../pages/BasePage.js";`), even though
the source file is `.ts` — this is required by `NodeNext` module
resolution.
`tsconfig.json`: `target: ES2022`, `module: NodeNext`,
`moduleResolution: NodeNext`, `strict: true`, `strictNullChecks: true`,
`noImplicitAny: true`. Generated code must be strict-mode clean — no
implicit `any`, no unchecked nulls.
Reporting: Allure is installed (`allure-playwright`,
`allure-commandline`) alongside the built-in `html`/`list` reporters.
Don't suggest switching reporters; Allure is already wired into
`playwright_config.ts`.
Existing `playwright_config.ts` settings to respect (don't overwrite
unless asked):
`testDir: './tests'`, `fullyParallel: true`
`timeout: 600000` (10 min per test — generous, so don't add extra
manual waits to "be safe")
`retries: 2`
`use.headless: false`, `screenshot: 'only-on-failure'`,
`video: 'retain-on-failure'`, `trace: 'retain-on-failure'`
`use.actionTimeout: 30000`, `use.navigationTimeout: 60000`
`projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }]`
`outputDir: 'test-results'`
Missing and should be added when generating/updating config:
`use.baseURL` is not currently set — set it from `utils/config.ts`
(`config.baseUrl`), not a hardcoded string, so specs can use relative
`page.goto('/index.php')` instead of full URLs.
Project structure (Page Object Model)
No `.env` / `dotenv`. Config values (base URL, credentials, timeouts) live
in a plain TypeScript config object and test input data lives in JSON
files under `testData/`.
```
/tests
  /e2e
    login.spec.ts
    leads.spec.ts
    contacts.spec.ts
    accounts.spec.ts
    opportunities.spec.ts
/pages
  BasePage.ts
  LoginPage.ts
  LeadsPage.ts
  ContactsPage.ts
  AccountsPage.ts
  OpportunitiesPage.ts
/fixtures
  test-base.ts          # extends @playwright/test with custom fixtures (page objects, auth)
  auth.fixture.ts        # logs in via UI once per project, provides storageState
/testData
  users.json
  leads.json
  contacts.json
  accounts.json
  opportunities.json
/utils
  config.ts              # baseUrl/credentials constants (no dotenv)
  test-data-reader.ts     # generic JSON loader
  wait-helpers.ts         # generic wait/retry helpers
  data-generator.ts       # generic unique-value/random-data helpers
playwright_config.ts
package.json
tsconfig.json
```
Config (no `.env`)
```ts
// utils/config.ts
export const config = {
  baseUrl: "http://localhost:8888/",
  credentials: {
    admin: { username: "admin", password: "admin123" },
  },
  timeouts: {
    default: 10_000,
    navigation: 30_000,
  },
};
```
Test data (JSON, not hardcoded in specs)
All record input data (leads, contacts, accounts, opportunities, login
users) lives in `/testData/*.json` and is loaded through a generic reader
in `utils/test-data-reader.ts`. Specs never inline literal field values.
```ts
// utils/test-data-reader.ts
import fs from "fs";
import path from "path";

export function readTestData<T>(fileName: string): T {
  const filePath = path.join(__dirname, "..", "testData", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
```
Example `testData/leads.json`:
```json
{
  "validLead": {
    "lastName": "Sharma",
    "company": "QA Test Company",
    "email": "qa.lead@example.com",
    "phone": "9876543210",
    "leadSource": "Website",
    "leadStatus": "New"
  },
  "invalidLead": { "lastName": "", "company": "" }
}
```
Example `testData/users.json`:
```json
{
  "admin": { "username": "admin", "password": "admin123" },
  "invalidUser": { "username": "admin", "password": "wrongpass" }
}
```
Fixtures (custom, extending base test)
```ts
// fixtures/test-base.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { LeadsPage } from "../pages/LeadsPage.js";
import { ContactsPage } from "../pages/ContactsPage.js";
import { AccountsPage } from "../pages/AccountsPage.js";
import { OpportunitiesPage } from "../pages/OpportunitiesPage.js";

type Fixtures = {
  loginPage: LoginPage;
  leadsPage: LeadsPage;
  contactsPage: ContactsPage;
  accountsPage: AccountsPage;
  opportunitiesPage: OpportunitiesPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  leadsPage: async ({ page }, use) => use(new LeadsPage(page)),
  contactsPage: async ({ page }, use) => use(new ContactsPage(page)),
  accountsPage: async ({ page }, use) => use(new AccountsPage(page)),
  opportunitiesPage: async ({ page }, use) => use(new OpportunitiesPage(page)),
});

export { expect } from "@playwright/test";
```
```ts
// fixtures/auth.fixture.ts
import { test as base, chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { readTestData } from "../utils/test-data-reader.js";
import { config } from "../utils/config.js";

const AUTH_FILE = "playwright/.auth/user.json";

export const test = base.extend({
  storageState: async ({}, use) => {
    const users = readTestData<any>("users.json");
    const browser = await chromium.launch();
    const context = await browser.newContext({ baseURL: config.baseUrl });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(users.admin.username, users.admin.password);
    await context.storageState({ path: AUTH_FILE });
    await browser.close();
    await use(AUTH_FILE);
  },
});
```
> Note the `.js` extension on every relative import above — required
> because this project is ESM (`"type": "module"` + `NodeNext`).
Pages (BasePage + generic reusable methods)
```ts
// pages/BasePage.ts
import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async selectDropdown(locator: Locator, optionLabel: string) {
    await locator.selectOption({ label: optionLabel });
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? "";
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async waitForToast(expectedText: string) {
    const toast = this.page.getByText(expectedText).first();
    await expect(toast).toBeVisible();
  }

  async waitForUrlContains(fragment: string) {
    await this.page.waitForURL(new RegExp(fragment));
  }
}
```
Example concrete page object:
```ts
// pages/LeadsPage.ts
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class LeadsPage extends BasePage {
  private addRecordBtn = () => this.page.getByRole("link", { name: "+ Add Record" });
  private lastNameField = () => this.page.getByLabel("Last Name");
  private companyField = () => this.page.getByLabel("Company Name");
  private saveBtn = () => this.page.getByRole("button", { name: "Save" });

  constructor(page: Page) {
    super(page);
  }

  async openNewLeadForm() {
    await this.click(this.addRecordBtn());
  }

  async createLead(data: { lastName: string; company: string }) {
    await this.fill(this.lastNameField(), data.lastName);
    await this.fill(this.companyField(), data.company);
    await this.click(this.saveBtn());
  }
}
```
Vtiger CRM structure to know (module map)
Leads — `index.php?module=Leads&view=List`
Contacts — `index.php?module=Contacts&view=List`
Accounts — `index.php?module=Accounts&view=List`
Opportunities — `index.php?module=Potentials&view=List`
Calendar/Activities — `index.php?module=Calendar&view=index`
Record creation is generally reached via a module's list view → "+ Add
Record" button, opening a modal/edit form.
Vtiger's DOM is jQuery/legacy-style: prefer role- and text-based
locators over brittle CSS classes.
Locator conventions (in priority order)
`getByRole()` with accessible name
`getByLabel()` for form fields with a `<label>`
`getByText()` for static UI text
`getByTestId()` only if `data-testid` attributes are confirmed present
CSS/XPath as a last resort, only after confirming via `browser_snapshot`
Important for MCP-generated scripts: always use `browser_snapshot`
first to confirm real element refs/roles before writing the final
locator — do not hallucinate selectors.
Utils (generic, reusable across all page objects/specs)
`utils/config.ts` — baseUrl, credentials, timeouts (no `.env`)
`utils/test-data-reader.ts` — generic JSON loader
`utils/wait-helpers.ts` — generic explicit-wait/retry helpers
`utils/data-generator.ts` — generic unique-value helpers, e.g.
`uniqueName(prefix: string)` → `${prefix}-${Date.now()}`
Test writing conventions
One `test.describe` block per module
Import `test`/`expect` from `fixtures/test-base.ts`, not directly from
`@playwright/test`
Use `test.step()` for readable stages (Navigate → Fill → Save → Assert)
— these show up as steps in the Allure report too
Pull all input values from `testData/*.json` via `readTestData()`
Prefer auto-waiting locators / `expect.poll` over manual
`waitForTimeout` — remember `actionTimeout`/`navigationTimeout` are
already generous (30s/60s) in `playwright_config.ts`
Each spec cleans up any record it creates (afterEach) to keep CRM data
clean across the 2 configured retries
Use `utils/data-generator.ts`'s `uniqueName()` for fields that must be
unique per run (e.g., Company Name)
All relative imports need `.js` extensions (ESM project)
Running tests & reports
```bash
npx playwright test                # runs per playwright_config.ts
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```
Example task prompt template
> "Using the Vtiger CRM context, log in via the `auth` fixture, go to the
> Leads module, create a new lead using `testData/leads.json`'s
> `validLead` entry with a unique company name from
> `utils/data-generator.ts`, save it, and assert it appears in the Leads
> list. Follow the POM structure, fixtures, ESM import style, and locator
> conventions in vtiger-playwright-context.md. Output a `leads.spec.ts`
> file plus any new methods needed in `LeadsPage.ts`."
What NOT to do
Don't use `.env` / `dotenv` / `process.env` — config comes from
`utils/config.ts`, test input from `testData/*.json`
Don't hardcode field values inside spec files — load from
`testData/*.json`
Don't duplicate common actions inside individual page classes — put
them once in `pages/BasePage.ts`
Don't forget `.js` extensions on relative imports (ESM project)
Don't overwrite the existing Allure/reporter/timeout settings in
`playwright_config.ts` — only add `use.baseURL` if missing
Don't assume Vtiger's field IDs — confirm via `browser_snapshot`
Don't skip the `auth` fixture "for speed"