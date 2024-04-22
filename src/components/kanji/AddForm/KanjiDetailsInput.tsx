import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormProps } from "@/types/form";
import { Collapse, DialogContentText, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import AutoDetectReadingsSwitch from "./AutoDetectReadingsSwitch";
import OnYomiInput from "./OnYomiInput";
import { BlockDivider } from "@/components/ui/BlockDivider";
import KunYomiInput from "./KunYomiInput";
import TranslationsInput from "./TranslationsInput";
import ValueInput from "./ValueInput";
import ValidationErrors from "@/components/form/ValidationErrors";
import { hasValidationErrors } from "@/lib/utils/hasValidationErrors";

export const KanjiDetailsInput = ({
  errors,
  onChange,
  values,
}: {
  errors: FormProps<KanjiFormType>["errors"];
  onChange: (values: KanjiFormType) => void;
  values: KanjiFormType;
}) => {
  const t = useTranslations("modals.addKanji");
  return (
    <>
      <DialogContentText marginBottom={2}>{t("description")}</DialogContentText>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <ValueInput
            errors={errors}
            value={values.value}
            onChange={(e) => onChange({ ...values, value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <AutoDetectReadingsSwitch
            checked={!!values.autoDetectReadings}
            onChange={(evt) =>
              onChange({ ...values, autoDetectReadings: evt.target.checked })
            }
          />
        </Grid>
        <Grid item container>
          <Collapse in={!values.autoDetectReadings}>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={6}>
                <OnYomiInput
                  values={values.onYomi || [""]}
                  errors={errors?.onYomi?.params?.indexes as number[]}
                  onChange={(onYomi) => onChange({ ...values, onYomi })}
                  disabled={values.autoDetectReadings}
                />
              </Grid>
              <BlockDivider />
              <Grid item xs={12} sm={6}>
                <KunYomiInput
                  values={values.kunYomi || [""]}
                  errors={errors?.kunYomi?.params?.indexes as number[]}
                  onChange={(kunYomi) => onChange({ ...values, kunYomi })}
                  disabled={values.autoDetectReadings}
                />
              </Grid>
              <BlockDivider />
              <Grid item xs={12}>
                <TranslationsInput
                  values={values.translations || [""]}
                  errors={errors?.translations?.params?.indexes as number[]}
                  onChange={(translations) =>
                    onChange({ ...values, translations })
                  }
                  disabled={values.autoDetectReadings}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      {errors && hasValidationErrors(errors) && (
        <ValidationErrors<KanjiFormType>
          errors={errors}
          tKey="modals.addKanji.validations"
        />
      )}
    </>
  );
};
