import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class FundRoleService {
    constructor(private http: HttpClient) {}

    getFundRoles(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/fund-role', { params });
    }

    deleteFundRole(id): Observable<any> {
        return this.http.delete('/api/v1/fund-role/' + id);
    }

    updateFundRole(model): Observable<any> {
        return this.http.put('/api/v1/fund-role', model);
    }

    createFundRole(model): Observable<any> {
        return this.http.post('/api/v1/fund-role', model);
    }
}
