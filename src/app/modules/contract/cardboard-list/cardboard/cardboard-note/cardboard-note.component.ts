import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '#services/alert.service';
import { CardboardService } from '../../cardboard.service';
import { CardboardNoteDialogComponent } from '../cardboard-note-dialog/cardboard-note-dialog.component';
import { ContractNote } from '../../cardboard.model';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-cardboard-note',
    templateUrl: './cardboard-note.component.html',
    styleUrls: ['./cardboard-note.component.scss'],
})
export class CardboardNoteComponent implements OnInit {
    private contractId: string;
    public contractNotes: Array<ContractNote> = [];
    private currentStepInfo: { id: string; name: string };
    public pagination = { skip: 0, limit: 100, total: 100 };

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'updatedAt', name: 'تاریخ', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '100px' },
        { id: 'note', name: 'یادداشت', type: 'string', minWidth: '200px' },
    ];

    constructor(
        private readonly cardboardService: CardboardService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly alertService: AlertService,
        private readonly dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getNotes();
    }

    private getNotes(): void {
        this.cardboardService.getContractNotes(this.contractId).subscribe(
            (response) => (this.contractNotes = response),
            () => this.alertService.onError('مشکلی پیش آمده‌است')
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
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }
}
