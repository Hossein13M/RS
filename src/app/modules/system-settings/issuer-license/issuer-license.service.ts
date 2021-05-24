import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Observable } from 'rxjs';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { IssuerLicense } from './issuer-license.model';

@Injectable()
export class $IssuerLicenseService {
    constructor(private http: HttpClient) {}

    public getIssuerLicense(paginationParams?, searchParams?): Observable<ResponseWithPagination<IssuerLicense>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<IssuerLicense>>('/api/v1/issue-license', {params});
    }
}
