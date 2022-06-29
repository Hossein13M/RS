import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { AssetFundsDto } from '../models/asset-funds-dto';
import { BondsDto } from '../models/bonds-dto';
import { CodDto } from '../models/cod-dto';
import { DepositsDto } from '../models/deposits-dto';
import { IdAndTitleDto } from '../models/id-and-title-dto';
import { StockDtoNl } from '../models/stock-dto-nl';
import { StocksDto } from '../models/stocks-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AssetsService extends BaseService {
    static readonly AssetsControllerGetAssetBasketsPath = '/api/v1/asset/basket';
    static readonly AssetsControllerGetAssetFundsPath = '/api/v1/asset/fund';
    static readonly AssetsControllerGetIsBourseCategoryPath = '/api/v1/asset/is-bourse-category';
    static readonly AssetsControllerGetBondAssetsPath = '/api/v1/asset/bonds';
    static readonly AssetsControllerGetBondAssetsNlPath = '/api/v1/asset/nl/bonds';
    static readonly AssetsControllerGetStockAssetsPath = '/api/v1/asset/stocks';
    static readonly AssetsControllerGetStockAssetsNlPath = '/api/v1/asset/nl/stocks';
    static readonly AssetsControllerGetFundAssetsPath = '/api/v1/asset/funds';
    static readonly AssetsControllerGetFundAssetsNlPath = '/api/v1/asset/nl/funds';
    static readonly AssetsControllerGetDepositAssetsPath = '/api/v1/asset/deposits';
    static readonly AssetsControllerGetEtfDtfAssetsPath = '/api/v1/asset/etf-dtf';
    static readonly AssetsControllerGetCertificateOfDepositPath = '/api/v1/asset/cod';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

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

    assetsControllerGetAssetFunds(params: { basketIds: Array<number> }): Observable<Array<AssetFundsDto>> {
        return this.assetsControllerGetAssetFunds$Response(params).pipe(map((r: StrictHttpResponse<Array<AssetFundsDto>>) => r.body as Array<AssetFundsDto>));
    }

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

    assetsControllerGetIsBourseCategory(params?: {}): Observable<Array<IdAndTitleDto>> {
        return this.assetsControllerGetIsBourseCategory$Response(params).pipe(
            map((r: StrictHttpResponse<Array<IdAndTitleDto>>) => r.body as Array<IdAndTitleDto>)
        );
    }

    assetsControllerGetBondAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<StrictHttpResponse<BondsDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetBondAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAssets', params.listedAssets, {});
            rb.query('nonlistedAssets', params.nonlistedAssets, {});
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

    assetsControllerGetBondAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<BondsDto> {
        return this.assetsControllerGetBondAssets$Response(params).pipe(map((r: StrictHttpResponse<BondsDto>) => r.body as BondsDto));
    }

    assetsControllerGetStockAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<StrictHttpResponse<StocksDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetStockAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAssets', params.listedAssets, {});
            rb.query('nonlistedAssets', params.nonlistedAssets, {});
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

    assetsControllerGetStockAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;
        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<StocksDto> {
        return this.assetsControllerGetStockAssets$Response(params).pipe(map((r: StrictHttpResponse<StocksDto>) => r.body as StocksDto));
    }

    assetsControllerGetStockAssetsNl$Response(params?: {
        tamadonAssets?: boolean;

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

    assetsControllerGetStockAssetsNl(params?: {
        tamadonAssets?: boolean;

        date?: string;
    }): Observable<StockDtoNl> {
        return this.assetsControllerGetStockAssetsNl$Response(params).pipe(map((r: StrictHttpResponse<StockDtoNl>) => r.body as StockDtoNl));
    }

    assetsControllerGetFundAssets$Response(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<StrictHttpResponse<StocksDto>> {
        const rb = new RequestBuilder(this.rootUrl, AssetsService.AssetsControllerGetFundAssetsPath, 'get');
        if (params) {
            rb.query('fundNationalCodes', params.fundNationalCodes, {});
            rb.query('tamadonAssets', params.tamadonAssets, {});
            rb.query('date', params.date, {});
            rb.query('listedAssets', params.listedAssets, {});
            rb.query('nonlistedAssets', params.nonlistedAssets, {});
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

    assetsControllerGetFundAssets(params: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;
        date?: string;
        listedAssets: boolean;
        nonlistedAssets: boolean;
    }): Observable<StocksDto> {
        return this.assetsControllerGetFundAssets$Response(params).pipe(map((r: StrictHttpResponse<StocksDto>) => r.body as StocksDto));
    }

    assetsControllerGetDepositAssets$Response(params?: {
        fundNationalCodes?: Array<string>;
        tamadonAssets?: boolean;

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

    assetsControllerGetDepositAssets(params?: { fundNationalCodes?: Array<string>; tamadonAssets?: boolean; date?: string }): Observable<DepositsDto> {
        return this.assetsControllerGetDepositAssets$Response(params).pipe(map((r: StrictHttpResponse<DepositsDto>) => r.body as DepositsDto));
    }

    assetsControllerGetCertificateOfDeposit$Response(params?: { date?: string }): Observable<StrictHttpResponse<CodDto>> {
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

    assetsControllerGetCertificateOfDeposit(params?: { date?: string }): Observable<CodDto> {
        return this.assetsControllerGetCertificateOfDeposit$Response(params).pipe(map((r: StrictHttpResponse<CodDto>) => r.body as CodDto));
    }
}
