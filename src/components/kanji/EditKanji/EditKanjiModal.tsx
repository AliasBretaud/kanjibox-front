"use client";

import BaseModal from "@/components/ui/BaseModal";
import type { MKanji } from "@/types/modals";
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
import { addKanjiForm, deleteKanji } from "@/lib/actions/kanji";
import useModal from "@/hooks/useModal";
import type { $Kanji } from "@/types/models";
import { DeleteBlock } from "@/components/common/DeleteBlock";
import { useFormStateValidation } from "@/hooks/useFormStateValidation";
import { KanjiDetailsInput } from "@/components/kanji/AddForm/KanjiDetailsInput";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import ButtonsBlock from "@/components/form/ButtonsBlock";
import { getLocalizedTranslations } from "@/lib/utils/getLocalizedTranslations";

const convertKanjiToFormValue = (
  { onYomi, kunYomi, translations, value }: $Kanji,
  locale: string,
): KanjiFormType => ({
  autoDetect: false,
  onYomi,
  kunYomi,
  translations: getLocalizedTranslations(translations, locale),
  value,
});

export const EditKanjiModal = () => {
  const t = useTranslations("modals.editKanji");
  const tRef = useRef(t);
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
  const kanjiOption = modalOptions.kanji as $Kanji;
  const formDataInit = useMemo(
    () => ({
      autoDetect: false,
      value: "",
    }),
    [],
  );
  const [formData, setFormData] = useState<KanjiFormType>(formDataInit);
  const { apiResponse, errors, formAction, setErrors } =
    useFormStateValidation(addKanjiForm);
  const locale = useLocale();

  const onDelete = () => {
    startTransition(async () => {
      if (kanjiOption.id) {
        try {
          await deleteKanji(kanjiOption.id);
          showNotification(t("delete.notifications.success"));
        } catch (e) {
          showNotification(t("delete.notifications.error"), true);
        }
      }
      hideModal();
    });
  };

  const onClose = useCallback(() => {
    setFormData(formDataInit);
    setErrors(undefined);
    hideModal();
  }, [formDataInit, hideModal, setErrors]);

  useEffect(() => {
    if (kanjiOption) {
      setFormData(convertKanjiToFormValue(kanjiOption, locale));
    }
  }, [kanjiOption, locale]);

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
    <BaseModal<MKanji>
      name="edit-kanji"
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
        <DialogTitle id="form-dialog-title">{`${t("header")} - ${kanjiOption?.value}`}</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <KanjiDetailsInput
              errors={errors}
              values={formData}
              onChange={({ onYomi, kunYomi, translations }) =>
                setFormData({ ...formData, onYomi, kunYomi, translations })
              }
              hiddenFields={["value", "autoDetect"]}
            />
          </Box>
          {!kanjiOption?.usages?.length && (
            <DeleteBlock
              description={t("delete.description")}
              buttonText={t("delete.button")}
              onDelete={onDelete}
              isLoading={isPending}
            />
          )}
        </DialogContent>
        <DialogActions>
          <ButtonsBlock updateMode onCancel={onClose} />
        </DialogActions>
        <input type="hidden" name="id" value={kanjiOption?.id} />
        <input type="hidden" name="value" value={kanjiOption?.value} />
      </form>
    </BaseModal>
  );
};
