import type { FormProps } from "@/types/form";
import { Collapse, DialogContentText, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import TranslationsInput from "./TranslationsInput";
import ValueInput from "./ValueInput";
import ValidationErrors from "@/components/form/ValidationErrors";
import type { WordFormType } from "@/lib/validation/schemas/word";
import FuriganaValueInput from "./FuriganaValueInput";
import { isKana } from "wanakana";
import { convertInputToHiragana } from "@/lib/utils/convertInputToJapanese";
import type { ChangeEvent } from "react";
import AutoDetectSwitch from "@/components/form/AutoDetectSwitch";

const isVisible = (
  value: keyof WordFormType,
  hiddenFields?: (keyof WordFormType)[],
) => !hiddenFields || !hiddenFields.includes(value);

export const WordDetailsInput = ({
  errors,
  onChange,
  values,
  hiddenFields,
}: {
  errors: FormProps<WordFormType>["errors"];
  onChange: (values: WordFormType) => void;
  values: WordFormType;
  hiddenFields?: (keyof WordFormType)[];
}) => {
  const t = useTranslations("modals.addWord");
  const isValueKana = isKana(values.value);
  const formatFurigana = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    onChange({
      ...values,
      furiganaValue: convertInputToHiragana(evt.target.value),
    });
  return (
    <>
      <DialogContentText marginBottom={2}>
        {t(`description.${values.autoDetect ? "auto" : "manual"}`)}
      </DialogContentText>
      <Grid container alignItems="flex-start" spacing={2}>
        {isVisible("value", hiddenFields) && (
          <Grid item xs={12}>
            <ValueInput
              value={values.value}
              onChange={(e) => onChange({ ...values, value: e.target.value })}
              errors={errors}
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
          <Collapse in={!values.autoDetect} sx={{ flex: 1 }}>
            <Grid container item spacing={2}>
              {isVisible("furiganaValue", hiddenFields) && (
                <Grid item xs={12}>
                  <FuriganaValueInput
                    value={values.furiganaValue}
                    onChange={formatFurigana}
                    disabled={isValueKana || values.autoDetect}
                    required={!isValueKana && !values.autoDetect}
                    errors={errors}
                  />
                </Grid>
              )}
              {isVisible("translations", hiddenFields) && (
                <Grid item xs={12}>
                  <TranslationsInput
                    values={values.translations}
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
      {errors && (
        <ValidationErrors<WordFormType>
          errors={errors}
          tKey="validations.word"
        />
      )}
    </>
  );
};
