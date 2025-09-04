import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
test('Điền form đăng ký đầy đủ và submit', async ({ page }) =>{
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillInfo('duy', 'duynguyenthe195@gmail.com');
    await registerPage.selectOptions();
    await registerPage.setDobAndAvatar('2004-04-04');
    await registerPage.fillInfo2('Xin chào, mình là Duy.','8','#0097fc');
    await registerPage.enableFeatures;
    await registerPage.changeRating(3.9);
    await registerPage.submitForm;

});