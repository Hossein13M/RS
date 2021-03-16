import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { CreateMessageReq } from '../../shared/models/MessageModel';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class MessageApiService {
    private static GetOutBoxMessagesApi = '/api/v1/message/outbox';
    private static GetInBOxMessagesApi = '/api/v1/message/inbox';
    private static DeleteOutBoxMessageApi = '/api/v1/message/outbox/{msgId}';
    private static DeleteInBoxMessageApi = '/api/v1/message/inbox/{msgId}';
    private static CreateMessageApi = '/api/v1/message';
    private static GetMessageById = '/api/v1/message/{msgId}';

    constructor(private apiClientService: ApiClientService) {}

    deleteInboxMessage(messageId, fc?: FormContainer) {
        const api = MessageApiService.DeleteInBoxMessageApi.replace('{msgId}', messageId);
        return this.apiClientService.delete(api, fc);
    }

    deleteOutboxMessage(messageId, fc?: FormContainer) {
        const api = MessageApiService.DeleteOutBoxMessageApi.replace('{msgId}', messageId);
        return this.apiClientService.delete(api, fc);
    }

    createMessage(data: CreateMessageReq, fc?: FormContainer) {
        return this.apiClientService.post(MessageApiService.CreateMessageApi, data, fc);
    }

    getMessageById(messageId, fc?: FormContainer) {
        const api = MessageApiService.GetMessageById.replace('{msgId}', messageId);
        return this.apiClientService.get(api, fc);
    }

    getAllInbox(fc?: FormContainer) {
        return this.apiClientService.get(MessageApiService.GetInBOxMessagesApi, fc);
    }

    getAllOutbox(fc?: FormContainer) {
        return this.apiClientService.get(MessageApiService.GetOutBoxMessagesApi, fc);
    }
}
