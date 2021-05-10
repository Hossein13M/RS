import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradeBookService extends Specification {
    private static TradeAPI = '/api/v1/portfolio-management-service';

    searchForm: FormGroup;

    constructor(private acs: ApiClientService, private fb: FormBuilder, private http: HttpClient) {
        super();
        this.createForm();
    }

    createForm(): void {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        this.searchForm = this.fb.group({ date: [lastDay, [Validators.required]] });
    }

    getTradeData(fc?: FormContainer): Observable<any> {
        return this.acs.get(TradeBookService.TradeAPI + '/trade-data' + this.generateSpecificationString(), fc);
    }

    public getTradeDataByDate(searchParams): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/trade-data`, { params: searchParams });
    }

    //    **********
    public getTradingBooks(date: string): Observable<any> {
        return this.http.get(`/api/v1/portfolio-management-service/trading-book`, { params: { date } });
    }
}
