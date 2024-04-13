import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { Locator, Page } from "@playwright/test";

type KanjiForm = Record<keyof KanjiFormType, Locator>;

export class KanjisPage {
  private readonly page: Page;
  private readonly addKanjiForm: KanjiForm;

  constructor(page: Page) {
    this.page = page;
    this.addKanjiForm = {
      value: this.page.getByLabel("Kanji Value"),
      autoDetectReadings: this.page.getByLabel(
        "Automatic detection of readings/translations",
      ),
      onYomi: this.page.getByLabel("On Yomi"),
      kunYomi: this.page.getByLabel("Kun Yomi"),
      translations: this.page.getByLabel("Translations", { exact: true }),
    };
  }

  public async openAddKanjiForm() {
    const addButton = this.page.getByRole("button", { name: "Add Kanji" });
    await addButton.click();
  }

  public async fillAddKanjiForm({
    value,
    autoDetectReadings,
    kunYomi,
    onYomi,
    translations,
  }: Partial<KanjiFormType>) {
    if (value) {
      await this.addKanjiForm.value.fill(value);
    }
    if (autoDetectReadings) {
      await this.addKanjiForm.autoDetectReadings.check();
    }
    if (onYomi) {
      await this.addKanjiForm.onYomi.fill(onYomi);
    }
    if (kunYomi) {
      await this.addKanjiForm.kunYomi.fill(kunYomi);
    }
    if (translations) {
      await this.addKanjiForm.translations.fill(translations);
    }
  }

  public async submitAddKanjiForm() {
    const formAddButton = this.page.getByRole("button", { name: "Add" });
    await formAddButton.click();
  }
}
