import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GetFlowResponseDto } from 'app/services/API/models';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddFlowCategoryComponent } from '../flow-category/add-flow-category/add-flow-category.component';
import { AddFlowComponent } from './add-flow/add-flow.component';

@Component({
    selector: 'app-flows',
    templateUrl: './flows.component.html',
    styleUrls: ['./flows.component.scss'],
    animations: fuseAnimations,
})
export class FlowsComponent implements OnInit {
    flowsList: GetFlowResponseDto[] = [];
    ELEMENT_DATA: GetFlowResponseDto[] = [];
    searchInput: FormControl;
    dialogRef: any;
    dataSource = new MatTableDataSource<GetFlowResponseDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'categoryId'];
    // displayedColumns = ['name', 'categoryId','delete'];

    constructor(private flowService: FlowsService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
    }

    ngOnInit(): void {
        this.flowService.getFlows().subscribe((i) => {
            //  nothing
        });
        this.flowService.flows.subscribe((res) => {
            this.flowsList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<GetFlowResponseDto>(this.ELEMENT_DATA);
        });

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.flowService.getFlows(searchText).subscribe((i) => {
                //  nothing
            });
        });
    }

    delete(flowID) {
        this.flowService.deleteFlow(flowID).subscribe((res) => {
            // nothing
        });
    }

    /**
     * New category
     */
    newCategory(): void {
        this.dialogRef = this._matDialog.open(AddFlowCategoryComponent, {
            panelClass: 'form-dialog',
            data: {
                action: 'new',
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            //nothing
        });
    }

    /**
     * New flow
     */
    newFlow(): void {
        this.dialogRef = this._matDialog.open(AddFlowComponent, {
            panelClass: 'form-dialog',
            data: {
                action: 'new',
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            //nothing
        });
    }
}
