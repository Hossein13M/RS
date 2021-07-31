import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract, Customer } from './contract.model';
import { ResponseWithPagination } from '#shared/models/pagination.model';

@Injectable()
export class ContractService {
    constructor(private http: HttpClient) {}

    public getContractsList(): Observable<ResponseWithPagination<Contract>> {
        return this.http.get<ResponseWithPagination<Contract>>(`/api/v1/contract`);
    }

    public createNewContract(contractInfo: Contract): Observable<ResponseWithPagination<Contract>> {
        return this.http.post<ResponseWithPagination<Contract>>(`/api/v1/contract`, contractInfo);
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
