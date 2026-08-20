import { test } from '../fixtures/PageFixtures';
import scenario1Data from '../testdata/scenario1data.json';

test.describe('Scenario 1 - Shopping flow', () => {
  test('TC-SHOP-01 - search and select product via auto-suggestion', async ({ homePage, searchResultPage }) => {
    await test.step('Launch Amazon and dismiss optional prompts', async () => {
      await homePage.open();
    });

    await test.step('Search and select the waterproof Boat speaker suggestion', async () => {
      await homePage.searchFromSuggestion(scenario1Data.searchTerm, scenario1Data.suggestion);
    });

    await test.step('Verify matching Boat speaker results are displayed', async () => {
      await searchResultPage.expectBoatSpeakerResults();
    });
  });
});