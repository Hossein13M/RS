import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { DuplicateFlow, Flow } from './contract-flow.model';

@Injectable({
    providedIn: 'root',
})
export class ContractFlowService {
    constructor(private http: HttpClient) {}

    public getFlows(searchParams: any): Observable<ResponseWithPagination<Flow>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<Flow>>(`/api/v2/flow`, { params });
    }

    public getSingleFlowDetails(searchParams: { organization: number; id: string }): Observable<ResponseWithPagination<Flow>> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<Flow>>(`/api/v2/flow`, { params });
    }

    public changeFlowStatus(flowId: string): Observable<void> {
        return this.http.put<void>(`/api/v2/flow/inactive/${flowId}`, {});
    }

    public addNewFlow(flowInfo): Observable<Flow> {
        return this.http.post<Flow>(`/api/v2/flow`, flowInfo);
    }

    public editFlow(flowInfo): Observable<Flow> {
        return this.http.put<Flow>(`/api/v2/flow`, flowInfo);
    }

    public saveBpmnConfiguration(flowInformation): Observable<Flow> {
        return this.http.put<Flow>(`/api/v2/flow`, flowInformation);
    }

    public duplicateFlow(duplicateFlow: DuplicateFlow): Observable<Flow> {
        return this.http.post<Flow>('/api/v2/flow/duplicate', duplicateFlow);
    }
}
