import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GetFlowCategoryDto } from 'app/services/API/models';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddFlowCategoryComponent } from './add-flow-category/add-flow-category.component';

@Component({
    selector: 'app-flow-category',
    templateUrl: './flow-category.component.html',
    styleUrls: ['./flow-category.component.scss'],
    animations: fuseAnimations,
})
export class FlowCategoryComponent implements OnInit {
    flowsList: GetFlowCategoryDto[] = [];
    ELEMENT_DATA: GetFlowCategoryDto[] = [];
    searchInput: FormControl;
    dialogRef: any;
    dataSource = new MatTableDataSource<GetFlowCategoryDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'keyword'];
    constructor(private flowService: FlowsService, private _matDialog: MatDialog) {
        this.searchInput = new FormControl('');
    }

    ngOnInit() {
        this.flowService.getFlowCategories().subscribe((i) => {
            //  nothing
        });
        this.flowService.flowCategories.subscribe((res) => {
            this.flowsList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<GetFlowCategoryDto>(this.ELEMENT_DATA);
        });

        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.flowService.getFlowCategories(searchText).subscribe((i) => {
                //  nothing
            });
        });
    }

    delete(flowID) {
        this.flowService.deleteFlowCategory(flowID).subscribe((res) => {
            // nothing
        });
    }
    /**
     * Edit operator
     *
     * @param operator
     */
    editOperator(category): void {
        this.dialogRef = this._matDialog.open(AddFlowCategoryComponent, {
            panelClass: 'form-dialog',
            data: {
                category: category,
                action: 'edit',
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            //nothing
        });
    }
}
