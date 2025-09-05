import { test, expect } from '@playwright/test';

test.describe('Bài học 1: Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Đi tới trang Register Page', async () => {
      await page.goto('https://material.playwrightvn.com/');
      await page.getByText('Bài học 1: Register Page').click();
    });
  });

  test('Điền form đăng ký đầy đủ và submit', async ({ page }) => {
    await test.step('Điền thông tin cơ bản', async () => {
      await page.fill('//input[@name="username"]','duy');
      await page.fill('//input[@type="email"]','duy@gmail.com');
      await page.check('//*[@id="male"]');
      await page.check('//input[@id="traveling"]');

      await expect(page.locator('//input[@name="username"]')).toHaveValue('duy');
      await expect(page.locator('//input[@type="email"]')).toHaveValue('duy@gmail.com');
      await expect(page.locator('//*[@id="male"]')).toBeChecked();
      await expect(page.locator('//input[@id="traveling"]')).toBeChecked();
    });

    await test.step('Chọn sở thích và quốc gia', async () => {
      await page.selectOption('//select[@id="interests"]', 'Science');
      await page.selectOption('//select[@id="country"]','United States');

      await expect(page.locator('//select[@id="interests"]')).toHaveValue('science');
      await expect(page.locator('//select[@id="country"]')).toHaveValue('usa');
    });

    await test.step('Ngày sinh và upload avatar', async () => {
      await page.fill('//*[@id="dob"]', '2004-04-04');
      await page.setInputFiles('#profile', 'tests/files/avatar-27.jpeg');

      await expect(page.locator('//*[@id="dob"]')).toHaveValue('2004-04-04');
      await expect(page.locator('//*[@id="profile"]')).toHaveValue(/avatar-27\.jpeg$/);
    });

    await test.step('Điền bio, rating, màu yêu thích', async () => {
      await page.fill('//*[@id="bio"]','Xin chào, mình là Duy.');
      await page.fill('//*[@id="rating"]', '9');
      await page.fill('//*[@id="favcolor"]', '#0097fc');

      await expect(page.locator('//*[@id="bio"]')).toHaveValue('Xin chào, mình là Duy.');
      await expect(page.locator('//*[@id="rating"]')).toHaveValue('9');
      await expect(page.locator('//*[@id="favcolor"]')).toHaveValue('#0097fc');
    });

    await test.step('Check newsletter & kích hoạt tính năng', async () => {
      await page.check('//*[@id="newsletter"]');
      await page.check('//*[@id="registrationForm"]/div[13]/label[2]');

      await expect(page.locator('//*[@id="newsletter"]')).toBeChecked;
      await expect(page.locator('//*input[@id="toggleOption"]')).toBeChecked;
    });

    await test.step('Thay đổi rating bằng evaluate', async () => {
      const ratingElement = page.locator('//*[@id="starRating"]');
      const ratingValueElement = page.locator('//*[@id="starRatingValue"]');
      const changeRating = async (newRating: number) => {
    const box = await ratingElement.boundingBox();
    if (!box) throw new Error("Không tìm thấy boundingBox");
    const clickX = box.x + (box.width * newRating / 5);
    const clickY = box.y + box.height / 2;

    await page.mouse.click(clickX, clickY);

    await ratingValueElement.evaluate((a, rating) => {
      a.textContent = rating.toString();
    }, newRating);
  };

  await changeRating(3.9);

  await expect(ratingValueElement).toHaveText('3.9');
    });

    await test.step('Submit form', async () => {
      await page.locator('button[type="submit"]').click();
    });
  });
});
