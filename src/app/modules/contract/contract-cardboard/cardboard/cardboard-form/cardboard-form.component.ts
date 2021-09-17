import { Component, OnInit } from '@angular/core';
import { CardboardInfo, ContractFormButtonTypes } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateType } from '#shared/state-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '#shared/components/confirmation-dialog/confirmation-dialog.component';
import { AlertService } from '#services/alert.service';
import { CardboardNoteDialogComponent } from '../cardboard-note-dialog/cardboard-note-dialog.component';
import { ClipboardService } from 'ngx-clipboard';
import { CardboardConfirmDialogComponent } from '../cardboard-confirm-dialog/cardboard-confirm-dialog.component';
import { CardboardUploadDialogComponent } from '../cardboard-upload-dialog/cardboard-upload-dialog.component';
import { CardboardDownloadDialogComponent } from '../cardboard-download-dialog/cardboard-download-dialog.component';

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
        private _clipboardService: ClipboardService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getCardboardInfo();
    }

    private getCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe(
            (response) => {
                this.cardboardInfo = response;
                this.stateType = StateType.PRESENT;
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public onButtonClick(buttonType: ContractFormButtonTypes): void {
        switch (buttonType) {
            case 'code':
                this.setContractCode();
                break;
            case 'accept':
                this.openAcceptStepDialog();
                break;
            case 'upload':
                this.openUploadDialog();
                break;

            default:
                this.onStepRejectionDialogOpening();
        }
    }

    private setContractCode(): void {
        this.cardboardService.getContractCode(this.contractId).subscribe(
            (response) => {
                this.alertService.onSuccess(`کد قرارداد ${response.code} ساخته شد و در کلیپ‌بورد کپی شد`);
                this._clipboardService.copyFromContent(response.code);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private openAcceptStepDialog(): void {
        this.dialog
            .open(CardboardConfirmDialogComponent, {
                width: '600px',
                height: '400px',
                panelClass: 'dialog-p-0',
                data: { contractId: this.contractId, stepInfo: this.cardboardInfo },
            })
            .afterClosed()
            .subscribe((hasConfirmed: boolean) => hasConfirmed && setTimeout(() => window.location.reload(), 2000));
    }

    private onStepRejectionDialogOpening(): void {
        this.dialog
            .open(CardboardNoteDialogComponent, {
                width: '600px',
                height: '400px',
                panelClass: 'dialog-p-0',
                data: {
                    headerNote: 'آیا می‌خواهید این قرارداد رو رد کنید؟',
                    buttonText: 'رد کردن این قرارداد',
                    buttonIcon: 'cancel',
                    buttonColor: 'warn',
                },
            })
            .afterClosed()
            .subscribe((note: string) => !!note && this.rejectContractStep(note));
    }

    private rejectContractStep(note: string): void {
        this.cardboardService.rejectContractCardboardStep({ contractId: this.contractId, note: note }).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت رد شد');
                setTimeout(() => window.location.reload(), 2000);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public changeContractStatus(hasContractStatusIsInProgress: boolean) {
        if (hasContractStatusIsInProgress) {
            this.dialog
                .open(CardboardNoteDialogComponent, {
                    width: '600px',
                    height: '400px',
                    panelClass: 'dialog-p-0',
                    data: {
                        headerNote: 'آیا می‌خواهید این قرارداد را متوقف کنید؟',
                        buttonText: 'متوقف کردن قرارداد',
                        buttonIcon: 'pause_circle_outline',
                        buttonColor: 'warn',
                    },
                })
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
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private pauseContract(note: string): void {
        this.cardboardService.pauseContract(this.contractId, note).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت متوقف شد');
                setTimeout(() => window.location.reload(), 2000);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public openFinalFormDialog(): void {
        this.router.navigate(['/contract/viewer/' + this.contractId]).finally(() => this.alertService.onInfo('فرم پایانی قرارداد را پر کنید.'));
    }

    public openUploadDialog(): void {
        this.dialog
            .open(CardboardUploadDialogComponent, {
                width: '600px',
                height: '570px',
                panelClass: 'dialog-p-0',
                data: { contractId: this.contractId, hasSignedFile: this.cardboardInfo.hasSignedFile },
            })
            .afterClosed()
            .subscribe((result: any) => console.log(result));
    }

    public openDownloadDialog(): void {
        this.dialog
            .open(CardboardDownloadDialogComponent, {
                width: '600px',
                height: '900px',
                panelClass: 'dialog-p-0',
                data: this.contractId,
            })
            .afterClosed()
            .subscribe((result: any) => console.log(result));
    }
}
