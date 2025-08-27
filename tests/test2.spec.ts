import { test, expect } from '@playwright/test';

test.describe('Bài học 2: Product Page', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Đi tới Product Page', async () => {
      await page.goto('https://material.playwrightvn.com/');
      await page.getByText('Bài học 2: Product page').click();
    });
  });

  test('Thêm sản phẩm vào giỏ', async ({ page }) => {
    await test.step('Click nút Add sản phẩm 1 (2 lần)', async () => {
      const button1 = page.locator('//button[@data-product-id="1"]');
      await button1.click({clickCount: 2});
    });

    await test.step('Click nút Add sản phẩm 2 (3 lần)', async () => {
      const button2 = page.locator('//button[@data-product-id="2"]');
      await button2.click({clickCount: 3});
    });

    await test.step('Click nút Add sản phẩm 3 (1 lần)', async () => {
      const button3 = page.locator('//button[@data-product-id="3"]');
      await button3.click({clickCount: 1});
    });
  });
});
