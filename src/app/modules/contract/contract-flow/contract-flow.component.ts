import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#shared/services/alert.service';
import { ContractFlowDialogComponent } from './contract-flow-dialog/contract-flow-dialog.component';
import { ContractFlowService } from './contract-flow.service';
import { Flow } from './contract-flow.model';

@Component({
    selector: 'app-contract-flow',
    templateUrl: './contract-flow.component.html',
    styleUrls: ['./contract-flow.component.scss'],
})
export class ContractFlowComponent implements OnInit {
    public flows: any;
    public pagination = { skip: 0, limit: 100, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'جریان قرارداد', type: 'string', minWidth: '200px' },
        {
            id: 'createdAt',
            name: 'تاریخ ساخت',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
            type: 'string',
            minWidth: '200px',
        },
        {
            id: 'isActive',
            name: 'وضعیت جریان قرارداد',
            convert: (value) => (value ? 'فعال' : 'غیر فعال'),
            type: 'string',
            minWidth: '200px',
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '200px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'BPMN (پیشینه‌ی الگوسازی فرآیند کسب‌و‌کار)',
                    icon: 'account_tree',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Flow }) => this.navigateToFlowBPMNPage(row.row._id),
                },
                {
                    name: 'ویرایش',
                    icon: 'mode_edit',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Flow }) => this.openFlowDialog('edit', row.row),
                },
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: Flow }) => this.changeFlowStatus(row.row._id),
                },
            ],
        },
    ];
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');

    constructor(private dialog: MatDialog, private flowService: ContractFlowService, private alertService: AlertService, private router: Router) {}

    ngOnInit(): void {
        this.getFlows();
    }

    public openFlowDialog(dialogType: 'edit' | 'create' | 'manual', flowType?: Flow): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(ContractFlowDialogComponent, {
            data: { flowData: dialogType === 'edit' ? flowType : null, isManualDialog: dialogType === 'manual' },
            width: '500px',
            height: '400px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result: { isEditMode: boolean; flowId?: string }) => {
            if (result) result.isEditMode ? this.getFlows() : this.router.navigate(['contract/flow/bpmn/' + result.flowId]).finally();
        });
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getFlows();
    }

    private getFlows(): void {
        this.flowService.getFlows({ ...this.pagination, organization: this.organizationCode }).subscribe(
            (response) => (this.flows = response.items),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private changeFlowStatus(flowId: string): void {
        this.flowService.changeFlowStatus(flowId).subscribe(
            () => this.getFlows(),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private navigateToFlowBPMNPage(flowId: string): void {
        this.router.navigate(['contract/flow/bpmn/' + flowId]).finally();
    }
}
