"use client";

import type { InputListProps } from "@/components/ui/InputList";
import { InputList } from "@/components/ui/InputList";
import { convertInputToKatakana } from "@/lib/utils/convertInputToJapanese";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "onYomi">;

const OnYomiInput = ({
  errors,
  disabled,
  onChange,
  values,
}: Pick<
  InputListProps<FormData>,
  "errors" | "disabled" | "onChange" | "values"
>) => {
  const t = useTranslations("modals.addKanji");
  return (
    <InputList<FormData>
      label={t("onYomi")}
      name="onYomi"
      setValueAs={convertInputToKatakana}
      errors={errors}
      disabled={disabled}
      maxLength={4}
      onChange={onChange}
      values={values}
    />
  );
};

export default OnYomiInput;
