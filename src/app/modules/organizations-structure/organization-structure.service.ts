import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { OrganizationStructureModel } from './organization-structure.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class OrganizationStructureService {
    constructor(private http: HttpClient) {}

    public getOrganizationsList(searchParams: any): Observable<ResponseWithPagination<OrganizationStructureModel>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<OrganizationStructureModel>>(`/api/v1/organization`, { params });
    }

    public addOrganization(organizationInfo): any {
        return this.http.post<any>(`/api/v1/organization`, organizationInfo);
    }

    public deactivateOrganization(organizationId: number): any {
        return this.http.put(`/api/v1/organization/inactive/${organizationId}`, {});
    }

    public editOrganization(organizationInfo): any {
        return this.http.put<any>(`/api/v1/organization`, organizationInfo);
    }
}
