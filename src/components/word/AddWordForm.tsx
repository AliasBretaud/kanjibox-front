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
import { useTranslations } from "next-intl";

const canSave = (value: string, furiganaValue: string, translation: string) =>
  isJapanese(value) && isKana(furiganaValue) && !isEmpty(translation);

const AddWordForm = () => {
  const t = useTranslations("modals");
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
      showFormActionNotif(
        formState,
        t("addWord.notifications.success"),
        t("addWord.notifications.error"),
      );
      handleClose();
    }
  }, [formState, handleClose, showFormActionNotif, t]);

  return (
    <BaseModal<MWord> name="add-word">
      <form autoComplete="off" action={formAction}>
        <DialogTitle id="form-dialog-title">{t("addWord.header")}</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            {t("addWord.description")}
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                id="wordValue"
                name="value"
                label={t("addWord.value")}
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
                label={t("addWord.furigana")}
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
                label={t("addWord.translations")}
                name="translations"
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
            {t("buttons.cancel")}
          </Button>
          <SaveButton
            disabled={!canSave(wordValue, wordFuriganaValue, wordTranslation)}
          >
            {t("buttons.add")}
          </SaveButton>
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddWordForm;
