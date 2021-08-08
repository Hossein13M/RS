import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#services/alert.service';
import { FlowDialogComponent } from './flow-dialog/flow-dialog.component';
import { FlowService } from './flow.service';
import { Flow } from './flow.model';

@Component({
    selector: 'app-flow',
    templateUrl: './flow.component.html',
    styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit {
    public flows: any;
    public pagination = { skip: 0, limit: 10, total: 100 };
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'جریان قرارداد', type: 'string', minWidth: '200px' },
        { id: 'isActive', name: 'وضعیت جریان قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '200px' },
        { id: 'isManual', name: 'گونه', convert: (value) => (value ? 'دستی' : 'غیردستی'), type: 'string', minWidth: '200px' },
        {
            id: 'createdAt',
            name: 'تاریخ ساخت',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
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
                    name: 'ویرایش',
                    icon: 'mode_edit',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Flow }) => this.openFlowDialog('edit', row.row),
                },
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync_alt',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: Flow }) => this.changeFlowStatus(row.row._id),
                },
                {
                    name: 'BPMN (پیشینه‌ی الگوسازی فرآیند کسب‌و‌کار)',
                    icon: 'model_training',
                    color: 'accent',
                    operation: (row: { operationItem: any; row: Flow }) => this.navigateToFlowBPMNPage(row.row._id),
                },
            ],
        },
    ];
    constructor(private dialog: MatDialog, private flowService: FlowService, private alertService: AlertService, private router: Router) {}

    ngOnInit(): void {
        this.getFlows();
    }

    private getFlows(): void {
        this.flowService.getFlows({ ...this.pagination, organization: this.organizationCode }).subscribe(
            (response) => (this.flows = response.items),
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    private changeFlowStatus(flowId: string): void {
        this.flowService.changeFlowStatus(flowId).subscribe(
            () => this.getFlows(),
            () => this.alertService.onError('مشکلی پیش آمده‌است')
        );
    }

    public openFlowDialog(dialogType: 'edit' | 'create', flowType?: Flow): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(FlowDialogComponent, {
            data: dialogType === 'edit' ? flowType : null,
            width: '500px',
            height: '400px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result) => result && this.getFlows());
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getFlows();
    }

    private navigateToFlowBPMNPage(flowId: string): void {
        this.router.navigate(['contract/flow/bpmn/' + flowId]).finally();
    }
}
