import { Component, OnInit } from '@angular/core';
import { CardboardInfo, ContractFormButtonTypes } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { ActivatedRoute } from '@angular/router';
import { StateType } from '#shared/state-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '#shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-cardboard-form',
    templateUrl: './cardboard-form.component.html',
    styleUrls: ['./cardboard-form.component.scss'],
})
export class CardboardFormComponent implements OnInit {
    public stateType: StateType = StateType.INIT;
    public cardboardInfo: CardboardInfo;
    private contractId: string;

    constructor(private readonly cardboardService: CardboardService, private readonly activatedRoute: ActivatedRoute, private readonly dialog: MatDialog) {}

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
                this.openConfirmDialogForRejectionOfStep();
        }
    }

    private getContractCode(): void {
        console.log('contract code');
    }

    private openAcceptStepDialog(): void {
        console.log('open');
    }

    private openConfirmDialogForRejectionOfStep(): void {
        this.dialog
            .open(ConfirmationDialogComponent, { width: '400px', height: '180px', panelClass: 'dialog-p-0' })
            .afterClosed()
            .subscribe((hasConfirmed) => {
                hasConfirmed ? console.log('confirmed') : console.log('rejected');
            });
    }
}
