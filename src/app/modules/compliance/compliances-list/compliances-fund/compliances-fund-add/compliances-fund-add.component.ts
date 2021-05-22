import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../../../compliances.service';
import { ComplianceFundModel, ComplianceModel } from '../../../compliance.model';

@Component({
    selector: 'app-compliances-fund-add',
    templateUrl: './compliances-fund-add.component.html',
    styleUrls: ['./compliances-fund-add.component.scss'],
})
export class CompliancesFundAddComponent implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<CompliancesFundAddComponent>,
        private compliancesService: CompliancesService,
        @Inject(MAT_DIALOG_DATA) public dialogData: { fund: ComplianceFundModel }
    ) {}

    ngOnInit(): void {
        console.log(this.dialogData);
    }
}
