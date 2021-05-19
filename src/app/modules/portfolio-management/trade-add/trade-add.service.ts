import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ticker, TradeOrganization } from './trade-add.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable()
export class TradeAddService {
    constructor(private http: HttpClient) {}

    public getOrganizations(): Observable<Array<{ organizationName: string; organizationType: string }>> {
        return this.http.get<any>(`/api/v1/portfolio-management-service/organizations`);
    }

    public getTickersByKeyword(searchKeyword: string): Observable<{ items: Array<Ticker>; limit: number | string; skip: number | string }> {
        return this.http.get<any>(`/api/v1/bourse-instrument-detail/bonds`, { params: { searchKeyword } });
    }

    public getTradeRegistration(paginationParams): Observable<{ items: Array<TradeOrganization>; limit: number; skip: number; total: number }> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(paginationParams);
        return this.http.get<any>(`/api/v1/trade-registration`, { params });
    }

    public deleteTradeRegistration(tradeRegistrationId: number | string): Observable<any> {
        return this.http.delete(`/api/v1/trade-registration/${tradeRegistrationId}`);
    }

    public createTradeRegistration(tradeRegistrationInfo): Observable<any> {
        return this.http.post(`/api/v1/trade-registration`, tradeRegistrationInfo);
    }

    public updateTradeRegistration(tradeRegistrationInfo): Observable<any> {
        return this.http.put(`/api/v1/trade-registration`, tradeRegistrationInfo);
    }
}
