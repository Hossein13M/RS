import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { OperatorManagementService } from 'app/services/App/user/operator-management.service';
import { searchSelectStateType } from '#shared/components/search-select/search-select.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
    redBorder = false;

    operatorsFormControl = new FormControl([], [Validators.required]);
    operatorList: any;
    formGroup: FormArray;
    limit = 100;

    lastSavedData = {
        form: null,
        operators: null,
    };

    todo = [
        {
            type: 'text',
            name: 'فیلد متن',
            icon: 'text_fields',
        },
        {
            type: 'date',
            name: 'فیلد تاریخ',
            icon: 'date_range',
        },
        {
            type: 'button',
            name: 'دکمه',
            icon: 'library_add',
        },
        {
            type: 'number',
            name: 'فیلد قیمت',
            icon: 'plus_one',
        },
        {
            name: 'انتخاب',
            icon: 'fact_check',
        },
        {
            name: 'شماره تلفن',
            icon: 'phone',
        },
    ];

    types = {
        text: {
            type: 'text',
            Value: '',
            placeholder: 'پلیس هولدر',
            icon: 'text_fields',
        },
        date: {
            type: 'date',
            Value: '',
            placeholder: 'پلیس هولدر',
            icon: 'date_range',
        },
        button: {
            type: 'button',
            Value: 'دکمه',
            acction: 1,
            icon: 'library_add',
        },
        number: {
            type: 'number',
            Value: '',
            placeholder: 'پلیس هولدر',
            icon: 'plus_one',
        },
    };

    Forms = [
        {
            formGroup: 'review',
            name: 'بخش ۱',
            Value: [],
        },
    ];
    downloadUrl: boolean;

    constructor(
        private fb: FormBuilder,
        private operatorService: OperatorManagementService,
        public dialog: MatDialog,
        private flowService: FlowsService,
        private snackBar: AlertService,
        public dialogRef: MatDialogRef<FormBuilderComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.operatorList = this.data?.operators;
        this.flowService.getFlowForm(this.data.stateId, this.data.flowId).subscribe((flowDetail) => {
            if (!flowDetail || !this.operatorList) {
                return;
            }

            this.Forms = flowDetail?.attributes;
            // match access users
            if (flowDetail?.accessRights && Array.isArray(flowDetail?.accessRights)) {
                const userAndAccess = [];
                flowDetail?.accessRights.forEach((userId) => {
                    const foundedUser = this.operatorList.find((user) => user.id === userId);
                    if (foundedUser) {
                        userAndAccess.push(foundedUser);
                    }
                });
                this.operatorsFormControl.patchValue(userAndAccess);
            }

            this.lastSavedData.operators = this.operatorsFormControl.value;
            this.lastSavedData.form = flowDetail.attributes;
            this.createForm();
        });
        this.dialogRef.disableClose = true;
        this.dialogRef.backdropClick().subscribe((_) => {
            this.closeThisDialog();
        });
    }

    createForm(): void {
        this.formGroup = this.fb.array(
            this.Forms.map((item) => {
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

    searchOperators = (searchKey, data): void => {
        data.state = searchSelectStateType.PRESENT;
        if (!searchKey) {
            data.list = this.operatorList;
            return;
        }
        data.list = this.operatorList?.filter((el) => (el.firstName + el.lastName)?.includes(searchKey));
    };

    // Close Without Saving
    @HostListener('window:keyup.esc') onKeyUp(): void {
        this.closeThisDialog();
    }

    closeThisDialog(): void {
        if (
            JSON.stringify(this.lastSavedData) ===
            JSON.stringify({
                form: this.formGroup.value,
                operators: this.operatorsFormControl.value,
            })
        ) {
            this.dialogRef.close();
            return;
        }
        this.openSaveDialog();
    }

    openSaveDialog(): void {
        const dialogRef = this.dialog.open(SaveDialogComponent, {
            width: '300px',
            height: '130px',
            panelClass: 'dialog-p-0',
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.dialogRef.close();

            if (result === 'true') {
                this.flowService
                    .addFlowForm(this.data.stateId, this.data.flowId, this.data.stateName, this.formGroup.value, this.operatorsFormControl.value)
                    .subscribe(
                        () => {
                            this.snackBar.onSuccess('تغییرات با موفقیت ذخیره شد.');
                            this.lastSavedData = {
                                form: this.formGroup.value,
                                operators: this.operatorsFormControl.value,
                            };
                        },
                        () => {
                            this.snackBar.onError('تغییرات ذخیره نشد.');
                        }
                    );
            }
        });
    }

    send(): void {
        if (this.operatorsFormControl.value.length === 0) {
            this.redBorder = true;
            setTimeout(() => {
                this.redBorder = false;
            }, 1000);
            this.snackBar.onError('این مرحله نمی‌تواند بدون سطح دسترسی باشد.');
            this.operatorsFormControl.markAsDirty();
            return;
        }
        this.flowService.addFlowForm(this.data.stateId, this.data.flowId, this.data.stateName, this.formGroup.value, this.operatorsFormControl.value).subscribe(
            () => {
                this.snackBar.onSuccess('تغییرات با موفقیت ذخیره شد.');
                this.lastSavedData = {
                    form: this.formGroup.value,
                    operators: this.operatorsFormControl.value,
                };
            },
            () => this.snackBar.onError('تغییرات ذخیره نشد.')
        );
    }

    delete(index): void {
        this.Forms = this.formGroup.value;
        this.Forms.splice(index, 1);
        this.createForm();
    }

    onTabChanged($event): void {
        const clickedIndex = $event.index;
        if (clickedIndex === 1) {
            this.Forms = this.formGroup.value;
            this.createForm();
        }
    }

    add(i): void {
        this.Forms = this.formGroup.value;
        const temp = {
            formGroup: Math.random().toString(36).slice(2),
            name: `بخش ${this.Forms.length + 1}`,
            Value: [],
        };
        this.Forms.splice(i, 0, temp);

        this.createForm();
    }

    drop(event: CdkDragDrop<any[]>): void {
        if (event.previousContainer === event.container) {
            this.Forms = this.formGroup.value;
            this.Forms[event.container.id].Value.splice(event.currentIndex, 0, this.Forms[event.container.id].Value.splice(event.previousIndex, 1)[0]);
            this.createForm();
        } else {
            if (event.previousContainer.id === 'Base') {
                if (!(event.container.data.length >= this.limit)) {
                    this.Forms = this.formGroup.value;
                    this.Forms[event.container.id].Value.splice(event.currentIndex, 0, this.types[event.previousContainer.data[event.previousIndex].type]);
                    this.createForm();
                }
            } else {
                if (!(event.container.data.length >= this.limit)) {
                    this.Forms = this.formGroup.value;
                    this.Forms[event.container.id].Value.splice(event.currentIndex, 0, this.Forms[event.previousContainer.id].Value[event.previousIndex]);
                    this.Forms[event.previousContainer.id].Value.splice(event.previousIndex, 1);
                    this.createForm();
                }
            }
        }
    }

    deleteItem(i: number, j: number): void {
        const valueFormArray = (this.formGroup.at(i) as FormGroup).controls?.Value as FormArray;
        this.Forms[i].Value.splice(j, 1);
        valueFormArray.removeAt(j);
    }
}
