import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class TodoPage extends BasePage {
  readonly locatorTaskInput: Locator;
  readonly locatorAddButton: Locator;
  readonly locatorTaskItems: Locator;

  constructor(page: Page) {
    super(page);
    this.locatorTaskInput = page.locator('#new-task');
    this.locatorAddButton = page.locator('#add-task');
    this.locatorTaskItems = page.locator('//li');
  }

  async goto() {
    await super.goto('Bài học 3: Todo page');
  }

  async addTask(name: string) {
    await this.locatorTaskInput.fill(name);
    await this.locatorAddButton.click();
  }

  async deleteTask(name: string) {
    const deleteButton = this.page.locator(`//li[.//span[text()="${name}"]]//button[text()="Delete"]`);
    await deleteButton.click();
  }
  getTask(name: string): Locator {
    return this.page.locator(`//li[.//span[text()="${name}"]]`);
  }
}
