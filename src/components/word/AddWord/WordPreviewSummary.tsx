import {
  PreviewContainer,
  createRow,
  createTranslationsRow,
} from "@/components/form/PreviewContainer";
import type { $Word } from "@/types/models";
import { useLocale, useTranslations } from "next-intl";

export const WordPreviewSummary = ({
  value,
  furiganaValue,
  translations = {},
}: $Word) => {
  const t = useTranslations("modals.addWord");
  const locale = useLocale();

  const rows = [
    createRow("value", t("value"), value),
    createRow("furiganaValue", t("furigana"), furiganaValue),
    createTranslationsRow(translations, locale, t("translations")),
  ];
  return <PreviewContainer title={t("preview")} rows={rows} />;
};
