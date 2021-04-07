/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CalculateFundRealTimeNavResponseDto } from '../models/calculate-fund-real-time-nav-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FundRealTimeNavService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fundRealTimeNavControllerCalculateFundRealTimeNav
     */
    static readonly FundRealTimeNavControllerCalculateFundRealTimeNavPath = '/api/v1/fund-real-time-nav';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRealTimeNavControllerCalculateFundRealTimeNav()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRealTimeNavControllerCalculateFundRealTimeNav$Response(params: {
        fundNationalCode: string;
        plannedRate: number;

        /**
         * Default value is Date of now. Example: 2020-05-19
         */
        date?: Date;
    }): Observable<StrictHttpResponse<CalculateFundRealTimeNavResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundRealTimeNavService.FundRealTimeNavControllerCalculateFundRealTimeNavPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('plannedRate', params.plannedRate, {});
            rb.query('date', params.date, {});
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
                    return r as StrictHttpResponse<CalculateFundRealTimeNavResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundRealTimeNavControllerCalculateFundRealTimeNav$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRealTimeNavControllerCalculateFundRealTimeNav(params: {
        fundNationalCode: string;
        plannedRate: number;

        /**
         * Default value is Date of now. Example: 2020-05-19
         */
        date?: Date;
    }): Observable<CalculateFundRealTimeNavResponseDto> {
        return this.fundRealTimeNavControllerCalculateFundRealTimeNav$Response(params).pipe(
            map((r: StrictHttpResponse<CalculateFundRealTimeNavResponseDto>) => r.body as CalculateFundRealTimeNavResponseDto)
        );
    }
}
