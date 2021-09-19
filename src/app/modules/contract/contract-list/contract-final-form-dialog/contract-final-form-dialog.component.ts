import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractViewerService } from '../../contract-viewer/contract-viewer.service';
import { ContractViewerModel } from '../../contract-viewer/contract-viewer.model';
import { AlertService } from '#shared/services/alert.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-contract-final-form-dialog',
    templateUrl: './contract-final-form-dialog.component.html',
    styleUrls: ['./contract-final-form-dialog.component.scss'],
})
export class ContractFinalFormDialogComponent implements OnInit {
    public finalFormData: ContractViewerModel;
    public formInfoArray: Array<{ key: string; value: string }> = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public contractId: string,
        public readonly dialog: MatDialogRef<ContractFinalFormDialogComponent>,
        private readonly contractViewerService: ContractViewerService,
        private readonly alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.getFinalFormData();
    }

    private getFinalFormData(): void {
        this.contractViewerService.getFinalFormData(this.contractId).subscribe(
            (response) => {
                this.finalFormData = response;
                !!response && this.setKeyValueOfFormSection(response.data[0].sections);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private setKeyValueOfFormSection(sectionForm): void {
        sectionForm.map((section) =>
            Object.keys(section).map((key) => {
                if (UtilityFunctions.isDate(section[key])) {
                    this.formInfoArray.push({ key: key, value: UtilityFunctions.convertDateToPersianDateString(new Date(section[key])) });
                } else {
                    this.formInfoArray.push({ key: key, value: section[key] });
                }
            })
        );
    }
}
