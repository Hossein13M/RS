import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#shared/services/alert.service';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';
import { ContractFormService } from './contract-form.service';
import { ContractForm } from './contract-form.model';

@Component({
    selector: 'app-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent {
    private readonly organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    private formInfo: ContractForm;

    constructor(private readonly dialog: MatDialog, private readonly contractFormService: ContractFormService, private readonly alertService: AlertService) {}

    public openContractFormDialog(): void {
        this.dialog.open(ContractFormDialogComponent, { width: '1000px', height: '600px', panelClass: 'dialog-p-0' });
    }

    public handleFormInfo(event: any): void {
        this.formInfo = { organization: this.organizationCode, sections: event.sections, name: event.name };
        this.contractFormService.createContractForm(this.formInfo).subscribe(
            () => this.alertService.onSuccess('فرم به درستی ذخیره شد'),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
