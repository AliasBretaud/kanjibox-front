import type { InputProps } from "@mui/material";
import type { ApiResponseStatus } from "./api";

export type FormState<T> = Partial<{
  apiResponse: ApiResponseStatus;
  validationErrors: Record<keyof T, string>;
}> | null;

export type FormProps<F> = {
  errors?: NonNullable<FormState<F>>["validationErrors"];
};

export type FormInputProps<F> = FormProps<F> &
  Pick<InputProps, "value" | "onChange" | "disabled">;
