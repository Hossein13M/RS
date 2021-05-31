import { TemplateRef } from '@angular/core';

export enum TableSearchMode {
    'NONE',
    'LOCAL',
    'SERVER',
}

export interface PaginationSetting {
    mode: 'local' | 'backend' | 'scroll';
    pageSize?: string | number;
    pageSizeOptions?: Array<number>;
}

export interface PaginationChangeType {
    skip: number;
    limit: number;
    total: number;
}

// Column types
export type Column = BaseColumn | OperationColumn | CustomCol | DetailColumn;

interface BaseColumn {
    id: string;
    name: string;
    type: 'string' | 'date' | 'price' | 'number' | 'custom' | 'operation' | 'rowDetail';
    minWidth?: string;
    sticky?: boolean;
    search?: {
        type: 'select' | 'text' | 'date';
        mode: TableSearchMode;
        options?: Array<{
            value: string | number | boolean;
            name: string | number;
        }>;
    };
    convert?(value: any): any;
}

interface DetailColumn extends BaseColumn {
    type: 'rowDetail';
    doubleClickable: boolean;
}

interface OperationColumn extends BaseColumn {
    type: 'operation';
    operations: Array<{
        name: string;
        icon: string;
        color: 'primary' | 'warn' | 'accent';
        // tslint:disable-next-line:variable-name
        operation({ row }): void;
    }>;
}

interface CustomCol extends BaseColumn {
    type: 'custom';
    cellTemplate: TemplateRef<any>;
}
