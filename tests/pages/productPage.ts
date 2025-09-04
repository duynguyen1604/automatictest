import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  readonly addProduct1: Locator;
  readonly addProduct2: Locator;
  readonly addProduct3: Locator;

  constructor(page: Page) {
    super(page);
    this.addProduct1 = page.locator('//button[@data-product-id="1"]');
    this.addProduct2 = page.locator('//button[@data-product-id="2"]');
    this.addProduct3 = page.locator('//button[@data-product-id="3"]');
  }

  async goto() {
    await this.page.goto('https://material.playwrightvn.com/');
    await this.page.getByText('Bài học 2: Product page').click();
  }

  async addProduct(productNumber: number, times: number) {
    const button = this.page.locator(`//button[@data-product-id="${productNumber}"]`);
    for (let i = 0; i < times; i++) {
      await button.click();
    }
  }

  async verifyQuantity(productName: string, expected: string) {
    const qtyLocator = this.page.locator(`//td[text()="${productName}"]/following-sibling::td[2]`);
    await expect(qtyLocator).toHaveText(expected);
  }
}
