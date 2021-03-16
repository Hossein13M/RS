import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { OrganizationTypeService } from 'app/services/feature-services/system-setting-services/organization-type.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { OrganizationTypeSettingAddComponent } from '../organization-type-setting-add/organization-type-setting-add.component';

@Component({
    selector: 'app-organization-type-setting-list',
    templateUrl: './organization-type-setting-list.component.html',
    styleUrls: ['./organization-type-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class OrganizationTypeSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'operation'];
    searchFormGroup: FormGroup;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            searchKeyword: '',
        });
    }

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public organizationTypeService: OrganizationTypeService) {}

    pageHandler(e: PagingEvent) {
        this.organizationTypeService.specificationModel.limit = e.pageSize;
        this.organizationTypeService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.organizationTypeService.specificationModel.searchKeyword = res;
            this.organizationTypeService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.organizationTypeService.getOrganizationType(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res);
            this.organizationTypeService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(OrganizationTypeSettingAddComponent, {
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
                    this.organizationTypeService.deleteOrganizationType(element.id, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(OrganizationTypeSettingAddComponent, {
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
