import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract, Customer } from './contract.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable()
export class ContractService {
    constructor(private http: HttpClient) {}

    public getContractsList(searchParams: { organization: number; name?: string; isActive?: boolean }): Observable<ResponseWithPagination<Contract>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(searchParams);
        return this.http.get<ResponseWithPagination<Contract>>(`/api/v1/contract`, { params });
    }

    public createNewContract(contractInfo: Contract): Observable<ResponseWithPagination<Contract>> {
        return this.http.post<ResponseWithPagination<Contract>>(`/api/v1/contract`, contractInfo);
    }

    public editContract(contractName: { id: string; name: string }): Observable<ResponseWithPagination<Contract>> {
        return this.http.put<ResponseWithPagination<Contract>>(`/api/v1/contract`, contractName);
    }

    public changeContractName(contractInfo: { id: string; name: string }): Observable<ResponseWithPagination<Contract>> {
        return this.http.put<ResponseWithPagination<Contract>>(`/api/v1/contract`, contractInfo);
    }

    public changeContractStatus(contractId: string): Observable<void> {
        return this.http.put<void>(`/api/v1/contract/inactive/${contractId}`, {});
    }

    public getCustomers(): Observable<ResponseWithPagination<Customer>> {
        return this.http.get<ResponseWithPagination<Customer>>(`/api/v1/customer`);
    }
}
