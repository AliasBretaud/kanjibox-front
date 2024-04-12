import { expect, test } from "@playwright/test";

test("Search a kanji", async ({ page }) => {
  await page.goto("http://localhost:3000/en");

  const searchInput = page.getByPlaceholder("キーワードを入力");
  const searchButton = page.getByTestId("search");
  await searchInput.fill("話");
  await searchButton.click();

  const value = page.getByText("話");

  await expect(value).toBeVisible();
  await expect(value).toHaveClass(/font-kanji/);
  await expect(page.getByText("ワ")).toBeVisible();
  await expect(page.getByText("はな.す")).toBeVisible();
  await expect(page.getByText("はなし")).toBeVisible();
  await expect(page.getByText("tale")).toBeVisible();
  await expect(page.getByText("talk")).toBeVisible();
});
