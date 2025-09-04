import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getProductButton(productId: number): Locator {
    return this.page.locator(`//button[@data-product-id="${productId}"]`);
  }

  async goto() {
    await this.gotoBase();
    await this.page.getByText('Bài học 2: Product page').click();
  }

  private async gotoBase() {
    const basePage = new BasePage(this.page);
    await basePage.goto('https://material.playwrightvn.com/');
  }

  async addProduct(productId: number, times: number = 1) {
    const button = this.getProductButton(productId);
    for (let i = 0; i < times; i++) {
      await button.click();
    }
  }
}
