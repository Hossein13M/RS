import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { $IssuerLicenseService } from './issuer-license.service';
import { IssuerLicense } from './issuer-license.model';
import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'issuer-license',
    templateUrl: './issuer-license.component.html',
    styleUrls: ['./issuer-license.component.scss'],
    animations: fuseAnimations,
})
export class IssuerLicenseComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<IssuerLicense> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;

    constructor(private _issuerLicenseService: $IssuerLicenseService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'مجوز سازمان',
                id: 'name',
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
                        operation: () => {},
                        // operation: ({ row }: any) => this.update(row),
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: () => {},
                        // operation: ({ row }: any) => this.delete(row),
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

    paginationControl(pageEvent?: PaginationChangeType): void {
        console.log(pageEvent);
        if (this.status === StateType.LOADING) {
            return;
        }
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.status = StateType.LOADING;
        this._issuerLicenseService.getIssuerLicense(this.pagination, search).pipe(debounceTime(500), distinctUntilChanged()).subscribe(
            (response) => {
                this.data = [...this.data, ...response.items];
                this.pagination.limit = response.limit;
                this.pagination.total = response.total;
                this.status = StateType.PRESENT;
            },
            () => {
                this.status = StateType.FAILED;
            }
        );
    }

    // ngOnInit(): void {
    //     this.issuerLicenceService.issuerLicenseList.subscribe((res) => {
    //         this.issuerList = res;
    //         this.ELEMENT_DATA = res;
    //         this.dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
    //     });
    //
    //     this.issuerLicenceService.getIssuers(this.searchInput.value).subscribe(() => {});
    //
    //     this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
    //         this.issuerLicenceService.getIssuers(searchText).subscribe(() => {});
    //     });
    // }
    //
    // ngAfterViewInit(): void {
    //     document.getElementById('issuerLicence').addEventListener('scroll', this.scroll.bind(this), true);
    // }
    //
    // scroll(): void {
    //     const table = document.getElementById('issuerLicence');
    //     const scrollPosition = table.scrollHeight - (table.scrollTop + table.clientHeight);
    //
    //     if (!this.loading) {
    //         if (scrollPosition < 80) {
    //             if (this.issuerLicenceService.skip <= this.issuerLicenceService.total) {
    //                 this.loading = true;
    //                 this.issuerLicenceService.getIssuers(this.searchInput.value).subscribe(() => {
    //                     this.loading = false;
    //                 });
    //             }
    //         }
    //     } else {
    //         return;
    //     }
    // }
    //
    // addIssuer(): void {
    //     this.issuerLicenceService.addIssuer(this.issuerName.value).subscribe(() => {});
    //     this.issuerName.reset();
    // }
    //
    // editIssuer(issuer): void {
    //     this.slectedIssuer = issuer.id;
    //     this.issuerName.setValue(issuer.name);
    // }
    //
    // clear(): void {
    //     this.slectedIssuer = 0;
    //     this.issuerName.setValue('');
    // }
    //
    // edit(): void {
    //     this.issuerLicenceService.editIssuer(this.slectedIssuer, this.issuerName.value).subscribe((res) => {});
    // }
    //
    // remove(issuer): void {
    //     this.issuerLicenceService.deleteIssuer(issuer.id).subscribe(() => {});
    // }
}
