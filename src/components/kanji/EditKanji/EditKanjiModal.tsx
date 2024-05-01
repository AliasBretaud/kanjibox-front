"use client";

import BaseModal from "@/components/ui/BaseModal";
import type { MKanji } from "@/types/modals";
import { DialogContent, DialogTitle } from "@mui/material";
import { useTranslations } from "next-intl";
import useModalNotification from "@/hooks/useModalNotification";
import { useTransition } from "react";
import { deleteKanji } from "@/lib/actions/kanji";
import useModal from "@/hooks/useModal";
import type { $Kanji } from "@/types/models";
import { DeleteBlock } from "@/components/common/DeleteBlock";

export const EditKanjiModal = () => {
  const t = useTranslations("modals.editKanji");
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
  const kanji = modalOptions.kanji as $Kanji;
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteKanji(kanji);
        showNotification(t("notifications.success"));
      } catch (e) {
        showNotification(t("notifications.error"), true);
      }
      hideModal();
    });
  };
  return (
    <BaseModal<MKanji> name="edit-kanji" responsive maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
      <DialogContent>
        {!kanji?.usages?.length && (
          <DeleteBlock
            description={t("delete.description")}
            buttonText={t("delete.button")}
            onDelete={onDelete}
            isLoading={isPending}
          />
        )}
      </DialogContent>
    </BaseModal>
  );
};
