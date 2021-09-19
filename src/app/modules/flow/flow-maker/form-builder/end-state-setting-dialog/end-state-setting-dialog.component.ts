import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { FlowsService } from '../../../../../services/App/flow/flow.service';
import { OperatorManagementService } from '../../../../../services/App/user/operator-management.service';
import { searchSelectStateType } from '#shared/components/search-select/search-select.component';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

@Component({
    selector: 'app-end-state-setting-dialog',
    templateUrl: 'end-state-setting-dialog.component.html',
    styleUrls: ['end-state-setting-dialog.component.scss'],
})
export class EndStateSettingDialogComponent implements OnInit {
    fg: FormGroup;
    operatorList: any;
    redBorder = false;
    defaultValue = null;

    constructor(
        public dialog: MatDialog,
        private operatorService: OperatorManagementService,
        private fb: FormBuilder,
        private flowService: FlowsService,
        private alert: AlertService,
        public dialogRef: MatDialogRef<EndStateSettingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.operatorList = this.data?.operators;
        this.flowService.getFlowForm(this.data.stateId, this.data.flowId).subscribe((flowDetail) => {
            if (!flowDetail || !this.operatorList) {
                return;
            }

            // match access users
            if (flowDetail?.accessRights && Array.isArray(flowDetail?.accessRights)) {
                const userAndAccess = [];
                flowDetail?.accessRights.forEach((userId) => {
                    const foundedUser = this.operatorList.find((user) => user.id === userId);
                    if (foundedUser) {
                        userAndAccess.push(foundedUser);
                    }
                });
                this.fg.controls.operators.patchValue(userAndAccess);
                this.defaultValue = this.fg.value;
            }
        });

        this.dialogRef.disableClose = true;
        this.dialogRef.backdropClick().subscribe(() => this.closeThisDialog());
    }

    private createForm(): void {
        this.fg = this.fb.group({ operators: [] });
    }

    searchOperators = (searchKey, data): void => {
        data.state = searchSelectStateType.PRESENT;
        if (!searchKey) {
            data.list = this.operatorList;
            return;
        }
        data.list = this.operatorList?.filter((el) => (el.firstName + el.lastName)?.includes(searchKey));
    };

    // Close Without Saving
    @HostListener('window:keyup.esc') onKeyUp(): void {
        this.closeThisDialog();
    }

    closeThisDialog(): void {
        if (this.fg.value.operators.length === 0) {
            this.redBorder = true;
            setTimeout(() => (this.redBorder = false), 1000);
            this.alert.onError('این مرحله نمی‌تواند بدون سطح دسترسی باشد.');
            this.fg.markAsDirty();
            return;
        }

        this.defaultValue !== this.fg.value ? this.openSaveDialog() : this.dialogRef.close();
    }

    openSaveDialog(): void {
        const dialogRef = this.dialog.open(SaveDialogComponent, {
            width: '300px',
            height: '130px',
            panelClass: 'dialog-p-0',
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef.close();

            if (result === 'true') {
                this.flowService.addFlowForm(this.data.stateId, this.data.flowId, this.data.stateName, {}, this.fg.value.operators).subscribe(
                    () => this.alert.onSuccess('تغییرات با موفقیت ذخیره شد.'),
                    () => this.alert.onError('تغییرات ذخیره نشد.')
                );
            }
        });
    }

    send(): void {
        this.flowService.addFlowForm(this.data.stateId, this.data.flowId, this.data.stateName, {}, this.fg.value.operators).subscribe(
            () => {
                this.alert.onSuccess('تغییرات با موفقیت ذخیره شد.');
                this.defaultValue = this.fg.value;
            },
            () => this.alert.onError('تغییرات ذخیره نشد.')
        );
    }
}
