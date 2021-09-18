import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinalForm } from '../contract-cardboard/cardboard.model';
import { Observable } from 'rxjs';
import { ContractViewerModel } from './contract-viewer.model';

@Injectable()
export class ContractViewerService {
    constructor(private http: HttpClient) {}

    public sendFinalFormData(formInfo: { contract: string; data: Array<FinalForm> }): Observable<any> {
        return this.http.put<any>(`/api/v1/contract-data`, formInfo);
    }

    public getFinalFormData(contractId: string): Observable<ContractViewerModel> {
        return this.http.get<ContractViewerModel>(`/api/v1/contract-data/${contractId}`);
    }
}
