import { expect, test } from "@playwright/test";
import { KanjisPage } from "./page-utils/kanjis-page";

test.describe("Kanji Search", () => {
  test("should diplay the requested kanji info", async ({ page }) => {
    await page.goto("http://localhost:3000/en/");

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
});

test.describe("Add a new kanji", () => {
  test("All infos filled", async ({ page }) => {
    // Kanjis page
    await page.goto("http://localhost:3000/en/kanjis");

    const kanjisPage = new KanjisPage(page);

    // Add kanji
    await kanjisPage.openAddKanjiForm();
    await kanjisPage.fillAddKanjiForm({
      value: "犬",
      onYomi: "ケン",
      kunYomi: "いぬ",
      translations: "dog",
    });
    await kanjisPage.submitAddKanjiForm();

    // Ok notification
    const notif = page.getByText("Kanji added !");
    await expect(notif).toBeVisible();
  });

  test("With auto-detect readings", async ({ page }) => {
    // Kanjis page
    await page.goto("http://localhost:3000/en/kanjis");

    const kanjisPage = new KanjisPage(page);

    // Add kanji
    await kanjisPage.openAddKanjiForm();
    await kanjisPage.fillAddKanjiForm({
      value: "猫",
      autoDetectReadings: true,
    });
    await kanjisPage.submitAddKanjiForm();

    // Ok notification
    const notif = page.getByText("Kanji added !");
    await expect(notif).toBeVisible();
  });

  test("Form validations", async ({ page }) => {
    // Kanjis page
    await page.goto("http://localhost:3000/en/kanjis");

    const kanjisPage = new KanjisPage(page);

    // Add kanji
    await kanjisPage.openAddKanjiForm();
    await kanjisPage.fillAddKanjiForm({ value: "A" });
    // Empty values
    await kanjisPage.submitAddKanjiForm();
    // Get errors
    const errors = page.getByTestId("error-messages");
    const messages = [
      "Kanji value format required (Japanese)",
      "ON reading(s) required (katakana)",
      "KUN reading(s) required (hiragana)",
      "Translation(s) required",
    ];
    for (const m of messages) {
      await expect(errors).toContainText(m);
    }
  });
});
