import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BankAccountTypeService {
    private static bankAccountTypeApi = '/api/v1/bank-account-type';

    getBankAccountTypes(fc?: FormContainer) {
        return this.apiClientService.get(BankAccountTypeService.bankAccountTypeApi, fc);
    }

    constructor(private apiClientService: ApiClientService) {}
}
