import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BrokerSettingService extends Specification {
    private static brokerSettingApi = '/api/v1/broker';

    getBrokerSettings(fc?: FormContainer) {
        const api = BrokerSettingService.brokerSettingApi + '?limit=1000&skip=0';
        return this.apiClientService.get(api, fc);
    }

    createBrokerSetting(model, fc?: FormContainer) {
        return this.apiClientService.post(BrokerSettingService.brokerSettingApi, model, fc);
    }

    updateBrokerSetting(model, fc?: FormContainer) {
        return this.apiClientService.put(BrokerSettingService.brokerSettingApi, fc, model);
    }

    deleteBrokerSetting(id, fc?: FormContainer) {
        const api = BrokerSettingService.brokerSettingApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
