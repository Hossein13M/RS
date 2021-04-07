import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FundRoleService extends Specification {
    private static fundRoleApi = '/api/v1/fund-role';

    get(fc?: FormContainer) {
        return this.apiClientService.get(FundRoleService.fundRoleApi, fc);
    }

    getWithPaging(fc?: FormContainer) {
        const api = FundRoleService.fundRoleApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    delete(id, fc?: FormContainer) {
        const api = FundRoleService.fundRoleApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    update(model, fc?: FormContainer) {
        return this.apiClientService.put(FundRoleService.fundRoleApi, fc, model);
    }

    create(model, fc?: FormContainer) {
        return this.apiClientService.post(FundRoleService.fundRoleApi, model, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
