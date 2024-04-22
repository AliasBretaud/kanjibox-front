"use client";

import BaseModal from "@/components/ui/BaseModal";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { addWord } from "@/lib/actions/word";
import { useFormState } from "react-dom";
import useNotification from "@/hooks/useNotification";
import { useTranslations } from "next-intl";
import type { WordFormType } from "@/lib/validation/schemas/word";
import { convertInputToHiragana } from "@/lib/utils/convertInputToJapanese";
import type { MWord } from "@/types/modals";
import type { FormState } from "@/types/form";
import ValueInput from "./ValueInput";
import FuriganaValueInput from "./FuriganaValueInput";
import TranslationsInput from "./TranslationsInput";
import ValidationErrors from "@/components/form/ValidationErrors";
import ButtonsBlock from "@/components/form/ButtonsBlock";
import { isKana } from "wanakana";
import type { $Word } from "@/types/models";

const AddWordForm = () => {
  const t = useTranslations("modals.addWord");
  const [formState, formAction] = useFormState<
    FormState<WordFormType, $Word>,
    FormData
  >(addWord, {});
  const [errors, setErrors] = useState(formState?.validationErrors);
  const [value, setValue] = useState("");
  const [wordFuriganaValue, setWordFuriganaValue] = useState<string>("");
  const { hideModal } = useModal();
  const { showSuccessNotif, showErrorNotif } = useNotification();
  const isValueKana = isKana(value);

  const formProps = { errors };

  const handleClose = useCallback(() => {
    setValue("");
    setWordFuriganaValue("");
    hideModal();
    setErrors(undefined);
  }, [hideModal]);

  const formatFurigana = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setWordFuriganaValue(convertInputToHiragana(evt.target.value));

  useEffect(() => {
    if (formState?.validationErrors) {
      setErrors(formState.validationErrors);
    }
  }, [formState?.validationErrors]);

  useEffect(() => {
    if (formState?.apiResponse) {
      const { isSuccess, isError } = formState.apiResponse.status;
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
    <BaseModal<MWord> name="add-word">
      <form autoComplete="off" action={formAction}>
        <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            {t("description")}
          </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <ValueInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                {...formProps}
              />
            </Grid>
            <Grid item xs={12}>
              <FuriganaValueInput
                value={wordFuriganaValue}
                onChange={formatFurigana}
                disabled={isValueKana}
                required={!isValueKana}
                {...formProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TranslationsInput {...formProps} />
            </Grid>
          </Grid>
          {errors && (
            <ValidationErrors<WordFormType>
              errors={errors}
              tKey="modals.addWord.validations"
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

export default AddWordForm;
