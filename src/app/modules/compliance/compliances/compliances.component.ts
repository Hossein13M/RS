import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ComplianceModel } from 'app/services/API/models';
import { CompliancesService } from 'app/modules/compliance/compliances.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComplianceFundComponent } from '../compliance-fund/compliance-fund.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';
import { BankSettingAddComponent } from '../../system-settings/bank-setting-components/bank-setting-add/bank-setting-add.component';
import { ConfirmDialogComponent } from '#shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-conmpliances',
    templateUrl: './compliances.component.html',
    styleUrls: ['./compliances.component.scss'],
    animations: fuseAnimations,
})
export class CompliancesComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<ComplianceModel> = [];
    column: Array<ColumnModel>;
    pagination: PaginationModel = { skip: 0, limit: 5, total: 100 };
    dialogRef: MatDialogRef<any>;

    constructor(private compliancesService: CompliancesService, private formBuilder: FormBuilder, private _matDialog: MatDialog) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'کد',
                id: 'code',
                type: 'number',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
                },
            },
            {
                name: 'نام',
                id: 'title',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
                },
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
                        icon: 'create',
                        color: 'accent',
                        operation: ({ row }: any) => this.update(row),
                    },
                    {
                        name: 'صندوق',
                        icon: 'add',
                        color: 'warn',
                        operation: ({ row }: any) => this.addComplianceFund(row),
                    },
                ],
            },
        ];
    }

    initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.column, 'id'));
        const objectFromKeys = {};
        mapKeys.forEach((id) => {
            objectFromKeys[id] = '';
        });
        this.searchFormGroup = this.formBuilder.group({
            ...objectFromKeys,
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }
        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });
        this.get(this.searchFormGroup.value);
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.compliancesService.getCompliances(this.pagination, search).subscribe((response) => {
            this.data = [...response.items];
            this.pagination.limit = response.limit;
            this.pagination.total = response.total;
        });
    }

    // TODO: MAKE CREATE AND UPDATE DIALOG

    create(): void {
        this._matDialog
            .open(BankSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: null,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    update(row): void {
        this._matDialog
            .open(BankSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    row.name = res.name;
                }
            });
    }

    addComplianceFund(compliance): void {
        this.dialogRef = this._matDialog.open(ComplianceFundComponent, {
            panelClass: 'compliance-form-dialog',
            data: {
                compliance: compliance,
            },
        });
    }
}
