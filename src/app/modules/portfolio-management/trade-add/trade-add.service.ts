import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ticker, TradeOrganization } from './trade-add.model';

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
        const params: HttpParams = this.prepareParamsForObjects(paginationParams);
        return this.http.get<any>(`/api/v1/trade-registration`, { params });
    }

    public deleteTradeRegistration(tradeRegistrationId: number | string) {
        return this.http.delete(`/api/v1/trade-registration/${tradeRegistrationId}`);
    }

    public createTradeRegistration(tradeRegistrationInfo) {
        return this.http.post(`/api/v1/trade-registration`, tradeRegistrationInfo);
    }

    public updateTradeRegistration(tradeRegistrationInfo) {
        return this.http.put(`/api/v1/trade-registration`, tradeRegistrationInfo);
    }

    // *** the following method has been implemented to create the query params we need to append to our requests
    private prepareParamsForObjects(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) {
                searchParams[key].forEach((element) => (params = params.append(key, element)));
            } else if (searchParams[key] !== '') {
                params = params.append(key, searchParams[key]);
            }
        });
        return params;
    }
}
