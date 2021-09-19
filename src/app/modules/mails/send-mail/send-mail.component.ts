import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoService } from 'app/services/App/userInfo/user-info.service';
import { MessageApiService } from 'app/services/feature-services/message-api.service';
import { OperatorApiService } from 'app/services/feature-services/operator-api.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-send-mail',
    templateUrl: './send-mail.component.html',
    styleUrls: ['./send-mail.component.scss'],
})
export class SendMailComponent implements OnInit, OnDestroy {
    me = new FormControl({ value: '', disabled: true });

    form: FormGroup;
    operators: any[] = [];

    public operatorMultiCtrl: FormControl = new FormControl();

    public operatorMultiFilterCtrl: FormControl = new FormControl();

    public filteredOperatorsMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    private _onDestroy = new Subject<void>();

    constructor(
        private messageService: MessageApiService,
        private operatorService: OperatorApiService,
        private snackBar: MatSnackBar,
        private userInfoService: UserInfoService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialogRef<SendMailComponent>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.getAllOperators();
        this.me.patchValue(this.userInfoService.userInfo?.userName);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    createForm(): void {
        this.form = this.fb.group({
            title: [this.data ? (this.data.title ? this.data.title : '') : '', Validators.required],
            body: [this.data ? (this.data.body ? this.data.body : '') : '', Validators.required],
            toUsers: [this.data ? this.data.toUsers : '', [Validators.required]],
            systemMessage: [''],
        });
    }

    onSubmit(): void {
        this.messageService.createMessage(this.form.value).subscribe(() => {
            this.dialog.close(true);
            this.snackBar.open('ایمیل ها با موفقیت ارسال شدند', '', { panelClass: 'snack-success', direction: 'rtl', duration: 3000 });
        });
    }

    getAllOperators(): void {
        this.operatorService.getAll().subscribe((res: any) => {
            if (res) {
                res.items.map((x) => (x.fullName = x.firstName + ' ' + x.lastName));
            }

            this.operators = res.items;
            this.filteredOperatorsMulti.next(this.operators.slice());
            this.operatorMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.filterOperatorMulti());
        });
    }

    private filterOperatorMulti(): any {
        if (!this.operators) {
            return;
        }
        let search = this.operatorMultiFilterCtrl.value;
        if (!search) {
            this.filteredOperatorsMulti.next(this.operators.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredOperatorsMulti.next(this.operators.filter((o) => o.fullName.toLowerCase().indexOf(search) > -1));
    }
}
