"use client";

import BaseModal from "@/components/ui/BaseModal";
import type { MWord } from "@/types/modals";
import {
  Alert,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import DeleteIcon from "@mui/icons-material/Delete";
import useModalNotification from "@/hooks/useModalNotification";
import { useTransition } from "react";
import { deleteWord } from "@/lib/actions/word";
import useModal from "@/hooks/useModal";
import type { $Word } from "@/types/models";
import { LoadingButton } from "@mui/lab";

export const EditWordModal = () => {
  const t = useTranslations("modals.editWord");
  const { hideModal, modalOptions } = useModal();
  const { showNotification } = useModalNotification();
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        <Alert
          severity="error"
          iconMapping={{
            error: <DeleteIcon fontSize={mobile ? "medium" : "small"} />,
          }}
          sx={{
            alignItems: "center",
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Stack
            direction={mobile ? "column" : "row"}
            justifyContent={mobile ? "center" : "space-between"}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Typography align="center">{t("delete.description")}</Typography>
            <LoadingButton
              loading={isPending}
              variant="contained"
              color="error"
              size="small"
              sx={{ m: 0 }}
              onClick={onDelete}
            >
              {t("delete.button")}
            </LoadingButton>
          </Stack>
        </Alert>
      </DialogContent>
    </BaseModal>
  );
};
