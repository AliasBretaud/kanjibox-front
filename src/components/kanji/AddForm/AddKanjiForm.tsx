"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Button,
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
import { SaveButton } from "@/components/ui/SaveButton";
import { useTranslations } from "next-intl";
import {
  convertInputToHiragana,
  convertInputToKatakana,
} from "@/lib/utils/convertInputToJapanese";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import type { FormState } from "@/types/form";
import type { MKanji } from "@/types/modals";
import ValueInput from "./ValueInput";
import AutoDetectReadingsSwitch from "./AutoDetectReadingsSwitch";
import OnYomiInput from "./OnYomiInput";
import KunYomiInput from "./KunYomiInput";
import TranslationsInput from "./TranslationsInput";
import dynamic from "next/dynamic";

const ValidationErrors = dynamic(() => import("./ValidationErrors"));

const AddKanjiForm = () => {
  const t = useTranslations("modals");
  const [formState, formAction] = useFormState<
    FormState<KanjiFormType>,
    FormData
  >(addKanji, null);
  const [autoDetectReadings, setAutoDetectReadings] = useState(false);
  const [kunYomi, setKunYomi] = useState("");
  const [onYomi, setOnYomi] = useState("");
  const [errors, setErrors] = useState(formState?.validationErrors);
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();

  const formProps = { errors };

  const handleClose = useCallback(() => {
    setKunYomi("");
    setOnYomi("");
    hideModal();
    setErrors(undefined);
  }, [hideModal]);

  useEffect(() => {
    if (formState?.validationErrors) {
      setErrors(formState.validationErrors);
    }
  }, [formState?.validationErrors]);

  useEffect(() => {
    if (formState?.apiResponse) {
      const { isSuccess, isError } = formState.apiResponse;
      if (isSuccess) {
        showSuccessNotif(t("addKanji.notifications.success"));
      } else if (isError) {
        showErrorNotif(t("addKanji.notifications.error"));
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
        <DialogTitle id="form-dialog-title">{t("addKanji.header")}</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            {t("addKanji.description")}
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <ValueInput {...formProps} />
            </Grid>
            <Grid item xs={12}>
              <AutoDetectReadingsSwitch
                checked={autoDetectReadings}
                onChange={(evt) => setAutoDetectReadings(evt.target.checked)}
              />
            </Grid>
            <Grid item xs={6}>
              <OnYomiInput
                {...formProps}
                value={onYomi}
                onChange={(evt) => {
                  setOnYomi(convertInputToKatakana(evt.target.value));
                }}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={6}>
              <KunYomiInput
                {...formProps}
                value={kunYomi}
                onChange={(evt) => {
                  setOnYomi(convertInputToHiragana(evt.target.value));
                }}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={12}>
              <TranslationsInput {...formProps} disabled={autoDetectReadings} />
            </Grid>
          </Grid>
          {errors && <ValidationErrors errors={errors} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            {t("buttons.cancel")}
          </Button>
          <SaveButton>{t("buttons.add")}</SaveButton>
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddKanjiForm;
