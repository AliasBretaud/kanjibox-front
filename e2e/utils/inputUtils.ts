import type { Page } from "@playwright/test";

const fillInputList = async (page: Page, name: string, values: string[]) => {
  const locator = page.locator(`[name=${name}]`);
  for (let i = 0; i < values.length; i++) {
    await locator.nth(i).fill(values[i]);
    if (values.length > 1 && i < values.length - 1) {
      await page.getByTestId(`add-${name}-${i}`).click();
    }
  }
};

export { fillInputList };
