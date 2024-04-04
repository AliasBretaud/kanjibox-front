"use client";

import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "onYomi">;

const OnYomiInput = ({
  value,
  onChange,
  errors,
  disabled,
}: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.onYomi");
  return (
    <TextField
      label={t("label")}
      name="onYomi"
      multiline
      maxRows={4}
      value={value}
      onChange={onChange}
      helperText={t("description")}
      error={!!errors?.onYomi}
      disabled={disabled}
    />
  );
};

export default OnYomiInput;
