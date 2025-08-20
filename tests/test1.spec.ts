import { test, expect } from '@playwright/test';

test('Register Page ', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.waitForTimeout(500);
    await page.getByText('Bài học 1: Register Page').click();
    await page.waitForTimeout(500);
    
    await page.fill('//input[@name="username"]','duy');
    await page.waitForTimeout(500);

    await page.fill('//input[@type="email"]','duy@gmail.com' );
    await page.waitForTimeout(500);

    await page.check('//*[@id="male"]');
    await page.waitForTimeout(500);

    await page.check('//input[@id="traveling"]');
    await page.waitForTimeout(500);

    await page.selectOption('//select[@id="interests"]', 'Science');
    await page.waitForTimeout(500);

    await page.selectOption('//select[@id="country"]','United States');
    await page.waitForTimeout(500);

    await page.fill('//*[@id="dob"]', '2004-04-04');
    await page.waitForTimeout(500);

    await page.setInputFiles('#profile', 'tests/files/avatar-27.jpeg');
    await page.waitForTimeout(500);

    await page.fill('//*[@id="bio"]','Xin chào, mình là Duy.');
    await page.waitForTimeout(500);
    
    await page.fill('//*[@id="rating"]', '9');
    await page.waitForTimeout(500);

    await page.fill('//*[@id="favcolor"]', '#0097fc');
    await page.waitForTimeout(500);
    
    await page.check('//*[@id="newsletter"]');
    await page.waitForTimeout(500);
    
    await expect(page.locator('//*[@id="newsletter"]')).toBeChecked();
    await page.waitForTimeout(500);

    await page.check('//*[@id="registrationForm"]/div[13]/label[2]');
    await page.waitForTimeout(500);

    await expect(page.locator('//*[@id="registrationForm"]/div[13]/label[2]')).toBeChecked();
    await page.waitForTimeout(500);

    const ratingElement = page.locator('//*[@id="starRating"]');
    const ratingValueElement = page.locator('//*[@id="starRatingValue"]');
    const changeRating = async (newRating: number) => {
    await ratingElement.evaluate((a, rating) => {
      a.setAttribute('data-rating', rating.toString());
      a.style.setProperty('--rating-width', `${(rating / 5) * 100}%`);
    }, newRating);
    // neu thay doi 
    await ratingValueElement.evaluate((a, rating) => {
      a.textContent = rating.toString();
    }, newRating);
    };
    await changeRating(3.9);

    await page.waitForTimeout(1000);
    await page.locator('button[type="submit"]').click();
});
