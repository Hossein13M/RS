import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeBookService {
    constructor(private http: HttpClient) {}

    public getTradeDataByDate(searchParams): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/trade-data`, { params: searchParams });
    }

    public getTradingBooks(date: string): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/trading-book`, { params: { date } });
    }
}
