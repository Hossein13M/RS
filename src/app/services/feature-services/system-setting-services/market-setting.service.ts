import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class MarketSettingService {
    constructor(private http: HttpClient) {}

    getAllMarkets(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/market', { params });
    }

    deleteMarket(id: string): Observable<any> {
        return this.http.delete('/api/v1/market/' + id);
    }

    updateMarket(model): Observable<any> {
        return this.http.put('/api/v1/market', model);
    }

    createMarket(model): Observable<any> {
        return this.http.post('/api/v1/market', model);
    }
}
