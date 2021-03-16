import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-op-risk-view',
    templateUrl: './op-risk-view.component.html',
    styleUrls: ['./op-risk-view.component.scss'],
})
export class OpRiskViewComponent implements OnInit {
    title: string = '';
    selectedOperatorList1: Array<any> = [];
    selectedOperatorList2: Array<any> = [];
    selectedOperatorList3: Array<any> = [];

    constructor(public dialogRef: MatDialogRef<OpRiskViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {
        this.creatForm();
    }

    creatForm() {
        this.title = this.data.name;
        this.selectedOperatorList1 = this.data.flowSteps[0].flowUsers;
        this.selectedOperatorList2 = this.data.flowSteps[1].flowUsers;
        this.selectedOperatorList3 = this.data.flowSteps[2].flowUsers;
    }

    isWorking: any;
}
