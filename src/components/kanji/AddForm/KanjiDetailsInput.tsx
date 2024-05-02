import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormProps } from "@/types/form";
import { Collapse, DialogContentText, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import AutoDetectSwitch from "@/components/form/AutoDetectSwitch";
import OnYomiInput from "./OnYomiInput";
import { BlockDivider } from "@/components/ui/BlockDivider";
import KunYomiInput from "./KunYomiInput";
import TranslationsInput from "./TranslationsInput";
import ValueInput from "./ValueInput";
import ValidationErrors from "@/components/form/ValidationErrors";
import { hasValidationErrors } from "@/lib/utils/hasValidationErrors";
import type { ReactNode } from "react";

const isVisible = (
  value: keyof KanjiFormType,
  hiddenFields?: (keyof KanjiFormType)[],
) => !hiddenFields || !hiddenFields.includes(value);

export const KanjiDetailsInput = ({
  description,
  errors,
  onChange,
  values,
  hiddenFields,
}: {
  description?: ReactNode;
  errors: FormProps<KanjiFormType>["errors"];
  onChange: (values: KanjiFormType) => void;
  values: KanjiFormType;
  hiddenFields?: (keyof KanjiFormType)[];
}) => {
  const t = useTranslations("modals.addKanji");
  return (
    <>
      {description && (
        <DialogContentText marginBottom={2}>{description}</DialogContentText>
      )}
      <Grid container alignItems="flex-start" spacing={2}>
        {isVisible("value", hiddenFields) && (
          <Grid item xs={12}>
            <ValueInput
              errors={errors}
              value={values.value}
              onChange={(e) => onChange({ ...values, value: e.target.value })}
            />
          </Grid>
        )}
        {isVisible("autoDetect", hiddenFields) && (
          <Grid item xs={12}>
            <AutoDetectSwitch
              label={t("autoDetect")}
              checked={!!values.autoDetect}
              onChange={(evt) =>
                onChange({ ...values, autoDetect: evt.target.checked })
              }
            />
          </Grid>
        )}
        <Grid item container>
          <Collapse in={!values.autoDetect}>
            <Grid container item spacing={2}>
              {isVisible("onYomi", hiddenFields) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <OnYomiInput
                      values={values.onYomi || [""]}
                      errors={errors?.onYomi?.params?.indexes as number[]}
                      onChange={(onYomi) => onChange({ ...values, onYomi })}
                      disabled={values.autoDetect}
                    />
                  </Grid>

                  <BlockDivider />
                </>
              )}
              {isVisible("kunYomi", hiddenFields) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <KunYomiInput
                      values={values.kunYomi || [""]}
                      errors={errors?.kunYomi?.params?.indexes as number[]}
                      onChange={(kunYomi) => onChange({ ...values, kunYomi })}
                      disabled={values.autoDetect}
                    />
                  </Grid>
                  <BlockDivider />
                </>
              )}
              {isVisible("translations", hiddenFields) && (
                <Grid item xs={12}>
                  <TranslationsInput
                    values={values.translations || [""]}
                    errors={errors?.translations?.params?.indexes as number[]}
                    onChange={(translations) =>
                      onChange({ ...values, translations })
                    }
                    disabled={values.autoDetect}
                  />
                </Grid>
              )}
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      {errors && hasValidationErrors(errors) && (
        <ValidationErrors<KanjiFormType>
          errors={errors}
          tKey="validations.kanji"
        />
      )}
    </>
  );
};
