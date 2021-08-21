import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardboardAction, CardboardInfo, ElectionUsers } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { AlertService } from '#services/alert.service';
import { StateType } from '#shared/state-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-cardboard-confirm-dialog',
    templateUrl: './cardboard-confirm-dialog.component.html',
    styleUrls: ['./cardboard-confirm-dialog.component.scss'],
})
export class CardboardConfirmDialogComponent implements OnInit {
    public nextStepSelectionUsers: Array<ElectionUsers> = [];
    public stateType: StateType = StateType.INIT;
    public form: FormGroup = this.fb.group({ user: [] });

    constructor(
        private dialog: MatDialogRef<CardboardConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { contractId: string; stepInfo: CardboardInfo },
        private readonly cardboardService: CardboardService,
        private readonly alertService: AlertService,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        console.log(this.dialogData);
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
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    public onCloseDialog(): void {
        this.dialog.close(false);
    }

    public confirmStep(): void {
        this.cardboardService.confirmContractCardboardStep({ contractId: this.dialogData.contractId, ...this.form.value }).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت تایید شد');
                this.dialog.close(true);
            },
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }
}
