import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { Locator, Page } from "@playwright/test";
import { fillInputList } from "e2e/utils/inputUtils";

type KanjiForm = Partial<Record<keyof KanjiFormType, Locator>>;

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
      await this.addKanjiForm.value?.fill(value);
    }
    if (autoDetectReadings) {
      await this.addKanjiForm.autoDetectReadings?.check();
    }
    if (onYomi) {
      await fillInputList(this.page, "onYomi", onYomi);
    }
    if (kunYomi) {
      await fillInputList(this.page, "kunYomi", kunYomi);
    }
    if (translations) {
      await fillInputList(this.page, "translations", translations);
    }
  }

  public async submitAddKanjiForm() {
    const formAddButton = this.page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    await formAddButton.click();
  }
}