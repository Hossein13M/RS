import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateFlowDto } from 'app/services/API/models';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { SnotifyService } from 'ng-snotify';

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
        private snotifyService: SnotifyService,
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

        this.flowService.addNewFlow(this.flowForm.controls['name'].value, this.flowForm.controls['category'].value, this.intial_bpmn).subscribe(
            (res) => {
                // this.snotifyService.success("قرارداد با موفقیت ثبت شد");
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
                // this.snotifyService.error("اطلاعات تکراری وارد شده است");
                this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                    panelClass: 'snack-error',
                    direction: 'rtl',
                    duration: 3000,
                });
                this.loading = false;
            }
        );
    }

    intial_bpmn = {
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'UTF-8',
            },
        },
        'bpmn:definitions': {
            _attributes: {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
                'xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
                'xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
                id: 'Definitions_1',
                targetNamespace: 'http://bpmn.io/schema/bpmn',
            },
            'bpmn:process': {
                _attributes: {
                    id: 'Process_1',
                    isExecutable: 'false',
                },
                'bpmn:startEvent': {
                    _attributes: {
                        id: 'StartEvent_1',
                    },
                },
            },
            'bpmndi:BPMNDiagram': {
                _attributes: {
                    id: 'BPMNDiagram_1',
                },
                'bpmndi:BPMNPlane': {
                    _attributes: {
                        id: 'BPMNPlane_1',
                        bpmnElement: 'Process_1',
                    },
                    'bpmndi:BPMNShape': {
                        _attributes: {
                            id: '_BPMNShape_StartEvent_2',
                            bpmnElement: 'StartEvent_1',
                        },
                        'dc:Bounds': {
                            _attributes: {
                                x: '173',
                                y: '102',
                                width: '36',
                                height: '36',
                            },
                        },
                    },
                },
            },
        },
    };
}
