import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FundRoleService } from 'app/services/feature-services/system-setting-services/fund-role.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BourseBoardSettingAddComponent } from '../../bourse-board-setting-components/bourse-board-setting-add/bourse-board-setting-add.component';
import { FundRoleSettingAddComponent } from '../fund-role-setting-add/fund-role-setting-add.component';

@Component({
    selector: 'app-fund-role-setting-list',
    templateUrl: './fund-role-setting-list.component.html',
    styleUrls: ['./fund-role-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class FundRoleSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'phone', 'regNumber', 'agentName', 'agentPhone', 'nationalId', 'address', 'operation'];
    searchFormGroup: FormGroup;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            name: '',
            phone: '',
            address: '',
            agentName: '',
            agentPhone: '',
            nationalId: '',
            regNumber: '',
            regDate: '',
            hasSupervisor: '',
            organizationTypeName: '',
            organizationSupervisorName: '',
        });
    }

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public fundRoleService: FundRoleService) {}

    pageHandler(e: PagingEvent) {
        this.fundRoleService.specificationModel.limit = e.pageSize;
        this.fundRoleService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.fundRoleService.specificationModel.searchKeyword = res;
            this.fundRoleService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.fundRoleService.getFundRoleWithPaging(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.fundRoleService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(FundRoleSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    delete(element) {
        console.log(element);
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((result) => {
                if (result) this.fundRoleService.deleteFundRole(element.id, this).subscribe(() => this.get());
            });
    }

    edit(element) {
        this.matDialog
            .open(BourseBoardSettingAddComponent, { panelClass: 'dialog-w60', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
