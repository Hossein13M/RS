export enum TableSearchMode {
    'NONE',
    'LOCAL',
    'SERVER',
}

export interface PaginationSetting {
    mode: 'local' | 'backend';
    pageSize?: string | number;
    pageSizeOptions?: Array<number>;
}

export interface PaginationChangeType {
    skip: number;
    limit: number;
    total: number;
}
