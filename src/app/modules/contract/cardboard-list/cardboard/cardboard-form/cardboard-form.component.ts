import { Component, OnInit } from '@angular/core';
import { CardboardInfo, ContractFormButtonTypes } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { ActivatedRoute } from '@angular/router';
import { StateType } from '#shared/state-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '#shared/components/confirmation-dialog/confirmation-dialog.component';
import { AlertService } from '#services/alert.service';
import { CardboardPauseContractDialogComponent } from '../cardboard-pause-contract-dialog/cardboard-pause-contract-dialog.component';
import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: 'app-cardboard-form',
    templateUrl: './cardboard-form.component.html',
    styleUrls: ['./cardboard-form.component.scss'],
})
export class CardboardFormComponent implements OnInit {
    public stateType: StateType = StateType.INIT;
    public cardboardInfo: CardboardInfo;
    private contractId: string;

    constructor(
        private readonly cardboardService: CardboardService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly dialog: MatDialog,
        private readonly alertService: AlertService,
        private _clipboardService: ClipboardService
    ) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getCardboardInfo();
    }

    private getCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((response) => {
            this.cardboardInfo = response;
            this.stateType = StateType.PRESENT;
        });
    }

    public onButtonClick(buttonType: ContractFormButtonTypes): void {
        switch (buttonType) {
            case 'code':
                this.getContractCode();
                break;
            case 'accept':
                this.openAcceptStepDialog();
                break;
            default:
                this.onStepRejectionDialogOpening();
        }
    }

    private getContractCode(): void {
        this.cardboardService.getContractCode(this.contractId).subscribe(
            (response) => {
                this.alertService.onSuccess(`کد قرارداد ${response.code} ساخته شد و در کلیپ‌بورد کپی شد`);
                this._clipboardService.copyFromContent(response.code);
            },
            (error) =>
                error.message === 'Contract already has a final code!'
                    ? this.alertService.onError('این قرارداد کد دارد')
                    : this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    private openAcceptStepDialog(): void {
        console.log('open');
    }

    private onStepRejectionDialogOpening(): void {
        this.dialog
            .open(ConfirmationDialogComponent, { width: '400px', height: '180px', panelClass: 'dialog-p-0' })
            .afterClosed()
            .subscribe((hasConfirmed) => {
                hasConfirmed ? console.log('confirmed') : console.log('rejected');
            });
    }

    public changeContractStatus(hasContractStatusIsInProgress: boolean) {
        if (hasContractStatusIsInProgress) {
            this.dialog
                .open(CardboardPauseContractDialogComponent, { width: '600px', height: '400px', panelClass: 'dialog-p-0' })
                .afterClosed()
                .subscribe((note: string) => !!note && this.pauseContract(note));
        } else {
            this.dialog
                .open(ConfirmationDialogComponent, { width: '400px', height: '180px', panelClass: 'dialog-p-0' })
                .afterClosed()
                .subscribe((hasConfirmed) => hasConfirmed && this.reopenContract());
        }
    }

    private reopenContract(): void {
        this.cardboardService.reopenContract(this.contractId).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت بازگشایی شد');
                setTimeout(() => window.location.reload(), 2000);
            },
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    private pauseContract(note: string): void {
        this.cardboardService.pauseContract(this.contractId, note).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت متوقف شد');
                setTimeout(() => window.location.reload(), 2000);
            },
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }
}
