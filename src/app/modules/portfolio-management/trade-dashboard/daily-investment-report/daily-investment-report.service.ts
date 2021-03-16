import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class DailyInvestmentReportService extends Specification {
    private static DailyInvestmentReportAPI = '/api/v1/portfolio-management-service/daily-investment-report';

    constructor(private acs: ApiClientService) {
        super();
    }

    show(fc?: FormContainer): Observable<any> {
        return this.acs.get(DailyInvestmentReportService.DailyInvestmentReportAPI + this.generateSpecificationString(), fc);
    }
}
