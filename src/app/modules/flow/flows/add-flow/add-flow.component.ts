import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateFlowDto } from 'app/services/API/models';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { initialBpmn } from './initial-bpmn.js';

@Component({
    selector: 'app-add-flow',
    templateUrl: './add-flow.component.html',
    styleUrls: ['./add-flow.component.scss'],
})
export class AddFlowComponent implements OnInit {
    action: string;
    flowForm: FormGroup;
    dialogTitle: string;
    loading: boolean;
    flow: CreateFlowDto;
    flowCategories;

    constructor(
        public matDialogRef: MatDialogRef<AddFlowComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private flowService: FlowsService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.action = _data.action;
        this.dialogTitle = 'الگوی قرارداد جدید';
        this.flow = {} as CreateFlowDto;
        this.flowForm = this.createFlowForm();
        this.flowService.getFlowCategories().subscribe((res) => {
            this.flowCategories = res;
        });
    }

    ngOnInit(): void {}

    createFlowForm(): FormGroup {
        return this._formBuilder.group({
            name: [this.flow.name],
            category: [this.flow.category],
        });
    }

    newFlow() {
        this.loading = true;

        this.flowService.addNewFlow(this.flowForm.controls['name'].value, this.flowForm.controls['category'].value, initialBpmn).subscribe(
            (res) => {
                this.snackBar.open('قرارداد با موفقیت ثبت شد', '', {
                    panelClass: 'snack-success',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
                this.router.navigate(['/flow/maker/' + res._id]);
                this.matDialogRef.close();
            },
            (error) => {
                this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                    panelClass: 'snack-error',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
            }
        );
    }
}
