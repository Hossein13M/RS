import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OpRiskReportingService {
    private latestMappingSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {}

    getTops(isRisk: boolean) {
        return this.http.get<Array<{ items: Array<{ titleFA: string; treeNodeId: number; maxCount: string }>; name: string }>>(
            `/api/v1/opRiskReporting/Tops?isRisk=${isRisk}`
        );
    }

    getPieChart(id: number, isRisk: boolean, table: string) {
        return this.http.get<any>(`/api/v1/opRiskReporting/pieChart?id=${id}&isRisk=${isRisk}&table=${table}`);
    }

    getAxis(route: string) {
        return this.http.get<Array<{ titleFA: string; type: string }>>(`/api/v1/opRiskReporting/${route}`);
    }

    getBarChart(xAxis: string, yAxis: string, isRisk: boolean) {
        return this.http
            .get<any>(`/api/v1/opRiskReporting/barChart?xAxis=${xAxis}&yAxis=${yAxis}&isRisk=${isRisk}`)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }
}
