"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
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
import {
  isHiragana,
  isJapanese,
  isKanji,
  isKatakana,
  toHiragana,
  toKatakana,
} from "wanakana";

import { addKanji } from "@/lib/actions/kanji";
import isEmpty from "@/lib/utils/isEmpty";
import type { FKanji, FormState, MKanji } from "@/types";
import BaseModal from "@/components/ui/BaseModal";
import useModal from "@/hooks/useModal";
import useNotification from "@/hooks/useNotification";
import { SaveButton } from "@/components/ui/SaveButton";
import { useTranslations } from "next-intl";

const validate = (input: string, checkFcn: (s: string) => boolean) =>
  input.split("addKanji.;").every((k) => !isEmpty(k) && checkFcn(k));

const canSave = (
  { value, kunYomi, onYomi, translations }: FKanji,
  autoDetectReadings: boolean,
) => {
  const validValue = !isEmpty(value) && isKanji(value);
  if (autoDetectReadings) {
    return validValue;
  }

  return (
    validValue &&
    validate(kunYomi, isHiragana) &&
    validate(onYomi, isKatakana) &&
    validate(translations, (input) => !isJapanese(input))
  );
};

const AddKanjiForm = () => {
  const t = useTranslations("modals");
  const [formState, formAction] = useFormState<FormState, FormData>(
    addKanji,
    null,
  );
  const [value, setValue] = useState<string>("");
  const [kunYomi, setKunYomi] = useState<string>("");
  const [onYomi, setOnYomi] = useState<string>("");
  const [translations, setTranslations] = useState<string>("");
  const [autoDetectReadings, setAutoDetectReadings] = useState<boolean>(false);
  const { hideModal } = useModal();
  const { showFormActionNotif } = useNotification();

  const handleClose = useCallback(() => {
    setValue("");
    setKunYomi("");
    setOnYomi("");
    setTranslations("");
    setAutoDetectReadings(false);
    hideModal();
  }, [hideModal]);

  useEffect(() => {
    if (formState) {
      showFormActionNotif(
        formState,
        t("addKanji.notifications.success"),
        t("addKanji.notifications.error"),
      );
      handleClose();
    }
  }, [formState, handleClose, showFormActionNotif, t]);

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
                id="kanjiValue"
                name="value"
                label={t("addKanji.value")}
                fullWidth
                type="text"
                value={value}
                onChange={(evt) => {
                  setValue(evt.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoDetectReadings}
                    onChange={(event) => {
                      setAutoDetectReadings(event.target.checked);
                    }}
                  />
                }
                label={t("addKanji.autoDetectReadings")}
                name="autoDetectReadings"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-multiline-flexible-1"
                label={t("addKanji.onYomi.label")}
                name="onYomi"
                multiline
                maxRows={4}
                value={onYomi}
                onChange={(evt) => {
                  setOnYomi(toKatakana(evt.target.value));
                }}
                helperText={t("addKanji.onYomi.description")}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-multiline-flexible-2"
                label={t("addKanji.kunYomi.label")}
                name="kunYomi"
                multiline
                maxRows={4}
                value={kunYomi}
                onChange={(evt) => {
                  setKunYomi(toHiragana(evt.target.value));
                }}
                helperText={t("addKanji.kunYomi.description")}
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="translation"
                label={t("addKanji.translations.label")}
                name="translations"
                fullWidth
                type="text"
                value={translations}
                onChange={(evt) => {
                  setTranslations(evt.target.value);
                }}
                helperText={t("addKanji.translations.description")}
                disabled={autoDetectReadings}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            {t("buttons.cancel")}
          </Button>
          <SaveButton
            disabled={
              !canSave(
                { value, kunYomi, onYomi, translations },
                autoDetectReadings,
              )
            }
          >
            {t("buttons.add")}
          </SaveButton>
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddKanjiForm;
