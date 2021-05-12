import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TradeDashboardTrendChartService {
    constructor(private http: HttpClient) {}

    public getTradeTrendChart(date: string): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/tamadon-market-trend-chart`, { params: { date } });
    }
}
