import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { DepositSettingService } from 'app/services/feature-services/system-setting-services/deposit-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { DepositSettingAddComponent } from '../deposit-setting-add/deposit-setting-add.component';
import { DepositSettingDetailComponent } from '../deposit-setting-detail/deposit-setting-detail.component';

@Component({
    selector: 'app-deposit-setting-list',
    templateUrl: './deposit-setting-list.component.html',
    styleUrls: ['./deposit-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class DepositSettingListComponent implements OnInit {
    constructor(private matDialog: MatDialog, private fb: FormBuilder, public depositSettingService: DepositSettingService) {}
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = [
        'accountType',
        'bankName',
        'branchCode',
        'branchName',
        'depositNumber',
        'openingDate',
        'interestRate',
        'glCode',
        'operation',
    ];
    searchFormGroup: FormGroup;

    isWorking: any;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            bankName: '',
            branchName: '',
            branchCode: '',
            accountType: '',
            depositNumber: '',
            iban: '',
            glCode: '',
            interestRate: '',
            openingDate: '',
        });
    }

    pageHandler(e: PagingEvent) {
        this.depositSettingService.specificationModel.limit = e.pageSize;
        this.depositSettingService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            if (res['openingDate'] && res['openingDate'] != '') {
                res['openingDate'] = formatDate(res['openingDate'], 'yyyy-MM-dd', 'en_US');
            }
            this.depositSettingService.specificationModel.searchKeyword = res;
            this.depositSettingService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.depositSettingService.getDepositSettings(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.depositSettingService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(DepositSettingAddComponent, {
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
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.depositSettingService.deleteDepositSetting(element.id, this).subscribe(() => this.get());
                }
            });
    }

    detail(element) {
        this.matDialog
            .open(DepositSettingDetailComponent, { panelClass: 'dialog-w60', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(DepositSettingAddComponent, { panelClass: 'dialog-w60', data: element })
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
}
