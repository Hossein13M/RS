import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, Specification, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class YieldCurveService extends Specification {
    private static yieldCurveApi = '/api/v1/yield-curve';

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

    getYieldCurve(date: string, fc?: FormContainer): Observable<any> {
        return this.acs.get(YieldCurveService.yieldCurveApi + `?date=${date}`, fc).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }
}
