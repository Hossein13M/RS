/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateMessageDto } from '../models/create-message-dto';
import { MessageListInboxResponseDto } from '../models/message-list-inbox-response-dto';
import { MessageListResponseDto } from '../models/message-list-response-dto';
import { MessageResponseDto } from '../models/message-response-dto';
import { MessageResponseWithDetailsDto } from '../models/message-response-with-details-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class MessageService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fromUserControllerGetOutboxMessages
     */
    static readonly FromUserControllerGetOutboxMessagesPath = '/api/v1/message/outbox';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fromUserControllerGetOutboxMessages()` instead.
     *
     * This method doesn't expect any request body.
     */
    fromUserControllerGetOutboxMessages$Response(params?: {
        limit?: number;
        skip?: number;
    }): Observable<StrictHttpResponse<MessageListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.FromUserControllerGetOutboxMessagesPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
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
                    return r as StrictHttpResponse<MessageListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fromUserControllerGetOutboxMessages$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fromUserControllerGetOutboxMessages(params?: { limit?: number; skip?: number }): Observable<MessageListResponseDto> {
        return this.fromUserControllerGetOutboxMessages$Response(params).pipe(
            map((r: StrictHttpResponse<MessageListResponseDto>) => r.body as MessageListResponseDto)
        );
    }

    /**
     * Path part for operation fromUserControllerDeleteOutboxMessage
     */
    static readonly FromUserControllerDeleteOutboxMessagePath = '/api/v1/message/outbox/{msgId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fromUserControllerDeleteOutboxMessage()` instead.
     *
     * This method doesn't expect any request body.
     */
    fromUserControllerDeleteOutboxMessage$Response(params: { msgId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.FromUserControllerDeleteOutboxMessagePath, 'delete');
        if (params) {
            rb.path('msgId', params.msgId, {});
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
     * To access the full response (for headers, for example), `fromUserControllerDeleteOutboxMessage$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fromUserControllerDeleteOutboxMessage(params: { msgId: number }): Observable<void> {
        return this.fromUserControllerDeleteOutboxMessage$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation toUserControllerGetInboxMessages
     */
    static readonly ToUserControllerGetInboxMessagesPath = '/api/v1/message/inbox';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `toUserControllerGetInboxMessages()` instead.
     *
     * This method doesn't expect any request body.
     */
    toUserControllerGetInboxMessages$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * default Read and Unread
         */
        status?: 'Unread' | 'Read' | 'Deleted';
    }): Observable<StrictHttpResponse<MessageListInboxResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.ToUserControllerGetInboxMessagesPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('status', params.status, {});
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
                    return r as StrictHttpResponse<MessageListInboxResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `toUserControllerGetInboxMessages$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    toUserControllerGetInboxMessages(params?: {
        limit?: number;
        skip?: number;

        /**
         * default Read and Unread
         */
        status?: 'Unread' | 'Read' | 'Deleted';
    }): Observable<MessageListInboxResponseDto> {
        return this.toUserControllerGetInboxMessages$Response(params).pipe(
            map((r: StrictHttpResponse<MessageListInboxResponseDto>) => r.body as MessageListInboxResponseDto)
        );
    }

    /**
     * Path part for operation toUserControllerDeleteInboxMessage
     */
    static readonly ToUserControllerDeleteInboxMessagePath = '/api/v1/message/inbox/{msgId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `toUserControllerDeleteInboxMessage()` instead.
     *
     * This method doesn't expect any request body.
     */
    toUserControllerDeleteInboxMessage$Response(params: { msgId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.ToUserControllerDeleteInboxMessagePath, 'delete');
        if (params) {
            rb.path('msgId', params.msgId, {});
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
     * To access the full response (for headers, for example), `toUserControllerDeleteInboxMessage$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    toUserControllerDeleteInboxMessage(params: { msgId: number }): Observable<void> {
        return this.toUserControllerDeleteInboxMessage$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation messageControllerCreateMessage
     */
    static readonly MessageControllerCreateMessagePath = '/api/v1/message';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `messageControllerCreateMessage()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    messageControllerCreateMessage$Response(params: { body: CreateMessageDto }): Observable<StrictHttpResponse<MessageResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.MessageControllerCreateMessagePath, 'post');
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
                    return r as StrictHttpResponse<MessageResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `messageControllerCreateMessage$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    messageControllerCreateMessage(params: { body: CreateMessageDto }): Observable<MessageResponseDto> {
        return this.messageControllerCreateMessage$Response(params).pipe(
            map((r: StrictHttpResponse<MessageResponseDto>) => r.body as MessageResponseDto)
        );
    }

    /**
     * Path part for operation messageControllerGetMessage
     */
    static readonly MessageControllerGetMessagePath = '/api/v1/message/{msgId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `messageControllerGetMessage()` instead.
     *
     * This method doesn't expect any request body.
     */
    messageControllerGetMessage$Response(params: { msgId: number }): Observable<StrictHttpResponse<MessageResponseWithDetailsDto>> {
        const rb = new RequestBuilder(this.rootUrl, MessageService.MessageControllerGetMessagePath, 'get');
        if (params) {
            rb.path('msgId', params.msgId, {});
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
                    return r as StrictHttpResponse<MessageResponseWithDetailsDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `messageControllerGetMessage$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    messageControllerGetMessage(params: { msgId: number }): Observable<MessageResponseWithDetailsDto> {
        return this.messageControllerGetMessage$Response(params).pipe(
            map((r: StrictHttpResponse<MessageResponseWithDetailsDto>) => r.body as MessageResponseWithDetailsDto)
        );
    }
}
