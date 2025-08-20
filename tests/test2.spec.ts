import { test, expect } from '@playwright/test';

test('Register Page ', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.waitForTimeout(500);
    await page.getByText('Bài học 2: Product page').click();
    await page.waitForTimeout(500);
    const button1 = page.locator('//html/body/div[2]/div[1]/div[1]/div/button');
    for (let i = 0; i < 2; i++) {
        await button1.click();
        await page.waitForTimeout(500);
    }
    const button2 = page.locator('//html/body/div[2]/div[1]/div[2]/div/button');
    for (let i = 0; i < 3; i++) {
        await button2.click();
        await page.waitForTimeout(500);
    }
    const button3 = page.locator('//html/body/div[2]/div[1]/div[3]/div/button');
    for (let i = 0; i < 1; i++) {
        await button3.click();
        await page.waitForTimeout(500);
    }
    
});
