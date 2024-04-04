import type { ZodSchema } from "zod";

type ValidationReturnType<T> = Partial<{
  success: boolean;
  errors: Record<keyof T, string>;
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
          const key = err.path[0] as keyof T;
          acc[key] = err.message;
          return acc;
        },
        {} as Record<keyof T, string>,
      ),
    };
  }
  return { success: true };
};

export default validateSchema;
