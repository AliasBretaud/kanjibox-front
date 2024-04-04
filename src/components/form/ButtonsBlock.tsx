"use client";

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { SaveButton } from "./SaveButton";

const ButtonsBlock = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations("modals.buttons");
  return (
    <>
      <Button onClick={onClose} color="error">
        {t("cancel")}
      </Button>
      <SaveButton>{t("add")}</SaveButton>
    </>
  );
};

export default ButtonsBlock;
