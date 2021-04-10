import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { StateType } from 'app/shared/state-type.enum';
import { TableSearchMode } from '../../../../shared/components/table/table-consts';
import { FlowAddComponent } from '../flow-add/flow-add.component';
import { OpRiskViewComponent } from '../op-risk-view/op-risk-view.component';
import { OpRiskFlowService } from '../op-risk-flow.service';

@Component({
    selector: 'app-op-risk-flow',
    templateUrl: './op-risk-flow.component.html',
    styleUrls: ['./op-risk-flow.component.scss'],
})
export class OpRiskFlowComponent implements OnInit, AfterViewInit {
    @ViewChild('toggle', { static: false }) toggle: TemplateRef<any>;
    data: any;
    columns: Array<any>;
    stateType = StateType;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private opRiskFlowService: OpRiskFlowService, private matDialog: MatDialog, private alertService: AlertService) {}

    ngOnInit(): void {
        this.getOpRiskFlows();
    }

    ngAfterViewInit(): void {
        this.createColumns();
    }

    private createColumns(): void {
        this.columns = [
            { name: 'ردیف', id: 'positionNumber', type: 'number', minWidth: '130px', search: { type: 'select', mode: TableSearchMode.LOCAL } },
            { name: 'عنوان جریان', id: 'name', type: 'string', minWidth: '150px', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'وضعیت', id: 'custom1', type: 'custom', cellTemplate: this.toggle },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'مشاهده', icon: 'visibility', color: 'primary', operation: ({ row }: any) => this.viewFlow(row.id) },
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editFlow(row.id) },
                ],
            },
        ];
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getOpRiskFlows();
    }

    private getOpRiskFlows(): void {
        this.opRiskFlowService.getOPRiskFlows(this.pagination).subscribe(
            (response) => {
                this.pagination.total = response.total;
                response.items.forEach((value, index) => (response.items[index].positionNumber = index + 1));
                this.data = response.items;
            },
            () => this.alertService.onError('مشکلی در دریافت اطلاعات پیش ‌آمده است.')
        );
    }

    public toggleStatus(row: any): void {
        row.isActiveState = StateType.LOADING;
        this.opRiskFlowService.toggleOPRiskFlowStatus(row.id).subscribe(
            () => {
                row.isActive = !row.isActive;
                this.alertService.onSuccess('وضعیت با موفقیت تغییر کرد');
                row.isActiveState = StateType.PRESENT;
            },
            (error) => {
                this.alertService.onError(error);
                row.isActiveState = StateType.FAIL;
                setTimeout(() => StateType.PRESENT, 500);
            }
        );
    }

    public createFlow(): void {
        this.matDialog
            .open(FlowAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => res && this.getOpRiskFlows());
    }

    public editFlow(flowId: number | string): void {
        this.opRiskFlowService.getSingleOpRiskFlow(flowId).subscribe((response) => {
            this.matDialog
                .open(FlowAddComponent, { panelClass: 'dialog-w60', data: response })
                .afterClosed()
                .subscribe((res) => res && this.getOpRiskFlows());
        });
    }

    private viewFlow(flowId: string | number): void {
        this.opRiskFlowService.getSingleOpRiskFlow(flowId).subscribe((response) => {
            this.matDialog
                .open(OpRiskViewComponent, { panelClass: 'dialog-w60', data: response })
                .afterClosed()
                .subscribe((res) => res && this.getOpRiskFlows());
        });
    }
}
