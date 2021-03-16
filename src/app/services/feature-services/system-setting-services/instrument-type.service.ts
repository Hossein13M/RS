import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class InstrumentTypeService extends Specification {
    private static instrumentTypeApi = '/api/v1/instrument-type';

    getInstrumentType(fc?: FormContainer) {
        const api = InstrumentTypeService.instrumentTypeApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    updateInstrumentType(model, fc?: FormContainer) {
        return this.apiClientService.put(InstrumentTypeService.instrumentTypeApi, fc, model);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
