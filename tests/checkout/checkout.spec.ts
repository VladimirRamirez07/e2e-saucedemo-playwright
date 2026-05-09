import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('debe completar el checkout exitosamente', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillPersonalInfo('John', 'Doe', '12345');
    await checkoutPage.continue();
    await checkoutPage.finish();

    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toBe('Thank you for your order!');
  });

  test('debe mostrar error si el nombre está vacío', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillPersonalInfo('', 'Doe', '12345');
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('debe mostrar error si el apellido está vacío', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillPersonalInfo('John', '', '12345');
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('debe mostrar error si el código postal está vacío', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillPersonalInfo('John', 'Doe', '');
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('debe mostrar el resumen de la orden antes de confirmar', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillPersonalInfo('John', 'Doe', '12345');
    await checkoutPage.continue();

    await expect(page).toHaveURL('/checkout-step-two.html');
    const total = await checkoutPage.getSummaryTotal();
    expect(total).toContain('Total:');
  });

});