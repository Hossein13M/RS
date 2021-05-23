import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class OpRiskManagementService {
    private static TreeServiceAPI = '/api/v1/operation-risk';

    constructor(private http: HttpClient) {}

    public pageEvent: PageEvent = { currentIndex: 0, pageSize: 10 };

    public specificationModel: SpecificationModel = { limit: 10, skip: 0, searchKeyword: {} };
    private latestMappingSubject = new BehaviorSubject<any>(null);

    public convertDate(date: Date): string {
        return formatDate(date, 'yyyy-MM-dd', 'en_US');
    }

    getTrees(name: string): Observable<any> {
        return this.http.get(OpRiskManagementService.TreeServiceAPI + `/tree?name=${name}`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getParentRisk(): Observable<any> {
        return this.http.get(OpRiskManagementService.TreeServiceAPI + `/parent-risks`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    createOpRisk(data): Observable<any> {
        return this.http.post(OpRiskManagementService.TreeServiceAPI, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskHistory(): Observable<any> {
        return this.http.get(OpRiskManagementService.TreeServiceAPI + `/work-flow/history`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskDetail(opId: number): Observable<any> {
        return this.http
            .get(OpRiskManagementService.TreeServiceAPI + `/details?opRiskId=${opId}`)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getActiveOpRisk(): Observable<any> {
        return this.http.get(OpRiskManagementService.TreeServiceAPI + `/work-flow/active`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    acceptOpRisk(data): Observable<any> {
        return this.http.post(OpRiskManagementService.TreeServiceAPI + '/history/accept', data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    rejectOpRisk(data): Observable<any> {
        return this.http.post(OpRiskManagementService.TreeServiceAPI + `/history/reject`, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskSteps(opId: number): Observable<any> {
        return this.http.get(OpRiskManagementService.TreeServiceAPI + `/history/${opId}`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    updateOpRisk(data): Observable<any> {
        return this.http.put(OpRiskManagementService.TreeServiceAPI, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    public getActiveOPRiskWorkFlows(): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/work-flow/active`);
    }

    public getOPRiskWorkFlowHistory(skip: number | string, limit: number | string): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/work-flow/history?skip=${skip}&limit=${limit}`);
    }

    public getCategories(): Observable<any> {
        return this.http.get<Array<{ icon: string; id: number; titleEN: string; titleFA: string }>>(`/api/v1/operation-risk/tree/categories`);
    }

    public getSubmittedRiskAndLoss(params): Observable<any> {
        return this.http.get('/api/v1/operation-risk/work-flow/finals', { params });
    }
}
