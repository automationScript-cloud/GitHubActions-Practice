import { expect, Page } from '@playwright/test';

export type LeadData = {
  firstName?: string;
  lastName: string;
  company: string;
  phone?: string;
  mobile?: string;
  title?: string;
  fax?: string;
  leadSource?: string;
  email?: string;
  industry?: string;
  website?: string;
  annualRevenue?: string;
  leadStatus?: string;
  employees?: string;
  rating?: string;
  secondaryEmail?: string;
  street?: string;
  poBox?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  state?: string;
  description?: string;
};

export class LeadsPage {
  constructor(readonly page: Page) {}

  async open(): Promise<void> {
    const baseUrl = 'http://localhost:8888/';
    await this.page.goto(`${baseUrl}index.php?action=ListView&module=Leads&parenttab=Marketing`);
    await expect(this.page).toHaveURL(/action=ListView&module=Leads/);
  }

  async openNewLead(): Promise<void> {
    await this.page.getByRole('link', { name: 'Create Lead...' }).click();
    await expect(this.page.getByText('Creating New Lead')).toBeVisible();
  }

  async fillLead(data: LeadData): Promise<void> {
    const values: Record<string, string | undefined> = {
      firstname: data.firstName,
      lastname: data.lastName,
      company: data.company,
      phone: data.phone,
      mobile: data.mobile,
      title: data.title,
      fax: data.fax,
      email: data.email,
      website: data.website,
      annualrevenue: data.annualRevenue,
      noofemployees: data.employees,
      secondaryemail: data.secondaryEmail,
      lane: data.street,
      pobox: data.poBox,
      code: data.postalCode,
      city: data.city,
      country: data.country,
      state: data.state,
      description: data.description,
    };

    for (const [name, value] of Object.entries(values)) {
      if (value !== undefined) {
        await this.page.locator(`input[name="${name}"], textarea[name="${name}"]`).fill(value);
      }
    }

    const selects: Record<string, string | undefined> = {
      leadsource: data.leadSource,
      industry: data.industry,
      leadstatus: data.leadStatus,
      rating: data.rating,
    };
    for (const [name, value] of Object.entries(selects)) {
      if (value !== undefined) {
        await this.page.locator(`select[name="${name}"]`).selectOption({ label: value });
      }
    }
  }

  async save(): Promise<void> {
    await this.page.locator('input[type="submit"][value*="Save"]').first().click();
  }

  async createLead(data: LeadData): Promise<void> {
    await this.fillLead(data);
    await this.save();
  }

  async expectDetail(data: Pick<LeadData, 'lastName' | 'company'>): Promise<void> {
    await expect(this.page).toHaveURL(/action=DetailView&module=Leads&record=/);
    await expect(this.page.locator('#dtlview_Last\\ Name')).toHaveText(data.lastName);
    await expect(this.page.locator('#dtlview_Company')).toHaveText(data.company);
  }

  async expectLeadDetails(data: LeadData): Promise<void> {
    await this.expectDetail(data);
    const detailValues: Record<string, string | undefined> = {
      'First Name': data.firstName,
      Email: data.email,
      Phone: data.phone,
      'Lead Source': data.leadSource,
      'Lead Status': data.leadStatus,
    };

    for (const [field, value] of Object.entries(detailValues)) {
      if (value !== undefined) {
        await expect(this.page.locator(`[id="dtlview_${field}"]`)).toHaveText(value);
      }
    }
  }

  async expectLeadInList(data: Pick<LeadData, 'lastName' | 'company'>): Promise<void> {
    await this.search(data.lastName);
    const row = this.page.locator('tr').filter({ hasText: data.lastName });
    await expect(row).toContainText(data.company);
  }

  async openEdit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Edit' }).first().click();
    await expect(this.page.getByText('Lead Information')).toBeVisible();
  }

  async delete(): Promise<void> {
    this.page.once('dialog', dialog => dialog.accept());
    await this.page.getByRole('button', { name: 'Delete' }).first().click();
    await expect(this.page).toHaveURL(/module=Leads/);
  }

  async search(lastName: string): Promise<void> {
    await this.open();
    await this.page.getByRole('textbox').nth(1).fill(lastName);
    await this.page.locator('select[name="search_field"]').selectOption({ label: 'Last Name' });
    await this.page.getByRole('button', { name: 'Search Now' }).click();
  }

  async convert(): Promise<void> {
    await this.page.getByRole('link', { name: 'Convert Lead' }).click();
    const dialog = this.page.locator('#orgLay');
    await expect(dialog).toContainText('Convert Lead');
    await dialog.getByRole('button', { name: 'Save' }).click();
  }
}