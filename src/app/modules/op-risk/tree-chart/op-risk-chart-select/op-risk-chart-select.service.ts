import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class OpRiskChartSelectService extends Specification {
    private static OpRiskChartSelectServiceAPI = '/api/v1/operation-risk/tree/categories';

    constructor(private acs: ApiClientService) {
        super();
    }

    categories(fc?: FormContainer): Observable<any> {
        return this.acs.get(OpRiskChartSelectService.OpRiskChartSelectServiceAPI, fc);
    }
}
