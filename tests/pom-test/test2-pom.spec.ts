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
      });
      await test.step(`Verify các trường của Product ${id} với số lượng ${qty} `, async () => {
        const nameLocator = productPage.getProductNameInCart(id);
        const qtyLocator = productPage.getProductQtyInCart(id);
        const priceAbove = productPage.getProductPriceAbove(id);
        const priceInCart = productPage.getProductPriceInCart(id);
        const totalLocator = productPage.getProductTotalInCart(id);

        await expect(nameLocator).toHaveText(`Product ${id}`);
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
