import capitalize from "@/lib/utils/capitalize";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import type { $Kanji } from "@/types/models";
import {
  Chip,
  DialogContentText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useLocale } from "next-intl";
import type { ReactNode } from "react";

const createRow = (key: string, title: ReactNode, value?: ReactNode) => (
  <TableRow key={key}>
    <TableCell>{title}</TableCell>
    <TableCell>{value || ""}</TableCell>
  </TableRow>
);

const getTranslationsRow = (
  translations: NonNullable<$Kanji["translations"]>,
  locale: string,
  label: string,
) => {
  const hasTranslationForLocale =
    locale !== "ja" && Object.keys(translations).includes(locale);
  const localizedtranslations = getLocalizedTranslations(translations, locale);

  const title = hasTranslationForLocale ? (
    label
  ) : (
    <Stack direction="row" spacing={1} alignItems="center">
      <span>{label}</span>
      <Chip size="small" label="EN" />
    </Stack>
  );

  return createRow(
    "translations",
    title,
    localizedtranslations.map(capitalize).join(", "),
  );
};

export const KanjiPreviewSummary = ({
  value,
  onYomi,
  kunYomi,
  translations = {},
}: $Kanji) => {
  const locale = useLocale();

  const rows = [
    createRow("value", "Value", value),
    createRow("onYomi", "On Yomi", onYomi?.join(", ")),
    createRow("kunYomi", "Kun Yomi", kunYomi?.join(", ")),
    getTranslationsRow(translations, locale, "Translations"),
  ];
  return (
    <>
      <DialogContentText marginBottom={2}>
        The kanji with the following auto-generated information. You can add the
        kanji if these values seems correct to you, otherwise go back and enter
        manually the information
      </DialogContentText>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: 1, borderColor: "primary.main" }}
      >
        <Table>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
