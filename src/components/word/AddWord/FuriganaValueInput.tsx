"use client";

import type { WordFormType } from "@/lib/validation/schemas/word";
import type { FormInputProps } from "@/types/form";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";

type FormData = Pick<WordFormType, "furiganaValue">;

const FuriganaValueInput = ({
  value,
  onChange,
  errors,
}: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addWord");
  return (
    <TextField
      id="wordFuriganaValue"
      label={t("furigana")}
      name="furiganaValue"
      fullWidth
      type="text"
      value={value}
      onChange={onChange}
      required
      error={!!errors?.furiganaValue}
    />
  );
};

export default FuriganaValueInput;
