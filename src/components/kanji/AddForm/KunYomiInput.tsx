"use client";

import { InputList } from "@/components/ui/InputList";
import { convertInputToHiragana } from "@/lib/utils/convertInputToJapanese";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "kunYomi">;

const KunYomiInput = ({ errors, disabled }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.kunYomi");
  return (
    <InputList<FormData>
      label={t("label")}
      name="kunYomi"
      setValueAs={convertInputToHiragana}
      errors={errors?.kunYomi?.params?.indexes as number[]}
      disabled={disabled}
    />
  );
};

export default KunYomiInput;
