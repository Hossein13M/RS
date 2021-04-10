import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OpRiskReportingService {
    constructor(private http: HttpClient) {}

    public getTops(isRisk: boolean) {
        return this.http.get<Array<{ items: Array<{ titleFA: string; treeNodeId: number; maxCount: string }>; name: string }>>(
            `/api/v1/opRiskReporting/Tops?isRisk=${isRisk}`
        );
    }

    public getPieChart(id: number, isRisk: boolean, table: string) {
        return this.http.get<any>(`/api/v1/opRiskReporting/pieChart?id=${id}&isRisk=${isRisk}&table=${table}`);
    }

    public getAxis(route: string) {
        return this.http.get<Array<{ titleFA: string; type: string }>>(`/api/v1/opRiskReporting/${route}`);
    }

    public getBarChart(xAxis: string, yAxis: string, isRisk: boolean) {
        return this.http.get<any>(`/api/v1/opRiskReporting/barChart?xAxis=${xAxis}&yAxis=${yAxis}&isRisk=${isRisk}`);
    }
}
