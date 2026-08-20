import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async dismissOptionalPrompt(): Promise<void> {
    // NOTE: verify against live DOM
    const continueButton = this.page.getByRole('button', { name: /continue shopping|stay on amazon/i });
    if (await continueButton.isVisible().catch(() => false)) {
      await continueButton.click();
      return;
    }

    // NOTE: verify against live DOM
    const internationalPrompt = this.page
      .getByRole('alertdialog')
      .filter({ hasText: /We're showing you items that ship to/i });
    if (await internationalPrompt.isVisible().catch(() => false)) {
      await internationalPrompt.getByRole('button', { name: 'Submit' }).first().click();
    }
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}