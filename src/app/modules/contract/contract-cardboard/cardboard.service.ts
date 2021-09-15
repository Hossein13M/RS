import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardboardAction, CardboardInfo, ContractCardboard, ContractHistory, ContractNote, ElectionUsers, FinalForm, NoteAdd } from './cardboard.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class CardboardService {
    constructor(private http: HttpClient) {}

    public getContractCardboardWizard(contractId: string): Observable<CardboardInfo> {
        return this.http.get<CardboardInfo>(`/api/v1/contract-wizard`, { params: { contractId } });
    }

    public getContractCardboardNextStepSelectedUsersList(cardboardInfo: CardboardAction): Observable<Array<ElectionUsers>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls(cardboardInfo);
        return this.http.get<Array<ElectionUsers>>(`/api/v1/contract-wizard/next-step-selected-users`, { params });
    }

    public getContractCardboardList(organization: number): Observable<Array<ContractCardboard>> {
        return this.http.get<Array<ContractCardboard>>(`/api/v1/contract-wizard/cardboard`, { params: { organization } });
    }

    public rejectContractCardboardStep(stepInfo: { contractId: string; note: string }): Observable<void> {
        return this.http.post<void>(`/api/v1/contract-wizard/reject`, stepInfo);
    }

    public confirmContractCardboardStep(stepInfo: { contractId: string; nextStepSelectedUser?: { id: number; name: string } }): Observable<void> {
        return this.http.post<void>(`/api/v1/contract-wizard/confirm`, stepInfo);
    }

    public reopenContract(contractId: string): Observable<void> {
        return this.http.post<void>(`/api/v1/contract-wizard/reopen`, { contractId });
    }

    public pauseContract(contractId: string, note: string): Observable<void> {
        return this.http.post<void>(`/api/v1/contract-wizard/pause`, { contractId, note });
    }

    public getContractCode(contractId: string): Observable<{ code: string }> {
        return this.http.post<{ code: string }>(`/api/v1/contract-wizard/generate-code`, { contractId });
    }

    public getContractNotes(contractId: string): Observable<Array<ContractNote>> {
        return this.http.get<Array<ContractNote>>(`/api/v1/contract-note/${contractId}`);
    }

    public addNote(noteInfo: NoteAdd): Observable<ContractNote> {
        return this.http.post<ContractNote>(`/api/v1/contract-note`, noteInfo);
    }

    public getContractHistory(contractId: string): Observable<Array<ContractHistory>> {
        return this.http.get<Array<ContractHistory>>(`/api/v1/contract-history/${contractId}`);
    }

    public sendFinalFormData(formInfo: { contract: string; data: Array<FinalForm> }): Observable<any> {
        return this.http.put<any>(`/api/v1/contract-data`, formInfo);
    }
}
