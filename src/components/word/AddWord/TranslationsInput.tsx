"use client";

import type { WordFormType } from "@/lib/validation/schemas/word";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<WordFormType, "translations">;

const TranslationsInput = ({ errors }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addWord.translations");
  return (
    <TextField
      id="wordTranslation"
      label={t("label")}
      name="translations"
      fullWidth
      type="text"
      helperText={t("description")}
      required
      error={!!errors?.translations}
    />
  );
};

export default TranslationsInput;
