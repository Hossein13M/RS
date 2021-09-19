import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { BpmnData } from './contract-bpmn.model';

@Injectable({
    providedIn: 'root',
})
export class ContractBpmnService {
    constructor(private http: HttpClient) {}

    public saveBpmnStep(bpmnStepInfo: BpmnData): Observable<void> {
        return this.http.put<void>(`/api/v1/flow-step`, bpmnStepInfo);
    }

    public getBpmnStepInfo(bpmnStep: { step: string; flow: string }): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...bpmnStep });
        return this.http.get<any>(`/api/v1/flow-step`, { params });
    }
}
