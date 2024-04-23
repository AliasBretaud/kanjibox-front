"use client";

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { ActionButton } from "./ActionButton";
import { SubmitButton } from "./SubmitButton";

const ButtonsBlock = ({
  onCancel,
  onOkAction,
}: {
  onCancel?: () => void;
  onOkAction?: () => Promise<void>;
}) => {
  const t = useTranslations("modals.buttons");
  const addLabel = t("add");
  return (
    <>
      <Button onClick={onCancel} color="error">
        {t("cancel")}
      </Button>
      {onOkAction ? (
        <ActionButton variant="contained" action={onOkAction}>
          {addLabel}
        </ActionButton>
      ) : (
        <SubmitButton variant="contained">{addLabel}</SubmitButton>
      )}
    </>
  );
};

export default ButtonsBlock;
