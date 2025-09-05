import { expect, test } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';
import { TodoPageAssertions } from '../assertions/todoPageAssertions';
import { acceptDialogs } from '../helpers/dialogHandler';

test.describe('Bài học 3: Todo page', () => {
  test('Thêm 100 task và xoá các task lẻ', async ({ page }) => {
    await acceptDialogs(page);

    const todoPage = new TodoPage(page);
    const assertions = new TodoPageAssertions(page, todoPage);

    await test.step('Mở Todo page', async () => {
      await todoPage.goto();
    });

    await test.step('Thêm 100 task', async () => {
      await todoPage.addMultipleTasks(100);
      await expect(todoPage.tasks).toHaveCount(100);
    });

    await test.step('Xoá các task có số lẻ', async () => {
      await todoPage.deleteOddTasks(100);
      await expect(todoPage.tasks).toHaveCount(50);
    });

    for (let i = 2; i <= 100; i += 2) {
       await expect(todoPage.page.locator(`//li[.//span[text()="${i}"]]`)).toBeVisible();
    }

    for (let i = 1; i <= 100; i += 2) {
      await expect(todoPage.page.locator(`//li[.//span[text()="${i}"]]`)).toHaveCount(0);
    }
  });
});
