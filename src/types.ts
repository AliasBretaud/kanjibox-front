export type MappedValue<T extends string, D> = {
  [key in T]?: D;
};

export type $Kanji = {
  id?: number;
  value: string;
  kunYomi?: string[];
  onYomi?: string[];
  translations?: MappedValue<string, string[]>;
};

export type FKanji = Pick<$Kanji, "value"> & {
  kunYomi: string;
  onYomi: string;
  translations: string;
};

export type $Word = {
  id?: number;
  value: string;
  furiganaValue: string;
  kanjis?: $Kanji[];
  translations: MappedValue<string, string[]>;
};

type Sorted = {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};

export type Pageable = {
  sort: Sorted;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
};

export type Page<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  number: number;
  sort: Sorted;
};

export type PageParams<T, D = unknown> = {
  params: T;
  searchParams: D;
};

export type ResponseError = {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
};

type ApiResponseStatus = Partial<{
  isError: boolean;
  isSuccess: boolean;
}>;

export type RequiredProps<T> = {
  [P in keyof T]-?: Required<NonNullable<T[P]>>;
};

export type FormState<T> = Partial<{
  apiResponse: ApiResponseStatus;
  validationErrors: Record<keyof T, string>;
}>;

export type MKanji = "add-kanji" | "kanji-details";

export type MWord = "add-word";

export type PropsWithLocalization<T> = T & { locale: string };
