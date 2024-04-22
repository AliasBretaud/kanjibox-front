"use client";

import useModal from "@/hooks/useModal";
import type { DialogProps, ModalProps } from "@mui/material";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import type { PropsWithChildren } from "react";

type BaseModalProps<T> = PropsWithChildren<
  { name: T; responsive?: boolean } & Omit<DialogProps, "open">
>;

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
  const theme = useTheme();
  const responsiveFullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      {...p}
      fullScreen={responsive ? responsiveFullScreen : p.fullScreen}
      open={shownModal === name}
      onClose={onClose}
      disableRestoreFocus
    >
      {children}
    </Dialog>
  );
};

export default BaseModal;
