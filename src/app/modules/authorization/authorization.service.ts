import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangePassword, Login, LoginResponse, Organization, Status, User } from './auth.model';
import { Observable } from 'rxjs';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import jwtDecode from 'jwt-decode';
import { navigation } from '../../dashboard-configs/navigation';
import { FuseNavigation } from '../../../@fuse/types';

@Injectable()
export class AuthorizationService {
    constructor(private readonly http: HttpClient) {}

    public login(loginInfo: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`/api/v2/auth/login`, loginInfo);
    }

    public changePassword(model: ChangePassword): Observable<null> {
        return this.http.put<null>(`/api/v2/user/unauthorized/change-password`, model);
    }

    public getOrganizations(codes: Array<number>): Observable<ResponseWithPagination<Organization>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ limit: 1000, skip: 0, codes });
        return this.http.get<ResponseWithPagination<Organization>>(`/api/v1/organization`, { params });
    }

    public decodeToken(token?: LoginResponse): User {
        return token ? ({ ...jwtDecode(token.accessToken) } as User) : ({ ...jwtDecode(localStorage.getItem('accessToken')) } as User);
    }

    public static storeToken(token: string): void {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', token);
    }

    public static isUserUnauthorized(user: User): boolean {
        return user.status === Status.unauthorized;
    }

    public setUserInfoInLocalStorage(token: LoginResponse): void {
        localStorage.setItem('user', JSON.stringify(this.decodeToken(token)));
    }

    public static checkUserAccess(): Array<FuseNavigation> {
        const userRoles: Array<string> = [];
        const authorizedNavigation: Array<FuseNavigation> = [];
        (JSON.parse(localStorage.getItem('user')) as User).services.split('|').map((userRole) => userRoles.push(userRole));
        navigation.map((navItem) => {
            if (userRoles.includes(navItem.id)) {
                if (!!navItem.children) {
                    authorizedNavigation.push({ id: navItem.id, title: navItem.title, icon: navItem.icon, type: navItem.type, children: [] });
                    navItem.children.map((navChild) => {
                        userRoles.includes(navChild.id) && authorizedNavigation.find((pushedItem) => pushedItem.id === navItem.id).children.push(navChild);
                    });
                } else authorizedNavigation.push(navItem);
            }
        });

        return authorizedNavigation;
    }
}
