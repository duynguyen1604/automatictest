import { expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

export class RegisterPageAssertions {
  constructor(private registerPage: RegisterPage) {}

  async expectInfo(username: string, email: string,gender: 'male' | 'female' = 'male', hobbies: string[] = []) {
    await expect(this.registerPage.username).toHaveValue(username);
    await expect(this.registerPage.email).toHaveValue(email);
    if (gender === 'male') {
      await expect(this.registerPage.male).toBeChecked();
      await expect(this.registerPage.female).not.toBeChecked();
  } else {
      await expect(this.registerPage.female).toBeChecked();
      await expect(this.registerPage.male).not.toBeChecked();
  }

    if (hobbies.includes('reading')) {
      await expect(this.registerPage.reading).toBeChecked();
  } else {
      await expect(this.registerPage.reading).not.toBeChecked();
  }

    if (hobbies.includes('travel')) {
      await expect(this.registerPage.travel).toBeChecked();
  } else {
      await expect(this.registerPage.travel).not.toBeChecked();
  }

    if (hobbies.includes('cooking')) {
      await expect(this.registerPage.cooking).toBeChecked();
  } else {
      await expect(this.registerPage.cooking).not.toBeChecked();
  }
  }

  async expectOptions(interest: string, country: string) {
    await expect(this.registerPage.interests).toHaveValue(interest.toLowerCase());
    await expect(this.registerPage.country).toHaveValue(country.toLowerCase());
  }

  async expectDobAndAvatar(dob: string, fileName: RegExp) {
    await expect(this.registerPage.dob).toHaveValue(dob);
    await expect(this.registerPage.profile).toHaveValue(fileName);
  }

  async expectUserProfile(bio: string, rating: string, color: string) {
    await expect(this.registerPage.bio).toHaveValue(bio);
    await expect(this.registerPage.rating).toHaveValue(rating);
    await expect(this.registerPage.favcolor).toHaveValue(color);
  }

  async expectFeatures(enableNewsletter: boolean, enableToggle: boolean) {
    if (enableNewsletter) {
      await expect(this.registerPage.newsletter).toBeChecked();
    } else {
      await expect(this.registerPage.newsletter).not.toBeChecked();
    }

    if (enableToggle) {
      await expect(this.registerPage.toggleOption).toBeChecked();
    } else {
      await expect(this.registerPage.toggleOption).not.toBeChecked();
    }
  }


  async expectRating(newRating: number) {
    await expect(this.registerPage.starRatingValue).toHaveText(newRating.toString());
  }
}
