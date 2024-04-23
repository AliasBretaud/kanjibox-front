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

export type ResponseError = {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
};

export type ApiResponseStatus = Partial<{
  isError: boolean;
  isSuccess: boolean;
}>;

export type ApiResponse<T> = {
  status: ApiResponseStatus;
  params?: Record<string, unknown>;
  data?: T;
};
