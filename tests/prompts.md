# Playwright MCP Automation Test Prompts - vTiger CRM

Application URL: http://localhost:8888/

Technology: Playwright + TypeScript

Automation Tool: Playwright MCP

Framework: Playwright Test

Architecture: No POM

Important:
- Do not use Page Object Model.
- Do not create separate Page Object files.
- Keep the complete test directly inside the `.spec.ts` file.
- First inspect the application using Playwright MCP.
- Use actual locators discovered from the application.
- Do not invent locators.
- Do not use unnecessary XPath.
- Do not use `waitForTimeout()`.
- Use Playwright auto-waiting.
- Use `expect()` for validations.
- Generate executable TypeScript code.


## Prompt 1: Login Functionality

Generate a Playwright test for the following scenario:

1. Navigate to http://localhost:8888/
2. Enter username "admin"
3. Enter the valid password
4. Click on the Login button
5. Verify that the user is successfully logged in
6. Verify that the vTiger CRM home page is displayed


## Prompt 2: Invalid Login

Generate a Playwright test for the following scenario:

1. Navigate to http://localhost:8888/
2. Enter an invalid username
3. Enter an invalid password
4. Click on the Login button
5. Verify that the user is not logged in
6. Verify that the appropriate error message is displayed


## Prompt 3: Logout Functionality

Generate a Playwright test for the following scenario:

1. Navigate to http://localhost:8888/
2. Login with valid credentials
3. Verify that the home page is displayed
4. Click on the user/profile menu
5. Click on Logout or Sign Out
6. Verify that the login page is displayed


## Prompt 4: Create Lead

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Leads module
3. Click on Create Lead
4. Enter First Name
5. Enter Last Name
6. Enter Company Name
7. Enter Email
8. Enter Phone Number
9. Select Lead Source
10. Select Lead Status
11. Click on Save
12. Verify that the Lead is created successfully
13. Verify the created Lead details


## Prompt 5: Search Lead

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Leads module
3. Search for an existing Lead
4. Enter the Lead name in the search field
5. Click on Search
6. Verify that the correct Lead is displayed
7. Open the Lead
8. Verify the Lead details


## Prompt 6: Edit Lead

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Leads module
3. Search for an existing Lead
4. Open the Lead
5. Click on Edit
6. Update the Company Name
7. Update the Phone Number
8. Click on Save
9. Verify that the Lead is updated successfully
10. Verify the updated information


## Prompt 7: Delete Lead

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Leads module
3. Search for an existing test Lead
4. Select the Lead
5. Click on Delete
6. Handle the confirmation popup if displayed
7. Confirm the deletion
8. Verify that the Lead is deleted successfully
9. Search for the deleted Lead
10. Verify that the Lead is no longer displayed


## Prompt 8: Create Contact

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Contacts module
3. Click on Create Contact
4. Enter First Name
5. Enter Last Name
6. Enter Email
7. Enter Phone Number
8. Enter Mobile Number
9. Select the related Organization if required
10. Click on Save
11. Verify that the Contact is created successfully
12. Verify the Contact details


## Prompt 9: Search Contact

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Contacts module
3. Search for an existing Contact
4. Enter the Contact name
5. Click on Search
6. Verify that the Contact is displayed
7. Open the Contact
8. Verify the Contact details


## Prompt 10: Edit Contact

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Contacts module
3. Search for an existing Contact
4. Open the Contact
5. Click on Edit
6. Update the Email
7. Update the Phone Number
8. Click on Save
9. Verify that the Contact is updated successfully
10. Verify the updated information


## Prompt 11: Delete Contact

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Contacts module
3. Search for an existing Contact
4. Select the Contact
5. Click on Delete
6. Confirm the deletion
7. Verify that the Contact is deleted successfully


## Prompt 12: Create Organization

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Organizations module
3. Click on Create Organization
4. Enter Organization Name
5. Enter Website
6. Enter Phone Number
7. Enter Email
8. Select Industry
9. Enter Billing Address
10. Click on Save
11. Verify that the Organization is created successfully
12. Verify the Organization details


## Prompt 13: Search Organization

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Organizations module
3. Search for an existing Organization
4. Enter the Organization name
5. Click on Search
6. Verify that the Organization is displayed
7. Open the Organization
8. Verify the Organization details


## Prompt 14: Edit Organization

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Organizations module
3. Search for an existing Organization
4. Open the Organization
5. Click on Edit
6. Update the Phone Number
7. Update the Website
8. Click on Save
9. Verify that the Organization is updated successfully
10. Verify the updated information


## Prompt 15: Delete Organization

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Organizations module
3. Search for an existing Organization
4. Select the Organization
5. Click on Delete
6. Confirm the deletion
7. Verify that the Organization is deleted successfully


## Prompt 16: Create Opportunity

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Opportunities module
3. Click on Create Opportunity
4. Enter Opportunity Name
5. Select the related Organization
6. Enter Amount
7. Select Sales Stage
8. Enter Closing Date
9. Select Lead Source
10. Click on Save
11. Verify that the Opportunity is created successfully
12. Verify the Opportunity details


## Prompt 17: Create Product

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Products module
3. Click on Create Product
4. Enter Product Name
5. Enter Product Code
6. Enter Unit Price
7. Select Product Category if available
8. Enter Description
9. Click on Save
10. Verify that the Product is created successfully
11. Verify the Product details


## Prompt 18: Search Product

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Products module
3. Search for an existing Product
4. Enter the Product name
5. Click on Search
6. Verify that the Product is displayed
7. Open the Product
8. Verify the Product details


## Prompt 19: Edit Product

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Products module
3. Search for an existing Product
4. Open the Product
5. Click on Edit
6. Update the Unit Price
7. Update the Description
8. Click on Save
9. Verify that the Product is updated successfully
10. Verify the updated information


## Prompt 20: Delete Product

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Products module
3. Search for an existing Product
4. Select the Product
5. Click on Delete
6. Confirm the deletion
7. Verify that the Product is deleted successfully


## Prompt 21: Create Invoice

Generate a Playwright test for the following scenario:

1. Login to http://localhost:8888/
2. Navigate to the Invoices module
3. Click on Create Invoice
4. Select the Organization or Customer
5. Enter Invoice Subject
6. Add a Product
7. Enter Product Quantity
8. Verify the Product Price
9. Verify the Total Amount
10. Click on Save
11. Verify that the Invoice is created successfully
12. Verify the Invoice details


## Prompt 22: Lead CRUD

Generate a Playwright test for the complete Lead CRUD flow:

1. Login to http://localhost:8888/
2. Navigate to Leads
3. Create a new unique Lead
4. Verify that the Lead is created
5. Search for the created Lead
6. Open the Lead
7. Update the Lead information
8. Save the changes
9. Verify the updated Lead
10. Delete the Lead
11. Confirm deletion
12. Verify that the Lead has been deleted


## Prompt 23: Contact CRUD

Generate a Playwright test for the complete Contact CRUD flow:

1. Login to http://localhost:8888/
2. Navigate to Contacts
3. Create a new Contact
4. Verify that the Contact is created
5. Search for the Contact
6. Open the Contact
7. Update the Contact information
8. Save the changes
9. Verify the updated Contact
10. Delete the Contact
11. Confirm deletion
12. Verify that the Contact has been deleted


## Prompt 24: Organization CRUD

Generate a Playwright test for the complete Organization CRUD flow:

1. Login to http://localhost:8888/
2. Navigate to Organizations
3. Create a new Organization
4. Verify that the Organization is created
5. Search for the Organization
6. Open the Organization
7. Update the Organization information
8. Save the changes
9. Verify the updated Organization
10. Delete the Organization
11. Confirm deletion
12. Verify that the Organization has been deleted


## Prompt 25: Complete vTiger CRM Flow

Generate a Playwright end-to-end test for the following scenario:

1. Login to http://localhost:8888/
2. Create an Organization
3. Verify the Organization
4. Create a Contact
5. Associate the Contact with the Organization
6. Verify the Contact
7. Create a Lead
8. Verify the Lead
9. Create an Opportunity
10. Associate the Opportunity with the Organization
11. Verify the Opportunity
12. Create a Product
13. Verify the Product
14. Create an Invoice
15. Add the Product to the Invoice
16. Verify the Invoice
17. Logout
18. Verify that the login page is displayed


# Automation Rules

For every prompt:

1. Use Playwright with TypeScript.
2. Use Playwright Test Runner.
3. Do not use Page Object Model.
4. Do not create Page Object classes.
5. Keep the complete automation directly inside the `.spec.ts` file.
6. First inspect the vTiger CRM application using Playwright MCP.
7. Identify actual elements and locators from the application.
8. Do not invent locators.
9. Prefer getByRole(), getByLabel(), getByPlaceholder(), getByText(), and getByTestId().
10. Use CSS only when necessary.
11. Use XPath only when there is no stable alternative.
12. Do not use `waitForTimeout()`.
13. Use Playwright auto-waiting.
14. Use `expect()` assertions.
15. Generate clean and readable TypeScript.
16. Use async/await correctly.
17. Use unique test data for create operations.
18. Handle confirmation dialogs when required.
19. Verify every important action.
20. Generate executable Playwright code.

# Test Data Rule

For create operations, generate unique data using Date.now().

Example:

const timestamp = Date.now();

const firstName = `Test${timestamp}`;
const lastName = `Lead${timestamp}`;
const company = `Company${timestamp}`;
const email = `test${timestamp}@example.com`;

Use the generated values for searching, editing, and deleting the same record.

# MCP Rule

Always follow:

Inspect the application
        ↓
Identify elements
        ↓
Identify stable locators
        ↓
Perform actions
        ↓
Add assertions
        ↓
Generate TypeScript test

Do not generate code based on assumptions about the vTiger CRM UI.

If a locator is unclear, inspect the application again using Playwright MCP.

# Final Output Rule

When generating a test:

- Provide the complete `.spec.ts` code.
- Include all required imports.
- Do not use POM.
- Do not create additional Page Object files.
- Use actual locators discovered through MCP.
- Include assertions.
- Keep the code simple and beginner/interview friendly.
- Do not include unnecessary code.