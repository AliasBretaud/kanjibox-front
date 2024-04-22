import type { FormState } from "@/types/form";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function useFormStateValidation<F, D>(
  action: (_: unknown, data: FormData) => Promise<FormState<F, D>>,
) {
  const [formState, formAction] = useFormState(action, {});
  const [errors, setErrors] = useState(formState.validationErrors);
  const [apiResponse, setApiResponse] = useState(formState.apiResponse);

  useEffect(() => {
    setErrors(formState.validationErrors);
  }, [formState.validationErrors]);

  useEffect(() => {
    setApiResponse(formState.apiResponse);
  }, [formState.apiResponse]);

  return { formAction, errors, apiResponse, setErrors };
}
