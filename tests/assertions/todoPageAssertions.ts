import { expect, Page } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

export class TodoPageAssertions {
  constructor(private page: Page, private todoPage: TodoPage) {}

  async expectTasksCount(expected: number) {
    await expect(this.todoPage.tasks).toHaveCount(expected);
  }

  async expectTaskVisible(name: string) {
    await expect(this.page.locator(`//li[.//span[text()="${name}"]]`)).toBeVisible();
  }

  async expectTaskNotExist(name: string) {
    await expect(this.page.locator(`//li[.//span[text()="${name}"]]`)).toHaveCount(0);
  }
}
