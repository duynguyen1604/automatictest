
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(pageName?: string) {
    await this.page.goto('https://material.playwrightvn.com/');

    if (pageName) {
      await this.page.getByText(pageName).click();
    }
  }
}
