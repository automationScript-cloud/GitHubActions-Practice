import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login with valid admin credentials displays the vTiger home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = 'admin';
  const password = 'admin';

  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.expectDashboard();
  await loginPage.expectLoggedInUser('Administrator');
});