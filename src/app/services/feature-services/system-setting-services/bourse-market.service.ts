import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BourseMarketService extends Specification {
    private static bourseMarketApi = '/api/v1/bourse-market';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    getBourseMarket(fc?: FormContainer) {
        const api = BourseMarketService.bourseMarketApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    createBourseMarket(model, fc?: FormContainer) {
        return this.apiClientService.post(BourseMarketService.bourseMarketApi, model, fc);
    }

    updateBourseMarket(model, fc?: FormContainer) {
        return this.apiClientService.put(BourseMarketService.bourseMarketApi, fc, model);
    }

    deleteBourseMarket(id, fc?: FormContainer) {
        const api = BourseMarketService.bourseMarketApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }
}
