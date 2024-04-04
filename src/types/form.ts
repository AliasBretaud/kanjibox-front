import type { ApiResponseStatus } from "./api";

export type FormState<T> = Partial<{
  apiResponse: ApiResponseStatus;
  validationErrors: Record<keyof T, string>;
}>;
