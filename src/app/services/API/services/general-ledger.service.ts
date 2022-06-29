/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CategoryLedgerDtoResponse } from '../models/category-ledger-dto-response';
import { ChangeGlResponseDto } from '../models/change-gl-response-dto';
import { ChartGlResponseDto } from '../models/chart-gl-response-dto';
import { DetailLedgerDtoResponse } from '../models/detail-ledger-dto-response';
import { GeneralLedgerDtoResponse } from '../models/general-ledger-dto-response';
import { GlListResponseDto } from '../models/gl-list-response-dto';
import { GroupLedgerDtoResponse } from '../models/group-ledger-dto-response';
import { SubsidiaryLedgerDtoResponse } from '../models/subsidiary-ledger-dto-response';
import { TreeSearchGlDto } from '../models/tree-search-gl-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class GeneralLedgerService extends BaseService {
    /**
     * Path part for operation generalLedgerControllerGetCategoryLedger
     */
    static readonly GeneralLedgerControllerGetCategoryLedgerPath = '/api/v1/gl/category';
    /**
     * Path part for operation generalLedgerControllerGetGroupLedger
     */
    static readonly GeneralLedgerControllerGetGroupLedgerPath = '/api/v1/gl/group';
    /**
     * Path part for operation generalLedgerControllerGetGeneralLedger
     */
    static readonly GeneralLedgerControllerGetGeneralLedgerPath = '/api/v1/gl/general';
    /**
     * Path part for operation generalLedgerControllerGetSubsidiaryLedger
     */
    static readonly GeneralLedgerControllerGetSubsidiaryLedgerPath = '/api/v1/gl/subsidiary';
    /**
     * Path part for operation generalLedgerControllerGetDetailLedger
     */
    static readonly GeneralLedgerControllerGetDetailLedgerPath = '/api/v1/gl/detail';
    /**
     * Path part for operation generalLedgerControllerGetChangeGeneralLedger
     */
    static readonly GeneralLedgerControllerGetChangeGeneralLedgerPath = '/api/v1/gl/change';
    /**
     * Path part for operation generalLedgerControllerGetGeneralLedgerList
     */
    static readonly GeneralLedgerControllerGetGeneralLedgerListPath = '/api/v1/gl/list';
    /**
     * Path part for operation generalLedgerControllerGetGlLevelList
     */
    static readonly GeneralLedgerControllerGetGlLevelListPath = '/api/v1/gl/level';
    /**
     * Path part for operation generalLedgerControllerGetChartGeneralLedger
     */
    static readonly GeneralLedgerControllerGetChartGeneralLedgerPath = '/api/v1/gl/chart';
    /**
     * Path part for operation generalLedgerControllerGetTreeSearchGeneralLedger
     */
    static readonly GeneralLedgerControllerGetTreeSearchGeneralLedgerPath = '/api/v1/gl/tree/search';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetCategoryLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetCategoryLedger$Response(params?: {
        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<StrictHttpResponse<CategoryLedgerDtoResponse>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetCategoryLedgerPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<CategoryLedgerDtoResponse>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetCategoryLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetCategoryLedger(params?: {
        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<CategoryLedgerDtoResponse> {
        return this.generalLedgerControllerGetCategoryLedger$Response(params).pipe(
            map((r: StrictHttpResponse<CategoryLedgerDtoResponse>) => r.body as CategoryLedgerDtoResponse)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetGroupLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGroupLedger$Response(params?: {
        categoryLedgerCode?: string;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<StrictHttpResponse<GroupLedgerDtoResponse>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetGroupLedgerPath, 'get');
        if (params) {
            rb.query('categoryLedgerCode', params.categoryLedgerCode, {});
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
                    return r as StrictHttpResponse<GroupLedgerDtoResponse>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetGroupLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGroupLedger(params?: {
        categoryLedgerCode?: string;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<GroupLedgerDtoResponse> {
        return this.generalLedgerControllerGetGroupLedger$Response(params).pipe(
            map((r: StrictHttpResponse<GroupLedgerDtoResponse>) => r.body as GroupLedgerDtoResponse)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetGeneralLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGeneralLedger$Response(params?: {
        groupLedgerCode?: number;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<StrictHttpResponse<GeneralLedgerDtoResponse>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetGeneralLedgerPath, 'get');
        if (params) {
            rb.query('groupLedgerCode', params.groupLedgerCode, {});
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
                    return r as StrictHttpResponse<GeneralLedgerDtoResponse>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetGeneralLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGeneralLedger(params?: {
        groupLedgerCode?: number;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<GeneralLedgerDtoResponse> {
        return this.generalLedgerControllerGetGeneralLedger$Response(params).pipe(
            map((r: StrictHttpResponse<GeneralLedgerDtoResponse>) => r.body as GeneralLedgerDtoResponse)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetSubsidiaryLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetSubsidiaryLedger$Response(params?: {
        generalLedgerCode?: number;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<StrictHttpResponse<SubsidiaryLedgerDtoResponse>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetSubsidiaryLedgerPath, 'get');
        if (params) {
            rb.query('generalLedgerCode', params.generalLedgerCode, {});
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
                    return r as StrictHttpResponse<SubsidiaryLedgerDtoResponse>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetSubsidiaryLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetSubsidiaryLedger(params?: {
        generalLedgerCode?: number;

        /**
         * 2020-01-12
         */
        date?: string;
    }): Observable<SubsidiaryLedgerDtoResponse> {
        return this.generalLedgerControllerGetSubsidiaryLedger$Response(params).pipe(
            map((r: StrictHttpResponse<SubsidiaryLedgerDtoResponse>) => r.body as SubsidiaryLedgerDtoResponse)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetDetailLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetDetailLedger$Response(params?: {
        subsidiaryLedgerCode?: number;
        date?: string;
    }): Observable<StrictHttpResponse<DetailLedgerDtoResponse>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetDetailLedgerPath, 'get');
        if (params) {
            rb.query('subsidiaryLedgerCode', params.subsidiaryLedgerCode, {});
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
                    return r as StrictHttpResponse<DetailLedgerDtoResponse>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetDetailLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetDetailLedger(params?: { subsidiaryLedgerCode?: number; date?: string }): Observable<DetailLedgerDtoResponse> {
        return this.generalLedgerControllerGetDetailLedger$Response(params).pipe(
            map((r: StrictHttpResponse<DetailLedgerDtoResponse>) => r.body as DetailLedgerDtoResponse)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetChangeGeneralLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetChangeGeneralLedger$Response(params: {
        fromDate: string;
        toDate: string;
        type: Array<'increase' | 'delete' | 'add' | 'decrease'>;
        categoryCode?: Array<string>;
        groupCode?: Array<number>;
        generalCode?: Array<number>;
        fromPercent?: number;
        toPercent?: number;
        fromValue?: number;
        toValue?: number;
    }): Observable<StrictHttpResponse<Array<ChangeGlResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetChangeGeneralLedgerPath, 'get');
        if (params) {
            rb.query('fromDate', params.fromDate, {});
            rb.query('toDate', params.toDate, {});
            rb.query('type', params.type, {});
            rb.query('categoryCode', params.categoryCode, {});
            rb.query('groupCode', params.groupCode, {});
            rb.query('generalCode', params.generalCode, {});
            rb.query('fromPercent', params.fromPercent, {});
            rb.query('toPercent', params.toPercent, {});
            rb.query('fromValue', params.fromValue, {});
            rb.query('toValue', params.toValue, {});
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
                    return r as StrictHttpResponse<Array<ChangeGlResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetChangeGeneralLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetChangeGeneralLedger(params: {
        fromDate: string;
        toDate: string;
        type: Array<'increase' | 'delete' | 'add' | 'decrease'>;
        categoryCode?: Array<string>;
        groupCode?: Array<number>;
        generalCode?: Array<number>;
        fromPercent?: number;
        toPercent?: number;
        fromValue?: number;
        toValue?: number;
    }): Observable<Array<ChangeGlResponseDto>> {
        return this.generalLedgerControllerGetChangeGeneralLedger$Response(params).pipe(
            map((r: StrictHttpResponse<Array<ChangeGlResponseDto>>) => r.body as Array<ChangeGlResponseDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetGeneralLedgerList()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGeneralLedgerList$Response(params?: {
        limit?: number;
        skip?: number;
        date?: string;
        categoryLedgerName?: string;
        groupLedgerName?: string;
        generalLedgerName?: string;
        subsidiaryLedgerName?: string;
        detailLedgerName?: string;
        creditAmount?: number;
        debitAmount?: number;
        remainedAmount?: number;
    }): Observable<StrictHttpResponse<GlListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetGeneralLedgerListPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('date', params.date, {});
            rb.query('categoryLedgerName', params.categoryLedgerName, {});
            rb.query('groupLedgerName', params.groupLedgerName, {});
            rb.query('generalLedgerName', params.generalLedgerName, {});
            rb.query('subsidiaryLedgerName', params.subsidiaryLedgerName, {});
            rb.query('detailLedgerName', params.detailLedgerName, {});
            rb.query('creditAmount', params.creditAmount, {});
            rb.query('debitAmount', params.debitAmount, {});
            rb.query('remainedAmount', params.remainedAmount, {});
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
                    return r as StrictHttpResponse<GlListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetGeneralLedgerList$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGeneralLedgerList(params?: {
        limit?: number;
        skip?: number;
        date?: string;
        categoryLedgerName?: string;
        groupLedgerName?: string;
        generalLedgerName?: string;
        subsidiaryLedgerName?: string;
        detailLedgerName?: string;
        creditAmount?: number;
        debitAmount?: number;
        remainedAmount?: number;
    }): Observable<GlListResponseDto> {
        return this.generalLedgerControllerGetGeneralLedgerList$Response(params).pipe(
            map((r: StrictHttpResponse<GlListResponseDto>) => r.body as GlListResponseDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetGlLevelList()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGlLevelList$Response(params?: {
        categoryLedgerCode?: string;
        groupLedgerCode?: number;
        generalLedgerCode?: number;
        subsidiaryLedgerCode?: number;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetGlLevelListPath, 'get');
        if (params) {
            rb.query('categoryLedgerCode', params.categoryLedgerCode, {});
            rb.query('groupLedgerCode', params.groupLedgerCode, {});
            rb.query('generalLedgerCode', params.generalLedgerCode, {});
            rb.query('subsidiaryLedgerCode', params.subsidiaryLedgerCode, {});
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
     * To access the full response (for headers, for example), `generalLedgerControllerGetGlLevelList$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetGlLevelList(params?: {
        categoryLedgerCode?: string;
        groupLedgerCode?: number;
        generalLedgerCode?: number;
        subsidiaryLedgerCode?: number;
    }): Observable<void> {
        return this.generalLedgerControllerGetGlLevelList$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetChartGeneralLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetChartGeneralLedger$Response(params: {
        fromDate: string;
        toDate: string;
        categoryLedgerCode: string;
        groupLedgerCode?: number;
        generalLedgerCode?: number;
        subsidiaryLedgerCode?: number;
        detailLedgerCode?: number;
    }): Observable<StrictHttpResponse<Array<ChartGlResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetChartGeneralLedgerPath, 'get');
        if (params) {
            rb.query('fromDate', params.fromDate, {});
            rb.query('toDate', params.toDate, {});
            rb.query('categoryLedgerCode', params.categoryLedgerCode, {});
            rb.query('groupLedgerCode', params.groupLedgerCode, {});
            rb.query('generalLedgerCode', params.generalLedgerCode, {});
            rb.query('subsidiaryLedgerCode', params.subsidiaryLedgerCode, {});
            rb.query('detailLedgerCode', params.detailLedgerCode, {});
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
                    return r as StrictHttpResponse<Array<ChartGlResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetChartGeneralLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetChartGeneralLedger(params: {
        fromDate: string;
        toDate: string;
        categoryLedgerCode: string;
        groupLedgerCode?: number;
        generalLedgerCode?: number;
        subsidiaryLedgerCode?: number;
        detailLedgerCode?: number;
    }): Observable<Array<ChartGlResponseDto>> {
        return this.generalLedgerControllerGetChartGeneralLedger$Response(params).pipe(
            map((r: StrictHttpResponse<Array<ChartGlResponseDto>>) => r.body as Array<ChartGlResponseDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `generalLedgerControllerGetTreeSearchGeneralLedger()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetTreeSearchGeneralLedger$Response(params?: {
        date?: string;
        name?: string;
        code?: string;
    }): Observable<StrictHttpResponse<TreeSearchGlDto>> {
        const rb = new RequestBuilder(this.rootUrl, GeneralLedgerService.GeneralLedgerControllerGetTreeSearchGeneralLedgerPath, 'get');
        if (params) {
            rb.query('date', params.date, {});
            rb.query('name', params.name, {});
            rb.query('code', params.code, {});
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
                    return r as StrictHttpResponse<TreeSearchGlDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `generalLedgerControllerGetTreeSearchGeneralLedger$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    generalLedgerControllerGetTreeSearchGeneralLedger(params?: { date?: string; name?: string; code?: string }): Observable<TreeSearchGlDto> {
        return this.generalLedgerControllerGetTreeSearchGeneralLedger$Response(params).pipe(
            map((r: StrictHttpResponse<TreeSearchGlDto>) => r.body as TreeSearchGlDto)
        );
    }
}
