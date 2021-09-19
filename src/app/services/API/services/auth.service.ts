/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { LoginDto } from '../models/login-dto';
import { UserInfoDto } from '../models/user-info-dto';
import { UserInfoWithTokenDto } from '../models/user-info-with-token-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    /**
     * Path part for operation authControllerLogin
     */
    static readonly AuthControllerLoginPath = '/api/v1/auth/login';
    /**
     * Path part for operation authControllerVerify
     */
    static readonly AuthControllerVerifyPath = '/api/v1/auth/verify';
    /**
     * Path part for operation authControllerGetToken
     */
    static readonly AuthControllerGetTokenPath = '/api/v1/auth/access-token';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerLogin()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerLogin$Response(params: { body: LoginDto }): Observable<StrictHttpResponse<UserInfoWithTokenDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
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
                    return r as StrictHttpResponse<UserInfoWithTokenDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authControllerLogin(params: { body: LoginDto }): Observable<UserInfoWithTokenDto> {
        return this.authControllerLogin$Response(params).pipe(map((r: StrictHttpResponse<UserInfoWithTokenDto>) => r.body as UserInfoWithTokenDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerVerify()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerVerify$Response(params?: {}): Observable<StrictHttpResponse<UserInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerVerifyPath, 'post');
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
                    return r as StrictHttpResponse<UserInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authControllerVerify$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerVerify(params?: {}): Observable<UserInfoDto> {
        return this.authControllerVerify$Response(params).pipe(map((r: StrictHttpResponse<UserInfoDto>) => r.body as UserInfoDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authControllerGetToken()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerGetToken$Response(params?: {}): Observable<StrictHttpResponse<UserInfoWithTokenDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerGetTokenPath, 'post');
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
                    return r as StrictHttpResponse<UserInfoWithTokenDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authControllerGetToken$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authControllerGetToken(params?: {}): Observable<UserInfoWithTokenDto> {
        return this.authControllerGetToken$Response(params).pipe(map((r: StrictHttpResponse<UserInfoWithTokenDto>) => r.body as UserInfoWithTokenDto));
    }
}
