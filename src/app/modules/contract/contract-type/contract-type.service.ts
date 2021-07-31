import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ContractForm, ContractType } from './contract-type.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class ContractTypeService {
    constructor(private http: HttpClient) {}

    public getContractTypes(searchParams: { organization: number; id?: string; name?: string }): Observable<ResponseWithPagination<ContractType>> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<ContractType>>('/api/v1/contract-type', { params });
    }

    public changeContractTypeStatus(id: string): Observable<any> {
        return this.http.put<any>(`/api/v1/contract-type/inactive/${id}`, {});
    }

    public getContractTypeForms(organization: number): Observable<Array<ContractForm>> {
        return this.http.get<Array<ContractForm>>(`/api/v1/contract-type-form/`, { params: { organization } });
    }

    public createContractType(contractTypeInfo: any): Observable<any> {
        return this.http.post<any>(`/api/v1/contract-type`, contractTypeInfo);
    }
}
