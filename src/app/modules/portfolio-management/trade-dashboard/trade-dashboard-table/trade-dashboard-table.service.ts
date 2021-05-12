import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeDashboardTableService {
    constructor(private http: HttpClient) {}

    public getTradeDashboardTable(date: string) {
        return this.http.get(`/api/v1/portfolio-management-service/categorized-assets/`, { params: { date } });
    }
}
