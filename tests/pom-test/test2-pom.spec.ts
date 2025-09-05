import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/productPage';

test.describe('Bài học 2: Product Page', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

  test('Thêm sản phẩm vào giỏ', async () => {
    const products = [
      { id: 1, qty: 2 },
      { id: 2, qty: 3 },
      { id: 3, qty: 1 },
    ];

    for (const { id, qty } of products) {
      await test.step(`Thêm Product ${id} với số lượng ${qty}`, async () => {
        await productPage.addProduct(id, qty);
        const locator = productPage.page.locator(`//td[text()="Product ${id}"]/following-sibling::td[2]`);
        await expect(locator).toHaveText(`${qty}`);
      });
    }
  });
});
