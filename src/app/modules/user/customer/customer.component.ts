import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CustomerInfoDto } from 'app/services/API/models';
import { CustomerManagmentService } from 'app/services/App/user/customer-managment.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    animations: fuseAnimations,
})
export class CustomerComponent implements OnInit {
    customers: CustomerInfoDto[] = [];
    ELEMENT_DATA: CustomerInfoDto[] = [];
    searchInput: FormGroup;
    dialogRef: any;
    loading: boolean = false;
    dataSource = new MatTableDataSource<CustomerInfoDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'nationalId', 'type', 'remove'];

    constructor(private customerService: CustomerManagmentService, private _matDialog: MatDialog) {
        this.searchInput = new FormGroup({ type: new FormControl(''), nationalId: new FormControl(''), customerName: new FormControl('') });
    }

    ngOnInit() {
        this.customerService.customersList.subscribe((res) => {
            this.customers = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<CustomerInfoDto>(this.ELEMENT_DATA);
        });

        this.customerService
            .getCustomers(
                this.searchInput.controls['type'].value,
                this.searchInput.controls['customerName'].value,
                this.searchInput.controls['nationalId'].value
            )
            .subscribe(() => {
                /* nothing just loading*/
            });

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.customerService
                .getCustomers(
                    this.searchInput.controls['type'].value,
                    this.searchInput.controls['customerName'].value,
                    this.searchInput.controls['nationalId'].value
                )
                .subscribe(() => {
                    //nothing just loading
                });
        });
    }

    ngAfterViewInit(): void {
        document.getElementById('table-container').addEventListener('scroll', this.scroll.bind(this), true);
    }

    /*
     ** New customer
     */
    newCustomer(): void {
        this.dialogRef = this._matDialog.open(AddCustomerComponent, {
            panelClass: 'customer-form-dialog',
            data: { action: 'new' },
        });
        this.dialogRef.afterClosed().subscribe(() => {
            //nothing
        });
    }

    /**
     * Edit customer
     *
     * @param customer
     */
    editCustomer(customer): void {
        this.dialogRef = this._matDialog.open(AddCustomerComponent, {
            panelClass: 'customer-form-dialog',
            data: { customer: customer, action: 'edit' },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            //nothing
        });
    }

    deleteCustomer(id) {
        this.customerService.deleteCustomer(id).subscribe(() => {});
    }

    scroll(event): void {
        let table = document.getElementById('table-container');
        var scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);

        if (!this.loading) {
            if (scrollPosition < 50) {
                this.loading = true;
                this.customerService
                    .getCustomers(
                        this.searchInput.controls['type'].value,
                        this.searchInput.controls['customerName'].value,
                        this.searchInput.controls['nationalId'].value
                    )
                    .subscribe(() => (this.loading = false));
            }
        } else return;
    }
}
