"use client";

import BaseModal from "@/components/ui/BaseModal";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { addWord } from "@/lib/actions/word";
import { useFormState } from "react-dom";
import useNotification from "@/hooks/useNotification";
import { SaveButton } from "@/components/ui/SaveButton";
import { useTranslations } from "next-intl";
import type { WordFormType } from "@/lib/validation/schemas/word";
import { convertInputToHiragana } from "@/lib/utils/convertInputToJapanese";
import type { MWord } from "@/types/modals";
import type { FormState } from "@/types/form";

const AddWordForm = () => {
  const t = useTranslations("modals");
  const [formState, formAction] = useFormState<
    FormState<WordFormType>,
    FormData
  >(addWord, {});
  const [errors, setErrors] = useState(formState.validationErrors);
  const [wordFuriganaValue, setWordFuriganaValue] = useState<string>("");
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();

  const handleClose = useCallback(() => {
    setWordFuriganaValue("");
    hideModal();
    setErrors(undefined);
  }, [hideModal]);

  const formatFurigana = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setWordFuriganaValue(convertInputToHiragana(evt.target.value));

  useEffect(() => {
    if (formState.validationErrors) {
      setErrors(formState.validationErrors);
    }
  }, [formState.validationErrors]);

  useEffect(() => {
    if (formState.apiResponse) {
      const { isSuccess, isError } = formState.apiResponse;
      if (isSuccess) {
        showSuccessNotif(t("addWord.notifications.success"));
      } else if (isError) {
        showErrorNotif(t("addWord.notifications.error"));
      }
      handleClose();
    }
  }, [formState.apiResponse, handleClose, showErrorNotif, showSuccessNotif, t]);

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
                required
                error={!!errors?.value}
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
                onChange={formatFurigana}
                required
                error={!!errors?.furiganaValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="wordTranslation"
                label={t("addWord.translations.label")}
                name="translations"
                fullWidth
                type="text"
                helperText={t("addWord.translations.description")}
                required
                error={!!errors?.translations}
              />
            </Grid>
          </Grid>
          {errors && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {Object.values(errors).map((k) => (
                <div key={k}>{t(`addWord.validations.${k}`)}</div>
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

export default AddWordForm;
