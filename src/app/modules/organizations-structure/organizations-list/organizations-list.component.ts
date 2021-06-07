import { Component, OnInit } from '@angular/core';
import { OrganizationStructureService } from '../organization-structure.service';
import { OrganizationStructureModel } from '../organization-structure.model';
import { Column } from '#shared/components/table/table.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrganizationComponent } from '../organization/organization.component';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

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
        { id: 'isActive', name: 'وضعیت نهاد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '500px' },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '200px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                { name: 'مدیریت ساختار و نقش', icon: 'filter_list', color: 'accent', operation: (row: any) => this.dastan(row) },
                { name: 'گرفتن رونوشت', icon: 'file_copy', color: 'accent', operation: (row: OrganizationStructureModel) => this.copyOrganization(row) },
                { name: 'ویرایش نام', icon: 'mode_edit', color: 'accent', operation: (row: any) => this.openOrganizationModal(row) },
                { name: 'غیرفعال‌سازی', icon: 'sync_alt', color: 'accent', operation: (row: any) => this.deactivateOrganization(row) },
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

    private getOrganizations(): void {
        this.organizationOrderService.getOrganizationsList(this.pagination).subscribe((response) => {
            this.organizations = response.items;
            this.pagination.total = response.total;
        });
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getOrganizations();
    }

    private copyOrganization(organization: OrganizationStructureModel): void {
        // TODO: this needs to be implemented after the backend has been prepared
        console.log(organization);
        window.alert(organization.name);
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

    private deactivateOrganization(organization: { operationItem: { color: string; icon: string; operation: any }; row: OrganizationStructureModel }): void {
        this.organizationOrderService.deactivateOrganization(organization.row.id).subscribe(
            () => () => this.alertService.onSuccess('با موفقیت غیرفعال شد'),
            () => this.alertService.onError('خطایی رخ داده‌است'),
            () => this.getOrganizations()
        );
    }

    private dastan(organization: any): void {
        this.router.navigate(['/organizations-structure/roles-list/' + organization.row.id]).finally();
    }
}
