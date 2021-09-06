import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardboardService } from './cardboard.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ContractCardboard, ContractCardboardTableData } from './cardboard.model';
import { Column } from '#shared/components/table/table.model';
import { AlertService } from '#services/alert.service';
import { StateType } from '#shared/state-type.enum';

@Component({
    selector: 'app-cardboard',
    templateUrl: './cardboard-list.component.html',
    styleUrls: ['./cardboard-list.component.scss'],
})
export class CardboardListComponent implements OnInit {
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public pagination = { skip: 0, limit: 100, total: 100 };
    public contractCardboard: Array<ContractCardboard> = [];
    public tableData: Array<ContractCardboardTableData> = [];
    public stateType: StateType = StateType.INIT;

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '70px' },
        { id: 'name', name: 'نام قرارداد', type: 'string', minWidth: '200px' },
        { id: 'code', name: 'کد قرارداد', type: 'string', minWidth: '200px' },
        { id: 'customer', name: 'مشتری قرارداد', type: 'string', minWidth: '200px' },
        { id: 'initializerUser', name: 'ثبت‌کننده‌ی قرارداد', type: 'string', minWidth: '200px' },
        {
            id: 'createdAt',
            name: 'تاریخ ساخت',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
            type: 'string',
            minWidth: '150px',
        },
        {
            id: 'status',
            name: 'وضعیت قرارداد',
            convert: (value) => (value === 'pause' ? 'متوقف‌شده' : value === 'final' ? 'پایانی' : 'در حال انجام'),
            type: 'string',
            minWidth: '140px',
        },
        { id: 'isActive', name: 'فعالیت قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '140px' },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '50px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'باز کردن کارتابل قرارداد',
                    icon: 'open_in_new',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: ContractCardboardTableData }) => this.router.navigate([`/contract/cardboard/` + row.row._id]),
                },
            ],
        },
    ];

    constructor(private readonly router: Router, private readonly cardboardService: CardboardService, private alertService: AlertService) {}

    ngOnInit(): void {
        this.getContractCardboard();
    }

    private getContractCardboard(): void {
        this.cardboardService.getContractCardboardList(this.organizationCode).subscribe(
            (response) => {
                this.contractCardboard = response;
                this.prepareDataForTable();
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private prepareDataForTable(): void {
        this.contractCardboard.map((item) => {
            this.tableData.push({
                isActive: item.isActive,
                _id: item._id,
                name: item.name,
                code: item.code ?? 'ندارد',
                createdAt: item.createdAt,
                initializerUser: item.initializerUser.name,
                customer: item.customer.name,
                status: item.status,
            });
        });
        this.stateType = StateType.PRESENT;
    }
}
