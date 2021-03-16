import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BrokerService {
    private static getBrokerApi = '/api/v1/broker';

    constructor(private apiClientService: ApiClientService) {}

    getAllBrokers(fc?: FormContainer) {
        return this.apiClientService.get(BrokerService.getBrokerApi, fc);
    }
}
