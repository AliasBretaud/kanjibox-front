"use client";

import { InputList } from "@/components/ui/InputList";
import { convertInputToKatakana } from "@/lib/utils/convertInputToJapanese";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormInputProps } from "@/types/form";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "onYomi">;

const OnYomiInput = ({ errors, disabled }: FormInputProps<FormData>) => {
  const t = useTranslations("modals.addKanji.onYomi");
  return (
    <InputList<FormData>
      label={t("label")}
      name="onYomi"
      setValueAs={convertInputToKatakana}
      errors={errors?.onYomi?.params?.indexes as number[]}
      disabled={disabled}
    />
  );
};

export default OnYomiInput;
