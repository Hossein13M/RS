/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { FlowWizardCommonDto } from '../models/flow-wizard-common-dto';
import { GenerateContractFinalCodeResponseDto } from '../models/generate-contract-final-code-response-dto';
import { GetFlowWizardResponseDto } from '../models/get-flow-wizard-response-dto';
import { PauseFlowWizardDto } from '../models/pause-flow-wizard-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FlowWizardService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowWizardControllerGetFlowWizard
     */
    static readonly FlowWizardControllerGetFlowWizardPath = '/api/v1/flow-wizard';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerGetFlowWizard()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowWizardControllerGetFlowWizard$Response(params: {
        flowId: string;
        flowInstanceId: string;
    }): Observable<StrictHttpResponse<GetFlowWizardResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerGetFlowWizardPath, 'get');
        if (params) {
            rb.query('flowId', params.flowId, {});
            rb.query('flowInstanceId', params.flowInstanceId, {});
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
                    return r as StrictHttpResponse<GetFlowWizardResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerGetFlowWizard$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowWizardControllerGetFlowWizard(params: { flowId: string; flowInstanceId: string }): Observable<GetFlowWizardResponseDto> {
        return this.flowWizardControllerGetFlowWizard$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowWizardResponseDto>) => r.body as GetFlowWizardResponseDto)
        );
    }

    /**
     * Path part for operation flowWizardControllerConfirmFlowWizard
     */
    static readonly FlowWizardControllerConfirmFlowWizardPath = '/api/v1/flow-wizard/confirm';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerConfirmFlowWizard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerConfirmFlowWizard$Response(params: {
        body: FlowWizardCommonDto;
    }): Observable<StrictHttpResponse<GetFlowWizardResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerConfirmFlowWizardPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowWizardResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerConfirmFlowWizard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerConfirmFlowWizard(params: { body: FlowWizardCommonDto }): Observable<GetFlowWizardResponseDto> {
        return this.flowWizardControllerConfirmFlowWizard$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowWizardResponseDto>) => r.body as GetFlowWizardResponseDto)
        );
    }

    /**
     * Path part for operation flowWizardControllerRejectFlowWizard
     */
    static readonly FlowWizardControllerRejectFlowWizardPath = '/api/v1/flow-wizard/reject';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerRejectFlowWizard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerRejectFlowWizard$Response(params: {
        body: PauseFlowWizardDto;
    }): Observable<StrictHttpResponse<GetFlowWizardResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerRejectFlowWizardPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowWizardResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerRejectFlowWizard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerRejectFlowWizard(params: { body: PauseFlowWizardDto }): Observable<GetFlowWizardResponseDto> {
        return this.flowWizardControllerRejectFlowWizard$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowWizardResponseDto>) => r.body as GetFlowWizardResponseDto)
        );
    }

    /**
     * Path part for operation flowWizardControllerPauseFlowWizard
     */
    static readonly FlowWizardControllerPauseFlowWizardPath = '/api/v1/flow-wizard/pause';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerPauseFlowWizard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerPauseFlowWizard$Response(params: {
        body: PauseFlowWizardDto;
    }): Observable<StrictHttpResponse<GetFlowWizardResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerPauseFlowWizardPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowWizardResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerPauseFlowWizard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerPauseFlowWizard(params: { body: PauseFlowWizardDto }): Observable<GetFlowWizardResponseDto> {
        return this.flowWizardControllerPauseFlowWizard$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowWizardResponseDto>) => r.body as GetFlowWizardResponseDto)
        );
    }

    /**
     * Path part for operation flowWizardControllerReopenFlowWizard
     */
    static readonly FlowWizardControllerReopenFlowWizardPath = '/api/v1/flow-wizard/reopen';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerReopenFlowWizard()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerReopenFlowWizard$Response(params: {
        body: FlowWizardCommonDto;
    }): Observable<StrictHttpResponse<GetFlowWizardResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerReopenFlowWizardPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowWizardResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerReopenFlowWizard$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerReopenFlowWizard(params: { body: FlowWizardCommonDto }): Observable<GetFlowWizardResponseDto> {
        return this.flowWizardControllerReopenFlowWizard$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowWizardResponseDto>) => r.body as GetFlowWizardResponseDto)
        );
    }

    /**
     * Path part for operation flowWizardControllerGenerateContractFinalCode
     */
    static readonly FlowWizardControllerGenerateContractFinalCodePath = '/api/v1/flow-wizard/generate-contract-final-code';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowWizardControllerGenerateContractFinalCode()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerGenerateContractFinalCode$Response(params: {
        body: FlowWizardCommonDto;
    }): Observable<StrictHttpResponse<GenerateContractFinalCodeResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowWizardService.FlowWizardControllerGenerateContractFinalCodePath, 'post');
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
                    return r as StrictHttpResponse<GenerateContractFinalCodeResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowWizardControllerGenerateContractFinalCode$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowWizardControllerGenerateContractFinalCode(params: { body: FlowWizardCommonDto }): Observable<GenerateContractFinalCodeResponseDto> {
        return this.flowWizardControllerGenerateContractFinalCode$Response(params).pipe(
            map((r: StrictHttpResponse<GenerateContractFinalCodeResponseDto>) => r.body as GenerateContractFinalCodeResponseDto)
        );
    }
}
