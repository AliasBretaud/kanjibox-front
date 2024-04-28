import capitalize from "@/lib/utils/capitalize";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import type { $Kanji, $Word } from "@/types/models";
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
import type { ReactNode } from "react";

export const createRow = (key: string, title: ReactNode, value?: ReactNode) => (
  <TableRow key={key}>
    <TableCell>{title}</TableCell>
    <TableCell>{value || "-"}</TableCell>
  </TableRow>
);

export function createTranslationsRow<T extends $Kanji | $Word>(
  translations: NonNullable<T["translations"]>,
  locale: string,
  label: string,
) {
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
}

export const PreviewContainer = ({
  title,
  rows,
}: {
  title: string;
  rows: JSX.Element[];
}) => {
  return (
    <>
      <DialogContentText marginBottom={2}>{title}</DialogContentText>
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
