import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewInstrumentService extends Specification {
    private static newInstrumentApi = '/api/v1/new-instrument';

    create(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.post(NewInstrumentService.newInstrumentApi, model, fc);
    }

    delete(id, isInBourse, fc?: FormContainer): Observable<any> {
        const api = NewInstrumentService.newInstrumentApi + '/' + id + '?isInBourse=' + isInBourse;
        return this.apiClientService.delete(api, fc);
    }

    update(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.put(NewInstrumentService.newInstrumentApi, fc, model);
    }

    get(fc?: FormContainer): Observable<any> {
        const api = NewInstrumentService.newInstrumentApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
