import { getLocalizedTranslations } from "./getLocalizedTranslations";

describe("Localized translations tests", () => {
  it("Return the matching translations set", () => {
    const translations = { en: ["hello"], fr: ["bonjour"] };
    expect(getLocalizedTranslations(translations, "en")).toEqual(["hello"]);
    expect(getLocalizedTranslations(translations, "fr")).toEqual(["bonjour"]);
  });
  it("Return the default translations (en) set when the locale is not found", () => {
    const translations = { en: ["hello"], fr: ["bonjour"] };
    expect(getLocalizedTranslations(translations, "it")).toEqual(["hello"]);
  });
  it("Return an empty state if no translations or no EN translations", () => {
    const translations = { es: ["hola"], fr: ["bonjour"] };
    expect(getLocalizedTranslations(translations, "it")).toEqual(["-"]);
    expect(getLocalizedTranslations(undefined, "en")).toEqual(["-"]);
  });
});
