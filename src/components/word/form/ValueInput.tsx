"use client";

import type { WordFormType } from "@/lib/validation/schemas/word";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<WordFormType, "value">;

const ValueInput = ({ errors, value, onChange }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addWord");
  return (
    <TextField
      autoFocus
      id="wordValue"
      name="value"
      label={t("value")}
      fullWidth
      type="text"
      required
      value={value}
      onChange={onChange}
      error={!!errors?.value}
      inputProps={{ maxLength: 5 }}
    />
  );
};

export default ValueInput;
