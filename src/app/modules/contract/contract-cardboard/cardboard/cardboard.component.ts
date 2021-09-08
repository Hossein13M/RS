import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardboardService } from '../cardboard.service';
import { CardboardInfo } from '../cardboard.model';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-cardboard',
    templateUrl: './cardboard.component.html',
    styleUrls: ['./cardboard.component.scss'],
})
export class CardboardComponent implements OnInit {
    private contractId: string;
    public cardboardInfo: CardboardInfo;
    public stateType: StateType = StateType.INIT;

    constructor(private readonly router: Router, private readonly cardboardService: CardboardService, private readonly activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getCardboardInfo();
    }

    public navigateToCardboard() {
        this.router.navigate(['/contract/cardboard']).finally();
    }

    private getCardboardInfo(): void {
        this.cardboardService.getContractCardboardWizard(this.contractId).subscribe((response) => {
            this.cardboardInfo = response;
            this.stateType = StateType.PRESENT;
        });
    }
}
