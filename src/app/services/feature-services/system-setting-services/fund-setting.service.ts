import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FundSettingService extends Specification {
    private static getFundApi = '/api/v1/fund';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    getAll(fc?: FormContainer) {
        const api = FundSettingService.getFundApi + this.generateSpecificationString() + '&details=true';
        return this.apiClientService.get(api, fc);
    }

    getAllNoPaging(fc?: FormContainer) {
        const api = FundSettingService.getFundApi + '?limit=1000&skip=0' + '&details=false';
        return this.apiClientService.get(api, fc);
    }

    create(model, fc?: FormContainer) {
        return this.apiClientService.post(FundSettingService.getFundApi, model, fc);
    }

    delete(id, fc?: FormContainer) {
        const api = FundSettingService.getFundApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    update(model, fc?: FormContainer) {
        return this.apiClientService.put(FundSettingService.getFundApi, fc, model);
    }
}
