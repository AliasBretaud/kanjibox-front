"use client";

import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "value">;

const ValueInput = ({ errors }: FormProps<FormData>) => {
  const t = useTranslations("modals.addKanji");
  return (
    <TextField
      autoFocus
      name="value"
      label={t("value")}
      fullWidth
      type="text"
      error={!!errors?.value}
      inputProps={{ maxLength: 1 }}
      required
    />
  );
};

export default ValueInput;
