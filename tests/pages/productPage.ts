import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getProductButtonByName(name: string): Locator {
    return this.page.locator(
      `//div[@class="product-name" and text()="${name}"]/following-sibling::button`
    );
  }

  getProductNameInCart(name: string): Locator {
    return this.page.locator(`//tr[td[text()="${name}"]]/td[1]`);
  }

  getProductPriceInCart(name: string): Locator {
    return this.page.locator(`//tr[td[text()="${name}"]]/td[2]`);
  }

  getProductQtyInCart(name: string): Locator {
    return this.page.locator(`//tr[td[text()="${name}"]]/td[3]`);
  }

  getProductTotalInCart(name: string): Locator {
    return this.page.locator(`//tr[td[text()="${name}"]]/td[4]`);
  }

  getProductPriceAbove(name: string): Locator {
    return this.page.locator(
      `//div[@class="product-name" and text()="${name}"]/following-sibling::div[@class="product-price"]`
    );
  }

  async goto() {
    await super.goto('Bài học 2: Product page');
  }

  // Thêm sản phẩm theo tên (dùng clickCount)
  async addProductByName(name: string, times: number) {
    const button = this.getProductButtonByName(name);
    await button.click({ clickCount: times });
  }
}
