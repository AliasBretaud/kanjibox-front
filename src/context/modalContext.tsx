"use client";

import type { $Kanji } from "@/types/models";
import React from "react";

export type ModalOptions = Partial<Record<string, string | string[] | $Kanji>>;

type ContextValues =
  | {
      shownModal: string;
      setShownModal: React.Dispatch<React.SetStateAction<string>>;
      modalOptions: ModalOptions;
      setModalOptions: React.Dispatch<React.SetStateAction<ModalOptions>>;
    }
  | undefined;

export const ModalContext = React.createContext<ContextValues>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [shownModal, setShownModal] = React.useState<string>("");
  const [modalOptions, setModalOptions] = React.useState<ModalOptions>({});
  return (
    <ModalContext.Provider
      value={{ shownModal, setShownModal, modalOptions, setModalOptions }}
    >
      {children}
    </ModalContext.Provider>
  );
}
