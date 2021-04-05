/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { SmsResponseDto } from '../models/sms-response-dto';
import { SmsSendDto } from '../models/sms-send-dto';
import { StatusResponseDto } from '../models/status-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class SmsService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation smsControllerSendSms
     */
    static readonly SmsControllerSendSmsPath = '/api/v1/sms';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `smsControllerSendSms()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    smsControllerSendSms$Response(params: { body: SmsSendDto }): Observable<StrictHttpResponse<SmsResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, SmsService.SmsControllerSendSmsPath, 'post');
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
                    return r as StrictHttpResponse<SmsResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `smsControllerSendSms$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    smsControllerSendSms(params: { body: SmsSendDto }): Observable<SmsResponseDto> {
        return this.smsControllerSendSms$Response(params).pipe(map((r: StrictHttpResponse<SmsResponseDto>) => r.body as SmsResponseDto));
    }

    /**
     * Path part for operation smsControllerGetStatusSms
     */
    static readonly SmsControllerGetStatusSmsPath = '/api/v1/sms/status/{messageId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `smsControllerGetStatusSms()` instead.
     *
     * This method doesn't expect any request body.
     */
    smsControllerGetStatusSms$Response(params: { messageId: string }): Observable<StrictHttpResponse<StatusResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, SmsService.SmsControllerGetStatusSmsPath, 'get');
        if (params) {
            rb.path('messageId', params.messageId, {});
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
                    return r as StrictHttpResponse<StatusResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `smsControllerGetStatusSms$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    smsControllerGetStatusSms(params: { messageId: string }): Observable<StatusResponseDto> {
        return this.smsControllerGetStatusSms$Response(params).pipe(map((r: StrictHttpResponse<StatusResponseDto>) => r.body as StatusResponseDto));
    }

    /**
     * Path part for operation smsControllerGetSms
     */
    static readonly SmsControllerGetSmsPath = '/api/v1/sms/{smsId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `smsControllerGetSms()` instead.
     *
     * This method doesn't expect any request body.
     */
    smsControllerGetSms$Response(params: { smsId: number }): Observable<StrictHttpResponse<SmsResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, SmsService.SmsControllerGetSmsPath, 'get');
        if (params) {
            rb.path('smsId', params.smsId, {});
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
                    return r as StrictHttpResponse<SmsResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `smsControllerGetSms$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    smsControllerGetSms(params: { smsId: number }): Observable<SmsResponseDto> {
        return this.smsControllerGetSms$Response(params).pipe(map((r: StrictHttpResponse<SmsResponseDto>) => r.body as SmsResponseDto));
    }
}
