import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class TradeAddService extends Specification {
    private static TradeAddAPI = '/api/v1/trade-registration';

    constructor(private acs: ApiClientService) {
        super();
    }

    show(fc?: FormContainer): Observable<any> {
        return this.acs.get(TradeAddService.TradeAddAPI + this.generateSpecificationString(), fc);
    }

    add(data: any, fc?: FormContainer): Observable<any> {
        return this.acs.post(TradeAddService.TradeAddAPI, data, fc);
    }

    delete(id: any, fc?: FormContainer): Observable<any> {
        return this.acs.delete(`${TradeAddService.TradeAddAPI}/${id}`, fc);
    }

    edit(data: any, fc?: FormContainer): Observable<any> {
        return this.acs.put(TradeAddService.TradeAddAPI, fc, data);
    }
}
