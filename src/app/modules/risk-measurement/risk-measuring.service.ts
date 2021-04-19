import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RiskMeasuringService {
    constructor(private http: HttpClient) {}

    public getRiskManagementValues(searchParams): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/value-at-risk/`, { params });
    }

    private prepareParamsForObjects(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) searchParams[key].forEach((element) => (params = params.append(key, element)));
            else if (searchParams[key] !== '') params = params.append(key, searchParams[key]);
        });
        return params;
    }
}
