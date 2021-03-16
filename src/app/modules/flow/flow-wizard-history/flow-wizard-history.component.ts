import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WizardApiService } from 'app/services/feature-services/wizard-api.service';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';

@Component({
    selector: 'app-flow-wizard-history',
    templateUrl: './flow-wizard-history.component.html',
    styleUrls: ['./flow-wizard-history.component.scss'],
})
export class FlowWizardHistoryComponent implements OnInit {
    @Input() flowInstanceId: string;

    constructor(private changeDetectorRef: ChangeDetectorRef, private wizardApiService: WizardApiService, private _matDialog: MatDialog) {}

    public flowNoteData = [];
    flowHistory = [];
    note = new FormControl();

    isWorking: any;

    getAllFlowInstanceHistory(): void {
        this.wizardApiService.getAllFlowInstanceHistory(this.flowInstanceId, this).subscribe((res: any[]) => {
            this.flowHistory = res;
        });
    }

    getAllFlowInstanceNote(): void {
        this.wizardApiService.getAllFlowInstanceNote(this.flowInstanceId, this).subscribe((res: any[]) => {
            this.flowNoteData = res;
            this.changeDetectorRef.detectChanges();
        });
    }

    createNote(text: string): void {
        const model = {
            text: text,
            flowInstanceId: this.flowInstanceId,
        };
        this.wizardApiService.createFlowInstanceNote(model, this).subscribe((res) => {
            if (res) {
                this.note.reset();
                this.getAllFlowInstanceNote();
            }
        });
    }

    ngOnInit(): void {
        this.getAllFlowInstanceHistory();
        this.getAllFlowInstanceNote();
    }

     handleError(): boolean {
        return false;
    }

    openAddCommentDialog(): void {
        const dialogRef = this._matDialog.open(AddCommentDialogComponent, {
            panelClass: 'form-dialog',
            width: '80vw',
            maxWidth: '600px',
        });

        dialogRef.afterClosed().subscribe((res) => {
            if (!res) {
                return;
            }

            this.createNote(res);
        });
    }
}
