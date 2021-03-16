import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, Specification, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OpLossManagementService extends Specification {
    private static OpLoseServiceApi = '/api/v1/operation-lose';

    lastLossStep1Data: any;

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

    get latestMapping() {
        return this.latestMappingSubject.getValue();
    }

    constructor(private acs: ApiClientService) {
        super();
    }

    getOrganizationsStructure(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/organization-structures`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getProcess(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/processes` + this.generateSpecificationString(), fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getLastLossEvents(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/last-loss-event` + this.generateSpecificationString(), fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    createOpRiskLose(data, fc?: FormContainer): Observable<any> {
        return this.acs.post(OpLossManagementService.OpLoseServiceApi, data, fc).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    createOpRiskLoseDetail(data, fc?: FormContainer): Observable<any> {
        return this.acs
            .post(OpLossManagementService.OpLoseServiceApi + `/details`, data, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getRelatedRisk(lastLossEventId, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/related-risks?lastLossEventId=${lastLossEventId}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    acceptOpLose(data, fc?: FormContainer): Observable<any> {
        return this.acs
            .post(OpLossManagementService.OpLoseServiceApi + `/history/accept`, data, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    rejectOpLose(data, fc?: FormContainer): Observable<any> {
        return this.acs
            .post(OpLossManagementService.OpLoseServiceApi + `/history/reject`, data, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOPLoseSteps(opLoseId, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/history/${opLoseId}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    getOPLoseDetail(opLoseId, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(OpLossManagementService.OpLoseServiceApi + `/details?opLossId=${opLoseId}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    updateOpLoss(data, fc?: FormContainer): Observable<any> {
        return this.acs.put(OpLossManagementService.OpLoseServiceApi, fc, data).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }
}
