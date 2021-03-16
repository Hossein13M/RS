import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class WizardApiService {
    private static wizardApi = '/api/v1/flow-wizard';
    private static flowInstanceHistoryApi = '/api/v1/flow-history/{flowInstanceId}';
    private static flowInstanceNoteApi = '/api/v1/flow-note/{flowInstanceId}';
    private static flowInstanceCreateNoteApi = '/api/v1/flow-note';

    constructor(private apiClientService: ApiClientService) {}

    public getAllFlowInstanceHistory(flowInstanceId, fc?: FormContainer) {
        const api = WizardApiService.flowInstanceHistoryApi.replace('{flowInstanceId}', flowInstanceId);
        return this.apiClientService.get(api, fc);
    }

    public getAllFlowInstanceNote(flowInstanceId, fc?: FormContainer) {
        const api = WizardApiService.flowInstanceNoteApi.replace('{flowInstanceId}', flowInstanceId);
        return this.apiClientService.get(api, fc);
    }

    public createFlowInstanceNote(model, fc: FormContainer) {
        return this.apiClientService.post(WizardApiService.flowInstanceCreateNoteApi, model, fc);
    }
}
