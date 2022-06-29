import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class BranchSettingService {
    constructor(private http: HttpClient) {}

    getBankBranch(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/bank-branch', { params });
    }

    post(model): Observable<any> {
        return this.http.post('/api/v1/bank-branch', model);
    }

    put(model): Observable<any> {
        return this.http.put('/api/v1/bank-branch', model);
    }

    public delete(id): Observable<any> {
        return this.http.delete('/api/v1/bank-branch/' + id);
    }
}
