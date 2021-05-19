import { Injectable } from '@angular/core';
import { ComplianceModel } from './compliance.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { PaginationResponse } from '#shared/models/pagination.model';

@Injectable()
export class CompliancesService {
    constructor(private http: HttpClient) {}

    getCompliances(paginationParams?, searchParams?): Observable<PaginationResponse<ComplianceModel>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<PaginationResponse<ComplianceModel>>('/api/v1/compliance', { params });
    }

    createCompliance(model: ComplianceModel): Observable<PaginationResponse<ComplianceModel>> {
        return this.http.post<PaginationResponse<ComplianceModel>>('/api/v1/compliance', model);
    }

    deleteCompliance(id: string): Observable<PaginationResponse<ComplianceModel>> {
        return this.http.delete<PaginationResponse<ComplianceModel>>('/api/v1/compliance' + id);
    }

    updateCompliance(model: ComplianceModel): Observable<PaginationResponse<ComplianceModel>> {
        return this.http.put<PaginationResponse<ComplianceModel>>('/api/v1/compliance', model);
    }
}
