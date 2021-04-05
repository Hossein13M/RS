/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CheckOtpDto } from '../models/check-otp-dto';
import { OtpUserIdDto } from '../models/otp-user-id-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class OtpService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation otpControllerSetOtpForUser
     */
    static readonly OtpControllerSetOtpForUserPath = '/api/v1/rbac/set-otp-secret-for-user';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `otpControllerSetOtpForUser()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    otpControllerSetOtpForUser$Response(params: { body: OtpUserIdDto }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, OtpService.OtpControllerSetOtpForUserPath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
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
     * To access the full response (for headers, for example), `otpControllerSetOtpForUser$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    otpControllerSetOtpForUser(params: { body: OtpUserIdDto }): Observable<void> {
        return this.otpControllerSetOtpForUser$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation otpControllerCheckOtp
     */
    static readonly OtpControllerCheckOtpPath = '/api/v1/rbac/check-otp';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `otpControllerCheckOtp()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    otpControllerCheckOtp$Response(params: { body: CheckOtpDto }): Observable<StrictHttpResponse<boolean>> {
        const rb = new RequestBuilder(this.rootUrl, OtpService.OtpControllerCheckOtpPath, 'post');
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
                    return (r as HttpResponse<any>).clone({
                        body: String((r as HttpResponse<any>).body) === 'true',
                    }) as StrictHttpResponse<boolean>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `otpControllerCheckOtp$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    otpControllerCheckOtp(params: { body: CheckOtpDto }): Observable<boolean> {
        return this.otpControllerCheckOtp$Response(params).pipe(map((r: StrictHttpResponse<boolean>) => r.body as boolean));
    }

    /**
     * Path part for operation otpControllerGenerateQrCode
     */
    static readonly OtpControllerGenerateQrCodePath = '/api/v1/rbac/generate-qr-code/{userId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `otpControllerGenerateQrCode()` instead.
     *
     * This method doesn't expect any request body.
     */
    otpControllerGenerateQrCode$Response(params: { userId: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, OtpService.OtpControllerGenerateQrCodePath, 'get');
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
     * To access the full response (for headers, for example), `otpControllerGenerateQrCode$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    otpControllerGenerateQrCode(params: { userId: string }): Observable<void> {
        return this.otpControllerGenerateQrCode$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
