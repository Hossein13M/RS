import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DailyInvestmentReportService {
    private static DailyInvestmentReportAPI = '/api/v1/portfolio-management-service/daily-investment-report';

    constructor(private http: HttpClient) {}

    getDailyInvestmentReport(inputDate: Date, pagination: any): Observable<any> {
        const date = formatDate(new Date(inputDate), 'yyyy-MM-dd', 'en_US');
        return this.http.get(DailyInvestmentReportService.DailyInvestmentReportAPI, { params: { ...pagination, date } });
    }
}
