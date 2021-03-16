/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { UserRoleInfo } from '../models/user-role-info';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class UserRoleService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation userRolesControllerGetOne
     */
    static readonly UserRolesControllerGetOnePath = '/api/v1/user-role/{userId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userRolesControllerGetOne()` instead.
     *
     * This method doesn't expect any request body.
     */
    userRolesControllerGetOne$Response(params: { userId: number }): Observable<StrictHttpResponse<Array<UserRoleInfo>>> {
        const rb = new RequestBuilder(this.rootUrl, UserRoleService.UserRolesControllerGetOnePath, 'get');
        if (params) {
            rb.path('userId', params.userId, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<UserRoleInfo>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userRolesControllerGetOne$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    userRolesControllerGetOne(params: { userId: number }): Observable<Array<UserRoleInfo>> {
        return this.userRolesControllerGetOne$Response(params).pipe(
            map((r: StrictHttpResponse<Array<UserRoleInfo>>) => r.body as Array<UserRoleInfo>)
        );
    }
}
