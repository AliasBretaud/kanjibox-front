"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import { addKanji } from "@/lib/actions/kanji";
import type { FormState, MKanji } from "@/types";
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

const AddKanjiForm = () => {
  const t = useTranslations("modals");
  const [formState, formAction] = useFormState<
    FormState<KanjiFormType>,
    FormData
  >(addKanji, {});
  const [autoDetectReadings, setAutoDetectReadings] = useState(false);
  const [kunYomi, setKunYomi] = useState("");
  const [onYomi, setOnYomi] = useState("");
  const [errors, setErrors] = useState(formState.validationErrors);
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();

  const handleClose = useCallback(() => {
    setKunYomi("");
    setOnYomi("");
    hideModal();
    setErrors(undefined);
  }, [hideModal]);

  useEffect(() => {
    if (formState.validationErrors) {
      setErrors(formState.validationErrors);
    }
  }, [formState.validationErrors]);

  useEffect(() => {
    if (formState.apiResponse) {
      const { isSuccess, isError } = formState.apiResponse;
      if (isSuccess) {
        showSuccessNotif(t("addKanji.notifications.success"));
      } else if (isError) {
        showErrorNotif(t("addKanji.notifications.error"));
      }
      handleClose();
    }
  }, [formState.apiResponse, handleClose, showErrorNotif, showSuccessNotif, t]);

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
              <TextField
                autoFocus
                name="value"
                label={t("addKanji.value")}
                fullWidth
                type="text"
                error={!!errors?.value}
                inputProps={{ maxLength: 1 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoDetectReadings}
                    onChange={(evt) =>
                      setAutoDetectReadings(evt.target.checked)
                    }
                  />
                }
                label={t("addKanji.autoDetectReadings")}
                name="autoDetectReadings"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("addKanji.onYomi.label")}
                name="onYomi"
                multiline
                maxRows={4}
                value={onYomi}
                onChange={(evt) => {
                  setOnYomi(convertInputToKatakana(evt.target.value));
                }}
                helperText={t("addKanji.onYomi.description")}
                error={!!errors?.onYomi}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("addKanji.kunYomi.label")}
                name="kunYomi"
                multiline
                maxRows={4}
                value={kunYomi}
                onChange={(evt) => {
                  setKunYomi(convertInputToHiragana(evt.target.value));
                }}
                helperText={t("addKanji.kunYomi.description")}
                error={!!errors?.kunYomi}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("addKanji.translations.label")}
                name="translations"
                fullWidth
                type="text"
                helperText={t("addKanji.translations.description")}
                error={!!errors?.translations}
                disabled={autoDetectReadings}
              />
            </Grid>
          </Grid>
          {errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {Object.values(errors).map((k) => (
                <div key={k}>{t(`addKanji.validations.${k}`)}</div>
              ))}
            </Alert>
          )}
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
