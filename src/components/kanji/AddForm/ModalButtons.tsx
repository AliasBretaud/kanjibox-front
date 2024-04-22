import { ActionButton } from "@/components/form/ActionButton";
import ButtonsBlock from "@/components/form/ButtonsBlock";
import { SubmitButton } from "@/components/form/SubmitButton";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

type ModalButtonProps = Pick<KanjiFormType, "autoDetectReadings"> & {
  activeStep: number;
  onAddKanji: () => Promise<void>;
  onBack: () => void;
  onCancel: () => void;
  stepsCount: number;
};

export const ModalButtons = ({
  activeStep,
  autoDetectReadings,
  onAddKanji,
  onBack,
  onCancel,
  stepsCount,
}: ModalButtonProps) => {
  const t = useTranslations("modals.buttons");
  if (!autoDetectReadings) return <ButtonsBlock onCancel={onCancel} />;
  if (activeStep < stepsCount - 1)
    return <SubmitButton variant="outlined">{t("next")}</SubmitButton>;
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={onBack} variant="outlined" color="secondary">
        {t("back")}
      </Button>
      <ActionButton color="primary" variant="contained" action={onAddKanji}>
        {t("add")}
      </ActionButton>
    </Stack>
  );
};
