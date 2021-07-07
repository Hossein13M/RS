import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangePassword, Login, LoginResponse, User } from './auth.model';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Organization } from './auth.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable()
export class AuthorizationService {
    constructor(private http: HttpClient) {}

    public login(model: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`/api/v2/auth/login`, model);
    }

    public changePassword(model: ChangePassword): Observable<null> {
        return this.http.put<null>(`/api/v2/user/unauthorized/change-password`, model);
    }

    public getOrganizations(codes: Array<number>): Observable<ResponseWithPagination<Organization>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ limit: 1000, skip: 0, codes });
        return this.http.get<ResponseWithPagination<Organization>>(`/api/v1/organization`, { params });
    }

    public decodeToken(token?: LoginResponse): User {
        if (token) {
            return jwtDecode(token.accessToken) as User;
        } else {
            return jwtDecode(localStorage.getItem('accessToken'));
        }
    }
}
