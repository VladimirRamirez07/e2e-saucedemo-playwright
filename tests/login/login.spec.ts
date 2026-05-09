import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { Users, InvalidUsers } from '../../test-data/users';

test.describe('Login', () => {

  test('login exitoso con usuario estándar', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(inventoryPage.productList.first()).toBeVisible();
  });

  test('login fallido con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(InvalidUsers.wrongUsername.username, InvalidUsers.wrongUsername.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('login fallido con usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(Users.locked.username, Users.locked.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });

  test('login fallido con campos vacíos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(InvalidUsers.empty.username, InvalidUsers.empty.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

});