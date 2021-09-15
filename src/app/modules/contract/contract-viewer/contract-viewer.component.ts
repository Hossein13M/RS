import { Component, OnInit } from '@angular/core';
import { CardboardService } from '../contract-cardboard/cardboard.service';
import { ActivatedRoute } from '@angular/router';
import { FinalForm } from '../contract-cardboard/cardboard.model';

@Component({
    selector: 'app-contract-viewer',
    templateUrl: './contract-viewer.component.html',
    styleUrls: ['./contract-viewer.component.scss'],
})
export class ContractViewerComponent implements OnInit {
    private contractId: string;
    public isLoading: boolean = true;
    public formData: FinalForm;
    constructor(private readonly cardboardService: CardboardService, private readonly activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getContractCardboardInfo();
    }

    private getContractCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((result) => {
            console.log(result);
            this.isLoading = false;
            this.formData = result.form[0];
            console.log(this.formData);
        });
    }

    public handleFormViewerInfo(event) {
        console.log(event);
    }
}
