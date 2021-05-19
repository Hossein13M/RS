import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class BankService {
    constructor(private http: HttpClient) {}

    getBankSettings(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/bank', { params });
    }

    createBankSetting(model): Observable<any> {
        return this.http.post('/api/v1/bank', model);
    }

    deleteBankSetting(id): Observable<any> {
        return this.http.delete('/api/v1/bank/' + id);
    }

    updateBankSetting(model): Observable<any> {
        return this.http.put('/api/v1/bank', model);
    }
}
