"use client";

import type { FormState, MWord } from "@/types";
import BaseModal from "@/components/ui/BaseModal";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { isJapanese, isKana, toKana } from "wanakana";
import useModal from "@/hooks/useModal";
import { isEmpty } from "@/lib/utils";
import { addWord } from "@/lib/actions/word";
import { useFormState } from "react-dom";
import useNotification from "@/hooks/useNotification";
import { SaveButton } from "@/components/ui/SaveButton";

const canSave = (value: string, furiganaValue: string, translation: string) =>
  isJapanese(value) && isKana(furiganaValue) && !isEmpty(translation);

const AddWordForm = () => {
  const [formState, formAction] = useFormState<FormState, FormData>(
    addWord,
    null,
  );
  const [wordValue, setWordValue] = useState<string>("");
  const [wordFuriganaValue, setWordFuriganaValue] = useState<string>("");
  const [wordTranslation, setWordTranslation] = useState<string>("");
  const { hideModal } = useModal();
  const { showFormActionNotif } = useNotification();

  const convertAndSetFurigana = (value: string) => {
    setWordFuriganaValue(
      !(value.endsWith("n") || value.endsWith("ny"))
        ? toKana(value).trim()
        : value.trim(),
    );
  };

  const handleClose = useCallback(() => {
    setWordValue("");
    setWordFuriganaValue("");
    setWordTranslation("");
    hideModal();
  }, [hideModal]);

  useEffect(() => {
    if (formState) {
      showFormActionNotif(formState, "Word added");
      handleClose();
    }
  }, [formState, handleClose, showFormActionNotif]);

  return (
    <BaseModal<MWord> name="add-word">
      <form autoComplete="off" action={formAction}>
        <DialogTitle id="form-dialog-title">Ajouter un mot</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            Pour ajouter un mot, veuillez renseigner sa valeur, sa transcription
            furigana et sa traduction.
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                id="wordValue"
                name="value"
                label="Valeur du mot"
                fullWidth
                type="text"
                value={wordValue}
                onChange={(evt) => {
                  setWordValue(evt.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="wordFuriganaValue"
                label="Transcription furigana"
                name="furiganaValue"
                fullWidth
                type="text"
                value={wordFuriganaValue}
                onChange={(evt) => {
                  convertAndSetFurigana(evt.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="wordTranslation"
                label="Traduction"
                name="translation"
                fullWidth
                type="text"
                value={wordTranslation}
                onChange={(evt) => {
                  setWordTranslation(evt.target.value);
                }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Annuler
          </Button>
          <SaveButton
            disabled={!canSave(wordValue, wordFuriganaValue, wordTranslation)}
          >
            Ajouter
          </SaveButton>
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddWordForm;
