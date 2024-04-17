type Obj = Record<string, unknown>;

export const pick = <T extends Obj, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> =>
  keys.reduce(
    (obj, key) => ({ ...obj, [key]: object[key as keyof T] }),
    {} as Partial<T>,
  ) as Pick<T, K>;
