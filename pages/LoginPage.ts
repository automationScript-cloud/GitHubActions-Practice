import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto('http://localhost:8888/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('input[name="user_name"]').fill(username);
    await this.page.locator('input[name="user_password"]').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/index\.php\?action=index&module=Home/);
    await expect(this.page.getByText('Home Page Dashboard')).toBeVisible();
  }

  async expectLoggedInUser(displayName: string): Promise<void> {
    await expect(this.page.getByText(displayName, { exact: true })).toBeVisible();
  }

  async logout(displayName: string): Promise<void> {
    await expect(this.page.getByText(displayName, { exact: true })).toBeVisible();
    const profileMenu = this.page.locator('td[onmouseover*="usersettings"]');
    await profileMenu.hover();
    const signOut = this.page.getByText('Sign Out', { exact: true });
    await signOut.click({ force: true });
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/index\.php.*(?:Login|login)?/);
    await expect(this.page.locator('input[name="user_name"]')).toBeVisible();
    await expect(this.page.locator('input[name="user_password"]')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }
}
