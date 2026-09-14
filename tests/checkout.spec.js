const { test, expect } = require('@playwright/test');

const login = async (page) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
};

const startCheckout = async (page) => {
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('link', { name: /cart/i }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
};

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await startCheckout(page);
  });

  test('checkout form requires first name', async ({ page }) => {
    await page.getByLabel('Last Name').fill('Tester');
    await page.getByLabel('Zip/Postal Code').fill('44000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  test('checkout form requires last name', async ({ page }) => {
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Zip/Postal Code').fill('44000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });

  test('checkout form requires postal code', async ({ page }) => {
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('Tester');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });

  test('user can complete the checkout flow', async ({ page }) => {
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('Tester');
    await page.getByLabel('Zip/Postal Code').fill('44000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Payment Information')).toBeVisible();
    await expect(page.getByText('Shipping Information')).toBeVisible();

    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});
