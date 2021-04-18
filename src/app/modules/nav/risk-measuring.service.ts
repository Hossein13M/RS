import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { PageEvent, SpecificationModel } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

interface RiskManagementValue {
    owner: string | Array<string>;
    data: string;
    confidenceInterval: string | number;
}

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

    constructor(private acs: ApiClientService, private http: HttpClient) {}

    getYieldCurve(owner, date, confidence, fc?: FormContainer): Observable<any> {
        return this.acs
            .get(RiskMeasuringService.valueAtRiskApi + `?owner=${owner}&date=${date}&confidenceInterval=${confidence}`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    public getRiskManagementValues(searchParams: RiskManagementValue): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/value-at-risk/`, { params });
    }

    private prepareParamsForObjects(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) {
                searchParams[key].forEach((element) => params.append(key, element));
            } else if (searchParams[key] !== '') {
                params = params.append(key, searchParams[key]);
            }
        });
        return params;
    }
}
