import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class TradeBookService extends Specification {
    private static TradeAPI = '/api/v1/portfolio-management-service';

    searchForm: FormGroup;
    selectedOrgName: any;

    constructor(private acs: ApiClientService, private fb: FormBuilder) {
        super();
        this.createForm();
    }

    createForm(): void {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        this.searchForm = this.fb.group({ date: [lastDay, [Validators.required]] });
    }

    getAllTradeBooks(fc?: FormContainer): Observable<any> {
        return this.acs.get(TradeBookService.TradeAPI + '/trading-book' + this.generateSpecificationString(), fc);
    }

    getTradeData(fc?: FormContainer): Observable<any> {
        return this.acs.get(TradeBookService.TradeAPI + '/trade-data' + this.generateSpecificationString(), fc);
    }
}
