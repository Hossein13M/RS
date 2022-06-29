/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateAuthItemAssignmentDto } from '../models/create-auth-item-assignment-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AuthItemAssignmentService extends BaseService {
    /**
     * Path part for operation authItemAssignmentControllerCreateAuthItemAssignment
     */
    static readonly AuthItemAssignmentControllerCreateAuthItemAssignmentPath = '/api/v1/rbac/assign-auth-item-to-user';
    /**
     * Path part for operation authItemAssignmentControllerDeleteAuthItemAssignment
     */
    static readonly AuthItemAssignmentControllerDeleteAuthItemAssignmentPath = '/api/v1/rbac/revoke/{itemName}/from-user/{userId}';
    /**
     * Path part for operation authItemAssignmentControllerGetUsersByAuthName
     */
    static readonly AuthItemAssignmentControllerGetUsersByAuthNamePath = '/api/v1/rbac/users-by-auth-name/{itemName}';
    /**
     * Path part for operation authItemAssignmentControllerGetAssignedAccessesToUser
     */
    static readonly AuthItemAssignmentControllerGetAssignedAccessesToUserPath = '/api/v1/rbac/accesses-of-user/{userId}';
    /**
     * Path part for operation authItemAssignmentControllerGetInheritedPermissions
     */
    static readonly AuthItemAssignmentControllerGetInheritedPermissionsPath = '/api/v1/rbac/inherited-accesses/{itemName}';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemAssignmentControllerCreateAuthItemAssignment()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemAssignmentControllerCreateAuthItemAssignment$Response(params: {
        body: CreateAuthItemAssignmentDto;
    }): Observable<StrictHttpResponse<CreateAuthItemAssignmentDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemAssignmentService.AuthItemAssignmentControllerCreateAuthItemAssignmentPath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
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
                    return r as StrictHttpResponse<CreateAuthItemAssignmentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemAssignmentControllerCreateAuthItemAssignment$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemAssignmentControllerCreateAuthItemAssignment(params: { body: CreateAuthItemAssignmentDto }): Observable<CreateAuthItemAssignmentDto> {
        return this.authItemAssignmentControllerCreateAuthItemAssignment$Response(params).pipe(
            map((r: StrictHttpResponse<CreateAuthItemAssignmentDto>) => r.body as CreateAuthItemAssignmentDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemAssignmentControllerDeleteAuthItemAssignment()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerDeleteAuthItemAssignment$Response(params: { itemName: string; userId: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemAssignmentService.AuthItemAssignmentControllerDeleteAuthItemAssignmentPath, 'delete');
        if (params) {
            rb.path('itemName', params.itemName, {});
            rb.path('userId', params.userId, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemAssignmentControllerDeleteAuthItemAssignment$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerDeleteAuthItemAssignment(params: { itemName: string; userId: string }): Observable<void> {
        return this.authItemAssignmentControllerDeleteAuthItemAssignment$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemAssignmentControllerGetUsersByAuthName()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetUsersByAuthName$Response(params: { itemName: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemAssignmentService.AuthItemAssignmentControllerGetUsersByAuthNamePath, 'get');
        if (params) {
            rb.path('itemName', params.itemName, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemAssignmentControllerGetUsersByAuthName$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetUsersByAuthName(params: { itemName: string }): Observable<void> {
        return this.authItemAssignmentControllerGetUsersByAuthName$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemAssignmentControllerGetAssignedAccessesToUser()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetAssignedAccessesToUser$Response(params: { userId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemAssignmentService.AuthItemAssignmentControllerGetAssignedAccessesToUserPath, 'get');
        if (params) {
            rb.path('userId', params.userId, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemAssignmentControllerGetAssignedAccessesToUser$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetAssignedAccessesToUser(params: { userId: number }): Observable<void> {
        return this.authItemAssignmentControllerGetAssignedAccessesToUser$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemAssignmentControllerGetInheritedPermissions()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetInheritedPermissions$Response(params: { itemName: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemAssignmentService.AuthItemAssignmentControllerGetInheritedPermissionsPath, 'get');
        if (params) {
            rb.path('itemName', params.itemName, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemAssignmentControllerGetInheritedPermissions$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemAssignmentControllerGetInheritedPermissions(params: { itemName: string }): Observable<void> {
        return this.authItemAssignmentControllerGetInheritedPermissions$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
