/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { ComplianceCalculatedPiechartDto } from '../models/compliance-calculated-piechart-dto';
import { FundListDto } from '../models/fund-list-dto';
import { RsponceComplianceCalculatedDto } from '../models/rsponce-compliance-calculated-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class ComplianceCalculatedService extends BaseService {
    /**
     * Path part for operation complianceCalculatedControllerGetFundListComplianceCalculated
     */
    static readonly ComplianceCalculatedControllerGetFundListComplianceCalculatedPath = '/api/v1/compliance-calculated/fund-list';
    /**
     * Path part for operation complianceCalculatedControllerGetPiechartComplianceCalculated
     */
    static readonly ComplianceCalculatedControllerGetPiechartComplianceCalculatedPath = '/api/v1/compliance-calculated/piechart';
    /**
     * Path part for operation complianceCalculatedControllerGetComplianceCalculated
     */
    static readonly ComplianceCalculatedControllerGetComplianceCalculatedPath = '/api/v1/compliance-calculated/table';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceCalculatedControllerGetFundListComplianceCalculated()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetFundListComplianceCalculated$Response(params?: {}): Observable<StrictHttpResponse<Array<FundListDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceCalculatedService.ComplianceCalculatedControllerGetFundListComplianceCalculatedPath, 'get');
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
                    return r as StrictHttpResponse<Array<FundListDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceCalculatedControllerGetFundListComplianceCalculated$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetFundListComplianceCalculated(params?: {}): Observable<Array<FundListDto>> {
        return this.complianceCalculatedControllerGetFundListComplianceCalculated$Response(params).pipe(
            map((r: StrictHttpResponse<Array<FundListDto>>) => r.body as Array<FundListDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceCalculatedControllerGetPiechartComplianceCalculated()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetPiechartComplianceCalculated$Response(params: {
        fundNationalCode: string;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StrictHttpResponse<ComplianceCalculatedPiechartDto>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceCalculatedService.ComplianceCalculatedControllerGetPiechartComplianceCalculatedPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
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
                    return r as StrictHttpResponse<ComplianceCalculatedPiechartDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceCalculatedControllerGetPiechartComplianceCalculated$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetPiechartComplianceCalculated(params: {
        fundNationalCode: string;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<ComplianceCalculatedPiechartDto> {
        return this.complianceCalculatedControllerGetPiechartComplianceCalculated$Response(params).pipe(
            map((r: StrictHttpResponse<ComplianceCalculatedPiechartDto>) => r.body as ComplianceCalculatedPiechartDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceCalculatedControllerGetComplianceCalculated()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetComplianceCalculated$Response(params: {
        fundNationalCode: string;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StrictHttpResponse<Array<RsponceComplianceCalculatedDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceCalculatedService.ComplianceCalculatedControllerGetComplianceCalculatedPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
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
                    return r as StrictHttpResponse<Array<RsponceComplianceCalculatedDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceCalculatedControllerGetComplianceCalculated$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceCalculatedControllerGetComplianceCalculated(params: {
        fundNationalCode: string;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<Array<RsponceComplianceCalculatedDto>> {
        return this.complianceCalculatedControllerGetComplianceCalculated$Response(params).pipe(
            map((r: StrictHttpResponse<Array<RsponceComplianceCalculatedDto>>) => r.body as Array<RsponceComplianceCalculatedDto>)
        );
    }
}
