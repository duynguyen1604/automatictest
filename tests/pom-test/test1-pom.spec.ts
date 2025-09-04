import { test } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { RegisterPageAssertions } from '../assertions/registerPageAssertions';

test.describe('Bài học 1: Register Page', () => {
  let registerPage: RegisterPage;
  let assertions: RegisterPageAssertions;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    assertions = new RegisterPageAssertions(registerPage);
    await registerPage.goto();
  });

  test('Điền form đăng ký', async () => {
    await registerPage.fillInfo('duy', 'duy@gmail.com', 'male', ['reading', 'cooking']);
    await assertions.expectInfo('duy', 'duy@gmail.com', 'male', ['reading', 'cooking']);

    await registerPage.selectOptions('Science', 'United States');
    await assertions.expectOptions('science', 'usa');

    await registerPage.setDobAndAvatar('2004-04-04', 'tests/files/avatar-27.jpeg');
    await assertions.expectDobAndAvatar('2004-04-04', /avatar-27\.jpeg$/);

    await registerPage.fillUserProfile('Xin chào, mình là Duy.', '5', '#0097fc');
    await assertions.expectUserProfile('Xin chào, mình là Duy.', '5', '#0097fc');

    await registerPage.setFeatures(true, false);
    await assertions.expectFeatures(true, false);

    await registerPage.changeRating(2.9);
    await assertions.expectRating(2.9);

    await registerPage.submitForm();
  });
});
