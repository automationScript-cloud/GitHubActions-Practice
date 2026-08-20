import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectBoatSpeakerResults(): Promise<void> {
    await expect(this.page).toHaveURL(/\/s\?/);
    // NOTE: verify against live DOM
    await expect(this.page).toHaveURL(/k=boat(?:\+|%20)speakers(?:\+|%20)waterproof/i);
    // NOTE: verify against live DOM
    await this.expectVisible(this.page.locator('[data-component-type="s-search-result"]').first());
  }
}