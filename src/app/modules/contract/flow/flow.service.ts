import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { Flow } from './flow.model';

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    constructor(private http: HttpClient) {}

    public getFlows(searchParams: any): Observable<ResponseWithPagination<Flow>> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<Flow>>(`/api/v2/flow`, { params });
    }

    public getSingleFlowDetails(searchParams: { organization: number; id: string }): Observable<Flow> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<Flow>(`/api/v2/flow`, { params });
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
}
