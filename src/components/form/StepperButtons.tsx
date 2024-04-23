import { ActionButton } from "@/components/form/ActionButton";
import ButtonsBlock from "@/components/form/ButtonsBlock";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

type ModalButtonProps = {
  autoDetect: boolean;
  activeStep: number;
  onAdd: () => Promise<void>;
  onBack: () => void;
  onCancel: () => void;
  stepsCount: number;
};

export const StepperButtons = ({
  activeStep,
  autoDetect,
  onAdd,
  onBack,
  onCancel,
  stepsCount,
}: ModalButtonProps) => {
  const t = useTranslations("modals.buttons");
  if (!autoDetect) return <ButtonsBlock onCancel={onCancel} />;
  if (activeStep < stepsCount - 1)
    return <SubmitButton variant="outlined">{t("next")}</SubmitButton>;
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={onBack} variant="outlined" color="secondary">
        {t("back")}
      </Button>
      <ActionButton color="primary" variant="contained" action={onAdd}>
        {t("add")}
      </ActionButton>
    </Stack>
  );
};
