import { test } from '@playwright/test';
import { ProductPage } from '../pages/productPage';
import { ProductPageAssertions } from '../assertions/productPageAssertions';

test.describe('Bài học 2: Product Page', () => {
  let productPage: ProductPage;
  let assertions: ProductPageAssertions;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    assertions = new ProductPageAssertions(page);
    await productPage.goto();
  });

  test('Thêm sản phẩm vào giỏ', async () => {
    await productPage.addProduct(1, 2);
    await productPage.addProduct(2, 3);
    await productPage.addProduct(3, 1);

    await assertions.expectQuantity('Product 1', '2');
    await assertions.expectQuantity('Product 2', '3');
    await assertions.expectQuantity('Product 3', '1');
  });
});