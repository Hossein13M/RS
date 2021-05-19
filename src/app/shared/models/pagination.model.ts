export interface PaginationModel {
    skip: number;
    limit: number;
    total: number;
}

export interface PaginationResponse<T> extends PaginationModel {
    items: Array<T>;
}