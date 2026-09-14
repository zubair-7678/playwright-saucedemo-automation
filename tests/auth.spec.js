const { test, expect } = require('@playwright/test');

const VALID_USER = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('valid user can log in', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(VALID_USER);
    await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('invalid username shows an authentication error', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('invalid_user');
    await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  test('invalid password shows an authentication error', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(VALID_USER);
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');
  });

  test('locked out user cannot log in', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out');
  });

  test('empty login form shows username validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
  });
});
