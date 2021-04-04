import { ColumnMode } from '@swimlane/ngx-datatable';

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

// Column types
export interface ColumnModel {
    id: string;
    name: string;
    type: 'string' | 'date' | 'price' | 'number' | 'operation';
    minWidth?: string;
    sticky?: boolean;
    search?: {
        type: string;
        mode: TableSearchMode;
    };
}

export interface OperationColumnModel extends ColumnModel {
    type: 'operation';
    operations: Array<{
        name: string;
        icon: string;
        color: 'primary' | 'warn' | 'accent';
        // tslint:disable-next-line:variable-name
        operation({row}): void;
    }>;
}
