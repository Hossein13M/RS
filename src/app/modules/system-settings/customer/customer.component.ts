import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer, CustomerType } from './customer.model';
import { AlertService } from '#shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { Column } from '#shared/components/table/table.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
    public customerList: Array<Customer> = [];
    public pagination = { skip: 0, limit: 100, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'name', name: 'نام مشتری', type: 'string', minWidth: '200px' },
        { id: 'nationalId', name: 'کد ملی', type: 'string', minWidth: '200px' },
        { id: 'type', name: 'نوع مشتری', convert: (value) => CustomerComponent.convertCustomerType(value), type: 'string', minWidth: '200px' },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '200px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'ویرایش',
                    icon: 'mode_edit',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Customer }) => this.openCusotmerDialog('edit', row.row),
                },
                {
                    name: 'پاک کردن',
                    icon: 'delete_outline',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: Customer }) => this.deleteCustomer(row.row.id),
                },
            ],
        },
    ];
    constructor(private readonly customerService: CustomerService, private readonly alertServic: AlertService, private readonly dialog: MatDialog) {}

    ngOnInit(): void {
        this.getCustomersList();
    }

    private getCustomersList(): void {
        this.customerService.getCustomersList().subscribe((response) => (this.customerList = response.items));
    }

    public deleteCustomer(customerId: number): void {
        this.customerService.deleteCustomer(customerId).subscribe(() => this.alertServic.onSuccess('با موفقیت ویرایش شد'));
    }

    public openCusotmerDialog(dialogType: 'edit' | 'create', customerInfo?: Customer): void {
        this.dialog
            .open(CustomerDialogComponent, {
                panelClass: 'dialog-p-0',
                data: { isEditMode: dialogType === 'edit', customerInfo: dialogType === 'edit' ? customerInfo : null },
            })
            .afterClosed()
            .subscribe((result) => result && this.getCustomersList());
    }

    private static convertCustomerType(customerType: CustomerType): string {
        return customerType === 'legal' ? 'حقوقی' : 'حقیقی';
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getCustomersList();
    }
}
