import type { WordFormType } from "@/lib/validation/schemas/word";
import type { Locator, Page } from "@playwright/test";
import { fillInputList } from "e2e/utils/inputUtils";

type WordForm = Record<keyof WordFormType, Locator>;

export class WordsPage {
  private readonly page: Page;
  private readonly addWordForm: WordForm;

  constructor(page: Page) {
    this.page = page;
    this.addWordForm = {
      value: this.page.getByLabel("Word Value"),
      autoDetect: this.page.getByLabel(
        "Automatic detection of reading/translations",
      ),
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
    autoDetect,
    furiganaValue,
    translations,
  }: Partial<WordFormType>) {
    if (value) {
      await this.addWordForm.value.fill(value);
    }
    if (autoDetect === false) {
      await this.addWordForm.autoDetect.uncheck();
    }
    if (furiganaValue) {
      await this.addWordForm.furiganaValue.fill(furiganaValue);
    }
    if (translations) {
      await fillInputList(this.page, "translations", translations);
    }
  }

  public async submitAddWordForm() {
    const formAddButton = this.page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    await formAddButton.click();
  }

  public async nextStep() {
    const nextButton = this.page.getByRole("button", {
      name: "Next",
      exact: true,
    });
    await nextButton.click();
  }
}
