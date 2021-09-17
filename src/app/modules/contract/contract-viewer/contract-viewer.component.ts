import { Component, OnInit } from '@angular/core';
import { CardboardService } from '../contract-cardboard/cardboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalForm } from '../contract-cardboard/cardboard.model';
import { ContractViewerService } from './contract-viewer.service';
import { AlertService } from '#services/alert.service';

@Component({
    selector: 'app-contract-viewer',
    templateUrl: './contract-viewer.component.html',
    styleUrls: ['./contract-viewer.component.scss'],
})
export class ContractViewerComponent implements OnInit {
    private contractId: string;
    public isLoading: boolean = true;
    public formData: FinalForm;
    constructor(
        private readonly cardboardService: CardboardService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly contractViewerService: ContractViewerService,
        private readonly alertService: AlertService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getContractCardboardInfo();
    }

    private getContractCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((result) => {
            this.isLoading = false;
            this.formData = result.form[0];
        });
    }

    public handleFormViewerInfo(event) {
        this.contractViewerService.sendFinalFormData({ contract: this.contractId, data: event }).subscribe(
            () => this.router.navigate(['/contract/contract-list']).finally(() => this.alertService.onSuccess('ثبت شد')),
            () => this.alertService.onError('مشکلی پیش آمده است')
        );
    }
}
