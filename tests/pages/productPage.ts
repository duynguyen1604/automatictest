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
    await super.goto('Bài học 2: Product page'); // gọi lại hàm từ BasePage
  }
  async addProduct(productId: number, times: number ) {
    const button = this.getProductButton(productId);
    await button.click({clickCount: times});
  }
  getProductNameInCart(id: number): Locator {
    return this.page.locator(`//td[text()="Product ${id}"]`);
  }

  getProductQtyInCart(id: number): Locator {
    return this.page.locator(`//td[text()="Product ${id}"]/following-sibling::td[2]`);
  }

  getProductPriceInCart(id: number): Locator {
    return this.page.locator(`//td[text()="Product ${id}"]/following-sibling::td[1]`);
  }

  getProductTotalInCart(id: number): Locator {
    return this.page.locator(`//td[text()="Product ${id}"]/following-sibling::td[3]`);
  }

  // Getter cho price phía trên
  getProductPriceAbove(id: number): Locator {
    return this.page.locator(`//button[@data-product-id="${id}"]/preceding-sibling::div[@class="product-price"]`);
  }
}
