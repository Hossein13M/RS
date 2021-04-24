import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TradeBookHistoryService {
    constructor(private http: HttpClient) {}

    getIpsUpdateHistory(params: any): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/update-ips-history`, { params });
    }
}
