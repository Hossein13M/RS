import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FlowWizardService {
    private static readonly FlowWizardDataApi = '/api/v1/flow-wizard?flowId={fi}&flowInstanceId={fii}';
    private static readonly FlowWizardConfirmApi = '/api/v1/flow-wizard/confirm';
    private static readonly FlowWizardRejectApi = '/api/v1/flow-wizard/reject';
    private static readonly FlowWizardPauseApi = '/api/v1/flow-wizard/pause';
    private static readonly FlowWizardReOpenApi = '/api/v1/flow-wizard/reopen';
    private static readonly FlowWizardGenerateFinalCodeApi = '/api/v1/flow-wizard/generate-contract-final-code';

    getFlowWizardData(fi, fii, fc?: FormContainer) {
        const api = FlowWizardService.FlowWizardDataApi.replace('{fi}', fi).replace('{fii}', fii);
        return this.apiClientService.get(api, fc);
    }

    confirFlowWizard(model, fc?: FormContainer) {
        return this.apiClientService.post(FlowWizardService.FlowWizardConfirmApi, model, fc);
    }

    rejectFlowWizard(model, fc?: FormContainer) {
        return this.apiClientService.post(FlowWizardService.FlowWizardRejectApi, model, fc);
    }

    pauseFlowWizard(model, fc?: FormContainer) {
        return this.apiClientService.post(FlowWizardService.FlowWizardPauseApi, model, fc);
    }

    reOpenFlowWizard(model, fc?: FormContainer) {
        return this.apiClientService.post(FlowWizardService.FlowWizardReOpenApi, model, fc);
    }

    generateFinalFormFlowWizard(model, fc?: FormContainer) {
        return this.apiClientService.post(FlowWizardService.FlowWizardGenerateFinalCodeApi, model, fc);
    }

    constructor(private apiClientService: ApiClientService) {}
}
