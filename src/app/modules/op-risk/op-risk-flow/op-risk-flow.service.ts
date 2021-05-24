import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({ providedIn: 'root' })
export class OpRiskFlowService {
    constructor(private http: HttpClient) {}

    public getOpFlows(paginationParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams });
        return this.http.get(`/api/v1/operation-risk/flow`, { params });
    }

    public getOpFlow(id): Observable<any> {
        return this.http.get(`/api/v1/operation-risk/flow` + `/${id}`);
    }

    public createOpFlow(data): Observable<any> {
        return this.http.post(`/api/v1/operation-risk/flow`, data);
    }

    public updateOpFlow(data): Observable<any> {
        return this.http.put(`/api/v1/operation-risk/flow`, data);
    }

    public inActiveOpFlow(flowId): Observable<any> {
        return this.http.put(`/api/v1/operation-risk/flow` + `/inactive/${flowId}`, {});
    }

    public getFlowsAssignedToUser(): Observable<Array<{ flowId: number; name: string }>> {
        return this.http.get<Array<{ flowId: number; name: string }>>(`/api/v1/operation-risk/flow/user`);
    }

    public getOPRiskFlow(pagination: any): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/flow?skip=${pagination.skip * pagination.limit}&limit=${pagination.limit}`);
    }

    public toggleOpFlowStatus(flowId: number | string): Observable<any> {
        return this.http.put<any>(`/api/v1/operation-risk/flow/inactive/${flowId}`, {});
    }

    public createOPRiskFlow(data: any): Observable<any> {
        return this.http.post<any>(`/api/v1/operation-risk/flow`, data);
    }

    public updateOPRiskFlow(data: any): Observable<any> {
        return this.http.put<any>(`/api/v1/operation-risk/flow`, data);
    }
}
