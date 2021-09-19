import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavService } from 'app/modules/nav/nav.service';
import { AlertService } from '#shared/services/alert.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-asset-debit-detail-dialog',
    templateUrl: './asset-debit-detail-dialog.component.html',
    styleUrls: ['./asset-debit-detail-dialog.component.scss'],
})
export class AssetDebitDetailDialogComponent implements OnInit {
    public filteredSarfaslCode: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    public safaslCodeFilter: FormControl = new FormControl();
    private _onDestroy = new Subject<void>();
    codeSarfaslType = new FormControl();
    codeSarfaslValue = new FormControl();
    codeSarfaslList = [];
    codeSarfaslObj: CodeSarfaslModel[] = [
        // {code: 1210, id: '', name: 'حسابهای دریافتی', type: 'asset'},
        // {code: 1220, id: '', name: 'حسابهای دریافتی', type: 'asset'},
        // {code: 13, id: '', name: 'جاری کارگزاری', type: 'asset'},
        // {code: 14, id: '', name: 'سایر حساب های دریافتی', type: 'asset'},
        // {code: 1110, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'asset'},
        // {code: 21, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 25, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 22, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 24, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 18, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 53, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
        // {code: 27, id: '', name: ' ‫موجودی ‫نقد‬‬', type: 'debit'},
    ];

    model?: any;
    isWorking: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private AlertService: AlertService,
        private navService: NavService,
        public dialog: MatDialogRef<AssetDebitDetailDialogComponent>
    ) {}

    ngOnInit() {
        this.listenForSearchForm();
        this.getAllCodeSarfasl();
        this.getLastAssetAndDebit();
    }

    listenForSearchForm() {
        this.safaslCodeFilter.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.filterSarfasl());
    }

    removeItem(obj) {
        const item = this.codeSarfaslObj.filter((x) => x.code === obj.code)[0];
        const index = this.codeSarfaslObj.indexOf(item);
        if (index != -1) {
            this.codeSarfaslObj.splice(index, 1);
        } else this.AlertService.onError('خطا‌! لطفا مجدد امتحان کنید');
    }

    private filterSarfasl() {
        if (!this.codeSarfaslList) {
            return;
        }
        let search = this.safaslCodeFilter.value;
        if (!search) {
            this.filteredSarfaslCode.next(this.codeSarfaslList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredSarfaslCode.next(this.codeSarfaslList.filter((code) => code.title.toLowerCase().indexOf(search) > -1));
    }

    getAllCodeSarfasl() {
        this.navService.getAllCodeSarfasl(this.data, this).subscribe((res: any) => {
            this.codeSarfaslList = res;
            this.filteredSarfaslCode.next(res.slice());
        });
    }

    getLastAssetAndDebit() {
        this.navService.getFundAssetAndDebit(this.data, this).subscribe((res: any) => {
            res.assets.map((x) => {
                this.codeSarfaslObj.push({ code: x.accountCode, name: x.accountName, type: 'asset' });
            });
            res.debits.map((x) => {
                this.codeSarfaslObj.push({ code: x.accountCode, name: x.accountName, type: 'debit' });
            });
        });
    }

    createCodeSarfaslObj() {
        const newObj: CodeSarfaslModel = {
            type: this.codeSarfaslType.value,
            name: this.codeSarfaslList.filter((x) => x.code === this.codeSarfaslValue.value)[0].title,
            id: '',
            code: this.codeSarfaslValue.value,
        };
        if (this.codeSarfaslList.filter((x) => x.code === this.codeSarfaslValue.value)[0]) {
            this.codeSarfaslObj.push(newObj);
        } else {
            this.AlertService.onError('مورد تکراری می باشد');
        }
    }

    callApi() {
        const obj = { fundNationalId: '', assets: [], debits: [] };
        this.codeSarfaslObj.map((x) => {
            if (x.type === 'asset') {
                obj.assets.push(x.code);
            }
            if (x.type === 'debit') {
                obj.debits.push(x.code);
            }
        });
        obj.fundNationalId = this.data;
        this.navService.createCodeSarfasl(obj, this).subscribe((res) => {
            this.AlertService.onSuccess('تغییرات با موفقیت ذخیره شد.');
            this.dialog.close();
        });
    }

    handleError() {
        return true;
    }
}

export class CodeSarfaslModel {
    code?: any;
    id?: any;
    name?: any;
    type?: any;
}
