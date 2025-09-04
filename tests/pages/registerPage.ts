// registerPage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
  readonly username: Locator;
  readonly email: Locator;
  readonly male: Locator;
  readonly female: Locator;
  readonly reading: Locator;
  readonly travel: Locator;
  readonly cooking: Locator;
  readonly interests: Locator;
  readonly country: Locator;
  readonly dob: Locator;
  readonly profile: Locator;
  readonly bio: Locator;
  readonly rating: Locator;
  readonly favcolor: Locator;
  readonly newsletter: Locator;
  readonly toggleOption: Locator;
  readonly starRating: Locator;
  readonly starRatingValue: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('//input[@name="username"]');
    this.email = page.locator('//input[@type="email"]');
    this.male = page.locator('//*[@id="male"]');
    this.female = page.locator('//*[@id="female"]');
    this.reading = page.locator('//input[@id="reading"]');
    this.travel = page.locator('//input[@id="traveling"]');
    this.cooking = page.locator('//input[@id="cooking"]');
    this.interests = page.locator('//select[@id="interests"]');
    this.country = page.locator('//select[@id="country"]');
    this.dob = page.locator('//*[@id="dob"]');
    this.profile = page.locator('#profile');
    this.bio = page.locator('//*[@id="bio"]');
    this.rating = page.locator('//*[@id="rating"]');
    this.favcolor = page.locator('//*[@id="favcolor"]');
    this.newsletter = page.locator('//*[@id="newsletter"]');
    this.toggleOption = page.locator('//*[@id="registrationForm"]/div[13]/label[2]');
    this.starRating = page.locator('//*[@id="starRating"]');
    this.starRatingValue = page.locator('//*[@id="starRatingValue"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    const basePage = new BasePage(this.page);
    await basePage.goto('https://material.playwrightvn.com/');
    await this.page.getByText('Bài học 1: Register Page').click();
  }

  async fillInfo(username: string, email: string, gender: 'male' | 'female', hobbies: string[] = []) {
    await this.username.fill(username);
    await this.email.fill(email);

    if (gender === 'male') {
      await this.male.check();
    } else {
      await this.female.check();
    }

    if (hobbies.includes('reading')) {
      await this.reading.check();
    }
    if (hobbies.includes('travel')) {
      await this.travel.check();
    }
    if (hobbies.includes('cooking')) {
      await this.cooking.check();
    }
  }

  async selectOptions(interest: string, country: string) {
    await this.interests.selectOption(interest);
    await this.country.selectOption(country);
  }

  async setDobAndAvatar(dob: string, filePath: string) {
    await this.dob.fill(dob);
    await this.profile.setInputFiles(filePath);
  }

  async fillUserProfile(bio: string, rating: string, color: string) {
    await this.bio.fill(bio);
    await this.rating.fill(rating);
    await this.favcolor.fill(color);
  }

  async setFeatures(enableNewsletter: boolean, enableToggle: boolean) {
    if (enableNewsletter) {
      await this.newsletter.check();
    } else {
      await this.newsletter.uncheck();
    }

    if (enableToggle) {
      await this.toggleOption.check();
    } else {
      await this.toggleOption.uncheck();
    }
  }

  async changeRating(newRating: number) {
    const box = await this.starRating.boundingBox();
    if (!box) throw new Error('Không tìm thấy boundingBox');

    const clickX = box.x + (box.width * newRating) / 5;
    const clickY = box.y + box.height / 2;

    await this.page.mouse.click(clickX, clickY);

    await this.starRatingValue.evaluate((a, rating) => {
      a.textContent = rating.toString();
    }, newRating);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
