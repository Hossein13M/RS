import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManager } from '../../../../shared/pipes/stateManager.pipe';
import { OpRiskManagementService } from '../op-risk-management.service';

@Component({
    selector: 'app-submitted-risks',
    templateUrl: './submitted-risks.component.html',
    styleUrls: ['./submitted-risks.component.scss'],
})
export class SubmittedRisksComponent implements OnInit {
    componentState = { state: '' };
    data: any;
    columns: Array<any>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private opRiskManagementService: OpRiskManagementService, private router: Router) {
        this.columns = [
            {
                id: 'title',
                name: 'نام',
                type: 'string',
            },
            {
                id: 'type',
                name: 'نوع',
                type: 'string',
                convert: (value) => (value === 'risk' ? 'ریسک' : value === 'loss' ? 'زیان' : ''),
            },
            {
                id: 'operation',
                type: 'operation',
                operations: [
                    {
                        name: 'مشاهده',
                        icon: 'visibility',
                        color: 'primary',
                        operation: ({ row }: any) => {
                            if (row.type === 'risk') {
                                this.router.navigate(['/op-risk/management/add'], {
                                    queryParams: {
                                        opRiskId: row.id,
                                        back: '/op-risk/management/submitted-risks',
                                    },
                                });
                            } else {
                                this.router.navigate(['/op-risk/management/loss/detail'], {
                                    queryParams: {
                                        back: '/op-risk/management/submitted-risks',
                                        lastLossEventId: row.lastLossEventId,
                                        opId: row.id,
                                        view: true,
                                    },
                                });
                            }
                        },
                    },
                ],
            },
        ];
    }

    ngOnInit(): void {
        this.get(this.pagination);
    }

    get(pe: any): any {
        this.opRiskManagementService
            .getSubmittedRiskAndLoss({ limit: pe.limit, skip: pe.skip })
            .pipe(StateManager(this.componentState))
            .subscribe((data: any) => {
                this.data = data.items;
                this.pagination = { limit: data.limit, skip: data.skip, total: data.total };
            });
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get(this.pagination);
    }
}
