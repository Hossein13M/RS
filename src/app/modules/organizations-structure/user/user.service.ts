import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Organization, Roles, Units, User } from './user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    public getUsers(organization: Array<string>, paginationParams?, searchParams?): Observable<ResponseWithPagination<User>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({
            organization: organization.length > 0 ? organization : 0,
            ...paginationParams,
            ...searchParams,
        });

        return this.http.get<ResponseWithPagination<User>>('/api/v2/user', { params });
    }

    public createUser(model: User): Observable<User> {
        return this.http.post<User>('/api/v2/user', model);
    }

    public updateUser(model: User): Observable<User> {
        return this.http.put<User>('/api/v2/user', model);
    }

    public getOrganizations(searchKeyword?: string): Observable<ResponseWithPagination<Organization>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ limit: 20, skip: 0, name: searchKeyword ? searchKeyword : '' });
        return this.http.get<ResponseWithPagination<Organization>>('/api/v1/organization', { params });
    }

    public getOrganizationUnits(organizationCodes: Array<number>): Observable<Units> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ organizationCodes });
        return this.http.get<Units>(`/api/v1/organization-unit`, { params });
    }

    public getOrganizationRoles(organizationCode: number, organizationUnits?: Array<number>): Observable<Array<Roles>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ organizationCodes: [organizationCode], organizationUnits });
        return this.http.get<Array<Roles>>(`/api/v1/organization-role`, { params });
    }

    public changeUserStatus(userId: number): Observable<any> {
        return this.http.put<any>(`/api/v2/user/inactive/${userId}`, { userId: userId });
    }
}
