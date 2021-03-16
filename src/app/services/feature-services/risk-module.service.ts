import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class RiskModuleService {
    private static getAllModulesApi = '/api/v1/risk-shield-module';

    constructor(private apiClientService: ApiClientService) {}

    getAllModules(fc?: FormContainer) {
        return this.apiClientService.get(RiskModuleService.getAllModulesApi, fc);
    }
}
