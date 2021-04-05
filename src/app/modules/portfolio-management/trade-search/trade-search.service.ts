import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TradeSearchService {
    constructor(private http: HttpClient) {}

    getOrganizations(paginationInfo: any = { skip: 0, limit: 10 }) {
        return this.http.get<any>(`/api/v1/portfolio-management-service/organizations`, { params: paginationInfo });
    }

    searchTrade(paginationInfo: any, searchParams: any) {
        let params = this.prepareParams(searchParams);
        return this.http.get<any>(
            `/api/v1/portfolio-management-service/search-trade-data?skip=${paginationInfo.skip}&limit=${paginationInfo.limit}`,
            {
                params: params,
            }
        );
    }

    private prepareParams(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) {
                searchParams[key].forEach((element) => (params = params.append(key, element)));
            } else if (searchParams[key] !== '') params = params.append(key, searchParams[key]);
        });
        return params;
    }
}
