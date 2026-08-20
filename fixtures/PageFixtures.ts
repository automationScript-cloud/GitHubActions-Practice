import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';

type Pages = {
  homePage: HomePage;
  searchResultPage: SearchResultPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  searchResultPage: async ({ page }, use) => use(new SearchResultPage(page)),
});

export { expect } from '@playwright/test';