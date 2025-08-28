import { test, expect } from '@playwright/test';

test.describe('Bài học 3: Todo page', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Mở trang Todo page', async () => {
      await page.goto('https://material.playwrightvn.com/');
      await page.getByText('Bài học 3: Todo page').click();
    });
  });

  test('Thêm 100 task và xoá các task lẻ', async ({ page }) => {

    await test.step('Thêm 100 task', async () => {
      for (let i = 1; i <= 100; i++) {
        await page.fill('//*[@id="new-task"]', `${i}`);
        await page.locator('//*[@id="add-task"]').click();
      }
    });
    await expect(page.locator('//li')).toHaveCount(100);
    await test.step('Xoá các task có số lẻ', async () => {
      for (let i = 1; i <= 100; i++) {
        if (i % 2 !== 0) {
          page.once('dialog', async (dialog) => {
            await dialog.accept();
          });
          await page.locator(`//li[.//span[text()="${i}"]]//button[text()="Delete"]`).click();
        }
      }
    });
    await expect(page.locator('//li')).toHaveCount(50);
    await expect(page.locator('//li[.//span[text()="2"]]')).toBeVisible();
  });

});