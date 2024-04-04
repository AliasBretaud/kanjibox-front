import type { MappedValue } from "@/types/utils";

export const getLocalizedTranslations = (
  translations: MappedValue<string, string[]> | undefined,
  locale: string,
) => {
  if (translations) {
    const localizedTranslations = translations[locale]?.length
      ? translations[locale]
      : translations["en"];
    return localizedTranslations?.length ? localizedTranslations : ["-"];
  }

  return ["-"];
};

export default getLocalizedTranslations;
