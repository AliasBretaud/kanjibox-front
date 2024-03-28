import React from "react";

import type { ModalOptions } from "@/context/modalContext";
import { ModalContext } from "@/context/modalContext";

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  const { setShownModal, shownModal, modalOptions, setModalOptions } = context;
  const hideModal = () => setShownModal("");
  const openModal = <T extends string>(name: T, modalOpts?: ModalOptions) => {
    setShownModal(name);
    if (modalOpts) {
      setModalOptions(modalOpts);
    }
  };

  return { openModal, shownModal, hideModal, modalOptions };
};

export default useModal;
