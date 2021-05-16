import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({ providedIn: 'root' })
export class RiskMeasuringService {
    constructor(private http: HttpClient) {}

    public getRiskManagementValues(searchParams): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get(`/api/value-at-risk/`, { params });
    }
}
