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
import { DeleteBlock } from "@/components/common/DeleteBlock";

export const EditWordModal = () => {
  const t = useTranslations("modals.editWord");
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
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
  return (
    <BaseModal<MWord> name="edit-word" responsive maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
      <DialogContent>
        <DeleteBlock
          description={t("delete.description")}
          buttonText={t("delete.button")}
          onDelete={onDelete}
          isLoading={isPending}
        />
      </DialogContent>
    </BaseModal>
  );
};
