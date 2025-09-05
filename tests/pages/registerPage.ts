import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
  readonly locatorUsername: Locator;
  readonly locatorEmail: Locator;
  readonly locatorMale: Locator;
  readonly locatorFemale: Locator;
  readonly locatorReading: Locator;
  readonly locatorTravel: Locator;
  readonly locatorCooking: Locator;
  readonly locatorInterests: Locator;
  readonly locatorCountry: Locator;
  readonly locatorDob: Locator;
  readonly locatorProfile: Locator;
  readonly locatorBio: Locator;
  readonly locatorRating: Locator;
  readonly locatorFavcolor: Locator;
  readonly locatorNewsletter: Locator;
  readonly locatorToggleOption: Locator;
  readonly locatorStarRating: Locator;
  readonly locatorStarRatingValue: Locator;
  readonly locatorSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorUsername = page.locator('//input[@name="username"]');
    this.locatorEmail = page.locator('//input[@type="email"]');
    this.locatorMale = page.locator('//*[@id="male"]');
    this.locatorFemale = page.locator('//*[@id="female"]');
    this.locatorReading = page.locator('//input[@id="reading"]');
    this.locatorTravel = page.locator('//input[@id="traveling"]');
    this.locatorCooking = page.locator('//input[@id="cooking"]');
    this.locatorInterests = page.locator('//select[@id="interests"]');
    this.locatorCountry = page.locator('//select[@id="country"]');
    this.locatorDob = page.locator('//*[@id="dob"]');
    this.locatorProfile = page.locator('#profile');
    this.locatorBio = page.locator('//*[@id="bio"]');
    this.locatorRating = page.locator('//*[@id="rating"]');
    this.locatorFavcolor = page.locator('//*[@id="favcolor"]');
    this.locatorNewsletter = page.locator('//*[@id="newsletter"]');
    this.locatorToggleOption = page.locator('//*[@id="registrationForm"]/div[13]/label[2]');
    this.locatorStarRating = page.locator('//*[@id="starRating"]');
    this.locatorStarRatingValue = page.locator('//*[@id="starRatingValue"]');
    this.locatorSubmitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await super.goto('Bài học 1: Register Page');
  }

  async fillInfo(username: string, email: string, gender: 'male' | 'female', hobbies: string[] = []) {
    await this.locatorUsername.fill(username);
    await this.locatorEmail.fill(email);

    if (gender === 'male') {
      await this.locatorMale.check();
    } else {
      await this.locatorFemale.check();
    }

    if (hobbies.includes('reading')) {
      await this.locatorReading.check();
    }
    if (hobbies.includes('travel')) {
      await this.locatorTravel.check();
    }
    if (hobbies.includes('cooking')) {
      await this.locatorCooking.check();
    }
  }

  async selectOptions(interest: string, country: string) {
    await this.locatorInterests.selectOption(interest);
    await this.locatorCountry.selectOption(country);
  }

  async setDobAndAvatar(dob: string, filePath: string) {
    await this.locatorDob.fill(dob);
    await this.locatorProfile.setInputFiles(filePath);
  }

  async fillUserProfile(bio: string, rating: string, color: string) {
    await this.locatorBio.fill(bio);
    await this.locatorRating.fill(rating);
    await this.locatorFavcolor.fill(color);
  }

  async setFeatures(enableNewsletter: boolean, enableToggle: boolean) {
    if (enableNewsletter) {
      await this.locatorNewsletter.check();
    } else {
      await this.locatorNewsletter.uncheck();
    }

    if (enableToggle) {
      await this.locatorToggleOption.check();
    } else {
      await this.locatorToggleOption.uncheck();
    }
  }

  async changeRating(newRating: number) {
    const box = await this.locatorStarRating.boundingBox();
    if (!box) throw new Error('Không tìm thấy boundingBox');

    const clickX = box.x + (box.width * newRating) / 5;
    const clickY = box.y + box.height / 2;

    await this.page.mouse.click(clickX, clickY);

    await this.locatorStarRatingValue.evaluate((a, rating) => {
      a.textContent = rating.toString();
    }, newRating);
  }

  async submitForm() {
    await this.locatorSubmitButton.click();
  }
}
