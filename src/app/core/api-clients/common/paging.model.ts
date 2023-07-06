export class PagingRequest {
  public pageSize: number = 15;
  public pageNumber: number = 1;
  sort?: string;
  filter?: string;
  isTakeAll?: boolean;

  constructor(pageSize: number, pageNumber: number, sort: string) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sort = sort;
  }
}

export const DEFAULT_PAGING_REQUEST: PagingRequest = {
  pageSize: 10,
  pageNumber: 1,
};

export const DEFAULT_PAGINATION_OPTION = [10, 20, 50, 100];

export const EMPTY_PAGING_RESULT: PagingResult<any> = {
  pageInfo: {
    size: 10,
    pageNumber: 1,
    totalElements: 0,
    totalPages: 0,
  },
  items: [],
};

export class Page {
  public size: number = 2;
  public pageNumber: number = 1;
  public totalElements!: number;
  public totalPages!: number;
}

export class PagingResult<T> {
  public pageInfo!: Page;
  public items!: Array<T>;
}

export interface PagingOptions {
  pageSize: number;
  pageNumber: number;
  sorts?: { dir: string; prop: string }[];
  filter?: string;
  isTakeAll?: boolean;
}
