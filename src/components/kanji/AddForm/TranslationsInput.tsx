"use client";

import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "translations">;

const TranslationsInput = ({
  value,
  onChange,
  disabled,
  errors,
}: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.translations");
  return (
    <TextField
      label={t("label")}
      name="translations"
      fullWidth
      type="text"
      value={value}
      onChange={onChange}
      helperText={t("description")}
      error={!!errors?.translations}
      disabled={disabled}
    />
  );
};

export default TranslationsInput;
