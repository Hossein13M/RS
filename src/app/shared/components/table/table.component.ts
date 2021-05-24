import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { debounceTime } from 'rxjs/operators';
import { PaginationChangeType, PaginationSetting, TableSearchMode } from './table.model';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

/**
 * Hoshman Risk's General Table Generator Document
 *
 * This table should be used to create all tables of this project.
 *
 * @remarks
 *
 * @param data -table data from back
 * @param columns - array of columns of table.
 *
 * example :
 * ```ts
 * {
 *  name: COLUMN_NAME,
 *  id: DATA_ID,
 *  type: DATA_TYPE -> 'string' | 'date' | 'price' | 'number' | 'operation',
 *
 *  width?: COLUMN_WIDTH -> exp: '300px' | '50%' | '50vw',
 *  minWidth?: COLUMN_MIN_WIDTH -> exp: '300px' | '50%' | '50vw',
 *
 *  search?: {
 *
 *   type: SEARCH_TYPE -> exp: 'select' | 'text' | 'date',
 *   mode: SEARCH_MODE -> exp: TableSearchMode.LOCAL | TableSearchMode.SERVER
 *
 *   // ----------------.
 *   //  "select" only  |
 *   // ----------------'
 *   // if you don't provide options, will find all options from data
 *   options?: [
 *    {
 *     name: 'فعال',
 *     value: 'active',
 *     headerAlign: 'center',
 *     dataAlign: 'center',
 *    },
 *   ],
 *
 *  },
 *
 *  convert?: SOME_FUNCTION -> the function use to convert this col's data to another form like :
 *            (value:any)=>{return 'something'}
 *
 *  // ----------------.
 *  //  "operation" only |
 *  // ----------------'
 *  // you must provide "operations" if you select type -> operation
 *  operations:[
 *   {
 *      showExportButtons: boolean,
 *      showSearchButtons: boolean,
 *     {
 *       name: OPERATION_NAME/TOOLTIP,
 *       icon: OPERATION_ICON,
 *       color: OPERATION_COLOR,
 *       operation: OPERATION_STRING | OPERATION_FUNCTION -> exp: (row:any) -> {some function}
 *     },
 *   }
 *  ]
 * }
 * ```
 *
 * @param searchCall - emit search value that use TableSearchMode.SERVER mode.
 * @param operationCall - emit operation string value if you don't provide function.
 * @returns
 */
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [fuseAnimations],
})
export class TableComponent implements OnChanges, AfterViewInit {
    @ViewChild('localPaginator', { static: false }) paginator: MatPaginator;
    @ViewChild('container', { static: false }) container;

    @Input() data: Array<any>;
    @Input() columns: Array<any>;
    @Input() height: string = '100%';

    // -----------------------------------------------------------------------------------------------------
    // @ Pagination Input
    // -----------------------------------------------------------------------------------------------------
    @Input() paginationSettings: PaginationSetting;
    @Input() paginationObj: PaginationChangeType;
    private _paginationObj: PaginationChangeType = { skip: 0, limit: 5, total: 100 };
    @Output() paginationChange: EventEmitter<PaginationChangeType>;
    // -----------------------------------------------------------------------------------------------------

    @Output() searchCall: EventEmitter<any>;
    @Output() operationCall: EventEmitter<any>;

    hasSearch = false;

    // Show Data Table
    displayedColumns: Array<string>;
    searchColumns: Array<string>;
    dataSource: MatTableDataSource<any>;
    dataToShow: Array<any>;
    lastServerSearch: string;

    showSearchBar = false;

    searchForm: FormGroup;
    filter: any;

    rowDetail: any;
    clickCoolDown = false;
    clickCount = 0;
    doubleClickAble = true;

    scroll(): void {
        if (this.paginationSettings.mode !== 'scroll') {
            return;
        }
        const scrollPosition =
            this.container?.nativeElement.scrollHeight - (this.container?.nativeElement.scrollTop + this.container?.nativeElement.clientHeight);
        if (scrollPosition > 90) {
            if (this.paginationObj.skip > this.paginationObj.total) {
                return;
            }
            this.paginationControl({pageSize: this.paginationObj.limit, pageIndex: this.paginationObj.skip + this.paginationObj.limit});
        }
    }

    constructor(private fb: FormBuilder) {
        this.searchCall = new EventEmitter<any>();
        this.operationCall = new EventEmitter<any>();
        this.paginationChange = new EventEmitter<PaginationChangeType>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let data = this.data;
        if (changes.hasOwnProperty('data')) {
            data = changes.data.currentValue;
        }

        if (!data || !this.columns || data.length === 0 || !Array.isArray(data)) {
            return;
        }

        // Check For Row Detail
        const rowDetailIndex = this.columns.findIndex((col) => col.type === 'rowDetail' || col.id === 'rowDetail');
        if (rowDetailIndex !== -1) {
            this.rowDetail = this.columns[rowDetailIndex];
            this.doubleClickAble = !!this.columns[rowDetailIndex].doubleClickable;
            this.columns.splice(rowDetailIndex, 1);
        }

        // Create Search FormGroup
        const formItems = {};
        this.columns.forEach((col, i) => {
            if (col.search) {
                this.hasSearch = true;
                if (col.search.type === 'date_range') {
                    formItems[col.id] = this.fb.group({
                        fromDate: [],
                        toDate: [],
                    });
                    return;
                }
                formItems[col.id] = [''];
            }
        });
        this.searchForm = this.fb.group(formItems);

        this.displayedColumns = [];
        this.displayedColumns = this.displayedColumns.concat(this.columns.map((r) => r.id));

        if (this.hasSearch) {
            this.searchColumns = this.displayedColumns.map((el) => el + '_search');
        }

        // add operation to each row
        const tableOperation = this.columns.find((element) => element.type === 'operation');
        if (tableOperation && tableOperation?.operations) {
            data?.forEach((element) => (element.tableOperation = [...tableOperation.operations.map((el: any) => ({ ...el }))]));
        }

        data?.forEach((el) => (el.tableSelect = false));
        this.patchData(this.data);

        this.handleSetLastSearch();
    }

    handleSetLastSearch(): void {
        try {
            this.searchForm.patchValue(JSON.parse(this.lastServerSearch));
        } catch (e) {
            return;
        }
    }

    ngAfterViewInit(): void {
        if (this.paginationSettings?.mode === 'local' && this.data && this.columns && this.dataSource) {
            this.dataSource.paginator = this.paginator;
        }
    }

    patchData(data: Array<any>): void {
        this.dataSource = new MatTableDataSource<any>(data);
        this.columns.forEach((col) => {
            if (col.search && col.search.type === 'select' && !col.search.options) {
                const options = [];
                for (const d of data) {
                    if (!options.find((el) => el.value === d[col.id])) {
                        options.push({ name: d[col.id], value: d[col.id] });
                    }
                }
                col.search.options = options;
            }
        });

        if (this.hasSearch) {
            this.dataSource.filterPredicate = this.createSearchFilter();

            // Value Changes
            this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((r) => {
                const localSearchFilter = {};
                const serverSearch = {};

                Object.keys(r).forEach((id) => {
                    const col = this.columns.find((el) => el.id === id);

                    if (col.search && col.search.mode === TableSearchMode.LOCAL) {
                        const value = r[id];
                        const type = col.type;
                        localSearchFilter[id] = { value, type };
                    }

                    if (col.search && col.search.mode === TableSearchMode.SERVER) {
                        serverSearch[id] = r[id] !== undefined ? r[id] : '';
                    }
                });

                this.dataSource.filter = JSON.stringify(localSearchFilter);

                if (Object.keys(serverSearch).length !== 0 && JSON.stringify(serverSearch) !== this.lastServerSearch) {
                    this.lastServerSearch = JSON.stringify(serverSearch);
                    this.searchCall.emit(serverSearch);
                }
            });
        }

        if (this.paginationSettings?.mode === 'local') {
            this.dataSource.paginator = this.paginator;
        }
    }

    paginationControl(pageEvent?: any): void {
        this._paginationObj.limit = pageEvent.pageSize;
        this._paginationObj.skip = pageEvent.pageIndex;
        this.paginationChange.emit(this._paginationObj);
    }

    isTemplateRef(obj: any): any {
        return obj instanceof TemplateRef;
    }

    createSearchFilter(): any {
        return (data: any, filter: string): boolean => {
            let result = true;
            const filterParsed = JSON.parse(filter);
            for (const key in filterParsed) {
                if (!data[key] || !filterParsed[key]) {
                    continue;
                }

                if (filterParsed[key].value === '' || filterParsed[key].value === null || filterParsed[key].value === undefined) {
                    continue;
                }

                if (filterParsed[key].type === 'date') {
                    const searchDate = new Date(filterParsed[key].value).toDateString();
                    const dataDate = new Date(data[key]).toDateString();
                    result = result && dataDate === searchDate;
                }

                if (filterParsed[key].type === 'string' || filterParsed[key].type === 'price') {
                    const dataToSearch = this.numberToEn(data[key]);
                    const filterValue = this.numberToEn(filterParsed[key].value);
                    result = result && dataToSearch.toString().toLowerCase().indexOf(filterValue) !== -1;
                }

                if (filterParsed[key].type === 'number') {
                    const dataToSearch = this.numberToEn(String(data[key]));
                    const filterValue = this.numberToEn(String(filterParsed[key].value));
                    result = result && dataToSearch === filterValue;
                }
            }
            return result;
        };
    }

    numberToEn(inputStr: string): string {
        return inputStr.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
    }

    doOperation(row: any, operationItem: any): void {
        if (!operationItem.operation) {
            return;
        }

        if (typeof operationItem.operation === 'string') {
            this.operationCall.emit({ row, operation: operationItem.operation });
        }

        if (typeof operationItem.operation === 'function') {
            operationItem.operation({ row, operationItem });
        }
    }

    doOperationHeader(operationItem: any): void {
        if (!operationItem.operation) {
            return;
        }

        if (typeof operationItem.operation === 'string') {
            this.operationCall.emit({ operationHeader: operationItem.operation });
        }

        if (typeof operationItem.operation === 'function') {
            operationItem.operation({ operationItem });
        }
    }

    openSaveMenu(): void {}

    openSearchBar(): void {
        this.showSearchBar = !this.showSearchBar;
    }

    selectRow(index: number): void {
        if (index < 0 || !this.data || index > this.data.length) {
            return;
        }

        this.data[index].tableSelect = !this.data[index].tableSelect;
    }

    onClick(row: any): void {
        if (!this.rowDetail || !this.rowDetail.click) {
            return;
        }

        if (this.clickCoolDown) {
            this.clickCount++;
            return;
        }

        this.clickCoolDown = true;
        this.clickCount = 1;
        setTimeout(() => {
            this.clickCoolDown = false;

            if (this.clickCount === 1) {
                this.rowDetail.click(row);
            } else {
                this.onDoubleClick(row);
            }

            this.clickCount = 0;
        }, 200);
    }

    onDoubleClick(row: any): void {
        if (!this.rowDetail || !this.rowDetail.doubleClick) {
            return;
        }

        this.rowDetail.doubleClick(row);
    }
}
