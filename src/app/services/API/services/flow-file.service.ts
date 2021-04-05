/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFileHistoryDto } from '../models/create-file-history-dto';
import { DownloadFileResponseDto } from '../models/download-file-response-dto';
import { GetFileHistoryResponseDto } from '../models/get-file-history-response-dto';
import { GetObjectNameResponseDto } from '../models/get-object-name-response-dto';
import { UploadFileResponseDto } from '../models/upload-file-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FlowFileService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowFileControllerUploadFile
     */
    static readonly FlowFileControllerUploadFilePath = '/api/v1/flow-file/upload-file';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerUploadFile()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerUploadFile$Response(params: { entityId: string }): Observable<StrictHttpResponse<UploadFileResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerUploadFilePath, 'get');
        if (params) {
            rb.query('entityId', params.entityId, {});
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
                    return r as StrictHttpResponse<UploadFileResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerUploadFile$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerUploadFile(params: { entityId: string }): Observable<UploadFileResponseDto> {
        return this.flowFileControllerUploadFile$Response(params).pipe(
            map((r: StrictHttpResponse<UploadFileResponseDto>) => r.body as UploadFileResponseDto)
        );
    }

    /**
     * Path part for operation flowFileControllerDownloadFile
     */
    static readonly FlowFileControllerDownloadFilePath = '/api/v1/flow-file/download-file';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerDownloadFile()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerDownloadFile$Response(params: {
        entityId: string;
        objectName?: string;
    }): Observable<StrictHttpResponse<DownloadFileResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerDownloadFilePath, 'get');
        if (params) {
            rb.query('entityId', params.entityId, {});
            rb.query('objectName', params.objectName, {});
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
                    return r as StrictHttpResponse<DownloadFileResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerDownloadFile$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerDownloadFile(params: { entityId: string; objectName?: string }): Observable<DownloadFileResponseDto> {
        return this.flowFileControllerDownloadFile$Response(params).pipe(
            map((r: StrictHttpResponse<DownloadFileResponseDto>) => r.body as DownloadFileResponseDto)
        );
    }

    /**
     * Path part for operation flowFileControllerCreateFileHistory
     */
    static readonly FlowFileControllerCreateFileHistoryPath = '/api/v1/flow-file/history';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerCreateFileHistory()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowFileControllerCreateFileHistory$Response(params: { body: CreateFileHistoryDto }): Observable<StrictHttpResponse<GetFileHistoryResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerCreateFileHistoryPath, 'post');
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
                    return r as StrictHttpResponse<GetFileHistoryResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerCreateFileHistory$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowFileControllerCreateFileHistory(params: { body: CreateFileHistoryDto }): Observable<GetFileHistoryResponseDto> {
        return this.flowFileControllerCreateFileHistory$Response(params).pipe(
            map((r: StrictHttpResponse<GetFileHistoryResponseDto>) => r.body as GetFileHistoryResponseDto)
        );
    }

    /**
     * Path part for operation flowFileControllerGetObjectName
     */
    static readonly FlowFileControllerGetObjectNamePath = '/api/v1/flow-file/object-name';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerGetObjectName()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerGetObjectName$Response(params: {
        entityId: string;
        fileName: string;
    }): Observable<StrictHttpResponse<GetObjectNameResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerGetObjectNamePath, 'get');
        if (params) {
            rb.query('entityId', params.entityId, {});
            rb.query('fileName', params.fileName, {});
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
                    return r as StrictHttpResponse<GetObjectNameResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerGetObjectName$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerGetObjectName(params: { entityId: string; fileName: string }): Observable<GetObjectNameResponseDto> {
        return this.flowFileControllerGetObjectName$Response(params).pipe(
            map((r: StrictHttpResponse<GetObjectNameResponseDto>) => r.body as GetObjectNameResponseDto)
        );
    }

    /**
     * Path part for operation flowFileControllerGetFlowFileHistory
     */
    static readonly FlowFileControllerGetFlowFileHistoryPath = '/api/v1/flow-file/history/{entityId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerGetFlowFileHistory()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerGetFlowFileHistory$Response(params: { entityId: string }): Observable<StrictHttpResponse<Array<GetFileHistoryResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerGetFlowFileHistoryPath, 'get');
        if (params) {
            rb.path('entityId', params.entityId, {});
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
                    return r as StrictHttpResponse<Array<GetFileHistoryResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerGetFlowFileHistory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerGetFlowFileHistory(params: { entityId: string }): Observable<Array<GetFileHistoryResponseDto>> {
        return this.flowFileControllerGetFlowFileHistory$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFileHistoryResponseDto>>) => r.body as Array<GetFileHistoryResponseDto>)
        );
    }

    /**
     * Path part for operation flowFileControllerDownloadContractDocs
     */
    static readonly FlowFileControllerDownloadContractDocsPath = '/api/v1/flow-file/download-contract-doc';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFileControllerDownloadContractDocs()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerDownloadContractDocs$Response(params: {
        entityId: string;
        objectName: string;
    }): Observable<StrictHttpResponse<DownloadFileResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFileService.FlowFileControllerDownloadContractDocsPath, 'get');
        if (params) {
            rb.query('entityId', params.entityId, {});
            rb.query('objectName', params.objectName, {});
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
                    return r as StrictHttpResponse<DownloadFileResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFileControllerDownloadContractDocs$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFileControllerDownloadContractDocs(params: { entityId: string; objectName: string }): Observable<DownloadFileResponseDto> {
        return this.flowFileControllerDownloadContractDocs$Response(params).pipe(
            map((r: StrictHttpResponse<DownloadFileResponseDto>) => r.body as DownloadFileResponseDto)
        );
    }
}
