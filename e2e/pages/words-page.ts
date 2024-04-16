import type { WordFormType } from "@/lib/validation/schemas/word";
import type { Locator, Page } from "@playwright/test";

type WordForm = Record<keyof WordFormType, Locator>;

export class WordsPage {
  private readonly page: Page;
  private readonly addWordForm: WordForm;

  constructor(page: Page) {
    this.page = page;
    this.addWordForm = {
      value: this.page.getByLabel("Word Value"),
      furiganaValue: this.page.getByLabel("Furigana Transcription"),
      translations: this.page.getByLabel("Translations"),
    };
  }

  public async openAddWordForm() {
    const addButton = this.page.getByRole("button", { name: "Add Word" });
    await addButton.click();
  }

  public async fillAddWordForm({
    value,
    furiganaValue,
    translations,
  }: Partial<WordFormType>) {
    if (value) {
      await this.addWordForm.value.fill(value);
    }
    if (furiganaValue) {
      await this.addWordForm.furiganaValue.fill(furiganaValue);
    }
    if (translations) {
      await this.addWordForm.translations.fill(translations);
    }
  }

  public async submitAddWordForm() {
    const formAddButton = this.page.getByRole("button", { name: "Add" });
    await formAddButton.click();
  }
}
