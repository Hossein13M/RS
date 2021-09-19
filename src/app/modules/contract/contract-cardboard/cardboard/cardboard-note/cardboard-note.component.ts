import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { CardboardService } from '../../cardboard.service';
import { CardboardNoteDialogComponent } from '../cardboard-note-dialog/cardboard-note-dialog.component';
import { ContractNote } from '../../cardboard.model';

@Component({
    selector: 'app-cardboard-note',
    templateUrl: './cardboard-note.component.html',
    styleUrls: ['./cardboard-note.component.scss'],
})
export class CardboardNoteComponent implements OnInit {
    @Input() contractIdForDialog: string = null;
    private contractId: string;
    public contractNotes: Array<ContractNote> = [];
    private currentStepInfo: { id: string; name: string };

    constructor(
        private readonly cardboardService: CardboardService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly alertService: AlertService,
        private readonly dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.contractId = !!this.contractIdForDialog ? this.contractIdForDialog : this.activatedRoute.snapshot.params.id;
        this.getNotes();
    }

    private getNotes(): void {
        this.cardboardService.getContractNotes(this.contractId).subscribe(
            (response) => (this.contractNotes = response),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public onAddNoteClick(): void {
        this.dialog
            .open(CardboardNoteDialogComponent, {
                width: '600px',
                height: '400px',
                panelClass: 'dialog-p-0',
                data: {
                    headerNote: 'افزودن یادداشت به گام کنونی قرارداد',
                    buttonText: 'افزودن یادداشت',
                    buttonIcon: 'add_circle_outline',
                    buttonColor: 'primary',
                },
            })
            .afterClosed()
            .subscribe((note: string) => !!note && this.getContractStep(note));
    }

    private getContractStep(note: string): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((response) => {
            this.currentStepInfo = { id: response.steps[response.steps.length - 1].id, name: response.steps[response.steps.length - 1].name };
            this.addNoteToContract(note);
        });
    }

    private addNoteToContract(note: string): void {
        this.cardboardService.addNote({ contract: this.contractId, note, step: this.currentStepInfo }).subscribe(
            () => this.getNotes(),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
