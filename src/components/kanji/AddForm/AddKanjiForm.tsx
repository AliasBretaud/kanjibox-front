"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Collapse,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";

import { addKanji } from "@/lib/actions/kanji";
import BaseModal from "@/components/ui/BaseModal";
import useModal from "@/hooks/useModal";
import useNotification from "@/hooks/useNotification";
import { useTranslations } from "next-intl";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormState } from "@/types/form";
import type { MKanji } from "@/types/modals";
import ValueInput from "./ValueInput";
import AutoDetectReadingsSwitch from "./AutoDetectReadingsSwitch";
import OnYomiInput from "./OnYomiInput";
import KunYomiInput from "./KunYomiInput";
import TranslationsInput from "./TranslationsInput";
import ValidationErrors from "@/components/form/ValidationErrors";
import ButtonsBlock from "@/components/form/ButtonsBlock";
import { hasValidationErrors } from "@/lib/utils/hasValidationErrors";
import { BlockDivider } from "@/components/ui/BlockDivider";

const AddKanjiForm = () => {
  const t = useTranslations("modals.addKanji");
  const [formState, formAction] = useFormState<
    FormState<KanjiFormType>,
    FormData
  >(addKanji, null);
  const [autoDetectReadings, setAutoDetectReadings] = useState(false);
  const [errors, setErrors] = useState(formState?.validationErrors);
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();

  const handleClose = useCallback(() => {
    hideModal();
    setErrors(undefined);
    setAutoDetectReadings(false);
  }, [hideModal]);

  useEffect(() => {
    if (autoDetectReadings) {
      setErrors((errors) =>
        errors
          ? {
              ...errors,
              onYomi: { message: "" },
              kunYomi: { message: "" },
              translations: { message: "" },
            }
          : undefined,
      );
    }
  }, [autoDetectReadings]);

  useEffect(() => {
    if (formState?.validationErrors) {
      setErrors(formState.validationErrors);
    }
  }, [formState?.validationErrors]);

  useEffect(() => {
    if (formState?.apiResponse) {
      const { isSuccess, isError } = formState.apiResponse;
      if (isSuccess) {
        showSuccessNotif(t("notifications.success"));
      } else if (isError) {
        showErrorNotif(t("notifications.error"));
      }
      handleClose();
    }
  }, [
    formState?.apiResponse,
    handleClose,
    showErrorNotif,
    showSuccessNotif,
    t,
  ]);

  return (
    <BaseModal<MKanji>
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      name="add-kanji"
    >
      <form autoComplete="off" action={formAction}>
        <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            {t("description")}
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <ValueInput errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <AutoDetectReadingsSwitch
                checked={autoDetectReadings}
                onChange={(evt) => setAutoDetectReadings(evt.target.checked)}
              />
            </Grid>
            <Grid item container>
              <Collapse in={!autoDetectReadings}>
                <Grid container item spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <OnYomiInput
                      errors={errors}
                      disabled={autoDetectReadings}
                    />
                  </Grid>
                  <BlockDivider />
                  <Grid item xs={12} sm={6}>
                    <KunYomiInput
                      errors={errors}
                      disabled={autoDetectReadings}
                    />
                  </Grid>
                  <BlockDivider />
                  <Grid item xs={12}>
                    <TranslationsInput
                      errors={errors}
                      disabled={autoDetectReadings}
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
        </DialogContent>
        <DialogActions>
          <ButtonsBlock onClose={handleClose} />
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddKanjiForm;
