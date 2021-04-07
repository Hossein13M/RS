import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Operators {
    flowUsers: Array<{ firstName: string; id: number; lastName: string; userId: number }>;
    id: number;
    step: number;
}

@Component({
    selector: 'app-op-risk-view',
    templateUrl: './op-risk-view.component.html',
    styleUrls: ['./op-risk-view.component.scss'],
})
export class OpRiskViewComponent implements OnInit {
    title: string = '';
    operators: Array<Operators>;

    constructor(public dialogRef: MatDialogRef<OpRiskViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.title = this.data.name;
        this.operators = this.data.flowSteps;
    }
}
