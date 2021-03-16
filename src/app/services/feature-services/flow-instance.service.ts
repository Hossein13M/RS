import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FlowInstanceService {
    private static readonly FlowInstaceDataApi = '/api/v1/flow-instance';
    private static readonly FlowInstaceDataUpdateApi = '/api/v1/flow-instance?id={id}';
    private static readonly FlowInstaceProgressReportApi = '/api/v1/flow-instance/progress-report';

    private static readonly FlowInstanceDataApi = '/api/v1/flow-instance-data';

    constructor(private apiClientService: ApiClientService) {}

    getFlowInstance(id, fc?: FormContainer): any {
        const api = FlowInstanceService.FlowInstaceDataUpdateApi.replace('{id}', id);
        return this.apiClientService.get(api, fc);
    }

    addFlowInstace(model, fc?: FormContainer): any {
        return this.apiClientService.post(FlowInstanceService.FlowInstaceDataApi, model, fc);
    }

    createFlowInstanceData(model, fc?: FormContainer): any {
        return this.apiClientService.post(FlowInstanceService.FlowInstanceDataApi, model, fc);
    }
}
