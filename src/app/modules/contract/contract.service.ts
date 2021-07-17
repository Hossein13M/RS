import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ContractType } from './contract-type/contract.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class ContractService {
    constructor(private http: HttpClient) {}

    public getContractTypes(searchParams: { organization: number; id?: string; name?: string }): Observable<ResponseWithPagination<ContractType>> {
        const params = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<ContractType>>('http://172.22.255.239:3006/api/v1/contract-type', { params });
    }

    public changeContractTypeStatus(id: string): Observable<any> {
        return this.http.put<any>(`http://172.22.255.239:3006/api/v1/contract-type/inactive/${id}`, {});
    }

    public getContractTypeForms(organization: number): Observable<any> {
        return this.http.get<any>(`http://172.22.255.239:3006/api/v1/contract-type-form/`, { params: { organization } });
    }
}
