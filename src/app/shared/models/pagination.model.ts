export interface PaginationModel {
    skip: number;
    limit: number;
    total: number;
}

export interface ResponseWithPagination<T> extends PaginationModel {
    items: Array<T>;
}
