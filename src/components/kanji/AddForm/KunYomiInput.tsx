"use client";

import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "kunYomi">;

const KunYomiInput = ({
  value,
  onChange,
  errors,
  disabled,
}: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.kunYomi");
  return (
    <TextField
      label={t("label")}
      name="kunYomi"
      multiline
      maxRows={4}
      value={value}
      onChange={onChange}
      helperText={t("description")}
      error={!!errors?.kunYomi}
      disabled={disabled}
    />
  );
};

export default KunYomiInput;
