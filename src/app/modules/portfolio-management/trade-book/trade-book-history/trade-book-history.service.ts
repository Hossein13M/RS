import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class TradeBookHistoryService extends Specification {
    private static TradeBookHistoryAPI = '/api/v1/portfolio-management-service/update-ips-history';

    constructor(private acs: ApiClientService) {
        super();
    }

    show(fc?: FormContainer): Observable<any> {
        return this.acs.get(TradeBookHistoryService.TradeBookHistoryAPI + this.generateSpecificationString(), fc);
    }
}
