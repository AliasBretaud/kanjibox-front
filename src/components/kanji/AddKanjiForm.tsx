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
import { isEmpty } from "@/lib/utils";
import type { FKanji, FormState, MKanji } from "@/types";
import BaseModal from "@/components/ui/BaseModal";
import useModal from "@/hooks/useModal";
import useNotification from "@/hooks/useNotification";
import { SaveButton } from "@/components/ui/SaveButton";

const validate = (input: string, checkFcn: (s: string) => boolean) =>
  input.split(";").every((k) => !isEmpty(k) && checkFcn(k));

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
      showFormActionNotif(formState, "Kanji added");
      handleClose();
    }
  }, [formState, handleClose, showFormActionNotif]);

  return (
    <BaseModal<MKanji>
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      name="add-kanji"
    >
      <form autoComplete="off" action={formAction}>
        <DialogTitle id="form-dialog-title">Ajouter Kanji</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            Pour ajouter un kanji, veuillez renseigner sa valeur. Vous pouvez,
            si vous le souhaitez, laisser l&apos;appli se charger de la
            détection des différentes lectures et traductions (en anglais).
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                id="kanjiValue"
                name="value"
                label="Valeur du Kanji"
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
                label="Détection automatique des lectures/traductions"
                name="autoDetectReadings"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-multiline-flexible-1"
                label="On Yomi"
                name="onYomi"
                multiline
                maxRows={4}
                value={onYomi}
                onChange={(evt) => {
                  setOnYomi(toKatakana(evt.target.value));
                }}
                helperText="Séparer par des ';'"
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-multiline-flexible-2"
                label="Kun Yomi"
                name="kunYomi"
                multiline
                maxRows={4}
                value={kunYomi}
                onChange={(evt) => {
                  setKunYomi(toHiragana(evt.target.value));
                }}
                helperText="Séparer par des ';'"
                disabled={autoDetectReadings}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="translation"
                label="Traductions"
                name="translations"
                fullWidth
                type="text"
                value={translations}
                onChange={(evt) => {
                  setTranslations(evt.target.value);
                }}
                helperText="Séparer par des ';'"
                disabled={autoDetectReadings}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Annuler
          </Button>
          <SaveButton
            disabled={
              !canSave(
                { value, kunYomi, onYomi, translations },
                autoDetectReadings,
              )
            }
          >
            Ajouter
          </SaveButton>
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddKanjiForm;
