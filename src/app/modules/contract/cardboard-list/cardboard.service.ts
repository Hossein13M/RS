import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardboardAction, CardboardInfo, ElectionUsers } from './cardboard.model';

@Injectable({
    providedIn: 'root',
})
export class CardboardService {
    constructor(private http: HttpClient) {}

    public getContractCardboardWizard(contractId: string): Observable<CardboardInfo> {
        return this.http.get<CardboardInfo>(`/api/v1/contract-wizard`, { params: { contractId } });
    }

    public getContractCardboardNextStepSelectedUsersList(cardboardInfo: CardboardAction): Observable<Array<ElectionUsers>> {
        return this.http.get<Array<ElectionUsers>>(`/api/v1/contract-wizard/next-step-selected-users`);
    }

    public getContractCardboardList(organization: number): Observable<any> {
        return this.http.get<any>(`somewhere`, { params: { organization } });
    }
}
