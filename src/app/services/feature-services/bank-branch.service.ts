import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BankBranchService {
    private static getBankBranchApi = '/api/v1/bank-branch';

    constructor(private apiClientService: ApiClientService) {}

    getBankBranch(fc?: FormContainer, bankCode: any = null) {
        let url = BankBranchService.getBankBranchApi;
        if (bankCode) {
            url += `?bankId=${bankCode}`;
        }
        return this.apiClientService.get(url, fc);
    }
}
