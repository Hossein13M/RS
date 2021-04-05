/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { GuarantorDto } from '../models/guarantor-dto';
import { GuarantorDtoWithId } from '../models/guarantor-dto-with-id';
import { ResponseGuarantorDto } from '../models/response-guarantor-dto';
import { UpdateGuarantorDto } from '../models/update-guarantor-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class GuarantorService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation guarantorControllerGetGuarantor
     */
    static readonly GuarantorControllerGetGuarantorPath = '/api/v1/guarantor/{guarantorId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `guarantorControllerGetGuarantor()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerGetGuarantor$Response(params: { guarantorId: number }): Observable<StrictHttpResponse<GuarantorDtoWithId>> {
        const rb = new RequestBuilder(this.rootUrl, GuarantorService.GuarantorControllerGetGuarantorPath, 'get');
        if (params) {
            rb.path('guarantorId', params.guarantorId, {});
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
                    return r as StrictHttpResponse<GuarantorDtoWithId>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `guarantorControllerGetGuarantor$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerGetGuarantor(params: { guarantorId: number }): Observable<GuarantorDtoWithId> {
        return this.guarantorControllerGetGuarantor$Response(params).pipe(
            map((r: StrictHttpResponse<GuarantorDtoWithId>) => r.body as GuarantorDtoWithId)
        );
    }

    /**
     * Path part for operation guarantorControllerDeleteGuarantor
     */
    static readonly GuarantorControllerDeleteGuarantorPath = '/api/v1/guarantor/{guarantorId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `guarantorControllerDeleteGuarantor()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerDeleteGuarantor$Response(params: { guarantorId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, GuarantorService.GuarantorControllerDeleteGuarantorPath, 'delete');
        if (params) {
            rb.path('guarantorId', params.guarantorId, {});
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
     * To access the full response (for headers, for example), `guarantorControllerDeleteGuarantor$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerDeleteGuarantor(params: { guarantorId: number }): Observable<void> {
        return this.guarantorControllerDeleteGuarantor$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation guarantorControllerGetGuarantors
     */
    static readonly GuarantorControllerGetGuarantorsPath = '/api/v1/guarantor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `guarantorControllerGetGuarantors()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerGetGuarantors$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<ResponseGuarantorDto>> {
        const rb = new RequestBuilder(this.rootUrl, GuarantorService.GuarantorControllerGetGuarantorsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
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
                    return r as StrictHttpResponse<ResponseGuarantorDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `guarantorControllerGetGuarantors$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    guarantorControllerGetGuarantors(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<ResponseGuarantorDto> {
        return this.guarantorControllerGetGuarantors$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseGuarantorDto>) => r.body as ResponseGuarantorDto)
        );
    }

    /**
     * Path part for operation guarantorControllerUpdateGuarantor
     */
    static readonly GuarantorControllerUpdateGuarantorPath = '/api/v1/guarantor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `guarantorControllerUpdateGuarantor()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    guarantorControllerUpdateGuarantor$Response(params: { body: UpdateGuarantorDto }): Observable<StrictHttpResponse<GuarantorDtoWithId>> {
        const rb = new RequestBuilder(this.rootUrl, GuarantorService.GuarantorControllerUpdateGuarantorPath, 'put');
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
                    return r as StrictHttpResponse<GuarantorDtoWithId>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `guarantorControllerUpdateGuarantor$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    guarantorControllerUpdateGuarantor(params: { body: UpdateGuarantorDto }): Observable<GuarantorDtoWithId> {
        return this.guarantorControllerUpdateGuarantor$Response(params).pipe(
            map((r: StrictHttpResponse<GuarantorDtoWithId>) => r.body as GuarantorDtoWithId)
        );
    }

    /**
     * Path part for operation guarantorControllerCreateGuarantor
     */
    static readonly GuarantorControllerCreateGuarantorPath = '/api/v1/guarantor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `guarantorControllerCreateGuarantor()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    guarantorControllerCreateGuarantor$Response(params: { body: GuarantorDto }): Observable<StrictHttpResponse<GuarantorDtoWithId>> {
        const rb = new RequestBuilder(this.rootUrl, GuarantorService.GuarantorControllerCreateGuarantorPath, 'post');
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
                    return r as StrictHttpResponse<GuarantorDtoWithId>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `guarantorControllerCreateGuarantor$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    guarantorControllerCreateGuarantor(params: { body: GuarantorDto }): Observable<GuarantorDtoWithId> {
        return this.guarantorControllerCreateGuarantor$Response(params).pipe(
            map((r: StrictHttpResponse<GuarantorDtoWithId>) => r.body as GuarantorDtoWithId)
        );
    }
}
