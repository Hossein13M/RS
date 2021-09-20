import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { Color, Column, DetailColumn, OperationColumn, PaginationChangeType, PaginationSetting, TableSearchMode } from './table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import { StateType } from '#shared/state-type.enum';
import { FuseConfigService } from '../../../../@fuse/services/config.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [fuseAnimations],
})
export class TableComponent implements OnChanges, AfterViewInit {
    @ViewChild('localPaginator', { static: false }) localPaginator: MatPaginator;
    @ViewChild('container', { static: false }) tableContainer;
    @Input() data: Array<any>;
    @Input() columns: Array<Column>;
    @Input() height: string = '100%';
    @Input() status: StateType;
    @Input() paginationSettings: PaginationSetting;
    @Input() paginationObject: PaginationChangeType;
    @Output() paginationEvent: EventEmitter<PaginationChangeType>;
    @Output() searchEvent: EventEmitter<any>;
    @Output() operationEvent: EventEmitter<any>;
    hasSearch = false;
    displayedColumns: Array<string>;
    searchColumns: Array<string>;
    dataSource: MatTableDataSource<any>;
    lastServerSearch: string;
    showSearchBar = false;
    searchForm: FormGroup;
    rowDetail: DetailColumn;
    clickCoolDown = false;
    clickCount = 0;
    doubleClickAble = true;
    public isDarkMode: boolean = false;

    constructor(private formBuilder: FormBuilder, private fuseConfigService: FuseConfigService) {
        this.searchEvent = new EventEmitter<any>();
        this.operationEvent = new EventEmitter<any>();
        this.paginationEvent = new EventEmitter<PaginationChangeType>();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.fuseConfigService.getConfig().subscribe((res) => (this.isDarkMode = res.colorTheme === 'theme-blue-gray-dark'));

        let data = this.data;
        if (changes.hasOwnProperty('data')) {
            data = changes.data.currentValue;
        }

        if (!data || !this.columns || data.length === 0 || !Array.isArray(data)) {
            return;
        }

        const rowDetailIndex: number = this.columns.findIndex((col) => col.type === 'rowDetail' || col.id === 'rowDetail');
        if (rowDetailIndex !== -1) {
            this.rowDetail = this.columns[rowDetailIndex] as DetailColumn;
            this.doubleClickAble = !!this.rowDetail.doubleClickable;
            this.columns.splice(rowDetailIndex, 1);
        }

        const formItems = {};
        this.columns.forEach((col) => {
            if (col.search) {
                this.hasSearch = true;
                if (col.search.type === 'date_range') {
                    formItems[col.id] = this.formBuilder.group({
                        fromDate: [],
                        toDate: [],
                    });
                    return;
                }
                formItems[col.id] = [''];
            }
        });
        this.searchForm = this.formBuilder.group(formItems);

        this.displayedColumns = [];
        this.displayedColumns = this.displayedColumns.concat(this.columns.map((r) => r.id));

        if (this.hasSearch) {
            this.searchColumns = this.displayedColumns.map((el) => el + '_search');
        }

        const tableOperation = this.columns.find((element) => element.type === 'operation') as OperationColumn;
        if (tableOperation && tableOperation?.operations) {
            data?.forEach((element) => (element.tableOperation = [...tableOperation.operations.map((el: any) => ({ ...el }))]));
        }

        data?.forEach((el) => (el.tableSelect = false));
        this.patchData(this.data);

        this.handleSetLastSearch();
    }

    ngAfterViewInit(): void {
        if (this.paginationSettings?.mode === 'local' && this.data && this.columns && this.dataSource) {
            this.dataSource.paginator = this.localPaginator;
        }
    }

    public scroll(): void {
        if (this.paginationSettings.mode !== 'scroll') return;
        if (this.status === StateType.LOADING) return;
        const scrollPosition =
            this.tableContainer?.nativeElement.scrollHeight - (this.tableContainer?.nativeElement.scrollTop + this.tableContainer?.nativeElement.clientHeight);
        if (scrollPosition < 90) {
            this.paginationControl({
                length: 0,
                pageSize: this.paginationObject.limit,
                pageIndex: this.paginationObject.skip + this.paginationObject.limit,
            });
        }
    }

    public paginationControl(pageEvent?: PageEvent): void {
        const _paginationObject: PaginationModel = { skip: 0, limit: 5, total: 100 };
        _paginationObject.limit = pageEvent.pageSize;
        _paginationObject.skip = pageEvent.pageIndex;
        this.paginationEvent.emit(_paginationObject);
    }

    public isTemplateRef(obj: any): any {
        return obj instanceof TemplateRef;
    }

    public doOperation(row: any, operationItem: any): void {
        if (!operationItem.operation) {
            return;
        }

        if (typeof operationItem.operation === 'string') {
            this.operationEvent.emit({ row, operation: operationItem.operation });
        }

        if (typeof operationItem.operation === 'function') {
            operationItem.operation({ row, operationItem });
        }
    }

    public doOperationHeader(operationItem: any): void {
        if (!operationItem.operation) {
            return;
        }

        if (typeof operationItem.operation === 'string') {
            this.operationEvent.emit({ operationHeader: operationItem.operation });
        }

        if (typeof operationItem.operation === 'function') {
            operationItem.operation({ operationItem });
        }
    }

    public openSearchBar(): void {
        this.showSearchBar = !this.showSearchBar;
    }

    public selectRow(index: number): void {
        if (index < 0 || !this.data || index > this.data.length) {
            return;
        }
        if (!this.data[index]) return;
        this.data[index].tableSelect = !this.data[index].tableSelect;
    }

    public onClick(row: any): void {
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

    public checkColorsType(input: Color | ((row: any) => Color), row: any): Color {
        if (typeof input === 'string') {
            return input;
        } else {
            return input(row);
        }
    }

    public setIndexAccordingToPagination(index: number): number | null {
        if (!this.localPaginator) return null;
        if (this.paginationSettings.mode === 'local') {
            return index + 1 + this.localPaginator.pageIndex * this.localPaginator.pageSize;
        }
        if (this.paginationSettings.mode === 'backend') {
            return index + 1 + this.paginationObject.limit * this.paginationObject.skip;
        }
        return null;
    }

    private handleSetLastSearch(): void {
        try {
            this.searchForm.patchValue(JSON.parse(this.lastServerSearch));
        } catch (e) {
            return;
        }
    }

    private patchData(data: Array<any>): void {
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
                    this.searchEvent.emit(serverSearch);
                }
            });
        }

        if (this.paginationSettings?.mode === 'local') {
            this.dataSource.paginator = this.localPaginator;
        }
    }

    private createSearchFilter(): any {
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

    private numberToEn(inputStr: string): string {
        return inputStr.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
    }

    private onDoubleClick(row: any): void {
        if (!this.rowDetail || !this.rowDetail.doubleClick) {
            return;
        }

        this.rowDetail.doubleClick(row);
    }
}
