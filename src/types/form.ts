import type { InputProps } from "@mui/material";
import type { Error } from "@/lib/validation/validateSchema";
import type { ApiResponse } from "./api";

export type FormState<T, D = unknown> = Partial<{
  apiResponse: ApiResponse<D>;
  validationErrors: Record<keyof T, Error>;
}>;

export type FormProps<F> = {
  errors?: NonNullable<FormState<F>>["validationErrors"];
};

export type FormInputProps<F> = FormProps<F> &
  Pick<InputProps, "value" | "onChange" | "disabled" | "required">;
