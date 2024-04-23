import { hasValidationErrors } from "@/lib/utils/hasValidationErrors";
import type { Error } from "@/lib/validation/validateSchema";
import {
  Container,
  Stepper as MuiStepper,
  Step,
  StepLabel,
} from "@mui/material";
import type { ReactNode } from "react";

type AddStep = {
  label: string;
  render: () => ReactNode;
};

export const Stepper = ({
  activeStep,
  errors,
  steps,
}: {
  activeStep: number;
  errors?: Record<string, Error>;
  steps: AddStep[];
}) => {
  const isStepFailed = (index: number) => {
    if (index === 0) {
      return hasValidationErrors(errors);
    }
  };
  return (
    <Container sx={{ mb: 2 }}>
      <MuiStepper activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step key={label}>
            <StepLabel error={isStepFailed(index)}>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Container>
  );
};
