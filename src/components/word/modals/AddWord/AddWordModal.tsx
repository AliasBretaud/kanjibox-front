"use client";

import BaseModal from "@/components/ui/BaseModal";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addWord, addWordForm } from "@/lib/actions/word";
import { useTranslations } from "next-intl";
import type { WordFormType } from "@/lib/validation/schemas/word";
import type { MWord } from "@/types/modals";
import { useFormStateValidation } from "@/hooks/useFormStateValidation";
import type { ApiResponseStatus } from "@/types/api";
import useModalNotification from "@/hooks/useModalNotification";
import { Stepper } from "@/components/ui/Stepper";
import { WordDetailsInput } from "./WordDetailsInput";
import { WordPreviewSummary } from "./WordPreviewSummary";
import { StepperButtons } from "@/components/form/StepperButtons";

const AddWordModal = () => {
  const t = useTranslations("modals.addWord");
  const tRef = useRef(t);
  const { apiResponse, errors, formAction, setErrors } =
    useFormStateValidation(addWordForm);
  const [word, setWord] = useState<WordFormType>({
    value: "",
    autoDetect: true,
  });
  const [activeStep, setActiveStep] = useState(0);
  const { closeModal, showNotification } = useModalNotification();

  const handleClose = useCallback(() => {
    closeModal();
    setActiveStep(0);
    setWord({ value: "", autoDetect: true });
    setErrors(undefined);
  }, [closeModal, setErrors]);

  const steps = useMemo(() => {
    const translate = tRef.current;
    return [
      {
        label: translate("stepper.enterInfo"),
        render: () => (
          <WordDetailsInput errors={errors} values={word} onChange={setWord} />
        ),
      },
      {
        label: translate("stepper.preview"),
        render: () =>
          apiResponse?.data && <WordPreviewSummary {...apiResponse.data} />,
      },
    ];
  }, [apiResponse?.data, errors, word]);

  const showAddWordNotification = useCallback(
    ({ isError }: ApiResponseStatus) => {
      const translate = tRef.current;
      showNotification(
        translate(`notifications.${isError ? "error" : "success"}`),
        !!isError,
      );
    },
    [showNotification],
  );

  const onAddWord = async () => {
    const wordData = apiResponse?.data;
    if (wordData) {
      const res = await addWord(wordData);
      if (res.apiResponse) {
        showAddWordNotification(res.apiResponse.status);
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (word.autoDetect) {
      setErrors((errors) =>
        errors
          ? {
              ...errors,
              furiganaValue: undefined,
              translations: undefined,
            }
          : undefined,
      );
    }
  }, [word.autoDetect, setErrors]);

  useEffect(() => {
    if (apiResponse) {
      const { isSuccess, isError } = apiResponse.status;
      if (apiResponse.params?.preview && isSuccess) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        showAddWordNotification({ isError });
        handleClose();
      }
    }
  }, [apiResponse, handleClose, showAddWordNotification]);

  return (
    <BaseModal<MWord>
      name="add-word"
      onClose={handleClose}
      responsive
      maxWidth="sm"
      fullWidth
    >
      <form
        autoComplete="off"
        action={formAction}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <DialogTitle id="form-dialog-title">{t("header")}</DialogTitle>
        <DialogContent>
          {word.autoDetect && (
            <Stepper activeStep={activeStep} steps={steps} errors={errors} />
          )}
          {steps[activeStep].render()}
          <input
            type="hidden"
            name="preview"
            value={Boolean(
              word.autoDetect && activeStep < steps.length - 1,
            ).toString()}
          />
        </DialogContent>
        <DialogActions>
          <StepperButtons
            activeStep={activeStep}
            autoDetect={word.autoDetect}
            onAdd={onAddWord}
            onBack={() => setActiveStep(activeStep - 1)}
            onCancel={handleClose}
            stepsCount={steps.length}
          />
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddWordModal;
