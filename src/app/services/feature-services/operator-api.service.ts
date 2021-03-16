import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class OperatorApiService {
    private static getAllOperators = '/api/v1/operator?limit=100';

    constructor(private apiClientService: ApiClientService) {}

    getAll(fc?: FormContainer) {
        return this.apiClientService.get(OperatorApiService.getAllOperators, fc);
    }
}
