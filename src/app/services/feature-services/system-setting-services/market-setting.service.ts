import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class MarketSettingService extends Specification {
    private static marketApi = '/api/v1/market';

    getAllMarkets(fc?: FormContainer) {
        const api = MarketSettingService.marketApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    deleteMarket(id, fc?: FormContainer) {
        return this.apiClientService.delete(MarketSettingService.marketApi + '/' + id, fc);
    }

    updateMarket(model, fc?: FormContainer) {
        return this.apiClientService.put(MarketSettingService.marketApi, fc, model);
    }

    createMarket(model, fc) {
        return this.apiClientService.post(MarketSettingService.marketApi, model, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
