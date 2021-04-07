/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BourseBoardDto } from '../models/bourse-board-dto';
import { CreateBourseBoardDto } from '../models/create-bourse-board-dto';
import { UpdateBourseBoardDto } from '../models/update-bourse-board-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BourseBoardService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation bourseBoardControllerGetBourseBoard
     */
    static readonly BourseBoardControllerGetBourseBoardPath = '/api/v1/bourse-board/{bourseBoardId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseBoardControllerGetBourseBoard()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerGetBourseBoard$Response(params: { bourseBoardId: number }): Observable<StrictHttpResponse<BourseBoardDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseBoardService.BourseBoardControllerGetBourseBoardPath, 'get');
        if (params) {
            rb.path('bourseBoardId', params.bourseBoardId, {});
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
                    return r as StrictHttpResponse<BourseBoardDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseBoardControllerGetBourseBoard$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerGetBourseBoard(params: { bourseBoardId: number }): Observable<BourseBoardDto> {
        return this.bourseBoardControllerGetBourseBoard$Response(params).pipe(
            map((r: StrictHttpResponse<BourseBoardDto>) => r.body as BourseBoardDto)
        );
    }

    /**
     * Path part for operation bourseBoardControllerDeleteBourseBoard
     */
    static readonly BourseBoardControllerDeleteBourseBoardPath = '/api/v1/bourse-board/{bourseBoardId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseBoardControllerDeleteBourseBoard()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerDeleteBourseBoard$Response(params: { bourseBoardId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BourseBoardService.BourseBoardControllerDeleteBourseBoardPath, 'delete');
        if (params) {
            rb.path('bourseBoardId', params.bourseBoardId, {});
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
     * To access the full response (for headers, for example), `bourseBoardControllerDeleteBourseBoard$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerDeleteBourseBoard(params: { bourseBoardId: number }): Observable<void> {
        return this.bourseBoardControllerDeleteBourseBoard$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation bourseBoardControllerGetBourseBoards
     */
    static readonly BourseBoardControllerGetBourseBoardsPath = '/api/v1/bourse-board';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseBoardControllerGetBourseBoards()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerGetBourseBoards$Response(params?: { name?: string; code?: number }): Observable<StrictHttpResponse<Array<BourseBoardDto>>> {
        const rb = new RequestBuilder(this.rootUrl, BourseBoardService.BourseBoardControllerGetBourseBoardsPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<Array<BourseBoardDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseBoardControllerGetBourseBoards$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseBoardControllerGetBourseBoards(params?: { name?: string; code?: number }): Observable<Array<BourseBoardDto>> {
        return this.bourseBoardControllerGetBourseBoards$Response(params).pipe(
            map((r: StrictHttpResponse<Array<BourseBoardDto>>) => r.body as Array<BourseBoardDto>)
        );
    }

    /**
     * Path part for operation bourseBoardControllerUpdateBourseBoard
     */
    static readonly BourseBoardControllerUpdateBourseBoardPath = '/api/v1/bourse-board';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseBoardControllerUpdateBourseBoard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseBoardControllerUpdateBourseBoard$Response(params: { body: UpdateBourseBoardDto }): Observable<StrictHttpResponse<UpdateBourseBoardDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseBoardService.BourseBoardControllerUpdateBourseBoardPath, 'put');
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
                    return r as StrictHttpResponse<UpdateBourseBoardDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseBoardControllerUpdateBourseBoard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseBoardControllerUpdateBourseBoard(params: { body: UpdateBourseBoardDto }): Observable<UpdateBourseBoardDto> {
        return this.bourseBoardControllerUpdateBourseBoard$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBourseBoardDto>) => r.body as UpdateBourseBoardDto)
        );
    }

    /**
     * Path part for operation bourseBoardControllerCreateBourseBoard
     */
    static readonly BourseBoardControllerCreateBourseBoardPath = '/api/v1/bourse-board';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseBoardControllerCreateBourseBoard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseBoardControllerCreateBourseBoard$Response(params: { body: CreateBourseBoardDto }): Observable<StrictHttpResponse<UpdateBourseBoardDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseBoardService.BourseBoardControllerCreateBourseBoardPath, 'post');
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
                    return r as StrictHttpResponse<UpdateBourseBoardDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseBoardControllerCreateBourseBoard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseBoardControllerCreateBourseBoard(params: { body: CreateBourseBoardDto }): Observable<UpdateBourseBoardDto> {
        return this.bourseBoardControllerCreateBourseBoard$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBourseBoardDto>) => r.body as UpdateBourseBoardDto)
        );
    }
}
