"use client";

import BaseModal from "@/components/ui/BaseModal";
import type { MWord } from "@/types/modals";
import { DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import useModalNotification from "@/hooks/useModalNotification";
import { useTransition } from "react";
import { deleteWord } from "@/lib/actions/word";
import useModal from "@/hooks/useModal";
import type { $Word } from "@/types/models";
import { DeleteWord } from "./DeleteWord";

export const EditWordModal = () => {
  const t = useTranslations("modals.editWord");
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteWord(modalOptions.word as $Word);
        showNotification(t("notifications.success"));
      } catch (e) {
        showNotification(t("notifications.error"), true);
      }
      hideModal();
    });
  };
  return (
    <BaseModal<MWord> name="edit-word" responsive maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
      <DialogContent>
        <DeleteWord onDelete={onDelete} isLoading={isPending} />
      </DialogContent>
    </BaseModal>
  );
};
