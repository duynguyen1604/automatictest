import { test } from '@playwright/test';
import { ProductPage } from '../pages/productPage';

test.describe('Bài học 2: Product Page', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

  test('Thêm sản phẩm vào giỏ', async () => {
    await productPage.addProduct(1, 2);
    await productPage.addProduct(2, 3);
    await productPage.addProduct(3, 1);

    await productPage.verifyQuantity('Product 1', '2');
    await productPage.verifyQuantity('Product 2', '3');
    await productPage.verifyQuantity('Product 3', '1');
  });
});
