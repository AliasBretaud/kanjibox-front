"use client";

import { InputList } from "@/components/ui/InputList";
import type { WordFormType } from "@/lib/validation/schemas/word";
import type { FormInputProps } from "@/types/form";
import { useTranslations } from "next-intl";

type FormData = Pick<WordFormType, "translations">;

const TranslationsInput = ({ errors }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addWord.translations");
  return (
    <InputList<FormData>
      label={t("label")}
      name="translations"
      errors={errors?.translations?.params?.indexes as number[]}
      required
      maxLength={50}
    />
  );
};

export default TranslationsInput;
