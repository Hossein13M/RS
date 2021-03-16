/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { AlarmListResponseDto } from '../models/alarm-list-response-dto';
import { AlarmResponseDto } from '../models/alarm-response-dto';
import { CreateAlarmDto } from '../models/create-alarm-dto';
import { UpdateAlarmDto } from '../models/update-alarm-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class AlarmService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation alarmControllerGetAlarms
     */
    static readonly AlarmControllerGetAlarmsPath = '/api/v1/alarm';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `alarmControllerGetAlarms()` instead.
     *
     * This method doesn't expect any request body.
     */
    alarmControllerGetAlarms$Response(params?: {
        limit?: number;
        skip?: number;
        moduleId?: any;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<AlarmListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, AlarmService.AlarmControllerGetAlarmsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('moduleId', params.moduleId, {});
            rb.query('searchKeyword', params.searchKeyword, {});
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
                    return r as StrictHttpResponse<AlarmListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `alarmControllerGetAlarms$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    alarmControllerGetAlarms(params?: {
        limit?: number;
        skip?: number;
        moduleId?: any;
        searchKeyword?: any;
    }): Observable<AlarmListResponseDto> {
        return this.alarmControllerGetAlarms$Response(params).pipe(
            map((r: StrictHttpResponse<AlarmListResponseDto>) => r.body as AlarmListResponseDto)
        );
    }

    /**
     * Path part for operation alarmControllerUpdateAlarm
     */
    static readonly AlarmControllerUpdateAlarmPath = '/api/v1/alarm';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `alarmControllerUpdateAlarm()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    alarmControllerUpdateAlarm$Response(params: { body: UpdateAlarmDto }): Observable<StrictHttpResponse<AlarmResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, AlarmService.AlarmControllerUpdateAlarmPath, 'put');
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
                    return r as StrictHttpResponse<AlarmResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `alarmControllerUpdateAlarm$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    alarmControllerUpdateAlarm(params: { body: UpdateAlarmDto }): Observable<AlarmResponseDto> {
        return this.alarmControllerUpdateAlarm$Response(params).pipe(
            map((r: StrictHttpResponse<AlarmResponseDto>) => r.body as AlarmResponseDto)
        );
    }

    /**
     * Path part for operation alarmControllerCreateAlarm
     */
    static readonly AlarmControllerCreateAlarmPath = '/api/v1/alarm';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `alarmControllerCreateAlarm()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    alarmControllerCreateAlarm$Response(params: { body: CreateAlarmDto }): Observable<StrictHttpResponse<AlarmResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, AlarmService.AlarmControllerCreateAlarmPath, 'post');
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
                    return r as StrictHttpResponse<AlarmResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `alarmControllerCreateAlarm$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    alarmControllerCreateAlarm(params: { body: CreateAlarmDto }): Observable<AlarmResponseDto> {
        return this.alarmControllerCreateAlarm$Response(params).pipe(
            map((r: StrictHttpResponse<AlarmResponseDto>) => r.body as AlarmResponseDto)
        );
    }

    /**
     * Path part for operation alarmControllerGetAlarm
     */
    static readonly AlarmControllerGetAlarmPath = '/api/v1/alarm/{alarmId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `alarmControllerGetAlarm()` instead.
     *
     * This method doesn't expect any request body.
     */
    alarmControllerGetAlarm$Response(params: { alarmId: number }): Observable<StrictHttpResponse<AlarmResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, AlarmService.AlarmControllerGetAlarmPath, 'get');
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
                    return r as StrictHttpResponse<AlarmResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `alarmControllerGetAlarm$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    alarmControllerGetAlarm(params: { alarmId: number }): Observable<AlarmResponseDto> {
        return this.alarmControllerGetAlarm$Response(params).pipe(
            map((r: StrictHttpResponse<AlarmResponseDto>) => r.body as AlarmResponseDto)
        );
    }
}
