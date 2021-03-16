import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RiskMeasuringService {
    private static valueAtRiskApi = '/api/value-at-risk';

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

    constructor(private acs: ApiClientService) {}

    getYieldCurve(owner, date, confidence, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(RiskMeasuringService.valueAtRiskApi + `?owner=${owner}&date=${date}&confidenceInterval=${confidence}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }
}
