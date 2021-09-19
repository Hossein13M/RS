/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { AssetFundsDto } from '../models/asset-funds-dto';
import { BondsDto } from '../models/bonds-dto';
import { BondsDtoNl } from '../models/bonds-dto-nl';
import { CodDto } from '../models/cod-dto';
import { DepositsDto } from '../models/deposits-dto';
import { EtfDtfDto } from '../models/etf-dtf-dto';
import { IdAndTitleDto } from '../models/id-and-title-dto';
import { StockDtoNl } from '../models/stock-dto-nl';
import { StocksDto } from '../models/stocks-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AssetsService extends BaseService {
    /**
     * Path part for operation assetsControllerGetAssetBaskets
     */
    static readonly AssetsControllerGetAssetBasketsPath = '/api/v1/asset/basket';
    /**
     * Path part for operation assetsControllerGetAssetFunds
     */
    static readonly AssetsControllerGetAssetFundsPath = '/api/v1/asset/fund';
    /**
     * Path part for operation assetsControllerGetAssetsCategory
     */
    static readonly AssetsControllerGetAssetsCategoryPath = '/api/v1/asset/category';
    /**
     * Path part for operation assetsControllerGetIsBourseCategory
     */
    static readonly AssetsControllerGetIsBourseCategoryPath = '/api/v1/asset/is-bourse-category';
    /**
     * Path part for operation assetsControllerGetBondAssets
     */
    static readonly AssetsControllerGetBondAssetsPath = '/api/v1/asset/bonds';
    /**
     * Path part for operation assetsControllerGetBondAssetsNl
     */
    static readonly AssetsControllerGetBondAssetsNlPath = '/api/v1/asset/nl/bonds';
    /**
     * Path part for operation assetsControllerGetStockAssets
     */
    static readonly AssetsControllerGetStockAssetsPath = '/api/v1/asset/stocks';
    /**
     * Path part for operation assetsControllerGetStockAssetsNl
     */
    static readonly AssetsControllerGetStockAssetsNlPath = '/api/v1/asset/nl/stocks';
    /**
     * Path part for operation assetsControllerGetFundAssets
     */
    static readonly AssetsControllerGetFundAssetsPath = '/api/v1/asset/funds';
    /**
     * Path part for operation assetsControllerGetFundAssetsNl
     */
    static readonly AssetsControllerGetFundAssetsNlPath = '/api/v1/asset/nl/funds';
    /**
     * Path part for operation assetsControllerGetDepositAssets
     */
    static readonly AssetsControllerGetDepositAssetsPath = '/api/v1/asset/deposits';
    /**
     * Path part for operation assetsControllerGetEtfDtfAssets
     */
    static readonly AssetsControllerGetEtfDtfAssetsPath = '/api/v1/asset/etf-dtf';
    /**
     * Path part for operation assetsControllerGetCertificateOfDeposit
     */
    static readonly AssetsControllerGetCertificateOfDepositPath = '/api/v1/asset/cod';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetAssetBaskets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetBaskets$Response(params?: {}): Observable<StrictHttpResponse<Array<IdAndTitleDto>>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetAssetBasketsPath, 'get');
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
                    return r as StrictHttpResponse<Array<IdAndTitleDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetAssetBaskets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetBaskets(params?: {}): Observable<Array<IdAndTitleDto>> {
        return this.assetsControllerGetAssetBaskets$Response(params).pipe(map((r: StrictHttpResponse<Array<IdAndTitleDto>>) => r.body as Array<IdAndTitleDto>));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetAssetFunds()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetFunds$Response(params: { basketIds: Array<number> }): Observable<StrictHttpResponse<Array<AssetFundsDto>>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetAssetFundsPath, 'get');
        if (params) {
            rb.query('basketIds', params.basketIds, {});
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
                    return r as StrictHttpResponse<Array<AssetFundsDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetAssetFunds$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetFunds(params: { basketIds: Array<number> }): Observable<Array<AssetFundsDto>> {
        return this.assetsControllerGetAssetFunds$Response(params).pipe(map((r: StrictHttpResponse<Array<AssetFundsDto>>) => r.body as Array<AssetFundsDto>));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetAssetsCategory()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetsCategory$Response(params?: {}): Observable<StrictHttpResponse<Array<IdAndTitleDto>>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetAssetsCategoryPath, 'get');
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
                    return r as StrictHttpResponse<Array<IdAndTitleDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetAssetsCategory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetAssetsCategory(params?: {}): Observable<Array<IdAndTitleDto>> {
        return this.assetsControllerGetAssetsCategory$Response(params).pipe(
            map((r: StrictHttpResponse<Array<IdAndTitleDto>>) => r.body as Array<IdAndTitleDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetIsBourseCategory()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetIsBourseCategory$Response(params?: {}): Observable<StrictHttpResponse<Array<IdAndTitleDto>>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetIsBourseCategoryPath, 'get');
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
                    return r as StrictHttpResponse<Array<IdAndTitleDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetIsBourseCategory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetIsBourseCategory(params?: {}): Observable<Array<IdAndTitleDto>> {
        return this.assetsControllerGetIsBourseCategory$Response(params).pipe(
            map((r: StrictHttpResponse<Array<IdAndTitleDto>>) => r.body as Array<IdAndTitleDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetBondAssets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetBondAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StrictHttpResponse<BondsDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetBondAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
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
                    return r as StrictHttpResponse<BondsDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetBondAssets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetBondAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<BondsDto> {
        return this.assetsControllerGetBondAssets$Response(params).pipe(map((r: StrictHttpResponse<BondsDto>) => r.body as BondsDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetBondAssetsNl()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetBondAssetsNl$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StrictHttpResponse<BondsDtoNl>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetBondAssetsNlPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
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
                    return r as StrictHttpResponse<BondsDtoNl>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetBondAssetsNl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetBondAssetsNl(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<BondsDtoNl> {
        return this.assetsControllerGetBondAssetsNl$Response(params).pipe(map((r: StrictHttpResponse<BondsDtoNl>) => r.body as BondsDtoNl));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetStockAssets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetStockAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StrictHttpResponse<StocksDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetStockAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
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
                    return r as StrictHttpResponse<StocksDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetStockAssets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetStockAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StocksDto> {
        return this.assetsControllerGetStockAssets$Response(params).pipe(map((r: StrictHttpResponse<StocksDto>) => r.body as StocksDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetStockAssetsNl()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetStockAssetsNl$Response(params?: {
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StrictHttpResponse<StockDtoNl>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetStockAssetsNlPath, 'get');
        if (params) {
            rb.query('tamadonAssets', params.tamadonAssets, {});
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
                    return r as StrictHttpResponse<StockDtoNl>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetStockAssetsNl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetStockAssetsNl(params?: {
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StockDtoNl> {
        return this.assetsControllerGetStockAssetsNl$Response(params).pipe(map((r: StrictHttpResponse<StockDtoNl>) => r.body as StockDtoNl));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetFundAssets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetFundAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StrictHttpResponse<StocksDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetFundAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
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
                    return r as StrictHttpResponse<StocksDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetFundAssets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetFundAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StocksDto> {
        return this.assetsControllerGetFundAssets$Response(params).pipe(map((r: StrictHttpResponse<StocksDto>) => r.body as StocksDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetFundAssetsNl()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetFundAssetsNl$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StrictHttpResponse<StockDtoNl>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetFundAssetsNlPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
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
                    return r as StrictHttpResponse<StockDtoNl>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetFundAssetsNl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetFundAssetsNl(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
    }): Observable<StockDtoNl> {
        return this.assetsControllerGetFundAssetsNl$Response(params).pipe(map((r: StrictHttpResponse<StockDtoNl>) => r.body as StockDtoNl));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetDepositAssets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetDepositAssets$Response(params?: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StrictHttpResponse<DepositsDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetDepositAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
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
                    return r as StrictHttpResponse<DepositsDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetDepositAssets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetDepositAssets(params?: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<DepositsDto> {
        return this.assetsControllerGetDepositAssets$Response(params).pipe(map((r: StrictHttpResponse<DepositsDto>) => r.body as DepositsDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetEtfDtfAssets()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetEtfDtfAssets$Response(params: {
        /**
         * 2020-01-01
         */
        date: string;
        fundNationalCodes?: Array<string>;
        hasTamadonAssets?: boolean;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
        bondsAssets: boolean;
        stocksAssets: boolean;
        fundsAssets: boolean;
    }): Observable<StrictHttpResponse<EtfDtfDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetEtfDtfAssetsPath, 'get');
        if (params) {
            rb.query('date', params.date, {});
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('hasTamadonAssets', params.hasTamadonAssets, {});
            rb.query('listedAsstes', params.listedAsstes, {});
            rb.query('nonlistedAsstes', params.nonlistedAsstes, {});
            rb.query('bondsAssets', params.bondsAssets, {});
            rb.query('stocksAssets', params.stocksAssets, {});
            rb.query('fundsAssets', params.fundsAssets, {});
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
                    return r as StrictHttpResponse<EtfDtfDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetEtfDtfAssets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetEtfDtfAssets(params: {
        /**
         * 2020-01-01
         */
        date: string;
        fundNationalCodes?: Array<string>;
        hasTamadonAssets?: boolean;
        listedAsstes: boolean;
        nonlistedAsstes: boolean;
        bondsAssets: boolean;
        stocksAssets: boolean;
        fundsAssets: boolean;
    }): Observable<EtfDtfDto> {
        return this.assetsControllerGetEtfDtfAssets$Response(params).pipe(map((r: StrictHttpResponse<EtfDtfDto>) => r.body as EtfDtfDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `assetsControllerGetCertificateOfDeposit()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetCertificateOfDeposit$Response(params?: {
        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<StrictHttpResponse<CodDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetCertificateOfDepositPath, 'get');
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
                    return r as StrictHttpResponse<CodDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `assetsControllerGetCertificateOfDeposit$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    assetsControllerGetCertificateOfDeposit(params?: {
        /**
         * 2020-01-01
         */
        date?: string;
    }): Observable<CodDto> {
        return this.assetsControllerGetCertificateOfDeposit$Response(params).pipe(map((r: StrictHttpResponse<CodDto>) => r.body as CodDto));
    }
}
