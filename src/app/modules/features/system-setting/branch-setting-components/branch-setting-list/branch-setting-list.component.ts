import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BranchSettingService } from 'app/services/feature-services/system-setting-services/branch-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BranchSettingAddComponent } from '../branch-setting-add/branch-setting-add.component';

@Component({
    selector: 'app-branch-setting-list',
    templateUrl: './branch-setting-list.component.html',
    styleUrls: ['./branch-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BranchSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['bankName', 'branchCode', 'branchName', 'operation'];
    searchFormGroup: FormGroup;

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public branchService: BranchSettingService) {}

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({ searchKeyword: '', bankId: '' });
    }

    pageHandler(e: PagingEvent) {
        this.branchService.specificationModel.limit = e.pageSize;
        this.branchService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.branchService.specificationModel.searchKeyword = res;
            this.branchService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.branchService.getBankBranch(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.branchService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(BranchSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.branchService.deleteBankBranch(element.id, this).subscribe(() => this.get());
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(BranchSettingAddComponent, { panelClass: 'dialog-w60', data: element })
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
