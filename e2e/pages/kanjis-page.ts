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
      autoDetect: this.page.getByLabel(
        "Automatic detection of readings/translations",
      ),
    };
  }

  public async openAddKanjiModal() {
    const addButton = this.page.getByRole("button", { name: "Add Kanji" });
    await addButton.click();
  }

  public async fillAddKanjiForm({
    value,
    autoDetect,
    kunYomi,
    onYomi,
    translations,
  }: Partial<KanjiFormType>) {
    if (value) {
      await this.addKanjiForm.value?.fill(value);
    }
    if (autoDetect === false) {
      await this.addKanjiForm.autoDetect?.uncheck();
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

  public async nextStep() {
    const nextButton = this.page.getByRole("button", {
      name: "Next",
      exact: true,
    });
    await nextButton.click();
  }

  public async submitAddKanjiForm() {
    const formAddButton = this.page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    await formAddButton.click();
  }
}
