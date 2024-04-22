"use client";

import type { InputListProps } from "@/components/ui/InputList";
import { InputList } from "@/components/ui/InputList";
import { convertInputToHiragana } from "@/lib/utils/convertInputToJapanese";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "kunYomi">;

const KunYomiInput = ({
  errors,
  disabled,
  onChange,
  values,
}: Pick<
  InputListProps<FormData>,
  "errors" | "disabled" | "onChange" | "values"
>) => {
  const t = useTranslations("modals.addKanji.kunYomi");
  return (
    <InputList<FormData>
      label={t("label")}
      name="kunYomi"
      setValueAs={convertInputToHiragana}
      errors={errors}
      disabled={disabled}
      values={values}
      onChange={(values) => onChange(values.splice(0, 3))}
      maxLength={11}
    />
  );
};

export default KunYomiInput;
