/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateDepositDto } from '../models/create-deposit-dto';
import { DepositDto } from '../models/deposit-dto';
import { DepositResponseDto } from '../models/deposit-response-dto';
import { UpdateDepositDto } from '../models/update-deposit-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class DepositService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation depositControllerGetDeposit
     */
    static readonly DepositControllerGetDepositPath = '/api/v1/deposit/{depositId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `depositControllerGetDeposit()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerGetDeposit$Response(params: { depositId: number }): Observable<StrictHttpResponse<DepositDto>> {
        const rb = new RequestBuilder(this.rootUrl, DepositService.DepositControllerGetDepositPath, 'get');
        if (params) {
            rb.path('depositId', params.depositId, {});
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
                    return r as StrictHttpResponse<DepositDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `depositControllerGetDeposit$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerGetDeposit(params: { depositId: number }): Observable<DepositDto> {
        return this.depositControllerGetDeposit$Response(params).pipe(map((r: StrictHttpResponse<DepositDto>) => r.body as DepositDto));
    }

    /**
     * Path part for operation depositControllerDeleteDeposit
     */
    static readonly DepositControllerDeleteDepositPath = '/api/v1/deposit/{depositId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `depositControllerDeleteDeposit()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerDeleteDeposit$Response(params: { depositId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, DepositService.DepositControllerDeleteDepositPath, 'delete');
        if (params) {
            rb.path('depositId', params.depositId, {});
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
     * To access the full response (for headers, for example), `depositControllerDeleteDeposit$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerDeleteDeposit(params: { depositId: number }): Observable<void> {
        return this.depositControllerDeleteDeposit$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation depositControllerGetDeposits
     */
    static readonly DepositControllerGetDepositsPath = '/api/v1/deposit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `depositControllerGetDeposits()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerGetDeposits$Response(params?: {
        limit?: number;
        skip?: number;
        bankName?: string;
        branchName?: string;
        branchCode?: number;
        accountType?: string;
        depositNumber?: string;
        iban?: string;
        glCode?: number;
        interestRate?: number;

        /**
         * 2020-01-04
         */
        openingDate?: Date;
    }): Observable<StrictHttpResponse<DepositResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, DepositService.DepositControllerGetDepositsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('bankName', params.bankName, {});
            rb.query('branchName', params.branchName, {});
            rb.query('branchCode', params.branchCode, {});
            rb.query('accountType', params.accountType, {});
            rb.query('depositNumber', params.depositNumber, {});
            rb.query('iban', params.iban, {});
            rb.query('glCode', params.glCode, {});
            rb.query('interestRate', params.interestRate, {});
            rb.query('openingDate', params.openingDate, {});
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
                    return r as StrictHttpResponse<DepositResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `depositControllerGetDeposits$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    depositControllerGetDeposits(params?: {
        limit?: number;
        skip?: number;
        bankName?: string;
        branchName?: string;
        branchCode?: number;
        accountType?: string;
        depositNumber?: string;
        iban?: string;
        glCode?: number;
        interestRate?: number;

        /**
         * 2020-01-04
         */
        openingDate?: Date;
    }): Observable<DepositResponseDto> {
        return this.depositControllerGetDeposits$Response(params).pipe(
            map((r: StrictHttpResponse<DepositResponseDto>) => r.body as DepositResponseDto)
        );
    }

    /**
     * Path part for operation depositControllerUpdateDeposit
     */
    static readonly DepositControllerUpdateDepositPath = '/api/v1/deposit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `depositControllerUpdateDeposit()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    depositControllerUpdateDeposit$Response(params: { body: UpdateDepositDto }): Observable<StrictHttpResponse<UpdateDepositDto>> {
        const rb = new RequestBuilder(this.rootUrl, DepositService.DepositControllerUpdateDepositPath, 'put');
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
                    return r as StrictHttpResponse<UpdateDepositDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `depositControllerUpdateDeposit$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    depositControllerUpdateDeposit(params: { body: UpdateDepositDto }): Observable<UpdateDepositDto> {
        return this.depositControllerUpdateDeposit$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateDepositDto>) => r.body as UpdateDepositDto)
        );
    }

    /**
     * Path part for operation depositControllerCreateDeposit
     */
    static readonly DepositControllerCreateDepositPath = '/api/v1/deposit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `depositControllerCreateDeposit()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    depositControllerCreateDeposit$Response(params: { body: CreateDepositDto }): Observable<StrictHttpResponse<UpdateDepositDto>> {
        const rb = new RequestBuilder(this.rootUrl, DepositService.DepositControllerCreateDepositPath, 'post');
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
                    return r as StrictHttpResponse<UpdateDepositDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `depositControllerCreateDeposit$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    depositControllerCreateDeposit(params: { body: CreateDepositDto }): Observable<UpdateDepositDto> {
        return this.depositControllerCreateDeposit$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateDepositDto>) => r.body as UpdateDepositDto)
        );
    }
}
