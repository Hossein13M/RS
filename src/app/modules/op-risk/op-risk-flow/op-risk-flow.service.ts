import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, Specification, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OpRiskFlowService {
    private static TreeMappingServiceAPI = '/api/v1/operation-risk/flow';

    constructor(private http: HttpClient) {}

    public pageEvent: PageEvent = {
        currentIndex: 0,
        pageSize: 10,
    };
    public specificationModel: SpecificationModel = {
        limit: 10,
        skip: 0,
        searchKeyword: {},
    };

    private latestMappingSubject = new BehaviorSubject<any>(null);
    public _latestMapping = this.latestMappingSubject.asObservable();

    get latestMapping(): any {
        return this.latestMappingSubject.getValue();
    }

    getOpFlows(): Observable<any> {
        let pagingParam = '';
        if (this.specificationModel.skip !== undefined && this.specificationModel.limit !== undefined) {
            pagingParam = '?skip=' + this.specificationModel.skip + '&limit=' + this.specificationModel.limit;
        }
        return this.http.get(OpRiskFlowService.TreeMappingServiceAPI + pagingParam).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpFlow(id): Observable<any> {
        return this.http.get(OpRiskFlowService.TreeMappingServiceAPI + `/${id}`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    createOpFlow(data): Observable<any> {
        return this.http.post(OpRiskFlowService.TreeMappingServiceAPI, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    updateOpFlow(data): Observable<any> {
        return this.http.put(OpRiskFlowService.TreeMappingServiceAPI, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    inActiveOpFlow(flowId): Observable<any> {
        return this.http
            .put(OpRiskFlowService.TreeMappingServiceAPI + `/inactive/${flowId}`, {})
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getFlowUsers(): Observable<any> {
        return this.http.get(OpRiskFlowService.TreeMappingServiceAPI + `/user`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    // from here, we implement API calls this way:

    getOPRiskFlow(pagination: any): Observable<any> {
        return this.http.get<any>(`/api/v1/operation-risk/flow?skip=${pagination.skip * pagination.limit}&limit=${pagination.limit}`);
    }

    toggleOpFlowStatus(flowId: number | string): Observable<any> {
        return this.http.put<any>(`/api/v1/operation-risk/flow/inactive/${flowId}`, {});
    }
}
