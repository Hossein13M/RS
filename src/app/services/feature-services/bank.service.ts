import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { Specification } from '../../shared/models/Specification';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BankService extends Specification {
    private static getBankApi = '/api/v1/bank';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    getAllBank(fc?: FormContainer) {
        const api = BankService.getBankApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    createBank(model, fc?: FormContainer) {
        return this.apiClientService.post(BankService.getBankApi, model, fc);
    }

    deleteBank(id, fc?: FormContainer) {
        const api = BankService.getBankApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    updateBank(model, fc?: FormContainer) {
        return this.apiClientService.put(BankService.getBankApi, fc, model);
    }
}
