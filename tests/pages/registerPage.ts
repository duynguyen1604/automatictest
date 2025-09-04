// registerPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
  readonly username: Locator;
  readonly email: Locator;
  readonly male: Locator;
  readonly traveling: Locator;
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

  constructor(page:Page) {
    super(page);
    this.username = page.locator('//input[@name="username"]');
    this.email = page.locator('//input[@type="email"]');
    this.male = page.locator('//*[@id="male"]');
    this.traveling = page.locator('//input[@id="traveling"]');
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
    await this.page.goto('https://material.playwrightvn.com/');
    await this.page.getByText('Bài học 1: Register Page').click();
  }

  async fillInfo(username: string, email: string) {
    await this.username.fill(username);
    await this.email.fill(email);
    await this.male.check();
    await this.traveling.check();

    await expect(this.username).toHaveValue(username);
    await expect(this.email).toHaveValue(email);
    await expect(this.male).toBeChecked();
    await expect(this.traveling).toBeChecked();
  }

  async selectOptions() {
    await this.interests.selectOption('Science');
    await this.country.selectOption('United States');

    await expect(this.interests).toHaveValue('science');
    await expect(this.country).toHaveValue('usa');
  }

  async setDobAndAvatar(dob: string) {
    await this.dob.fill(dob);
    await this.profile.setInputFiles('tests/files/avatar-27.jpeg');

    await expect(this.dob).toHaveValue(dob);
    await expect(this.profile).toHaveValue(/avatar-27\.jpeg$/);
  }

  async fillInfo2(bio: string, rating: string,color:string) {
    await this.bio.fill(bio);
    await this.rating.fill(rating);
    await this.favcolor.fill(color);

    await expect(this.bio).toHaveValue(bio);
    await expect(this.rating).toHaveValue(rating);
    await expect(this.favcolor).toHaveValue(color);
  }

  async enableFeatures() {
    await this.newsletter.check();
    await this.toggleOption.check();

    await expect(this.newsletter).toBeChecked();
    await expect(this.toggleOption).toBeChecked();
  }

  async changeRating(newRating: number) {
    const box = await this.starRating.boundingBox();
    if (!box) throw new Error('Không tìm thấy boundingBox');

    const clickX = box.x + (box.width * newRating / 5);
    const clickY = box.y + box.height / 2;

    await this.page.mouse.click(clickX, clickY);

    await this.starRatingValue.evaluate((a, rating) => {
      a.textContent = rating.toString();
    }, newRating);

    await expect(this.starRatingValue).toHaveText(newRating.toString());
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
