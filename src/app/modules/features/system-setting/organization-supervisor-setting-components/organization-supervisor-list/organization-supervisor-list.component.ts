import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { OrganizationSupervisorService } from 'app/services/feature-services/system-setting-services/organization-supervisor.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { OrganizationSupervisorAddComponent } from '../organization-supervisor-add/organization-supervisor-add.component';

@Component({
    selector: 'app-organization-supervisor-list',
    templateUrl: './organization-supervisor-list.component.html',
    styleUrls: ['./organization-supervisor-list.component.scss'],
    animations: [fuseAnimations],
})
export class OrganizationSupervisorListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'operation'];
    searchFormGroup: FormGroup;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            searchKeyword: '',
        });
    }

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public organizationSupervisorService: OrganizationSupervisorService) {}

    pageHandler(e: PagingEvent) {
        this.organizationSupervisorService.specificationModel.limit = e.pageSize;
        this.organizationSupervisorService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.organizationSupervisorService.specificationModel.searchKeyword = res;
            this.organizationSupervisorService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.organizationSupervisorService.getOrganization(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res);
            this.organizationSupervisorService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(OrganizationSupervisorAddComponent, {
                panelClass: 'dialog-w60',
                data: null,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.organizationSupervisorService.deleteOrganization(element.id, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(OrganizationSupervisorAddComponent, {
                panelClass: 'dialog-w60',
                data: element,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
