import { Component, OnInit } from '@angular/core';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public pagination = { skip: 0, limit: 5, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'جریان قرارداد', type: 'string', minWidth: '200px' },
        { id: 'isActive', name: 'وضعیت جریان قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '200px' },
        { id: 'createdAt', name: 'تاریخ ساخت', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '200px' },
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
                    color: 'accent',
                    operation: (row: { operationItem: any; row: Flow }) => this.openFlowDialog('edit', row.row),
                },
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync_alt',
                    color: 'accent',
                    operation: (row: { operationItem: any; row: Flow }) => this.changeFlowStatus(row.row.id),
                },
            ],
        },
    ];
    constructor(private dialog: MatDialog, private flowService: FlowService) {}

    ngOnInit(): void {}

    private getFlows(): void {
        this.flowService.getFlows().subscribe((response) => (this.flows = response));
    }

    private changeFlowStatus(flowId: number | string): void {
        this.flowService.changeFlowStatus(+flowId);
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
}
