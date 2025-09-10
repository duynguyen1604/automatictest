import { Page } from '@playwright/test';

export async function acceptDialogs(page: Page) {
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
}
