import { Injectable } from '@angular/core';
import { ComplianceFundModel, ComplianceModel } from './compliance.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class CompliancesService {
    constructor(private http: HttpClient) {}

    // compliances entity
    public getCompliances(paginationParams?, searchParams?): Observable<ResponseWithPagination<ComplianceModel>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<ComplianceModel>>('/api/v1/compliance', { params });
    }

    public createCompliance(model: ComplianceModel): Observable<ResponseWithPagination<ComplianceModel>> {
        return this.http.post<ResponseWithPagination<ComplianceModel>>('/api/v1/compliance', model);
    }

    public deleteCompliance(id: string): Observable<ResponseWithPagination<ComplianceModel>> {
        return this.http.delete<ResponseWithPagination<ComplianceModel>>('/api/v1/compliance' + id);
    }

    public updateCompliance(model: ComplianceModel): Observable<ResponseWithPagination<ComplianceModel>> {
        return this.http.put<ResponseWithPagination<ComplianceModel>>('/api/v1/compliance', model);
    }

    // compliances fund entity
    public getCompliancesFunds(complianceId: string): Observable<Array<ComplianceFundModel>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ complianceId });
        return this.http.get<Array<ComplianceFundModel>>('/api/v1/compliance-fund', { params });
    }
}
