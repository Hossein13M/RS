import { number, string } from '@amcharts/amcharts4/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { OperatorService } from 'app/services/API/services';
import { searchSelectStateType } from 'app/shared/components/search-select/search-select.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { OpRiskFlowService } from '../op-risk-flow.service';

@Component({
    selector: 'app-bank-setting-add',
    templateUrl: './flow-add.component.html',
    styleUrls: ['./flow-add.component.scss'],
})
export class FlowAddComponent implements OnInit {
    banks = [];
    title: string = '';
    operators = [];
    selectedOperatorList1 = [];
    selectedOperatorList2 = [];
    selectedOperatorList3 = [];
    form: FormGroup = this.fb.group({ stepOne: ['', []], stepTwo: ['', []], stepTree: ['', []], name: ['', [Validators.required]] });
    selectedOperatorFc1: FormControl = new FormControl('');
    selectedOperatorFc2: FormControl = new FormControl('');
    selectedOperatorFc3: FormControl = new FormControl('');
    filterCtrl: FormControl;

    constructor(
        public dialogRef: MatDialogRef<FlowAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private operatorService: OperatorService,
        private opfs: OpRiskFlowService,
        private AlertService: AlertService
    ) {}

    ngOnInit() {
        this.checkForEditMode();
        this.getOperators();
        this.creatForm();
    }

    private checkForEditMode(): void {
        this.data ? (this.title = 'ویرایش') : (this.title = 'افزودن');
    }

    submitForm() {
        this.data ? this.onEditFlow() : this.onCreateFlow();
    }

    private creatForm() {
        this.form.controls.stepOne.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (!this.selectedOperatorList1) this.selectedOperatorList1 = [];
            if (newValue) this.selectedOperatorList1.push(newValue);
        });
        this.form.controls.stepTwo.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (!this.selectedOperatorList2) this.selectedOperatorList2 = [];
            if (newValue) this.selectedOperatorList2.push(newValue);
        });
        this.form.controls.stepTree.valueChanges.pipe(distinctUntilChanged()).subscribe((newValue) => {
            if (!this.selectedOperatorList3) this.selectedOperatorList3 = [];
            if (newValue) this.selectedOperatorList3.push(newValue);
        });

        if (this.data) {
            for (const key of this.data?.flowSteps) {
                if (key.flowUsers.length > 0) {
                    key.flowUsers.forEach((el) => (el.id = el.userId));
                }
            }
            this.form.get('name').setValue(this.data.name, { onlySelf: true });
            this.selectedOperatorList1 = this.data.flowSteps[0].flowUsers;
            this.selectedOperatorList2 = this.data.flowSteps[1].flowUsers;
            this.selectedOperatorList3 = this.data.flowSteps[2].flowUsers;
        }
    }

    private onCreateFlow() {
        const data = { name: string, steps: [] };
        data.name = this.form.value.name;
        const step1 = [];
        const step2 = [];
        const step3 = [];
        this.selectedOperatorList1.map((el) => step1.push(el.id));
        this.selectedOperatorList2.map((el) => step2.push(el.id));
        this.selectedOperatorList3.map((el) => step3.push(el.id));
        data.steps.push({ users: step1 });
        data.steps.push({ users: step2 });
        data.steps.push({ users: step3 });
        this.opfs.createOpFlow(data).subscribe(() => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    private onEditFlow() {
        const data = { name: string, steps: [], id: number, isActive: Boolean };
        data.name = this.form.value.name;
        const step1 = [];
        const step2 = [];
        const step3 = [];
        this.selectedOperatorList1.map((el) => step1.push(el.id));
        this.selectedOperatorList2.map((el) => step2.push(el.id));
        this.selectedOperatorList3.map((el) => step3.push(el.id));
        data.steps.push({ users: step1 });
        data.steps.push({ users: step2 });
        data.steps.push({ users: step3 });
        data.id = this.data.id;
        data.isActive = this.data.isActive;
        this.opfs.updateOpFlow(data).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    private getOperators() {
        this.operatorService.getOperators(100).subscribe((response) => {
            response.items.map((item) => (item.fullName = `${item.firstName} ${item.lastName}`));
            this.operators = response.items;
        });
    }

    private selectOperator(ticker: any, type: number): void {
        if (type == 1) this.selectedOperatorList1.push(ticker);
        if (type == 2) this.selectedOperatorList2.push(ticker);
        if (type == 3) this.selectedOperatorList3.push(ticker);

        let array = [];
        for (const key of this.selectedOperatorList1) {
            array.push(key.id);
        }
        this.selectedOperatorFc1.setValue(array, { onlySelf: true });

        array = [];
        for (const key of this.selectedOperatorList2) {
            array.push(key.id);
        }
        this.selectedOperatorFc2.setValue(array, { onlySelf: true });

        array = [];
        for (const key of this.selectedOperatorList3) {
            array.push(key.id);
        }
        this.selectedOperatorFc3.setValue(array, { onlySelf: true });
    }

    private removeOperator(ticker: any, type: number): void {
        if (type == 1) this.selectedOperatorList1 = this.selectedOperatorList1.filter((el) => el.id !== ticker.id);
        if (type == 2) this.selectedOperatorList2 = this.selectedOperatorList2.filter((el) => el.id !== ticker.id);
        if (type == 3) this.selectedOperatorList3 = this.selectedOperatorList3.filter((el) => el.id !== ticker.id);

        let array = [];
        for (const key of this.selectedOperatorList1) {
            array.push(key.id);
        }
        this.selectedOperatorFc1.setValue(array, { onlySelf: true });

        array = [];
        for (const key of this.selectedOperatorList2) {
            array.push(key.id);
        }
        this.selectedOperatorFc2.setValue(array, { onlySelf: true });

        array = [];
        for (const key of this.selectedOperatorList3) {
            array.push(key.id);
        }
        this.selectedOperatorFc3.setValue(array, { onlySelf: true });
    }

    searchFn = (searchKey, data): void => {
        data.state = searchSelectStateType.LOADING;
        setTimeout(() => {
            data.list = this.operators.filter((el) => el.fullName.includes(searchKey));
            data.state = searchSelectStateType.PRESENT;
        }, 500);
    };
}
