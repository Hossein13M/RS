import { Component, OnInit } from '@angular/core';
import { CardboardService } from '../../cardboard.service';
import { AlertService } from '#services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ContractHistory, ContractHistoryTableData } from '../../cardboard.model';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-cardboard-history',
    templateUrl: './cardboard-history.component.html',
    styleUrls: ['./cardboard-history.component.scss'],
})
export class CardboardHistoryComponent implements OnInit {
    private contractId: string;
    public contractHistory: Array<ContractHistory> = [];
    public tableDataContractHistoy: Array<ContractHistoryTableData> = [];
    public pagination = { skip: 0, limit: 100, total: 100 };
    public stateType: StateType = StateType.INIT;

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'updatedAt', name: 'تاریخ', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '100px' },
        { id: 'user', name: 'کاربر', type: 'string', minWidth: '200px' },
        { id: 'fromStep', name: 'از گام', type: 'string', minWidth: '100px' },
        { id: 'toStep', name: 'به گام ', type: 'string', minWidth: '100px' },
    ];

    constructor(
        private readonly cardBoardService: CardboardService,
        private readonly alertService: AlertService,
        private readonly activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.contractId = this.activatedRoute.snapshot.params.id;
        this.getContractHistroy();
    }

    private getContractHistroy(): void {
        this.cardBoardService.getContractHistory(this.contractId).subscribe(
            (response) => {
                this.contractHistory = response;
                this.contractHistory.map((item) => {
                    this.tableDataContractHistoy.push({
                        fromStep: item.fromStep.name,
                        toStep: item.toStep.name,
                        user: item.user.name,
                        action: item.action,
                        updatedAt: item.updatedAt,
                    });
                });
                this.stateType = StateType.PRESENT;
            },
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }
}
