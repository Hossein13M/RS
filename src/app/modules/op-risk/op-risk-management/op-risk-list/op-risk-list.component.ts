import { TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '#shared/services/alert.service';
import { OpLossManagementService } from '../op-loss-management.service';
import { OpRiskManagementService } from '../op-risk-management.service';
import { RejectOpRiskComponent } from '../reject-op-risk/reject-op-risk.component';

@Component({
    selector: 'app-op-risk-list',
    templateUrl: './op-risk-list.component.html',
    styleUrls: ['./op-risk-list.component.scss'],
})
export class OpRiskListComponent implements OnInit {
    data: any;
    columns = [
        { name: 'عنوان', id: 'title', type: 'string', minWidth: '130px' },
        {
            name: 'نوع',
            id: 'type',
            type: 'string',
            minWidth: '130px',
            sticky: true,
            convert: (value: any) => (value === 'risk' ? 'ریسک' : 'زیان'),
        },
        {
            name: 'تاریخ ثبت',
            id: 'createdAt',
            type: 'string',
            minWidth: '150px',
            convert: (value: any) =>
                new Date(value).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
        },
        { name: 'کاربر ثبت کننده', id: 'submittedBy', type: 'string', minWidth: '130px', sticky: true },
        {
            name: 'وضعیت',
            id: 'status',
            type: 'string',
            minWidth: '130px',
            sticky: true,
            convert: (value: any) => {
                if (value === 'in progress') return 'درحال بررسی';
                if (value === 'accepted') return 'تایید شده';
                if (value === 'rejected') return 'رد شده';
            },
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '130px',
            sticky: true,
            operations: [
                {
                    name: 'مشاهده',
                    icon: 'visibility',
                    color: 'primary',
                    operation: ({ row }: any) => {
                        if (row.type === 'risk') this.router.navigate(['/op-risk/management/add'], { queryParams: { opRiskId: row.opRiskId } }).finally();
                        else {
                            this.router
                                .navigate(['/op-risk/management/loss/detail'], {
                                    queryParams: {
                                        lastLossEventId: row.lastLossEventId,
                                        opId: row.opLossId,
                                        view: true,
                                    },
                                })
                                .finally();
                        }
                    },
                },
                {
                    name: 'تایید',
                    icon: 'check',
                    color: 'accent',
                    operation: ({ row }: any) => {
                        if (row.type === 'risk') {
                            const data = { opRiskId: row.opRiskId };
                            this.opRiskManagementService.acceptOpRisk(data).subscribe(() => {
                                this.alertService.onSuccess('ریسک با موفقیت تایید شد');
                                this.getActiveOPRiskWorkFlows();
                            });
                        } else {
                            const data = { opLossId: row.opLossId };
                            this.opLossManagementService.acceptOpLose(data).subscribe(() => this.alertService.onSuccess('زیان با موفقیت تایید شد'));
                        }
                    },
                },
                {
                    name: 'رد',
                    icon: 'clear',
                    color: 'warn',
                    operation: ({ row }: any) =>
                        row.type === 'risk' ? this.showRejectOpRisk(row.opRiskId, 'risk') : this.showRejectOpRisk(row.opLossId, 'lose'),
                },
                {
                    name: 'ویرایش',
                    icon: 'edit',
                    color: 'primary',
                    operation: ({ row }: any) => {
                        if (row.type === 'risk') {
                            this.router
                                .navigate(['/op-risk/management/add'], {
                                    queryParams: { opRiskId: row.opRiskId, edit: true },
                                })
                                .finally();
                        } else this.router.navigate([`/op-risk/management/loss/edit/${row.opLossId}`]).finally();
                    },
                },
            ],
        },
    ];
    dataHistory: any;
    columnsHistory = [
        { name: 'عنوان', id: 'title', type: 'string', minWidth: '130px' },
        {
            name: 'زمان ساخته شدن',
            id: 'createdAt',
            type: 'string',
            minWidth: '150px',
            convert: (value: any) =>
                new Date(value).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
            search: { type: 'date_range', mode: TableSearchMode.SERVER },
        },
        { name: 'سازنده', id: 'submittedBy', type: 'string', minWidth: '130px', sticky: true },
        {
            name: 'نوع',
            id: 'type',
            type: 'string',
            minWidth: '130px',
            sticky: true,
            convert: (value: any) => {
                if (value === 'risk') return 'ریسک';
                if (value === 'loss') return 'زیان';
            },
            search: {
                type: 'select',
                mode: TableSearchMode.LOCAL,
                options: [
                    { name: 'ریسک', value: 'risk' },
                    { name: 'زیان', value: 'loss' },
                ],
            },
        },
        {
            name: 'وضعیت',
            id: 'status',
            type: 'string',
            minWidth: '130px',
            sticky: true,
            convert: (value: any) => {
                if (value === 'in progress') return 'درحال بررسی';
                if (value === 'accepted') return 'تایید شده';
                if (value === 'rejected') return 'رد شده';
            },
            search: {
                type: 'select',
                mode: TableSearchMode.LOCAL,
                options: [
                    { name: 'تایید شده', value: 'accept' },
                    { name: 'رد شده', value: 'reject' },
                ],
            },
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '130px',
            sticky: true,
            operations: [
                {
                    name: 'مشاهده',
                    icon: 'visibility',
                    color: 'primary',
                    operation: ({ row }: any) => {
                        if (row.type === 'risk') this.router.navigate(['/op-risk/management/add'], { queryParams: { opRiskId: row.id } }).finally();
                        else {
                            this.router
                                .navigate(['/op-risk/management/loss/detail'], {
                                    queryParams: { lastLossEventId: row.lastLossEventId, opId: row.id, view: true },
                                })
                                .finally();
                        }
                    },
                },
            ],
        },
    ];

    constructor(
        private dialog: MatDialog,
        private opRiskManagementService: OpRiskManagementService,
        private opLossManagementService: OpLossManagementService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getActiveOPRiskWorkFlows();
        this.getHistory();
    }

    public search(filter: any): void {
        if (filter.createdAt.fromDate || filter.createdAt.toDate) this.getHistory();
    }

    private getActiveOPRiskWorkFlows(): void {
        this.opRiskManagementService.getActiveOPRiskWorkFlows().subscribe((response) => {
            response.map((el) => {
                if (el.profileName) el.title = el.profileName;
            });
            this.data = response;
        });
    }

    private getHistory(): void {
        this.opRiskManagementService.getOPRiskWorkFlowHistory(0, 10).subscribe((response) => {
            response.map((el) => {
                if (el.profileName) el.title = el.profileName;
            });
            this.dataHistory = response;
        });
    }

    private showRejectOpRisk(id, type): void {
        this.dialog
            .open(RejectOpRiskComponent, { panelClass: 'dialog-w50', data: { id: id, type: type } })
            .afterClosed()
            .subscribe((res) => res && this.getActiveOPRiskWorkFlows());
    }
}
