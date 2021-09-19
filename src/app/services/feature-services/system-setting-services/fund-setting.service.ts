import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class FundSettingService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get('/api/v1/fund');
    }

    get(searchParams?: any): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...searchParams });
        return this.http.get('/api/v1/fund', { params });
    }

    create(model): Observable<any> {
        return this.http.post('/api/v1/fund', model);
    }

    delete(id): Observable<any> {
        const api = '/api/v1/fund' + '/' + id;
        return this.http.delete(api);
    }

    update(model): Observable<any> {
        return this.http.put('/api/v1/fund', model);
    }
}
