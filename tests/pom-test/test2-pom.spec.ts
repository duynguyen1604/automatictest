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
      { name: 'Product 1', qty: 2 },
      { name: 'Product 2', qty: 3 },
      { name: 'Product 3', qty: 1 },
    ];

    for (const { name, qty } of products) {
      await test.step(`Thêm ${name} với số lượng ${qty}`, async () => {
        await productPage.addProductByName(name, qty);
      });

      await test.step(`Verify các trường của ${name} với số lượng ${qty}`, async () => {
        const nameLocator = productPage.getProductNameInCart(name);
        const qtyLocator = productPage.getProductQtyInCart(name);
        const priceAbove = productPage.getProductPriceAbove(name);
        const priceInCart = productPage.getProductPriceInCart(name);
        const totalLocator = productPage.getProductTotalInCart(name);

        await expect(nameLocator).toHaveText(name);
        await expect(qtyLocator).toHaveText(`${qty}`);

        const above = Number((await priceAbove.textContent())?.replace('$', '') || 0);
        const inCart = Number((await priceInCart.textContent())?.replace('$', '') || 0);
        const total = Number((await totalLocator.textContent())?.replace('$', '') || 0);

        expect(above).toBe(inCart);
        expect(total).toBe(inCart * qty);
      });
    }
  });
});
