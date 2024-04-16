"use client";

import { InputList } from "@/components/ui/InputList";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "translations">;

const TranslationsInput = ({ disabled, errors }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.translations");
  return (
    <InputList<FormData>
      label={t("label")}
      name="translations"
      errors={errors?.translations?.params?.indexes as number[]}
      disabled={disabled}
      maxLength={50}
    />
  );
};

export default TranslationsInput;
