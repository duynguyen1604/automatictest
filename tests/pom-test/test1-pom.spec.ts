import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

test.describe('Bài học 1: Register Page', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    
    await registerPage.goto();
  });


  test('Điền form đăng ký', async () => {
    await test.step('Điền thông tin cơ bản', async () => {
      await registerPage.fillInfo('duy', 'duy@gmail.com', 'male', ['reading', 'cooking']);
      await expect(registerPage.username).toHaveValue('duy');
      await expect(registerPage.email).toHaveValue('duy@gmail.com');
      await expect(registerPage.male).toBeChecked();
      await expect(registerPage.reading).toBeChecked();
      await expect(registerPage.cooking).toBeChecked();
    });
    await test.step('Chọn sở thích và quốc gia', async () => {
      await registerPage.selectOptions('Science', 'United States');
      await expect(registerPage.interests).toHaveValue('science');
      await expect(registerPage.country).toHaveValue('usa');
    });
    await test.step('Ngày sinh và upload avatar', async () => {
      await registerPage.setDobAndAvatar('2004-04-04', 'tests/files/avatar-27.jpeg');

      await expect(registerPage.dob).toHaveValue('2004-04-04');
      await expect(registerPage.profile).toHaveValue(/avatar-27\.jpeg$/);
    });
    await test.step('Điền bio, rating, màu yêu thích', async () => {
      await registerPage.fillUserProfile('Xin chào, mình là Duy.', '5', '#0097fc');

      await expect(registerPage.bio).toHaveValue('Xin chào, mình là Duy.');
      await expect(registerPage.rating).toHaveValue('5');
      await expect(registerPage.favcolor).toHaveValue('#0097fc');
    });

    await test.step('Check newsletter & kích hoạt tính năng', async () => {
      await registerPage.setFeatures(true, false);

      await expect(registerPage.newsletter).toBeChecked;
      await expect(registerPage.toggleOption).not.toBeChecked;
    });
  
    await test.step('Thay đổi rating bằng evaluate', async () => {
      await registerPage.changeRating(2.9);
      await expect(registerPage.starRatingValue).toHaveText('2.9');
  });

    await registerPage.submitForm();
  });
});
