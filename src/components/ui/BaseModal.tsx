"use client";

import useModal from "@/hooks/useModal";
import type { DialogProps, ModalProps } from "@mui/material";
import { Dialog, IconButton } from "@mui/material";
import type { PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useResponsive } from "@/hooks/useResponsive";

type BaseModalProps<T> = PropsWithChildren<
  { name: T; responsive?: boolean } & Omit<DialogProps, "open">
>;

const CloseButton = ({ onClose }: Pick<ModalProps, "onClose">) => (
  <IconButton
    aria-label="close"
    onClick={(e) => (onClose ? onClose(e, "backdropClick") : undefined)}
    sx={{
      position: "absolute",
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500],
    }}
  >
    <CloseIcon />
  </IconButton>
);

const BaseModal = <T extends string>({
  children,
  name,
  responsive = false,
  ...p
}: BaseModalProps<T>) => {
  const { shownModal, hideModal } = useModal();
  const onClose: ModalProps["onClose"] = (event, reason) => {
    hideModal();
    if (p.onClose) {
      p.onClose(event, reason);
    }
  };
  const { isMobile } = useResponsive();
  return (
    <Dialog
      {...p}
      fullScreen={responsive ? isMobile : p.fullScreen}
      open={shownModal === name}
      onClose={onClose}
      disableRestoreFocus
    >
      {children}
      {isMobile ? <CloseButton onClose={onClose} /> : null}
    </Dialog>
  );
};

export default BaseModal;
