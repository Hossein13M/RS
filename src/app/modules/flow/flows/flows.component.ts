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
import { ColumnModel, TableSearchMode } from '#shared/components/table/table.model';
import { Router } from '@angular/router';

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
    column: Array<ColumnModel>;
    dataSource = new MatTableDataSource<GetFlowResponseDto>(this.ELEMENT_DATA);
    data = [];
    displayedColumns = ['name', 'categoryId'];
    // displayedColumns = ['name', 'categoryId','delete'];

    constructor(private flowService: FlowsService, private _matDialog: MatDialog, private router: Router) {
        this.searchInput = new FormControl('');
    }

    ngOnInit(): void {
        this.flowService.getFlows().subscribe((i) => {
            //  nothing
        });
        this.intiColumns();
        this.get();
        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.flowService.getFlows(searchText).subscribe((i) => {
                //  nothing
            });
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchInput.setValue(searchFilter[key]);
        });

        this.flowService.specificationModel.searchKeyword = searchFilter;
        this.flowService.specificationModel.skip = 0;
        this.get();
    }

    intiColumns(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام قرارداد',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'category',
                name: 'دسته‌بندی قرارداد',
                type: 'string',
                convert: (value) => value?.name,
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    {
                        name: 'ویرایش',
                        icon: 'visibility',
                        color: 'accent',
                        operation: ({ row }: any) => this.navigateToFlowMaker(row?._id),
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row }: any) => this.delete(row?._id),
                    },
                ],
            },
        ];
    }

    get(): void {
        this.flowService.flows.subscribe((res) => {
            this.flowsList = res;
            this.data = res;
        });
    }

    delete(flowID): void {
        this.flowService.deleteFlow(flowID).subscribe((res) => {
            if (res) {
                this.data = this.data.filter((el) => el._id !== flowID);
            }
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
            // nothing
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
            // nothing
        });
    }

    navigateToFlowMaker(id: string): void {
        this.router.navigate(['/flow/maker', id]);
    }
}
