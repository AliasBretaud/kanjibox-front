"use client";

import type { InputListProps } from "@/components/ui/InputList";
import { InputList } from "@/components/ui/InputList";
import type { WordFormType } from "@/lib/validation/schemas/word";
import { useTranslations } from "next-intl";

type FormData = Pick<WordFormType, "translations">;

const TranslationsInput = ({
  errors,
  disabled,
  onChange,
  values,
}: Pick<
  InputListProps<FormData>,
  "errors" | "disabled" | "onChange" | "values"
>) => {
  const t = useTranslations("modals.addWord");
  return (
    <InputList<FormData>
      label={t("translations")}
      name="translations"
      errors={errors}
      disabled={disabled}
      maxLength={50}
      values={values || [""]}
      onChange={onChange}
      required
    />
  );
};

export default TranslationsInput;
