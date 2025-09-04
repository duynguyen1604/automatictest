import { test } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

test.describe('Bài học 3: Todo page', () => {
  test('Thêm 100 task và xoá các task lẻ', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Mở Todo page', async () => {
      await todoPage.goto();
    });

    await test.step('Thêm 100 task', async () => {
      await todoPage.addMultipleTasks(100);
      await todoPage.verifyTasksCount(100);
    });

    await test.step('Xoá các task có số lẻ', async () => {
      await todoPage.deleteOddTasks(100);
      await todoPage.verifyTasksCount(50);
    });

    for (let i = 2; i <= 100; i += 2) {
      await todoPage.verifyTaskVisible(`${i}`);
    }

    for (let i = 1; i <= 100; i += 2) {
      await todoPage.verifyTaskNotExist(`${i}`);
    }
  });
});
