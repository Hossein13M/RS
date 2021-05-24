import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({ providedIn: 'root' })
export class TradeSearchService {
    constructor(private http: HttpClient) {}

    public getOrganizations(paginationInfo: any = { skip: 0, limit: 10 }): Observable<any> {
        return this.http.get<any>(`/api/v1/portfolio-management-service/organizations`, { params: paginationInfo });
    }

    public searchTrade(paginationInfo: any, searchParams: any): Observable<any> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<any>(`/api/v1/portfolio-management-service/search-trade-data?skip=${paginationInfo.skip}&limit=${paginationInfo.limit}`, {
            params,
        });
    }

    public getBourseInstrumentDetailControllerBondsList(searchKeyword: string): Observable<any> {
        return this.http.get<any>(`/api/v1/bourse-instrument-detail/bonds`, { params: { searchKeyword } });
    }
}
