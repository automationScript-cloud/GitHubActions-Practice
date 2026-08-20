import { test } from '@playwright/test';
import { LeadsPage, LeadData } from '../pages/LeadsPage';
import { LoginPage } from '../pages/LoginPage';

test('create a lead with contact and qualification details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leadsPage = new LeadsPage(page);
  const uniqueId = Date.now();
  const lead: LeadData = {
    firstName: `Playwright ${uniqueId}`,
    lastName: `Lead ${uniqueId}`,
    company: `Playwright Company ${uniqueId}`,
    email: `lead-${uniqueId}@example.com`,
    phone: '5550101234',
    leadSource: 'Web Site',
    leadStatus: 'Not Contacted',
  };

  await test.step('Log in to vTiger CRM', async () => {
    await loginPage.open();
    await loginPage.login('admin', process.env.VTIGER_PASS ?? 'admin');
    await loginPage.expectDashboard();
  });

  await test.step('Open the Leads create form', async () => {
    await leadsPage.open();
    await leadsPage.openNewLead();
  });

  await test.step('Fill and save the lead', async () => {
    await leadsPage.createLead(lead);
  });

  await test.step('Verify the created lead details', async () => {
    await leadsPage.expectLeadDetails(lead);
  });
});