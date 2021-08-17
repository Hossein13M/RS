import { Component, OnInit } from '@angular/core';
import { CardboardInfo } from '../../cardboard.model';
import { CardboardService } from '../../cardboard.service';
import { ActivatedRoute } from '@angular/router';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-cardboard-form',
    templateUrl: './cardboard-form.component.html',
    styleUrls: ['./cardboard-form.component.scss'],
})
export class CardboardFormComponent implements OnInit {
    public stateType: StateType = StateType.INIT;
    public cardboardInfo: CardboardInfo;
    private contractId: string;
    constructor(private cardboardService: CardboardService, private readonly activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getCardboardInfo();
    }

    private getCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((response) => {
            this.cardboardInfo = response;
            this.stateType = StateType.PRESENT;
        });
    }
}
