import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DepositSettingService extends Specification {
    private static depositService = '/api/v1/deposit';

    get(fc?: FormContainer): Observable<any> {
        const api = DepositSettingService.depositService + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    create(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.post(DepositSettingService.depositService, model, fc);
    }

    update(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.put(DepositSettingService.depositService, fc, model);
    }

    delete(id, fc?: FormContainer): Observable<any> {
        const api = DepositSettingService.depositService + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
