import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { FrequenceService } from 'app/services/feature-services/frequence.service';
import { FundRoleService } from 'app/services/feature-services/system-setting-services/fund-role.service';
import { FundSettingService } from 'app/services/feature-services/system-setting-services/fund-setting.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlService } from '../../../gl/gl.service';

@Component({
    selector: 'app-fund-setting-add',
    templateUrl: './fund-setting-add.component.html',
    styleUrls: ['./fund-setting-add.component.scss'],
})
export class FundSettingAddComponent implements OnInit, OnDestroy {
    form: FormGroup;
    title = '';
    frequences = [];
    fundRoles: any[] = [];
    fundTypes: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<FundSettingAddComponent>,
        private alertService: AlertService,
        private fundSettingService: FundSettingService,
        private bankService: BankService,
        private glService: GlService,
        private fundRoleService: FundRoleService,
        private frequenceService: FrequenceService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    public fundRoleMultiFilterCtrl: FormControl = new FormControl();
    public filteredFundRoleMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    private _onDestroy = new Subject<void>();

    getFrequences(): void {
        this.frequenceService.getAllFrequences().subscribe((res: any) => (this.frequences = res));
    }

    getFundTypes(): void {
        this.glService.getAllFundTypes().subscribe((res: any) => (this.fundTypes = res));
    }

    getFundRoles(): void {
        this.fundRoleService.getFundRoles().subscribe((res: any) => {
            this.fundRoles = res.items;
            this.filteredFundRoleMulti.next(this.fundRoles.slice());
            this.fundRoleMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.filterFundRoleMulti());
        });
    }

    ngOnInit(): void {
        if (this.data) this.title = 'ویرایش ';
        else this.title = 'ایجاد ';

        this.creatForm();
        this.getFrequences();
        this.getFundRoles();
        this.getFundTypes();
    }

    creatForm(): void {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
            code: [this.data ? this.data.code : '', Validators.required],
            nationalId: [this.data ? this.data.nationalId : '', Validators.required],
            symbol: [this.data ? this.data.symbol : ''],
            imageObjectName: [this.data ? this.data.imageObjectName : ''],
            etf: [this.data ? this.data.etf : ''],
            SEORgisterCode: [this.data ? this.data.SEORgisterCode : ''],
            CRORegisterCode: [this.data ? this.data.CRORegisterCode : ''],
            establishingDate: [this.data ? this.data.establishingDate : ''],
            activityStartDate: [this.data ? this.data.activityStartDate : ''],
            startDateOfpublicOffering: [this.data ? this.data.startDateOfpublicOffering : ''],
            endDateOfpublicOffering: [this.data ? this.data.endDateOfpublicOffering : ''],
            minDailyGuarantee: [this.data ? this.data.minDailyGuarantee : ''],
            minDailyDeal: [this.data ? this.data.minDailyDeal : ''],
            minOrderQuantity: [this.data ? this.data.minOrderQuantity : ''],
            numberOfPrivilegeUnit: [this.data ? this.data.numberOfPrivilegeUnit : ''],
            dayOfPayingProfit: [this.data ? this.data.dayOfPayingProfit : ''],
            perMinDailyDeal: [this.data ? this.data.perMinDailyDeal : ''],
            volMinDailyDeal: [this.data ? this.data.volMinDailyDeal : ''],
            glCode: [this.data ? this.data.glCode : ''],
            fiscalMonth: [this.data ? this.data.fiscalMonth : ''],
            taxDueDay: [this.data ? this.data.taxDueDay : ''],
            taxDueMonth: [this.data ? this.data.taxDueMonth : ''],
            minUnitNum: [this.data ? this.data.minUnitNum : ''],
            maxUnitNum: [this.data ? this.data.maxUnitNum : ''],
            unitFaceValue: [this.data ? this.data.unitFaceValue : ''],
            domainOfQuotation: [this.data ? this.data.domainOfQuotation : ''],
            website: [this.data ? this.data.website : ''],
            benefitGuarantorPercent: [this.data ? this.data.benefitGuarantorPercent : ''],
            forecastProfitPercent: [this.data ? this.data.forecastProfitPercent : ''],
            fundTypeId: [this.data ? this.data.fundTypeId : ''],
            auditorId: [this.data ? this.data.auditorId : ''],
            benefitGuarantorId: [this.data ? this.data.benefitGuarantorId : ''],
            liquidityGuarantorId: [this.data ? this.data.liquidityGuarantorId : ''],
            marketerIds: [this.data ? this.data.marketerIds : ''],
            trusterId: [this.data ? this.data.trusterId : ''],
            registerManagementIds: [this.data ? this.data.registerManagementIds : ''],
            underwritingIds: [this.data ? this.data.underwritingIds : ''],
            investmentManagementId: [this.data ? this.data.investmentManagementId : ''],
            frequenceId: [this.data ? this.data.frequenceId : ''],
        });
    }

    onCreateBranch(): void {
        this.fundSettingService.create(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.fundSettingService.update(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    private filterFundRoleMulti(): void {
        if (!this.fundRoles) {
            return;
        }
        let search = this.fundRoleMultiFilterCtrl.value;
        if (!search) {
            this.filteredFundRoleMulti.next(this.fundRoles.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredFundRoleMulti.next(this.fundRoles.filter((o) => o.name.toLowerCase().indexOf(search) > -1));
    }

    close(): void {
        this.dialogRef.close(false);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
