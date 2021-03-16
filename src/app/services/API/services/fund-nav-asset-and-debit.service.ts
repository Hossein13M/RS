/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFundNavAssetsAndDebitsDto } from '../models/create-fund-nav-assets-and-debits-dto';
import { GetFundAssetsAndDebitsResponseDto } from '../models/get-fund-assets-and-debits-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FundNavAssetAndDebitService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit
     */
    static readonly FundNavAssetAndDebitControllerCreateFundNavAssetAndDebitPath = '/api/v1/fund-nav-asset-and-debit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit$Response(params: {
        body: CreateFundNavAssetsAndDebitsDto;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            FundNavAssetAndDebitService.FundNavAssetAndDebitControllerCreateFundNavAssetAndDebitPath,
            'post'
        );
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
     * To access the full response (for headers, for example), `fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit(params: { body: CreateFundNavAssetsAndDebitsDto }): Observable<void> {
        return this.fundNavAssetAndDebitControllerCreateFundNavAssetAndDebit$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits
     */
    static readonly FundNavAssetAndDebitControllerGetFundNavAssetsAndDebitsPath = '/api/v1/fund-nav-asset-and-debit/{fundNationalId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits$Response(params: {
        fundNationalId: string;
    }): Observable<StrictHttpResponse<Array<GetFundAssetsAndDebitsResponseDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            FundNavAssetAndDebitService.FundNavAssetAndDebitControllerGetFundNavAssetsAndDebitsPath,
            'get'
        );
        if (params) {
            rb.path('fundNationalId', params.fundNationalId, {});
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
                    return r as StrictHttpResponse<Array<GetFundAssetsAndDebitsResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits(params: {
        fundNationalId: string;
    }): Observable<Array<GetFundAssetsAndDebitsResponseDto>> {
        return this.fundNavAssetAndDebitControllerGetFundNavAssetsAndDebits$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFundAssetsAndDebitsResponseDto>>) => r.body as Array<GetFundAssetsAndDebitsResponseDto>)
        );
    }
}
