import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { UserInfoService } from 'app/services/App/userInfo/user-info.service';
import { AlarmService } from 'app/services/feature-services/alarm.service';
import { OperatorApiService } from 'app/services/feature-services/operator-api.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-add-alarm',
    templateUrl: './add-alarm.component.html',
    styleUrls: ['./add-alarm.component.scss'],
})
export class AddAlarmComponent implements OnInit {
    form: FormGroup;

    public operatorMultiFilterCtrl: FormControl = new FormControl();

    public filteredOperatorsMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    private _onDestroy = new Subject<void>();
    operators;
    dialogTitle;

    constructor(
        public dialogRef: MatDialogRef<AddAlarmComponent>,
        private AlertService: AlertService,
        private userInfoService: UserInfoService,
        @Inject(MAT_DIALOG_DATA) public data,
        public alarmService: AlarmService,
        private operatorService: OperatorApiService,
        private fb: FormBuilder
    ) {}

    getAllOperators() {
        this.operatorService.getAll(this).subscribe((res: any) => {
            if (res) res.items.map((x) => (x.fullName = x.firstName + ' ' + x.lastName));
            this.operators = res.items;
            this.filteredOperatorsMulti.next(this.operators.slice());
            this.operatorMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.filterOperatorMulti());
        });
    }

    private filterOperatorMulti() {
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

    createForm() {
        this.form = this.fb.group({
            id: this.data.data ? this.data.data.id : '',
            moduleId: '',
            isActive: [this.data.data ? this.data.data.isActive : ''],
            title: [this.data.data ? this.data.data.title : '', [Validators.required]],
            type: [this.data.data ? this.data.data.type : ''],
            priority: [this.data.data ? this.data.data.priority : ''],
            sendEmail: [this.data.data ? this.data.data.sendEmail : ''],
            sendSms: [this.data.data ? this.data.data.sendSms : ''],
            description: [this.data.data ? this.data.data.description : '', [Validators.required]],
            limit: [this.data.data ? this.data.data.limit : ''],
            submitUser: [''],
            toUsers: [this.data.data ? this.data.data.toUsers.map((x) => x.partyId) : '', [Validators.required]],
        });
    }

    updateAlarm() {
        this.form.get('submitUser').setValue(this.userInfoService.userInfo.getValue().userRoles[0].partyId);
        this.form.get('moduleId').setValue(this.data.moduleId);
        if (this.form.get('sendEmail').value === false) {
            this.form.get('sendEmail').setValue(0);
        } else {
            this.form.get('sendEmail').setValue(1);
        }
        if (this.form.get('sendSms').value === false) {
            this.form.get('sendSms').setValue(0);
        } else {
            this.form.get('sendSms').setValue(1);
        }
        this.alarmService.updateAlarm(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    createAlarm() {
        this.form.get('submitUser').setValue(5);
        this.form.get('moduleId').setValue(this.data.moduleId);
        this.alarmService.createAlarm(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    ngOnInit() {
        this.createForm();
        this.getAllOperators();
        if (this.data.data) {
            this.dialogTitle = 'ویرایش هشدار';
        } else {
            this.dialogTitle = 'افزودن هشدار جدید';
        }
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
