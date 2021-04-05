import { TemplateRef } from '@angular/core';

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
export type ColumnModel = SimpleColumnModel | OperationColumnModel | CustomColModel;

interface SimpleColumnModel {
    id: string;
    name: string;
    type: 'string' | 'date' | 'price' | 'number' | 'custom' | 'operation';
    minWidth?: string;
    sticky?: boolean;
    search?: {
        type: 'select' | 'text' | 'date';
        mode: TableSearchMode;
    };
}

interface OperationColumnModel extends SimpleColumnModel {
    type: 'operation';
    operations: Array<{
        name: string;
        icon: string;
        color: 'primary' | 'warn' | 'accent';
        // tslint:disable-next-line:variable-name
        operation({ row }): void;
    }>;
}

interface CustomColModel extends SimpleColumnModel {
    type: 'custom';
    cellTemplate: TemplateRef<any>
}
