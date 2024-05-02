"use client";

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { ActionButton } from "./ActionButton";
import { SubmitButton } from "./SubmitButton";

const ButtonsBlock = ({
  onCancel,
  onOkAction,
  updateMode = false,
}: {
  onCancel?: () => void;
  onOkAction?: () => Promise<void>;
  updateMode?: boolean;
}) => {
  const t = useTranslations("modals.buttons");
  const okLabel = t(updateMode ? "update" : "add");
  return (
    <>
      <Button onClick={onCancel} color="error">
        {t("cancel")}
      </Button>
      {onOkAction ? (
        <ActionButton variant="contained" action={onOkAction}>
          {okLabel}
        </ActionButton>
      ) : (
        <SubmitButton variant="contained">{okLabel}</SubmitButton>
      )}
    </>
  );
};

export default ButtonsBlock;
