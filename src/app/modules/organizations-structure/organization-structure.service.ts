import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { OrganizationRole, OrganizationStructureModel, OrganizationUnit, Role, Unit } from './organization-structure.model';
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

    public getOrganizationRoleByOrgCode(organizationId: number): Observable<OrganizationRole<Role>> {
        return this.http.get<OrganizationRole<Role>>(`/api/v1/organization-role/${organizationId}`);
    }

    public getOrganizationUnitsByOrgCode(organizationId: number): Observable<OrganizationUnit<Unit>> {
        return this.http.get<OrganizationUnit<Unit>>(`/api/v1/organization-unit/${organizationId}`);
    }

    public editOrganizationRoleName(id: number | string, name: string): Observable<any> {
        return this.http.put<any>(`/api/v1/organization-role`, { id, name });
    }

    public editOrganizationUnitName(id: number | string, name: string): Observable<any> {
        return this.http.put<any>(`/api/v1/organization-unit`, { id, name });
    }

    public deleteMappingOfRoleWithUnit(unitId: number): Observable<any> {
        return this.http.delete(`/api/v1/organization-unit/revoke-role/${unitId}`);
    }

    public assignRoleToOrganizationUnit(unitInfo): Observable<any> {
        return this.http.post(`/api/v1/organization-unit/assign-role`, unitInfo);
    }

    public deleteOrganizationRole(unitId: number): Observable<any> {
        return this.http.delete(`/api/v1/organization-role/${unitId}`);
    }

    public addNewOrganizationRole(roleInfo): Observable<any> {
        return this.http.post<any>(`/api/v1/organization-role`, roleInfo);
    }

    public addNewOrganizationUnit(unitInfo): Observable<any> {
        return this.http.post<any>(`/api/v1/organization-unit`, unitInfo);
    }
}
