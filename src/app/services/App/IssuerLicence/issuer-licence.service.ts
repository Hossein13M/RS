import { Injectable } from '@angular/core';
import { IssuerDto } from 'app/services/API/models';
import { IssueLicenseService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { IssuerLicense } from '../../../modules/system-settings/issuer-license/issuer-license.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class IssuerLicenceService {
    issuerLicenseList: BehaviorSubject<Array<IssuerDto>> = new BehaviorSubject([]);

    /*
     ** start intial paging
     */
    skip: number = 0;
    limit: number = 15;
    total: number = this.limit + 1;

    searchKeyword: string = '';

    /*
     **  end inital paging
     */

    constructor(private issuerLicenseService: IssueLicenseService, private http: HttpClient) {}

    getIssuerLicenses(searchKeyword?: string): Observable<Array<IssuerDto>> {
        let param = {
            searchKeyword: searchKeyword,
        };

        return this.issuerLicenseService.issueLicenseControllerGetIssueLicenses(param).pipe(
            map((res) => {
                return res.items;
            })
        );
    }

    getIssuers(searchKeyword?: string): Observable<any> {
        let param = {};
        if (this.searchKeyword == searchKeyword) {
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
            if (this.skip >= this.total) {
                return;
            }
        } else {
            this.clearSavedData();
            this.searchKeyword = searchKeyword;
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
        }

        return this.issuerLicenseService.issueLicenseControllerGetIssueLicenses(param).pipe(
            map(
                (res) => {
                    // update the oprators list
                    const issuerLicenseList = this.issuerLicenseList.getValue();
                    for (const issuerLicense of res.items) {
                        issuerLicenseList.push(issuerLicense);
                    }
                    this.issuerLicenseList.next(issuerLicenseList);
                    this.total = res.total;
                    this.skip += this.limit;
                    return res;
                },
                (error) => {
                    return error;
                }
            )
        );
    }

    clearSavedData() {
        this.skip = 0;
        this.issuerLicenseList.next([]);
    }

    addIssuer(name: string): Observable<void> {
        const param = {
            body: {
                name: name,
            },
        };

        return this.issuerLicenseService.issueLicenseControllerCreateIssueLicense(param).pipe(
            map((res) => {
                // update the oprators list
                let issuerLicenseList = this.issuerLicenseList.getValue();
                issuerLicenseList.push(res);
                this.issuerLicenseList.next(issuerLicenseList);
            })
        );
    }

    editIssuer(id: number, name: string): Observable<void> {
        const param = {
            body: {
                name: name,
                id: id,
            },
        };
        return this.issuerLicenseService.issueLicenseControllerUpdateIssueLicense(param).pipe(
            map((res) => {
                // update the operators list
                let issuerLicenseList = this.issuerLicenseList.getValue();
                let editedIssuer = issuerLicenseList.find((issuerLicense) => issuerLicense.id == id);
                editedIssuer.name = name;

                this.issuerLicenseList.next(issuerLicenseList);
            })
        );
    }

    deleteIssuer(id: number): Observable<void> {
        let param = {
            issueLicenseId: id,
        };

        return this.issuerLicenseService.issueLicenseControllerDeleteIssueLicense(param).pipe(
            map((res) => {
                let issuerLicenseList = this.issuerLicenseList.getValue();
                const deleteThisItem = issuerLicenseList.find((issuerLicense) => issuerLicense.id == id);
                const index = issuerLicenseList.indexOf(deleteThisItem);
                if (index > -1) {
                    issuerLicenseList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.issuerLicenseList.next(issuerLicenseList);
            })
        );
    }

    public getIssuerLicense(paginationParams?, searchParams?): Observable<ResponseWithPagination<IssuerLicense>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<IssuerLicense>>('/api/v1/issue-license', {params});
    }
}
