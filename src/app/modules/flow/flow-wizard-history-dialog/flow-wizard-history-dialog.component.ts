import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { WizardApiService } from 'app/services/feature-services/wizard-api.service';

@Component({
    selector: 'app-flow-wizard-history-dialog',
    template: `
        <div class="bottomsheet-container">
            <div [title]="'سابقه'" appDialogHeader>
                <mat-icon (click)="this._bottomSheetRef.dismiss(null)" class="icon-header">close</mat-icon>
            </div>
            <app-flow-wizard-history [flowInstanceId]="data.flowInstanceId"> </app-flow-wizard-history>
        </div>
    `,
    styleUrls: [],
})
export class FlowWizardHistoryDialogComponent implements OnInit {
    constructor(
        public _bottomSheetRef: MatBottomSheetRef,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data,
        private wizardApiService: WizardApiService
    ) {}

    public flowNoteData = [];
    flowHistory = [];
    note = new FormControl();
    isWorking: any;

    getAllFlowInstanceHistory(): void {
        this.wizardApiService.getAllFlowInstanceHistory(this.data.flowInstanceId, this).subscribe((res: any[]) => (this.flowHistory = res));
    }

    getAllFlowInstanceNote(): void {
        this.wizardApiService.getAllFlowInstanceNote(this.data.flowInstanceId, this).subscribe((res: any[]) => {
            this.flowNoteData = res;
            this.changeDetectorRef.detectChanges();
        });
    }

    createNote(): void {
        const model = {
            text: this.note.value,
            flowInstanceId: this.data.flowInstanceId,
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
}
