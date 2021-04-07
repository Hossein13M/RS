import { Injectable } from '@angular/core';
import { FormContainer } from '#shared/models/FromContainer';
import { Specification } from '#shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BrokerSettingService extends Specification {
    private static brokerSettingApi = '/api/v1/broker';

    getBrokerSettings(fc?: FormContainer): Observable<any> {
        const api = BrokerSettingService.brokerSettingApi + '?limit=1000&skip=0';
        return this.apiClientService.get(api, fc);
    }

    post(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.post(BrokerSettingService.brokerSettingApi, model, fc);
    }

    put(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.put(BrokerSettingService.brokerSettingApi, fc, model);
    }

    delete(id, fc?: FormContainer): Observable<any> {
        const api = BrokerSettingService.brokerSettingApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
