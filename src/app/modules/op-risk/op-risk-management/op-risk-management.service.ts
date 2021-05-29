import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationRiskDetails, RiskStepInfo } from './op-risk-model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({ providedIn: 'root' })
export class OpRiskManagementService {
    constructor(private http: HttpClient) {}

    public getTrees(name: string): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/tree?name=${name}`);
    }

    public getParentRisk(searchParams): Observable<Array<{ id: number; title: string }>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<Array<{ id: number; title: string }>>(`/api/v1/operation-risk/parent-risks`, { params });
    }

    public createOpRisk(data): Observable<any> {
        return this.http.post(`/api/v1/operation-risk`, data);
    }

    public getOpRiskHistory(): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/work-flow/history`);
    }

    public getOpRiskDetail(opId: number): Observable<OperationRiskDetails> {
        return this.http.get<OperationRiskDetails>(`/api/v1/operation-risk/details?opRiskId=${opId}`);
    }

    // public getActiveOpRisk(): Observable<any> {
    //     return this.http.get<any>(`/api/v1/operation-risk/work-flow/active`);
    // }

    public acceptOpRisk(data): Observable<any> {
        return this.http.post(`/api/v1/operation-risk` + '/history/accept', data);
    }

    public rejectOpRisk(data): Observable<any> {
        return this.http.post(`/api/v1/operation-risk/history/reject`, data);
    }

    public getOpRiskSteps(opId: number): Observable<Array<RiskStepInfo>> {
        return this.http.get<Array<RiskStepInfo>>(`/api/v1/operation-risk/history/${opId}`);
    }

    public updateOpRisk(data): Observable<any> {
        return this.http.put(`/api/v1/operation-risk`, data);
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
        return this.http.get<any>('/api/v1/operation-risk/work-flow/finals', { params });
    }
}
