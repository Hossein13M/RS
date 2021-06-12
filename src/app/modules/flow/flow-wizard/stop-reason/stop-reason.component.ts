import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowsWizardService } from 'app/services/App/flow/flow-wizard.service';

@Component({
    selector: 'app-stop-reason',
    templateUrl: './stop-reason.component.html',
    styleUrls: ['./stop-reason.component.scss'],
})
export class StopReasonComponent {
    action: string;
    reason: FormControl;
    dialogTitle: string;
    flowID;
    instanceID;
    loading: boolean;

    constructor(
        public matDialogRef: MatDialogRef<StopReasonComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private wizardService: FlowsWizardService,
        private snackBar: MatSnackBar
    ) {
        this.action = _data.action;
        this.flowID = _data.flowID;
        this.instanceID = _data.instanceID;

        if (this.action === 'reject') {
            this.dialogTitle = 'دلایل رد کردن';
        } else {
            this.dialogTitle = 'دلایل متوقف کردن پروژه';
        }

        this.reason = this._formBuilder.control('');
    }

    reject(): void {
        this.loading = true;
        this.wizardService.reject(this.flowID, this.instanceID, this.reason.value).subscribe(() => {
            this.loading = false;
            this.matDialogRef.close();
        });
    }

    stop(): void {
        this.loading = true;
        this.wizardService.pause(this.flowID, this.instanceID, this.reason.value).subscribe(
            () => {
                this.loading = false;
                this.matDialogRef.close();
            },
            (err) => {
                this.snackBar.open('شما به این قرار داد دسترسی ندارید', '', {
                    panelClass: 'snack-error',
                    direction: 'rtl',
                    duration: 3000,
                });
            }
        );
    }
}
