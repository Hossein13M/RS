import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IPSHistory {
    date: string;
    fundNationalCode: string;
    organizationType: string;
    symbol: string;
    ticker: string;
}

@Injectable()
export class IpsService {
    constructor(private http: HttpClient) {}

    public getIPSHistory(searchParams): Observable<{ items: Array<IPSHistory>; total: number }> {
        return this.http.get<{ items: Array<IPSHistory>; total: number }>(`/api/v1/portfolio-management-service/update-ips-history`, {
            params: searchParams,
        });
    }
}
