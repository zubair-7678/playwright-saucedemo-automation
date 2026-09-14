# SauceDemo Playwright Test Suite

A practical end-to-end UI automation project built with **Playwright Test** against the public SauceDemo practice application.

## What is covered

**16 automated test cases** covering:

- Valid login
- Invalid username
- Invalid password
- Locked-out user
- Empty login validation
- Product catalog
- Product sorting A-Z
- Product sorting by price
- Add to cart
- Remove from cart
- Cart contents
- Continue shopping
- Checkout first-name validation
- Checkout last-name validation
- Checkout postal-code validation
- Complete checkout flow

> SauceDemo does not provide a traditional product search box, so the suite covers the site's closest real product-discovery functionality: catalog verification and sorting.

## Tech stack

- JavaScript
- Playwright Test
- Chromium
- HTML test reports

## Run locally

### 1. Install dependencies

```bash
npm install
npx playwright install
```

### 2. Run all tests

```bash
npm test
```

### 3. Run with a visible browser

```bash
npm run test:headed
```

### 4. Open the HTML report

```bash
npm run report
```

### 5. Run Playwright UI mode

```bash
npm run test:ui
```

## Test credentials

SauceDemo provides public practice credentials. This project uses:

- Username: `standard_user`
- Password: `secret_sauce`

The tests also intentionally use `locked_out_user` and invalid credentials to verify negative login behavior.

## Project structure

```text
saucedemo-playwright/
├── tests/
│   ├── auth.spec.js
│   ├── products.spec.js
│   └── checkout.spec.js
├── package.json
├── playwright.config.js
└── README.md
```

## Automation approach

The suite uses Playwright's web-first assertions and user-facing locators such as roles, labels, placeholders, and test IDs. This keeps the tests readable and less dependent on fragile DOM structure.

## GitHub

After pushing this project, add the repository URL to your CV under Projects, for example:

**Playwright E2E Automation — SauceDemo**
- Built and maintained 16 automated UI tests using Playwright Test and JavaScript.
- Covered authentication, validation, product sorting, cart operations and end-to-end checkout.
- Implemented reusable login/checkout helpers, web-first assertions, screenshots/traces on failure and HTML reporting.
