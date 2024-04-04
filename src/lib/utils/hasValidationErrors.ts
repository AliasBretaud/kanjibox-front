export const hasValidationErrors = <T extends string>(
  errors: Record<T, string>,
) => Object.values(errors).filter((e) => e).length > 0;
