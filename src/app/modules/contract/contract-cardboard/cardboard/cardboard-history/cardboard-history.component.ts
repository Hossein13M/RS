import { Component, Input, OnInit } from '@angular/core';
import { CardboardService } from '../../cardboard.service';
import { AlertService } from '#shared/alert.service';
import { ActivatedRoute } from '@angular/router';
import { ContractHistory, ContractHistoryTableData } from '../../cardboard.model';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { StateType } from '#shared/state-type.enum';
import { ContractHistoryIcons } from './cardboard-history.actions';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-cardboard-history',
    templateUrl: './cardboard-history.component.html',
    styleUrls: ['./cardboard-history.component.scss'],
})
export class CardboardHistoryComponent implements OnInit {
    @Input() contractIdForDialog: string = null;
    private contractId: string;
    public contractHistory: Array<ContractHistory> = [];
    public tableDataContractHistory: Array<ContractHistoryTableData> = [];
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
        this.contractId = !!this.contractIdForDialog ? this.contractIdForDialog : this.activatedRoute.snapshot.params.id;
        this.getContractHistory();
    }

    private getContractHistory(): void {
        this.cardBoardService.getContractHistory(this.contractId).subscribe(
            (response) => {
                this.contractHistory = response;
                this.contractHistory.map((item) => {
                    this.tableDataContractHistory.push({
                        fromStep: item.fromStep.name,
                        toStep: item.toStep.name,
                        user: item.user.name,
                        action: item.action,
                        updatedAt: item.updatedAt,
                    });
                });
                this.stateType = StateType.PRESENT;
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public getHistoryStepInfo(contractHistoryStatue: ContractHistory, actionType: 'title' | 'subtitle'): string {
        let finalText;
        if (actionType === 'title') {
            finalText = ContractHistoryIcons.find((item) => item.typePer === contractHistoryStatue.status).titleText;
        } else {
            finalText = ` - از ${contractHistoryStatue.fromStep.name} به ${contractHistoryStatue.toStep.name}`;
        }
        return finalText;
    }

    public getProperIcon(contractHistoryItem: ContractHistory, actionType: 'icon' | 'iconColor'): ThemePalette | string {
        return ContractHistoryIcons.find((item) => item.typePer === contractHistoryItem.status)[actionType];
    }
}
