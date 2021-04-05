import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeBookHistoryService {
    private static TradeBookHistoryAPI = '/api/v1/portfolio-management-service/update-ips-history';

    constructor(private http: HttpClient) {}

    show(params: any): Observable<any> {
        return this.http.get(TradeBookHistoryService.TradeBookHistoryAPI, { params });
    }
}
