import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class DepositSettingService {
    constructor(private http: HttpClient) {}

    getDepositSettings(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/deposit', { params });
    }

    createDepositSetting(model): Observable<any> {
        return this.http.post('/api/v1/deposit', model);
    }

    updateDepositSetting(model): Observable<any> {
        return this.http.put('/api/v1/deposit', model);
    }

    deleteDepositSetting(id): Observable<any> {
        return this.http.delete('/api/v1/deposit/' + id);
    }
}
