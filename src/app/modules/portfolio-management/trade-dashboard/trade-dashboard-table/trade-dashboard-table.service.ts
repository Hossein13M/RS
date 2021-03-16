import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class TradeDashboardTableService extends Specification {
    private static TradeAPI = '/api/v1/portfolio-management-service';
    searchForm: FormGroup;

    constructor(private acs: ApiClientService, private fb: FormBuilder) {
        super();

        // Init Search Form
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        this.searchForm = this.fb.group({ date: [lastDay, [Validators.required]] });
    }

    getTradeTable(fc?: FormContainer): Observable<any> {
        let url = TradeDashboardTableService.TradeAPI + '/categorized-assets?date=' + this.convertDate(this.searchForm.value.date);
        return this.acs.get(url, fc);
    }
}
