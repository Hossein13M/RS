/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BankBranchDto } from '../models/bank-branch-dto';
import { BankBranchResponseDto } from '../models/bank-branch-response-dto';
import { CreateBankBranchDto } from '../models/create-bank-branch-dto';
import { UpdateBankBranchDto } from '../models/update-bank-branch-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BankBranchService extends BaseService {
    /**
     * Path part for operation bankBranchControllerGetBankBranch
     */
    static readonly BankBranchControllerGetBankBranchPath = '/api/v1/bank-branch/{bankBranchId}';
    /**
     * Path part for operation bankBranchControllerDeleteBankBranch
     */
    static readonly BankBranchControllerDeleteBankBranchPath = '/api/v1/bank-branch/{bankBranchId}';
    /**
     * Path part for operation bankBranchControllerGetBankBranches
     */
    static readonly BankBranchControllerGetBankBranchesPath = '/api/v1/bank-branch';
    /**
     * Path part for operation bankBranchControllerUpdateBankBranch
     */
    static readonly BankBranchControllerUpdateBankBranchPath = '/api/v1/bank-branch';
    /**
     * Path part for operation bankBranchControllerCreateBankBranch
     */
    static readonly BankBranchControllerCreateBankBranchPath = '/api/v1/bank-branch';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankBranchControllerGetBankBranch()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerGetBankBranch$Response(params: { bankBranchId: number }): Observable<StrictHttpResponse<BankBranchDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankBranchService.BankBranchControllerGetBankBranchPath, 'get');
        if (params) {
            rb.path('bankBranchId', params.bankBranchId, {});
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
                    return r as StrictHttpResponse<BankBranchDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankBranchControllerGetBankBranch$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerGetBankBranch(params: { bankBranchId: number }): Observable<BankBranchDto> {
        return this.bankBranchControllerGetBankBranch$Response(params).pipe(map((r: StrictHttpResponse<BankBranchDto>) => r.body as BankBranchDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankBranchControllerDeleteBankBranch()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerDeleteBankBranch$Response(params: { bankBranchId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BankBranchService.BankBranchControllerDeleteBankBranchPath, 'delete');
        if (params) {
            rb.path('bankBranchId', params.bankBranchId, {});
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
     * To access the full response (for headers, for example), `bankBranchControllerDeleteBankBranch$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerDeleteBankBranch(params: { bankBranchId: number }): Observable<void> {
        return this.bankBranchControllerDeleteBankBranch$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankBranchControllerGetBankBranches()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerGetBankBranches$Response(params?: {
        limit?: number;
        skip?: number;
        bankId?: any;

        /**
         * searchKeyword is matched branchName or branchCode
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<BankBranchResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankBranchService.BankBranchControllerGetBankBranchesPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('bankId', params.bankId, {});
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
                    return r as StrictHttpResponse<BankBranchResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankBranchControllerGetBankBranches$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankBranchControllerGetBankBranches(params?: {
        limit?: number;
        skip?: number;
        bankId?: any;

        /**
         * searchKeyword is matched branchName or branchCode
         */
        searchKeyword?: any;
    }): Observable<BankBranchResponseDto> {
        return this.bankBranchControllerGetBankBranches$Response(params).pipe(
            map((r: StrictHttpResponse<BankBranchResponseDto>) => r.body as BankBranchResponseDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankBranchControllerUpdateBankBranch()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankBranchControllerUpdateBankBranch$Response(params: { body: UpdateBankBranchDto }): Observable<StrictHttpResponse<UpdateBankBranchDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankBranchService.BankBranchControllerUpdateBankBranchPath, 'put');
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
                    return r as StrictHttpResponse<UpdateBankBranchDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankBranchControllerUpdateBankBranch$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankBranchControllerUpdateBankBranch(params: { body: UpdateBankBranchDto }): Observable<UpdateBankBranchDto> {
        return this.bankBranchControllerUpdateBankBranch$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBankBranchDto>) => r.body as UpdateBankBranchDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankBranchControllerCreateBankBranch()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankBranchControllerCreateBankBranch$Response(params: { body: CreateBankBranchDto }): Observable<StrictHttpResponse<UpdateBankBranchDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankBranchService.BankBranchControllerCreateBankBranchPath, 'post');
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
                    return r as StrictHttpResponse<UpdateBankBranchDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankBranchControllerCreateBankBranch$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankBranchControllerCreateBankBranch(params: { body: CreateBankBranchDto }): Observable<UpdateBankBranchDto> {
        return this.bankBranchControllerCreateBankBranch$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBankBranchDto>) => r.body as UpdateBankBranchDto)
        );
    }
}
