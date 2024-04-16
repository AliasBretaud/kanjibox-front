import type { ZodSchema } from "zod";

export type Error = Partial<{
  message: string;
  params: Record<string, unknown>;
}>;

export type ValidationReturnType<T> = Partial<{
  success: boolean;
  errors: Record<keyof T, Error>;
}>;

const validateSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown,
): ValidationReturnType<T> => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    return {
      errors: validation.error.issues.reduce(
        (acc, err) => {
          err.path
            .map((p) => p as keyof T)
            .forEach((key, i) => {
              acc[key] = { message: i === 0 ? err.message : undefined };
              if (err.code === "custom" && err.params) {
                acc[key].params = err.params;
              }
            });
          return acc;
        },
        {} as Record<keyof T, Error>,
      ),
    };
  }
  return { success: true };
};

export default validateSchema;
