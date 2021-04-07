/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { ChangePasswordDto } from '../models/change-password-dto';
import { ChangePasswordUserDto } from '../models/change-password-user-dto';
import { CreateUserDto } from '../models/create-user-dto';
import { UpdateUserDto } from '../models/update-user-dto';
import { UserDetailsDto } from '../models/user-details-dto';
import { UserInfoDto } from '../models/user-info-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation userControllerGetUserDetails
     */
    static readonly UserControllerGetUserDetailsPath = '/api/v1/user/details';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerGetUserDetails()` instead.
     *
     * This method doesn't expect any request body.
     */
    userControllerGetUserDetails$Response(params?: {}): Observable<StrictHttpResponse<UserDetailsDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerGetUserDetailsPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<UserDetailsDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerGetUserDetails$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    userControllerGetUserDetails(params?: {}): Observable<UserDetailsDto> {
        return this.userControllerGetUserDetails$Response(params).pipe(map((r: StrictHttpResponse<UserDetailsDto>) => r.body as UserDetailsDto));
    }

    /**
     * Path part for operation userControllerUpdateUser
     */
    static readonly UserControllerUpdateUserPath = '/api/v1/user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerUpdateUser()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerUpdateUser$Response(params: { body: UpdateUserDto }): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerUpdateUserPath, 'put');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerUpdateUser$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerUpdateUser(params: { body: UpdateUserDto }): Observable<UserInfoDto> {
        return this.userControllerUpdateUser$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }

    /**
     * Path part for operation userControllerCreateUser
     */
    static readonly UserControllerCreateUserPath = '/api/v1/user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerCreateUser()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerCreateUser$Response(params: { body: CreateUserDto }): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerCreateUserPath, 'post');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerCreateUser$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerCreateUser(params: { body: CreateUserDto }): Observable<UserInfoDto> {
        return this.userControllerCreateUser$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }

    /**
     * Path part for operation userControllerGetOne
     */
    static readonly UserControllerGetOnePath = '/api/v1/user/{userId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerGetOne()` instead.
     *
     * This method doesn't expect any request body.
     */
    userControllerGetOne$Response(params: { userId: number }): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerGetOnePath, 'get');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerGetOne$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    userControllerGetOne(params: { userId: number }): Observable<UserInfoDto> {
        return this.userControllerGetOne$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }

    /**
     * Path part for operation userControllerChangePassword
     */
    static readonly UserControllerChangePasswordPath = '/api/v1/user/change-password';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerChangePassword()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerChangePassword$Response(params: { body: ChangePasswordDto }): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerChangePasswordPath, 'put');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerChangePassword$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerChangePassword(params: { body: ChangePasswordDto }): Observable<UserInfoDto> {
        return this.userControllerChangePassword$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }

    /**
     * Path part for operation userControllerChangePasswordUser
     */
    static readonly UserControllerChangePasswordUserPath = '/api/v1/user/change-password-user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `userControllerChangePasswordUser()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerChangePasswordUser$Response(params: { body: ChangePasswordUserDto }): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerChangePasswordUserPath, 'put');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `userControllerChangePasswordUser$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    userControllerChangePasswordUser(params: { body: ChangePasswordUserDto }): Observable<UserInfoDto> {
        return this.userControllerChangePasswordUser$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }
}
