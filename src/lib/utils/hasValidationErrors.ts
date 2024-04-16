import type { Error } from "@/lib/validation/validateSchema";

export const hasValidationErrors = <T extends string>(
  errors: Record<T, Error>,
) => Object.values<Error>(errors).filter((e) => !!e?.message).length > 0;
