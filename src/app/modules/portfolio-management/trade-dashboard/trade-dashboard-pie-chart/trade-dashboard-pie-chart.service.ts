import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeDashboardPieChartService {
    constructor(private http: HttpClient) {}

    public getTradeDashboardPieChart(date: string): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/tamadon-market-pie-chart`, { params: { date } });
    }
}
