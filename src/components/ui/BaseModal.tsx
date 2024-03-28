"use client";

import useModal from "@/hooks/useModal";
import type { DialogProps, ModalProps } from "@mui/material";
import { Dialog } from "@mui/material";
import type { PropsWithChildren } from "react";

type BaseModalProps<T> = PropsWithChildren<
  { name: T } & Omit<DialogProps, "open">
>;

const BaseModal = <T extends string>({
  children,
  name,
  ...p
}: BaseModalProps<T>) => {
  const { shownModal, hideModal } = useModal();
  const onClose: ModalProps["onClose"] = (event, reason) => {
    hideModal();
    if (p.onClose) {
      p.onClose(event, reason);
    }
  };
  return (
    <Dialog {...p} open={shownModal === name} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default BaseModal;
