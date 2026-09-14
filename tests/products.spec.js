const { test, expect } = require('@playwright/test');

const login = async (page) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
};

test.describe('Products and cart', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('products page displays the expected product catalog', async ({ page }) => {
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('product list can be sorted A to Z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    await expect(page.locator('.inventory_item_name').first())
      .toHaveText('Sauce Labs Backpack');
  });

  test('product list can be sorted by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    await expect(page.locator('.inventory_item_price').first())
      .toHaveText('$7.99');
  });

  test('user can add a product to the cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();
  });

  test('user can remove a product from the cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('cart contains the selected product', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('link', { name: /cart/i }).click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('cart can return to the product catalog', async ({ page }) => {
    await page.getByRole('link', { name: /cart/i }).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });
});
