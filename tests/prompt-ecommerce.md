# prompts.md — Amazon Shopping Flow Test Cases

Use this file alongside `amazon-playwright-context.md`. Feed one test
case at a time to the MCP agent so it generates focused, reviewable specs.

Base URL: `https://www.amazon.com/`

---

## Scenario 1 — End-to-End Shopping & Checkout Flow
File: `tests/shoppingFlow.spec.ts`

### TC-SHOP-01 — Search and select product via auto-suggestion
**Steps**
1. Launch browser, dismiss any banner/continue-shopping prompt
2. Enter "Boat Speakers" in the search box
3. Select "boat speaker waterproof" from the auto-suggestion list
**Expected**
- Search results page loads with matching Boat speaker products

### TC-SHOP-02 — Open a product and add to cart
**Steps**
1. From search results, select any available Boat speaker product
2. On the product details page, click Add to Cart
**Expected**
- Product is added to cart (confirmation panel/message shown)

### TC-SHOP-03 — Verify product in cart
**Steps**
1. Navigate to the Cart page
2. Verify the added product is present
**Expected**
- Product name matches the added product
- Quantity shows 1
- Price is displayed and non-zero

### TC-SHOP-04 — Proceed to checkout and fill shipping address
**Steps**
1. Click Proceed to Checkout
2. Add a new delivery address
3. Fill country, full name, street address 1 & 2, city, state, zip, mobile number
**Expected**
- All fields accept input without validation errors
- Address form can be submitted/continued

### TC-SHOP-05 — Reach Order Review page without placing order
**Steps**
1. Continue through checkout up to the final step before order placement
**Expected**
- Order Review/Confirmation page is displayed
- No "place order" action is performed

---

## Scenario 2 — Cart Quantity & Remove Product Validation
File: `tests/cartValidation.spec.ts`

### TC-CART-01 — Verify product present in cart
**Steps**
1. Navigate to the Cart page
2. Verify the Boat speaker product is present
**Expected**
- Product is visible with correct name

### TC-CART-02 — Increase quantity from 1 to 2
**Steps**
1. Change product quantity from 1 to 2
**Expected**
- Quantity field reflects 2
- Cart subtotal updates to reflect the new quantity

### TC-CART-03 — Decrease quantity back to 1
**Steps**
1. Change product quantity from 2 back to 1
**Expected**
- Quantity field reflects 1
- Cart subtotal updates accordingly

### TC-CART-04 — Remove product from cart
**Steps**
1. Click Delete/Remove on the product line item
**Expected**
- Product is no longer listed in the cart

### TC-CART-05 — Verify empty cart state
**Steps**
1. After removal, check the cart page
**Expected**
- Empty-cart message/state is displayed (e.g. "Your Amazon Cart is empty")

---

## How to use with the MCP agent

Prompt pattern for each test case:

> "Using amazon-playwright-context.md for conventions, implement
> TC-SHOP-03 as part of `tests/shoppingFlow.spec.ts`, using
> `fixtures/PageFixtures.ts` and `testdata/scenario1data.json`. Use
> `browser_snapshot` to confirm real Amazon selectors before writing or
> updating any locator in `CartPage.ts`."

Recommended order: TC-SHOP-01 → TC-SHOP-05 first (builds the full
Scenario 1 flow and gets a product into the cart), then TC-CART-01 →
TC-CART-05 for Scenario 2 (can reuse the same cart state, but
`cartValidation.spec.ts` should still add the product itself if run
independently).