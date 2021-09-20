import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { AlertService } from '#shared/services/alert.service';
import { OrganizationStructureService } from '../organization-structure.service';
import { OrganizationStructureModel } from '../organization-structure.model';
import { OrganizationComponent } from '../organization/organization.component';

@Component({
    selector: 'app-organizations',
    templateUrl: './organizations-list.component.html',
    styleUrls: ['./organizations-list.component.scss'],
})
export class OrganizationsListComponent implements OnInit {
    organizations: Array<OrganizationStructureModel>;
    pagination = { skip: 0, limit: 5, total: 100 };
    tableColumn: Array<Column> = [
        { id: 'index', type: 'index' },
        { id: 'name', name: 'نام نهاد', type: 'string', minWidth: '500px' },
        {
            id: 'isActive',
            name: 'وضعیت نهاد',
            convert: (value) => (value ? 'فعال' : 'غیر فعال'),
            type: 'string',
            minWidth: '500px',
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '200px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'پیکربندی ساختار و نقش',
                    icon: 'account_tree',
                    color: 'primary',
                    operation: (row: any) => this.navigateToUnitsAndRolesPage(row),
                },
                {
                    name: 'ویرایش نام',
                    icon: 'mode_edit',
                    color: 'primary',
                    operation: (row: any) => this.openOrganizationModal(row),
                },
                {
                    name: 'ویرایش وضعیت',
                    icon: 'sync',
                    color: 'warn',
                    operation: (row: any) => this.deactivateOrganization(row),
                },
            ],
        },
    ];

    constructor(
        private organizationOrderService: OrganizationStructureService,
        public dialog: MatDialog,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getOrganizations();
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getOrganizations();
    }

    public openOrganizationModal(organization?: { operationItem: { color: string; icon: string; operation: any }; row: OrganizationStructureModel }): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(OrganizationComponent, {
            data: organization ? organization.row : null,
            width: '400px',
            height: '320px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result) => result && this.getOrganizations());
    }

    private getOrganizations(): void {
        this.organizationOrderService.getOrganizationsList(this.pagination).subscribe((response) => {
            this.organizations = response.items;
            this.pagination.total = response.total;
        });
    }

    private deactivateOrganization(organization: { operationItem: { color: string; icon: string; operation: any }; row: OrganizationStructureModel }): void {
        this.organizationOrderService.deactivateOrganization(organization.row.id).subscribe(
            () => () => this.alertService.onSuccess('با موفقیت غیرفعال شد'),
            () => this.alertService.onError('خطایی رخ داده‌است'),
            () => this.getOrganizations()
        );
    }

    private navigateToUnitsAndRolesPage(organization: any): void {
        this.router.navigate(['/organizations-structure/roles-list/' + organization.row.id]).finally();
    }
}
