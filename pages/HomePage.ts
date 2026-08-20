import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.amazon.com/');
    await this.dismissOptionalPrompt();
  }

  async searchFromSuggestion(searchTerm: string, suggestion: string): Promise<void> {
    // NOTE: verify against live DOM
    const searchBox = this.page.getByRole('searchbox', { name: 'Search Amazon' });
    await this.fill(searchBox, searchTerm);
    // NOTE: verify against live DOM
    await this.click(this.page.getByRole('row', { name: suggestion, exact: true }));
  }
}