import { expect, test } from "@playwright/test";
import { WordsPage } from "./pages/words-page";

test.describe("Add a new word", () => {
  test("All infos filled", async ({ page }) => {
    // Words page
    await page.goto("http://localhost:3000/en/words");

    const wordsPage = new WordsPage(page);

    // Add word
    await wordsPage.openAddWordForm();
    await wordsPage.fillAddWordForm({
      value: "言葉",
      autoDetect: false,
      furiganaValue: "ことば",
      translations: ["Word"],
    });
    await wordsPage.submitAddWordForm();

    // Ok notification
    const notif = page.getByText("Word added !");
    await expect(notif).toBeVisible();
  });

  test("With auto-detect readings", async ({ page }) => {
    // Kanjis page
    await page.goto("http://localhost:3000/en/words");

    const wordsPage = new WordsPage(page);

    // Add word
    await wordsPage.openAddWordForm();
    await wordsPage.fillAddWordForm({
      value: "高級",
    });
    await wordsPage.nextStep();
    await wordsPage.submitAddWordForm();

    // Ok notification
    const notif = page.getByText("Word added !");
    await expect(notif).toBeVisible();
  });

  test("Form validations", async ({ page }) => {
    // Words page
    await page.goto("http://localhost:3000/en/words");

    const wordsPage = new WordsPage(page);

    // Add word
    await wordsPage.openAddWordForm();
    await wordsPage.fillAddWordForm({
      value: "A",
      autoDetect: false,
      furiganaValue: "N",
      translations: ["こ"],
    });
    // Empty values
    await wordsPage.submitAddWordForm();
    // Get errors
    const errors = page.getByTestId("error-messages");
    const messages = [
      "Word value required (Japanese)",
      "Furigana transcription required (hiragana)",
      "Translation(s) required",
    ];
    for (const m of messages) {
      await expect(errors).toContainText(m);
    }
  });
});
