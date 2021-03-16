import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FindFlowInstanceResponseDto } from 'app/services/API/models';
import { FlowsInstanceService } from 'app/services/App/flow/flow-instance.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddFlowInstanceComponent } from './add-flow-instance/add-flow-instance.component';

@Component({
    selector: 'app-flow-instance',
    templateUrl: './flow-instance.component.html',
    styleUrls: ['./flow-instance.component.scss'],
    animations: fuseAnimations,
})
export class FlowInstanceComponent implements OnInit {
    public flowInstancesList: FindFlowInstanceResponseDto[] = [];
    public ELEMENT_DATA: FindFlowInstanceResponseDto[] = [];
    public SearchInput: FormGroup;

    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<FindFlowInstanceResponseDto>(this.ELEMENT_DATA);
    displayedColumns = ['code', 'title', 'customerName', 'flowName', 'date', 'state', 'more'];

    constructor(private flowsInstanceService: FlowsInstanceService, private _matDialog: MatDialog, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
        this.flowsInstanceService.flowInstances.subscribe((res) => {
            this.flowInstancesList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<FindFlowInstanceResponseDto>(this.ELEMENT_DATA);
        });

        this.flowsInstanceService.getFlowInstances().subscribe();

        this.SearchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.flowsInstanceService
                .getFlowInstances(
                    this.SearchInput.controls['code'].value,
                    this.SearchInput.controls['title'].value,
                    this.SearchInput.controls['customerName'].value,
                    this.SearchInput.controls['flowName'].value
                )
                .subscribe();
        });
    }

    createForm(): void {
        this.SearchInput = this.fb.group({
            code: [],
            title: [],
            customerName: [],
            flowName: [],
        });
    }

    addFlowInstance(): void {
        this.dialogRef = this._matDialog.open(AddFlowInstanceComponent, {
            panelClass: 'dialog-p-0',
            data: {
                action: 'new',
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {});
    }

    editFlowInstance(flowInstance): void {
        this._matDialog.open(AddFlowInstanceComponent, {
            panelClass: 'dialog-p-0',
            data: {
                flowInstance: flowInstance,
                action: 'edit',
            },
        });
    }
}
