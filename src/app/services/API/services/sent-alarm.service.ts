/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { InboxAlarmDto } from '../models/inbox-alarm-dto';
import { ItemAlarmDto } from '../models/item-alarm-dto';
import { ReminderDateDto } from '../models/reminder-date-dto';
import { SentSuccessDto } from '../models/sent-success-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class SentAlarmService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation sentAlarmControllerSentAlarm
     */
    static readonly SentAlarmControllerSentAlarmPath = '/api/v1/sent-alarm/{alarmId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `sentAlarmControllerSentAlarm()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerSentAlarm$Response(params: { alarmId: number }): Observable<StrictHttpResponse<SentSuccessDto>> {
        const rb = new RequestBuilder(this.rootUrl, SentAlarmService.SentAlarmControllerSentAlarmPath, 'post');
        if (params) {
            rb.path('alarmId', params.alarmId, {});
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
                    return r as StrictHttpResponse<SentSuccessDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `sentAlarmControllerSentAlarm$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerSentAlarm(params: { alarmId: number }): Observable<SentSuccessDto> {
        return this.sentAlarmControllerSentAlarm$Response(params).pipe(
            map((r: StrictHttpResponse<SentSuccessDto>) => r.body as SentSuccessDto)
        );
    }

    /**
     * Path part for operation sentAlarmControllerGetInboxAlarms
     */
    static readonly SentAlarmControllerGetInboxAlarmsPath = '/api/v1/sent-alarm/inbox';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `sentAlarmControllerGetInboxAlarms()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerGetInboxAlarms$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * default Read and Unread
         */
        status?: 'Unread' | 'Read' | 'Deleted';
        moduleId?: number;
    }): Observable<StrictHttpResponse<InboxAlarmDto>> {
        const rb = new RequestBuilder(this.rootUrl, SentAlarmService.SentAlarmControllerGetInboxAlarmsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('status', params.status, {});
            rb.query('moduleId', params.moduleId, {});
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
                    return r as StrictHttpResponse<InboxAlarmDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `sentAlarmControllerGetInboxAlarms$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerGetInboxAlarms(params?: {
        limit?: number;
        skip?: number;

        /**
         * default Read and Unread
         */
        status?: 'Unread' | 'Read' | 'Deleted';
        moduleId?: number;
    }): Observable<InboxAlarmDto> {
        return this.sentAlarmControllerGetInboxAlarms$Response(params).pipe(
            map((r: StrictHttpResponse<InboxAlarmDto>) => r.body as InboxAlarmDto)
        );
    }

    /**
     * Path part for operation sentAlarmControllerGetAlarm
     */
    static readonly SentAlarmControllerGetAlarmPath = '/api/v1/sent-alarm/{inboxId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `sentAlarmControllerGetAlarm()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerGetAlarm$Response(params: { inboxId: number }): Observable<StrictHttpResponse<ItemAlarmDto>> {
        const rb = new RequestBuilder(this.rootUrl, SentAlarmService.SentAlarmControllerGetAlarmPath, 'get');
        if (params) {
            rb.path('inboxId', params.inboxId, {});
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
                    return r as StrictHttpResponse<ItemAlarmDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `sentAlarmControllerGetAlarm$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    sentAlarmControllerGetAlarm(params: { inboxId: number }): Observable<ItemAlarmDto> {
        return this.sentAlarmControllerGetAlarm$Response(params).pipe(map((r: StrictHttpResponse<ItemAlarmDto>) => r.body as ItemAlarmDto));
    }

    /**
     * Path part for operation sentAlarmControllerRecordReminderDate
     */
    static readonly SentAlarmControllerRecordReminderDatePath = '/api/v1/sent-alarm/reminder-date/{inboxId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `sentAlarmControllerRecordReminderDate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    sentAlarmControllerRecordReminderDate$Response(params: {
        inboxId: number;
        body: ReminderDateDto;
    }): Observable<StrictHttpResponse<SentSuccessDto>> {
        const rb = new RequestBuilder(this.rootUrl, SentAlarmService.SentAlarmControllerRecordReminderDatePath, 'put');
        if (params) {
            rb.path('inboxId', params.inboxId, {});

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
                    return r as StrictHttpResponse<SentSuccessDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `sentAlarmControllerRecordReminderDate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    sentAlarmControllerRecordReminderDate(params: { inboxId: number; body: ReminderDateDto }): Observable<SentSuccessDto> {
        return this.sentAlarmControllerRecordReminderDate$Response(params).pipe(
            map((r: StrictHttpResponse<SentSuccessDto>) => r.body as SentSuccessDto)
        );
    }
}
