import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class DepositSettingService extends Specification {
    private static depositService = '/api/v1/deposit';

    getDepositSettings(fc?: FormContainer) {
        const api = DepositSettingService.depositService + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    createDepositSetting(model, fc?: FormContainer) {
        return this.apiClientService.post(DepositSettingService.depositService, model, fc);
    }

    updateDepositSetting(model, fc?: FormContainer) {
        return this.apiClientService.put(DepositSettingService.depositService, fc, model);
    }

    deleteDepositSetting(id, fc?: FormContainer) {
        const api = DepositSettingService.depositService + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
