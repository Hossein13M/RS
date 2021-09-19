import { TableSearchMode } from '#shared/components/table/table.model';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { tableMockData } from './table-mock-data';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit, AfterViewInit {
    @ViewChild('mamad', { static: false }) mamad: TemplateRef<any>;
    dataFromBack = tableMockData;
    data = this.dataFromBack.items;
    columns: Array<any>;
    show = false;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.show = true;
        this.columns = [
            {
                name: 'نام',
                id: 'name',
                type: 'string',
                minWidth: '200px',
                search: { type: 'text', mode: TableSearchMode.LOCAL },
            },
            { name: 'شناسه نماد', id: 'ticker', type: 'string', minWidth: '100px' },
            { name: 'سود/ضرر', id: 'profit', type: 'profit', minWidth: '150px' },
            {
                // NO Search Option Example
                name: 'نوع',
                id: 'type',
                type: 'number',
                minWidth: '130px',
                search: { type: 'select', mode: TableSearchMode.LOCAL },
            },
            {
                name: 'وضعیت',
                id: 'status',
                type: 'string',
                minWidth: '130px',
                search: {
                    type: 'select',
                    options: [
                        { name: 'فعال', value: 'active' },
                        { name: 'غیرفعال', value: 'deleted' },
                    ],
                    mode: TableSearchMode.LOCAL,
                },
                convert: (value: any) => (value === 'active' ? 'فعال' : 'غیر فعال'),
            },
            {
                name: 'نام نماد',
                id: 'symbol',
                type: 'string',
                minWidth: '150px',
                search: { type: 'text', mode: TableSearchMode.SERVER },
            },
            {
                name: 'محل معامله',
                id: 'isInBourse',
                type: 'string',
                minWidth: '130px',
                convert: (value: any) => (value ? 'بورس' : 'غیر بورسی'),
            },
            {
                name: 'زمان معامله',
                id: 'date',
                type: 'date',
                width: '80px',
                minWidth: '80px',
                search: { type: 'date', mode: TableSearchMode.LOCAL },
                convert: (value: any) =>
                    new Date(value).toLocaleDateString('fa-Ir', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
            },
            {
                name: 'زمان فروش',
                id: 'dateSell',
                type: 'date',
                width: '80px',
                minWidth: '80px',
                search: { type: 'date', mode: TableSearchMode.LOCAL },
                convert: (value: any) =>
                    new Date(value).toLocaleDateString('fa-Ir', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
            },
            { name: 'شخصی', id: 'custom1', type: 'custom', cellTemplate: this.mamad },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'مشاهده', icon: 'visibility', color: 'primary', operation: 'show' },
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: 'edit' },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row, operationItem }: any) => (operationItem.icon = 'toggle_off'),
                    },
                ],
            },
            {
                id: 'rowDetail',
                type: 'rowDetail',
                click: (row) => console.log('row clicked once', row),
                // Action To Trigger On One Click
                doubleClickable: true,
                doubleClick: (row) => {
                    const dialogRef = this.dialog.open(TableDialogComponent, {
                        width: '80vw',
                        data: {
                            title: 'یه دیالوگ تستی',
                            columns: [
                                { name: 'نام', id: 'name', type: 'string', headerAlign: 'center', dataAlign: 'center' },
                                {
                                    name: 'حجم',
                                    id: 'volume',
                                    type: 'number',
                                    headerAlign: 'center',
                                    dataAlign: 'center',
                                },
                                {
                                    name: 'ارزش',
                                    id: 'value',
                                    type: 'price',
                                    headerAlign: 'center',
                                    dataAlign: 'center',
                                },
                            ],
                            data: row.details,
                        },
                    });
                },
            },
        ];
    }

    toggleRowStatus(row: any): void {
        row.isInBourse = !row.isInBourse;
    }

    search(filter: any): void {
        console.log(filter);
    }

    operation(op: any): void {
        console.log(op);
    }
}
