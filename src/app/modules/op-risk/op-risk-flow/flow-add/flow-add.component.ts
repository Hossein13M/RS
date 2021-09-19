import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { OperatorService } from 'app/services/API/services';
import { searchSelectStateType } from 'app/shared/components/search-select/search-select.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { Operator, SelectedOperators } from '../op-risk-models';
import { OpRiskFlowService } from '../op-risk-flow.service';

@Component({
    selector: 'app-bank-setting-add',
    templateUrl: './flow-add.component.html',
    styleUrls: ['./flow-add.component.scss'],
})
export class FlowAddComponent implements OnInit {
    title: string = '';
    operators: Array<Operator>;
    form: FormGroup = this.fb.group({ stepOne: ['', []], stepTwo: ['', []], stepTree: ['', []], name: ['', [Validators.required]] });
    selectedOperators: Array<SelectedOperators> = [
        { flowUsers: [], id: null, step: 1 },
        { flowUsers: [], id: null, step: 2 },
        { flowUsers: [], id: null, step: 3 },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<FlowAddComponent>,
        private fb: FormBuilder,
        private operatorService: OperatorService,
        private opRiskFlowService: OpRiskFlowService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
        this.getOperators();
        this.createForm();
    }

    private checkForEditMode(): void {
        this.data ? (this.title = `ویرایش جریان ${this.data.name}`) : (this.title = 'افزودن جریان');
    }

    private createForm(): void {
        this.form.controls.stepOne.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (newValue) this.selectedOperators[0].flowUsers.push(newValue);
        });
        this.form.controls.stepTwo.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (newValue) this.selectedOperators[1].flowUsers.push(newValue);
        });
        this.form.controls.stepTree.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (newValue) this.selectedOperators[2].flowUsers.push(newValue);
        });

        if (this.data) {
            for (const key of this.data.flowSteps) {
                if (key.flowUsers.length > 0) key.flowUsers.forEach((el) => (el.id = el.userId));
            }
            this.form.get('name').setValue(this.data.name, { onlySelf: true });
            this.selectedOperators = this.data.flowSteps;
        }
    }

    private onCreateFlow(): void {
        const data = { name: this.form.value.name, steps: [] };
        const step1 = [];
        const step2 = [];
        const step3 = [];

        this.selectedOperators[0].flowUsers.map((el) => step1.push(el.id));
        this.selectedOperators[1].flowUsers.map((el) => step2.push(el.id));
        this.selectedOperators[2].flowUsers.map((el) => step3.push(el.id));
        data.steps.push({ users: step1 });
        data.steps.push({ users: step2 });
        data.steps.push({ users: step3 });
        this.opRiskFlowService.createOPRiskFlow(data).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    private onEditFlow(): void {
        let data = { name: this.form.value.name, steps: [], id: this.data.id, isActive: this.data.isActive };
        const step1 = [];
        const step2 = [];
        const step3 = [];
        this.selectedOperators[0].flowUsers.map((el) => step1.push(el.id));
        this.selectedOperators[1].flowUsers.map((el) => step2.push(el.id));
        this.selectedOperators[2].flowUsers.map((el) => step3.push(el.id));
        data.steps.push({ users: step1 });
        data.steps.push({ users: step2 });
        data.steps.push({ users: step3 });
        this.opRiskFlowService.updateOPRiskFlow(data).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    private getOperators(): void {
        //TODO: this needs to be fixed after implementation of operators
        this.operatorService.getOperators(100).subscribe((response) => {
            response.items.map((item) => (item.fullName = `${item.firstName} ${item.lastName}`));
            this.operators = response.items;
        });
    }

    public removeOperator(ticker: any, type: number): void {
        if (type == 1) this.selectedOperators[0].flowUsers = this.selectedOperators[0].flowUsers.filter((el) => el.id !== ticker.id);
        if (type == 2) this.selectedOperators[1].flowUsers = this.selectedOperators[1].flowUsers.filter((el) => el.id !== ticker.id);
        if (type == 3) this.selectedOperators[2].flowUsers = this.selectedOperators[2].flowUsers.filter((el) => el.id !== ticker.id);
        FlowAddComponent.setSelectedOperatorsValue([
            this.selectedOperators[0].flowUsers,
            this.selectedOperators[1].flowUsers,
            this.selectedOperators[2].flowUsers,
        ]);
    }

    public submitForm(): void {
        this.data ? this.onEditFlow() : this.onCreateFlow();
    }

    private static setSelectedOperatorsValue(selectedOperatorArray: Array<any>): void {
        selectedOperatorArray.forEach((selectedOperator) => {
            let tempArray = [];
            for (const key of selectedOperator) tempArray.push(key.id);
            selectedOperator.setValue(tempArray, { onlySelf: true });
        });
    }

    public searchFunction = (searchKey, data): void => {
        data.state = searchSelectStateType.LOADING;
        setTimeout(() => {
            data.list = this.operators.filter((el) => el.fullName.includes(searchKey));
            data.state = searchSelectStateType.PRESENT;
        }, 500);
    };
}
