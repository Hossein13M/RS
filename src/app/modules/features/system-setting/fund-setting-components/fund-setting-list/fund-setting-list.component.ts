import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FundSettingService } from 'app/services/feature-services/system-setting-services/fund-setting.service';
import { FundTypeService } from 'app/services/feature-services/system-setting-services/fund-type.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { FundSettingAddComponent } from '../fund-setting-add/fund-setting-add.component';

@Component({
    selector: 'app-fund-setting-list',
    templateUrl: './fund-setting-list.component.html',
    styleUrls: ['./fund-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class FundSettingListComponent implements OnInit {
    constructor(
        private matDialog: MatDialog,
        private fb: FormBuilder,
        private fundTypeService: FundTypeService,
        public fundSettingService: FundSettingService
    ) {}
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = [
        'name',
        'code',
        'fundTypeId',
        'etf',
        'fundBenefitGuarantor',
        'fundLiquidityGuarantor',
        'fundMarketer',
        'fundTruster',
        'fundRegisterManagements',
        'fundInvestmentManagement',
        'nationalId',
        'operation',
    ];
    searchFormGroup: FormGroup;
    fundTypes = [];

    isWorking: any;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({ details: '', etf: '', fundType: '', searchKeyword: '' });
    }

    getAllFundType() {
        this.fundTypeService.getAllFundTypes(this).subscribe((rs: any) => (this.fundTypes = rs));
    }

    pageHandler(e: PagingEvent) {
        this.fundSettingService.specificationModel.limit = e.pageSize;
        this.fundSettingService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.getAllFundType();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.fundSettingService.specificationModel.searchKeyword = res;
            this.fundSettingService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.fundSettingService.getAllFund(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.fundSettingService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(FundSettingAddComponent, { panelClass: 'dialog-w80', data: null })
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
                if (res) this.fundSettingService.deleteFund(element.id, this).subscribe(() => this.get());
            });
    }

    edit(element) {
        this.matDialog
            .open(FundSettingAddComponent, { panelClass: 'dialog-w80', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    handleError(): boolean {
        return false;
    }
}
