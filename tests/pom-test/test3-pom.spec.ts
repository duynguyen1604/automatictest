import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';
import { acceptDialogs } from '../helpers/dialogHandler';

test.describe('Bài học 3: Todo page', () => {
  test('Thêm 100 task và xoá các task lẻ', async ({ page }) => {
    await acceptDialogs(page);
    const todoPage = new TodoPage(page);

    await test.step('Mở Todo page', async () => {
      await todoPage.goto();
    });

    await test.step('Thêm 100 task', async () => {
      for (let i = 1; i <= 100; i++) {
        await todoPage.addTask(`${i}`);
      }
      await expect(todoPage.locatorTaskItems).toHaveCount(100);
    });

    await test.step('Xoá các task có số lẻ', async () => {
      for (let i = 1; i <= 100; i += 2) {
        await todoPage.deleteTask(`${i}`);
      }
      await expect(todoPage.locatorTaskItems).toHaveCount(50);
    });

    await test.step('Verify còn lại các task chẵn', async () => {
      for (let i = 1; i <= 100; i++) {
        if (i % 2 === 0) {
          await expect(todoPage.getTask(`${i}`)).toBeVisible();
        } else {
          await expect(todoPage.getTask(`${i}`)).toHaveCount(0);
        }
      }
    });
  });
});
