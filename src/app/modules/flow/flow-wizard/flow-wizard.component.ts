import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FindFlowInstanceResponseDto } from 'app/services/API/models';
import { FlowsInstanceService } from 'app/services/App/flow/flow-instance.service';
import { FlowsWizardService } from 'app/services/App/flow/flow-wizard.service';
import { FlowWizardHistoryDialogComponent } from '../flow-wizard-history-dialog/flow-wizard-history-dialog.component';
import { StopReasonComponent } from './stop-reason/stop-reason.component';

class TimelineElement {
    time: Date;
    title: string;
    author: string;

    constructor(time: Date, title: string, author: string) {
        this.time = time;
        this.title = title;
        this.author = author;
    }
}

class ReminderElement {
    time: Date;
    name: string;
    brief: string;

    constructor(time: Date, name: string, brief: string) {
        this.time = time;
        this.name = name;
        this.brief = brief;
    }
}

@Component({
    selector: 'app-flow-wizard',
    templateUrl: './flow-wizard.component.html',
    styleUrls: ['./flow-wizard.component.scss'],
    animations: fuseAnimations,
})
export class FlowWizardComponent implements OnInit {
    flowInstance;
    finalCode;
    flowWizard;
    formId: string;
    flowId: string;
    flowInstanceId: string;
    buttons;
    flowNote = [];
    flowHistory = [];
    dialogRef;
    downloadUrl: string;
    formGroup;

    public ELEMENT_DATA: FindFlowInstanceResponseDto[] = [];
    dataSource = new MatTableDataSource<FindFlowInstanceResponseDto>(this.ELEMENT_DATA);
    displayedColumns = ['code', 'title', 'customerName', 'flowName', 'date', 'documentType', 'stop'];

    handleError: (err: HttpErrorResponse) => boolean;
    isWorking: any;

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        private wizardService: FlowsWizardService,
        private flowInstanceService: FlowsInstanceService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private bottomSheet: MatBottomSheet
    ) {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.flowInstanceService.getFlowInstances(null, null, null, null, params['id']).subscribe((res) => {
                    this.ELEMENT_DATA = [];
                    this.ELEMENT_DATA.push(res);
                    this.dataSource = new MatTableDataSource<FindFlowInstanceResponseDto>(this.ELEMENT_DATA);

                    this.flowInstance = res;
                    this.flowInstanceId = res._id;
                    this.flowId = res.flowId._id;
                    this.wizardService.getFlowWizardData(res.flowId._id, res._id).subscribe((res2) => (this.formId = res2['currentStateUniqueId']));
                });
                this.wizardService.flowInstanceStatus.subscribe((res) => {
                    this.flowWizard = res;
                    if (res.form) {
                        this.buttons = res.form;
                        this.formArrayBuilder(res.form);
                    }
                });
            }
        });
    }

    ngOnInit(): void {
        this.wizardService.finalCode.subscribe((RES) => {
            this.finalCode = RES;
        });

        this.wizardService.downloadUrl.subscribe((RES) => {
            this.downloadUrl = RES;
        });
    }

    formArrayBuilder(Forms): void {
        this.formGroup = this.fb.array(
            Forms.map((item) => {
                return this.fb.group({
                    name: this.fb.control(item.name),
                    Value: this.fb.array(
                        item.Value.map((form) => {
                            return this.fb.group(form);
                        })
                    ),
                });
            })
        );
    }

    confirm(): void {
        this.wizardService.confirm(this.flowInstance.flowId._id, this.flowInstance._id).subscribe(() => {});
    }

    reject(): void {
        this.dialogRef = this._matDialog.open(StopReasonComponent, {
            panelClass: 'form-dialog',
            data: { action: 'reject', instanceID: this.flowInstance._id, flowID: this.flowInstance.flowId._id },
        });

        this.dialogRef.afterClosed().subscribe(() => {});
    }

    stop(): void {
        this.dialogRef = this._matDialog.open(StopReasonComponent, {
            panelClass: 'form-dialog',
            data: { action: 'puase', instanceID: this.flowInstance._id, flowID: this.flowInstance.flowId._id },
        });

        this.dialogRef.afterClosed().subscribe(() => {});
    }

    reOpen(): void {
        this.wizardService.reopen(this.flowInstance.flowId._id, this.flowInstance._id).subscribe(() => {});
    }

    upload(file: FileList): void {
        this.wizardService.uploadFile(this.flowInstance._id, file[0]);
    }

    generateCode(): void {
        const model = { flowId: this.flowInstance.flowId._id, flowInstanceId: this.flowInstance._id };

        this.wizardService.generateFinalCode(this.flowInstance.flowId._id, this.flowInstance._id).subscribe(() => {});
    }

    openBottomSheetComponent(): void {
        this.bottomSheet
            .open(FlowWizardHistoryDialogComponent, {
                direction: 'rtl',
                data: { flowInstanceId: this.flowInstance._id },
                panelClass: 'flow-wizard-history',
            })
            .afterDismissed()
            .subscribe(() => {});
    }
}
