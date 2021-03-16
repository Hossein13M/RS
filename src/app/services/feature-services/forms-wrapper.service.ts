import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FormsWrapperService {
    flowId;
    flowInstanceId;
    formId;
    submittedData;
    firstTime = true;

    constructor(private apiClientService: ApiClientService) {}

    getFormDocument(api, fc?: FormContainer): any {
        api = `${api}?flowInstanceId=${this.flowInstanceId}&formId=${this.formId}`;
        return this.apiClientService.get(api, fc);
    }

    createFormDocument(api, model, fc?: FormContainer): any {
        const m = {
            flowId: this.flowId,
            flowInstanceId: this.flowInstanceId,
            formId: this.formId,
            submittedData: model,
        };

        if (this.firstTime) {
            this.firstTime = false;
            return this.apiClientService.post(api, m, fc);
        } else {
            return this.apiClientService.put(api, fc, m);
        }
    }
}
