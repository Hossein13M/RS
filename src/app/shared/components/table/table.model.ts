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
export type Column = SimpleColumn | OperationColumn | CustomCol | DetailColumn;

export interface SimpleColumn {
    id: string;
    name?: string;
    type: 'string' | 'date' | 'price' | 'date_range' | 'number' | 'custom' | 'operation' | 'rowDetail';
    minWidth?: string;
    sticky?: boolean;
    search?: {
        type: 'select' | 'text' | 'date' | 'date_range';
        mode: TableSearchMode;
        options?: Array<{
            value: string | number | boolean;
            name: string | number;
        }>;
    };
    convert?(value: any): any;
}

export interface DetailColumn extends SimpleColumn {
    type: 'rowDetail';
    doubleClickable: boolean;
    click(row): any;
    doubleClick(row): any;
}

export interface OperationColumn extends SimpleColumn {
    type: 'operation';
    operations: Array<{
        name: string;
        icon: string;
        color: 'primary' | 'warn' | 'accent';
        // tslint:disable-next-line:variable-name
        operation({ row }): void;
    }>;
}

export interface CustomCol extends SimpleColumn {
    type: 'custom';
    cellTemplate: TemplateRef<any>;
}
