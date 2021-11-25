export default class Page<T> {
  content: T[];
  pageable?: Pageable;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
  numberOfElements?: number;
  number?: number;
  sort: any;

  constructor(s: {
    content?: T[];
    pageable?: Pageable;
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    size?: number;
    numberOfElements?: number;
    number?: number;
    sort?: any;
  }) {
    this.content = s.content || [];
    this.pageable = s.pageable;
    this.last = s.last;
    this.totalElements = s.totalElements;
    this.totalPages = s.totalPages;
    this.size = s.size;
    this.numberOfElements = s.numberOfElements;
    this.number = s.number;
    this.sort = s.sort;
  }
}

export interface Pageable {
  sort: any;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}
