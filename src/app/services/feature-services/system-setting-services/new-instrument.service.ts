import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class NewInstrumentService extends Specification {
    private static newInstrumentApi = '/api/v1/new-instrument';

    createInstrument(model, fc?: FormContainer) {
        return this.apiClientService.post(NewInstrumentService.newInstrumentApi, model, fc);
    }

    deleteInstrument(id, isInBourse, fc?: FormContainer) {
        const api = NewInstrumentService.newInstrumentApi + '/' + id + '?isInBourse=' + isInBourse;
        return this.apiClientService.delete(api, fc);
    }

    updateInstrument(model, fc?: FormContainer) {
        return this.apiClientService.put(NewInstrumentService.newInstrumentApi, fc, model);
    }

    getInstruments(fc: FormContainer) {
        const api = NewInstrumentService.newInstrumentApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
