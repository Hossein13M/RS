import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FundTypeService extends Specification {
    private static fundTypeApi = '/api/v1/fund-type';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    getAllFundTypes(fc?: FormContainer) {
        return this.apiClientService.get(FundTypeService.fundTypeApi + '?limit=1000&skip=0', fc);
    }
}
