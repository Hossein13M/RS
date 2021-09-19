import { Injectable } from '@angular/core';
import { Compliance, ComplianceFund } from './compliance.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class CompliancesService {
    constructor(private http: HttpClient) {}

    // compliances entity
    public getCompliances(paginationParams?, searchParams?): Observable<ResponseWithPagination<Compliance>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<Compliance>>('/api/v1/compliance', { params });
    }

    public createCompliance(model: Compliance): Observable<Compliance> {
        return this.http.post<Compliance>('/api/v1/compliance', model);
    }

    public updateCompliance(model: Compliance): Observable<Compliance> {
        return this.http.put<Compliance>('/api/v1/compliance', model);
    }

    public deleteCompliance(id: string): Observable<null> {
        return this.http.delete<null>('/api/v1/compliance' + id);
    }

    // compliances-fund entity
    public getCompliancesFunds(complianceId: string | number): Observable<Array<ComplianceFund>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ complianceId });
        return this.http.get<Array<ComplianceFund>>('/api/v1/compliance-fund', { params });
    }

    public createComplianceFund(model: ComplianceFund): Observable<ComplianceFund> {
        return this.http.post<ComplianceFund>('/api/v1/compliance-fund', model);
    }

    public updateComplianceFund(model: ComplianceFund): Observable<ComplianceFund> {
        return this.http.put<ComplianceFund>('/api/v1/compliance-fund', model);
    }

    public deleteComplianceFund(id: string): Observable<null> {
        return this.http.delete<null>('/api/v1/compliance-fund' + id);
    }
}
