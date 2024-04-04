export type MappedValue<T extends string, D> = {
  [key in T]?: D;
};

export type RequiredProps<T> = {
  [P in keyof T]-?: Required<NonNullable<T[P]>>;
};

export type PropsWithLocalization<T> = T & { locale: string };

export type PageParams<T, D = unknown> = {
  params: T;
  searchParams: D;
};
