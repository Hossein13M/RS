import { Injectable } from '@angular/core';
import { ContractForm, ContractFormList } from './contract-form.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContractFormService {
    constructor(private readonly http: HttpClient) {}

    public createContractForm(contractFormInfo: ContractForm): Observable<ContractFormList> {
        return this.http.post<ContractFormList>(`/api/v1/contract-type-form`, contractFormInfo);
    }

    public getContractForm(organization: number): Observable<Array<ContractFormList>> {
        return this.http.get<Array<ContractFormList>>(`/api/v1/contract-type-form`, { params: { organization } });
    }

    public changeContractFormStatus(contractFormId: number): Observable<any> {
        return this.http.put<any>(`/api/v1/contract-type-form/inactive/${contractFormId}`, {});
    }
}
