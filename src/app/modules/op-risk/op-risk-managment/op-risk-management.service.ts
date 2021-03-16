import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, Specification, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OpRiskManagementService extends Specification {
    private static TreeServiceAPI = '/api/v1/operation-risk';

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

    constructor(private acs: ApiClientService, private http: HttpClient) {
        super();
    }

    getTrees(name: string, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/tree?name=${name}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getParentRisk(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/parent-risks` + this.generateSpecificationString(), fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    createOpRisk(data, fc?: FormContainer): Observable<any> {
        return this.acs.post(OpRiskManagementService.TreeServiceAPI, data, fc).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskHistory(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/work-flow/history` + this.generateSpecificationString(), fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskDetail(opId: number, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/details?opRiskId=${opId}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getActiveOpRisk(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/work-flow/active`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    acceptOpRisk(data, fc?: FormContainer): Observable<any> {
        return this.acs
            .post(OpRiskManagementService.TreeServiceAPI + '/history/accept', data, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    rejectOpRisk(data, fc?: FormContainer): Observable<any> {
        return this.acs
            .post(OpRiskManagementService.TreeServiceAPI + `/history/reject`, data, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOpRiskSteps(opId: number, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpRiskManagementService.TreeServiceAPI + `/history/${opId}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    updateOpRisk(data, fc?: FormContainer): Observable<any> {
        return this.acs.put(OpRiskManagementService.TreeServiceAPI, fc, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    // http implementation

    getCategories(): Observable<any> {
        return this.http.get<Array<{ icon: string; id: number; titleEN: string; titleFA: string }>>(`/api/v1/operation-risk/tree/categories`);
    }

    getSubmittedRiskAndLoss(params): Observable<any> {
        return this.http.get('/api/v1/operation-risk/work-flow/finals', { params });
    }
}
