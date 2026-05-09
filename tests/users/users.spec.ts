import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { Users } from '../../test-data/users';

test.describe('Users especiales', () => {

  test('performance_glitch_user puede hacer login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(Users.performance.username, Users.performance.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(inventoryPage.productList.first()).toBeVisible();
  });

  test('performance_glitch_user tarda más de 3s en cargar', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const start = Date.now();
    await loginPage.login(Users.performance.username, Users.performance.password);
    await page.waitForURL('/inventory.html');
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThan(3000);
  });

  test('problem_user ve imágenes incorrectas en productos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(Users.problem.username, Users.problem.password);

    await expect(page).toHaveURL('/inventory.html');
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
  });

  test('visual_user puede hacer login exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(Users.visual.username, Users.visual.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(inventoryPage.productList.first()).toBeVisible();
  });

  test('error_user puede hacer login exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(Users.error.username, Users.error.password);

    await expect(page).toHaveURL('/inventory.html');
    await expect(inventoryPage.productList.first()).toBeVisible();
  });

});