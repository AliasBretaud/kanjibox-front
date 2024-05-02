export const cleanObject = (
  obj: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]: [string, unknown]) =>
        value !== null && value !== undefined && value !== "",
    ),
  );
