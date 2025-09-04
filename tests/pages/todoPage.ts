import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class TodoPage extends BasePage {
  readonly newTaskInput: Locator;
  readonly addTaskButton: Locator;
  readonly tasks: Locator;

  constructor(page: Page) {
    super(page);
    this.newTaskInput = page.locator('#new-task');
    this.addTaskButton = page.locator('#add-task');
    this.tasks = page.locator('//li');
  }

  async goto() {
    const basePage= new BasePage(this.page);
    await basePage.goto('https://material.playwrightvn.com/');
    await this.page.getByText('Bài học 3: Todo page').click();
  }

  async addTask(name: string) {
    await this.newTaskInput.fill(name);
    await this.addTaskButton.click();
  }

  async addMultipleTasks(count: number) {
    for (let i = 1; i <= count; i++) {
      await this.addTask(`${i}`);
    }
  }

  async deleteTask(name: string) {
    const deleteButton = this.page.locator(`//li[.//span[text()="${name}"]]//button[text()="Delete"]`);
    await deleteButton.click();
  }

  async deleteOddTasks(max: number) {
    for (let i = 1; i <= max; i += 2) {
      await this.deleteTask(`${i}`);
    }
  }

}
