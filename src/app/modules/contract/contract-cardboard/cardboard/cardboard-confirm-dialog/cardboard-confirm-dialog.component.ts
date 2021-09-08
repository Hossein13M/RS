import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardboardAction, CardboardInfo, ElectionUsers } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { AlertService } from '#services/alert.service';
import { StateType } from '#shared/state-type.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-cardboard-confirm-dialog',
    templateUrl: './cardboard-confirm-dialog.component.html',
    styleUrls: ['./cardboard-confirm-dialog.component.scss'],
})
export class CardboardConfirmDialogComponent implements OnInit {
    public nextStepSelectionUsers: Array<ElectionUsers> = [];
    public stateType: StateType = StateType.INIT;
    public form: FormGroup = this.fb.group({ user: [null, Validators.required] });

    constructor(
        private dialog: MatDialogRef<CardboardConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { contractId: string; stepInfo: CardboardInfo },
        private readonly cardboardService: CardboardService,
        private readonly alertService: AlertService,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getSelectionUsersOnNextStep();
    }

    private getSelectionUsersOnNextStep(): void {
        const CardboardAction: CardboardAction = {
            contractId: this.dialogData.contractId,
            currentStepId: this.dialogData.stepInfo.steps[this.dialogData.stepInfo.steps.length - 1].id,
            action: 'confirm',
        };
        this.cardboardService.getContractCardboardNextStepSelectedUsersList(CardboardAction).subscribe(
            (response) => {
                this.nextStepSelectionUsers = response;
                this.stateType = StateType.PRESENT;
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public onCloseDialog(): void {
        this.dialog.close(false);
    }

    public confirmStep(): void {
        const user = this.form.value ? this.form.get('user').value : {};
        if (this.nextStepSelectionUsers.length && this.form.invalid) {
            this.alertService.onInfo('یک کاربر را برای دسترسی گام بعدی برگزینید');
            return;
        }
        this.cardboardService.confirmContractCardboardStep({ contractId: this.dialogData.contractId, user }).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت تایید شد');
                this.dialog.close(true);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
