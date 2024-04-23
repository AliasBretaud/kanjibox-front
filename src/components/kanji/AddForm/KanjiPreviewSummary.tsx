import {
  PreviewContainer,
  createRow,
  createTranslationsRow,
} from "@/components/PreviewContainer";
import type { $Kanji } from "@/types/models";
import { useLocale, useTranslations } from "next-intl";

export const KanjiPreviewSummary = ({
  value,
  onYomi,
  kunYomi,
  translations = {},
}: $Kanji) => {
  const t = useTranslations("modals.addKanji");
  const locale = useLocale();

  const rows = [
    createRow("value", t("value"), value),
    createRow("onYomi", t("onYomi"), onYomi?.join(", ")),
    createRow("kunYomi", t("kunYomi"), kunYomi?.join(", ")),
    createTranslationsRow(translations, locale, t("translations")),
  ];
  return <PreviewContainer title={t("preview")} rows={rows} />;
};
