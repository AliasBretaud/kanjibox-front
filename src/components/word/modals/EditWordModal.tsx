"use client";

import BaseModal from "@/components/ui/BaseModal";
import type { MWord } from "@/types/modals";
import { Box, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import useModalNotification from "@/hooks/useModalNotification";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { addWordForm, deleteWord } from "@/lib/actions/word";
import useModal from "@/hooks/useModal";
import type { $Word } from "@/types/models";
import { DeleteBlock } from "@/components/common/DeleteBlock";
import { WordDetailsInput } from "@/components/word/form/WordDetailsInput";
import { useFormStateValidation } from "@/hooks/useFormStateValidation";
import type { WordFormType } from "@/lib/validation/schemas/word";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";
import ButtonsBlock from "@/components/form/ButtonsBlock";

const convertWordToFormValue = (
  { furiganaValue, translations, value }: $Word,
  locale: string,
): WordFormType => ({
  autoDetect: false,
  furiganaValue,
  translations: getLocalizedTranslations(translations, locale),
  value,
});

export const EditWordModal = () => {
  const t = useTranslations("modals.editWord");
  const tRef = useRef(t);
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
  const formDataInit = useMemo(() => ({ autoDetect: false, value: "" }), []);
  const [formData, setFormData] = useState<WordFormType>(formDataInit);
  const { apiResponse, errors, formAction, setErrors } =
    useFormStateValidation(addWordForm);
  const wordOption = modalOptions.word as $Word;
  const locale = useLocale();

  const onClose = useCallback(() => {
    setFormData(formDataInit);
    setErrors(undefined);
    hideModal();
  }, [formDataInit, hideModal, setErrors]);

  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteWord(modalOptions.word as $Word);
        showNotification(t("delete.notifications.success"));
      } catch (e) {
        showNotification(t("delete.notifications.error"), true);
      }
      hideModal();
    });
  };

  useEffect(() => {
    if (wordOption) {
      setFormData(convertWordToFormValue(wordOption, locale));
    }
  }, [wordOption, locale]);

  useEffect(() => {
    if (apiResponse) {
      const { isError } = apiResponse.status;
      showNotification(
        tRef.current(`edit.notifications.${isError ? "error" : "success"}`),
        isError,
      );
      onClose();
    }
  }, [apiResponse, onClose, showNotification]);

  return (
    <BaseModal<MWord>
      name="edit-word"
      onClose={onClose}
      responsive
      maxWidth="sm"
      fullWidth
    >
      <form
        autoComplete="off"
        action={formAction}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <WordDetailsInput
              errors={errors}
              values={formData}
              onChange={({ furiganaValue, translations }) =>
                setFormData({ ...formData, furiganaValue, translations })
              }
              hiddenFields={["value", "autoDetect"]}
            />
          </Box>
          <DeleteBlock
            description={t("delete.description")}
            buttonText={t("delete.button")}
            onDelete={onDelete}
            isLoading={isPending}
          />
        </DialogContent>
        <DialogActions>
          <ButtonsBlock updateMode onCancel={onClose} />
        </DialogActions>
        <input type="hidden" name="id" value={wordOption?.id} />
        <input type="hidden" name="value" value={wordOption?.value} />
      </form>
    </BaseModal>
  );
};
