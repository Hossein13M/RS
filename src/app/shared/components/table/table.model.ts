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

export type Color = 'primary' | 'warn' | 'accent';

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

export interface CustomCol extends SimpleColumn {
    type: 'custom';
    cellTemplate: TemplateRef<any>;
}

export interface OperationColumn extends SimpleColumn {
    type: 'operation';
    operations: Array<Operation | OperationWithTemplate | OperationWithCondition>;
}

interface Operation {
    name: string;
    icon: string | 'condition' | 'template' | 'component';
    color: Color | ((row: any) => Color);
    operation?({ row }): void;
}

// example: { name: 'ویرایش', icon: 'template', content: this.statusRef, color: 'accent' },
interface OperationWithTemplate extends Operation {
    icon: 'template';
    content: TemplateRef<any>;
    operation?({ row }): void;
}

/** example:
 * {
 *  name: 'ویرایش',
 *  icon: 'condition',
 *  content: (row: ResponseOperatorItemDto) => (row.mobileNumber ? 'check_circle_outline' : 'highlight_off'),
 *  color: 'primary',
 *  operation: ({ row }: any) => this.editOperator(row),
 * }
 */
interface OperationWithCondition extends Operation {
    icon: 'condition';
    content: (row: any) => string;
}
