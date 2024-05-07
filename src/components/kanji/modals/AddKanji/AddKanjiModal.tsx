"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addKanji, addKanjiForm } from "@/lib/actions/kanji";
import BaseModal from "@/components/ui/BaseModal";
import { useTranslations } from "next-intl";
import { KanjiDetailsInput } from "@/components/kanji/form/KanjiDetailsInput";
import { KanjiPreviewSummary } from "@/components/kanji/modals/AddKanji/KanjiPreviewSummary";
import { Stepper } from "@/components/ui/Stepper";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import useModalNotification from "@/hooks/useModalNotification";
import type { ApiResponseStatus } from "@/types/api";
import { useFormStateValidation } from "@/hooks/useFormStateValidation";
import { StepperButtons } from "@/components/form/StepperButtons";
import type { MKanji } from "@/types/modals";

const AddKanjiModal = () => {
  const t = useTranslations("modals.addKanji");
  const tRef = useRef(t);
  const { apiResponse, errors, formAction, setErrors } =
    useFormStateValidation(addKanjiForm);
  const [kanji, setKanji] = useState<KanjiFormType>({
    value: "",
    autoDetect: true,
  });
  const [activeStep, setActiveStep] = useState(0);
  const { closeModal, showNotification } = useModalNotification();

  const steps = useMemo(() => {
    const translate = tRef.current;
    return [
      {
        label: translate("stepper.enterInfo"),
        render: () => (
          <KanjiDetailsInput
            description={tRef.current("description")}
            errors={errors}
            values={kanji}
            onChange={setKanji}
          />
        ),
      },
      {
        label: translate("stepper.preview"),
        render: () =>
          apiResponse?.data && <KanjiPreviewSummary {...apiResponse.data} />,
      },
    ];
  }, [apiResponse?.data, errors, kanji]);

  const handleClose = useCallback(() => {
    closeModal();
    setErrors(undefined);
    setKanji({ value: "", autoDetect: true });
    setActiveStep(0);
  }, [closeModal, setErrors]);

  const showAddKanjiNotification = useCallback(
    ({ isError }: ApiResponseStatus) => {
      const translate = tRef.current;
      showNotification(
        translate(`notifications.${isError ? "error" : "success"}`),
        !!isError,
      );
    },
    [showNotification],
  );

  const onAddKanji = async () => {
    const kanjiData = apiResponse?.data;
    if (kanjiData) {
      const res = await addKanji(kanjiData);
      if (res.apiResponse) {
        showAddKanjiNotification(res.apiResponse.status);
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (kanji.autoDetect) {
      setErrors((errors) =>
        errors
          ? {
              ...errors,
              onYomi: undefined,
              kunYomi: undefined,
              translations: undefined,
            }
          : undefined,
      );
    }
  }, [kanji.autoDetect, setErrors]);

  useEffect(() => {
    if (apiResponse) {
      const { isSuccess, isError } = apiResponse.status;
      if (apiResponse.params?.preview && isSuccess) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        showAddKanjiNotification({ isError });
        handleClose();
      }
    }
  }, [apiResponse, handleClose, showAddKanjiNotification]);

  return (
    <BaseModal<MKanji>
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      name="add-kanji"
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
          {kanji.autoDetect && (
            <Stepper activeStep={activeStep} steps={steps} errors={errors} />
          )}
          {steps[activeStep].render()}
          <input
            type="hidden"
            name="preview"
            value={Boolean(
              kanji.autoDetect && activeStep < steps.length - 1,
            ).toString()}
          />
        </DialogContent>
        <DialogActions>
          <StepperButtons
            activeStep={activeStep}
            autoDetect={kanji.autoDetect}
            onAdd={onAddKanji}
            onBack={() => setActiveStep(activeStep - 1)}
            onCancel={handleClose}
            stepsCount={steps.length}
          />
        </DialogActions>
      </form>
    </BaseModal>
  );
};

export default AddKanjiModal;
