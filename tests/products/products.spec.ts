import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { Users } from '../../test-data/users';

test.describe('Products', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('debe mostrar 6 productos en el inventario', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('debe ordenar productos de A a Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('debe ordenar productos de Z a A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('debe ordenar productos de menor a mayor precio', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('debe ordenar productos de mayor a menor precio', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('debe agregar producto al carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('1');
  });

});