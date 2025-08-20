import { test, expect } from '@playwright/test';
test('Register Page ', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.waitForTimeout(500);
    await page.getByText('Bài học 3: Todo page').click();
    await page.waitForTimeout(500);
    for (let i = 1; i <= 10; i++) {
        await page.fill('//*[@id="new-task"]', `${i}`);
        await page.locator('//*[@id="add-task"]').click();
    
  }
    for (let i = 1; i <= 10; i++) {
        if (i % 2 != 0) {
            page.once('dialog', async (dialog) => {
            await dialog.accept();
            });
        await page.locator(`//li[.//span[text()="${i}"]]//button[text()="Delete"]`).click();
        }
}

    
});
