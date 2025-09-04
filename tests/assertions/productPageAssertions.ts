import { expect, Page } from '@playwright/test';

export class ProductPageAssertions {
  constructor(private page: Page) {}

  async expectQuantity(productName: string, expectedQty: string) {
    const locator = this.page.locator(`//td[text()="${productName}"]/following-sibling::td[2]`);
    await expect(locator).toHaveText(expectedQty);
  }
}
