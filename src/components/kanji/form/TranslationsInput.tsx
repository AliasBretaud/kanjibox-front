"use client";

import type { InputListProps } from "@/components/ui/InputList";
import { InputList } from "@/components/ui/InputList";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { useTranslations } from "next-intl";

type FormData = Pick<KanjiFormType, "translations">;

const TranslationsInput = ({
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
      label={t("translations")}
      name="translations"
      errors={errors}
      disabled={disabled}
      maxLength={50}
      values={values}
      onChange={onChange}
      required
    />
  );
};

export default TranslationsInput;
