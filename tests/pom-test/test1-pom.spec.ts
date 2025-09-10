import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

test.describe('Bài học 1: Register Page', () => {
  let registerPage: RegisterPage;

  const userData = {
    username: 'duy',
    email: 'duy@gmail.com',
    gender: 'male' as const,
    hobbies: ['reading', 'cooking'],
    interest: 'Science',
    country: 'United States',
    dob: '2004-04-04',
    avatar: 'tests/files/avatar-27.jpeg',
    bio: 'Xin chào, mình là Duy.',
    rating: '5',
    favcolor: '#0097fc',
    features: { newsletter: true, toggle: false },
    ratingChange: 2.9
  };

  const userData1= {
    ...userData,
    features: { newsletter: true, toggle: true }
  };

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  
  test('Điền form với newsletter: Yes, toggle: No', async () => {
    await test.step('Điền thông tin cơ bản', async () => {
      await registerPage.fillInfo(userData.username, userData.email, userData.gender, userData.hobbies);
      await expect(registerPage.locatorUsername).toHaveValue(userData.username);
      await expect(registerPage.locatorEmail).toHaveValue(userData.email);
      await expect(registerPage.locatorMale).toBeChecked();
      await expect(registerPage.locatorReading).toBeChecked();
      await expect(registerPage.locatorCooking).toBeChecked();
    });

    await test.step('Chọn sở thích và quốc gia', async () => {
      await registerPage.selectOptions(userData.interest, userData.country);
      await expect(registerPage.locatorInterests).toHaveValue(userData.interest.toLowerCase());
      await expect(registerPage.locatorCountry).toHaveValue('usa');
    });

    await test.step('Ngày sinh và upload avatar', async () => {
      await registerPage.setDobAndAvatar(userData.dob, userData.avatar);
      await expect(registerPage.locatorDob).toHaveValue(userData.dob);
      await expect(registerPage.locatorProfile).toHaveValue(
        new RegExp(`${userData.avatar.split('/').pop()}$`)
      );
    });

    await test.step('Điền bio, rating, màu yêu thích', async () => {
      await registerPage.fillUserProfile(
        userData.bio,
        userData.rating,
        userData.favcolor
      );
      await expect(registerPage.locatorBio).toHaveValue(userData.bio);
      await expect(registerPage.locatorRating).toHaveValue(userData.rating);
      await expect(registerPage.locatorFavcolor).toHaveValue(userData.favcolor);
    });

    await test.step('Check newsletter & kích hoạt tính năng', async () => {
      await registerPage.setFeatures(
        userData.features.newsletter,
        userData.features.toggle
      );
      await expect(registerPage.locatorNewsletter).toBeChecked();
      await expect(registerPage.locatorToggleOption).not.toBeChecked();
    });

    await test.step('Thay đổi rating bằng evaluate', async () => {
      await registerPage.changeRating(userData.ratingChange);
      await expect(registerPage.locatorStarRatingValue).toHaveText(
        userData.ratingChange.toString()
      );
    });

    await test.step('Nhấn nút submit form', async () => {
      await registerPage.submitForm();
    });

    await test.step('Verify dữ liệu bảng dưới', async () => {
       const infoCell = registerPage.infoCell;
      await expect(infoCell).toContainText(`Gender: ${userData.gender}`);
      await expect(infoCell).toContainText(`Hobbies: ${userData.hobbies.join(', ')}`);
      await expect(infoCell).toContainText(`Country: usa`);
      await expect(infoCell).toContainText(`Date of Birth: ${userData.dob}`);
      await expect(infoCell).toContainText(`Biography: ${userData.bio}`);
      await expect(infoCell).toContainText(`Rating: ${userData.rating}`);
      await expect(infoCell).toContainText(`Favorite Color: ${userData.favcolor}`);
      await expect(infoCell).toContainText(`Newsletter: Yes`);
      await expect(infoCell).toContainText(`Enable Feature: No`);
      await expect(infoCell).toContainText(`Star Rating: ${userData.ratingChange}`);
    });
  });
  
test('Điền form với newsletter: Yes, toggle: Yes', async () => {
    await test.step('Điền thông tin cơ bản', async () => {
      await registerPage.fillInfo(userData1.username, userData1.email, userData1.gender, userData1.hobbies);
      await expect(registerPage.locatorUsername).toHaveValue(userData.username);
      await expect(registerPage.locatorEmail).toHaveValue(userData.email);
      await expect(registerPage.locatorMale).toBeChecked();
      await expect(registerPage.locatorReading).toBeChecked();
      await expect(registerPage.locatorCooking).toBeChecked();
    });

    await test.step('Chọn sở thích và quốc gia', async () => {
      await registerPage.selectOptions(userData1.interest, userData1.country);
      await expect(registerPage.locatorInterests).toHaveValue(userData1.interest.toLowerCase());
      await expect(registerPage.locatorCountry).toHaveValue('usa');
    });

    await test.step('Ngày sinh và upload avatar', async () => {
      await registerPage.setDobAndAvatar(userData1.dob, userData1.avatar);
      await expect(registerPage.locatorDob).toHaveValue(userData1.dob);
      await expect(registerPage.locatorProfile).toHaveValue(
        new RegExp(`${userData1.avatar.split('/').pop()}$`)
      );
    });

    await test.step('Điền bio, rating, màu yêu thích', async () => {
      await registerPage.fillUserProfile(
        userData.bio,
        userData.rating,
        userData.favcolor
      );
      await expect(registerPage.locatorBio).toHaveValue(userData1.bio);
      await expect(registerPage.locatorRating).toHaveValue(userData1.rating);
      await expect(registerPage.locatorFavcolor).toHaveValue(userData1.favcolor);
    });

    await test.step('Check newsletter & kích hoạt tính năng', async () => {
      await registerPage.setFeatures(
        userData1.features.newsletter,
        userData1.features.toggle
      );
      await expect(registerPage.locatorNewsletter).toBeChecked();
      await expect(registerPage.locatorToggleOption).toBeChecked();
    });

    await test.step('Thay đổi rating bằng evaluate', async () => {
      await registerPage.changeRating(userData.ratingChange);
      await expect(registerPage.locatorStarRatingValue).toHaveText(
        userData1.ratingChange.toString()
      );
    });

    await test.step('Nhấn nút submit form', async () => {
      await registerPage.submitForm();
    });

    await test.step('Verify dữ liệu bảng dưới', async () => {
       const infoCell = registerPage.infoCell;
      await expect(infoCell).toContainText(`Gender: ${userData1.gender}`);
      await expect(infoCell).toContainText(`Hobbies: ${userData1.hobbies.join(', ')}`);
      await expect(infoCell).toContainText(`Country: usa`);
      await expect(infoCell).toContainText(`Date of Birth: ${userData1.dob}`);
      await expect(infoCell).toContainText(`Biography: ${userData1.bio}`);
      await expect(infoCell).toContainText(`Rating: ${userData1.rating}`);
      await expect(infoCell).toContainText(`Favorite Color: ${userData1.favcolor}`);
      await expect(infoCell).toContainText(`Newsletter: Yes`);
      await expect(infoCell).toContainText(`Enable Feature: Yes`);
      await expect(infoCell).toContainText(`Star Rating: ${userData1.ratingChange}`);
    });
  });

});
