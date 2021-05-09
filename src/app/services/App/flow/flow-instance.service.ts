import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FindFlowInstanceResponseDto } from 'app/services/API/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlowInstanceService } from '../../API/services/flow-instance.service';
import {Specification} from "#shared/models/Specification";

@Injectable({
    providedIn: 'root',
})
export class FlowsInstanceService extends Specification {
    public flowInstances: BehaviorSubject<Array<FindFlowInstanceResponseDto>> = new BehaviorSubject([]);

    constructor(private flowInstanceService: FlowInstanceService, private http: HttpClient) {
        super();
    }

    public addFlowInstance(
        title: string,
        customerId: number,
        customerName: string,
        documentType: '1' | '2' | '3',
        flowId: string,
        parentId?: string,
        code?: string
    ): Observable<any> {
        const param = {
            body: {
                title: title,
                customerId: customerId,
                customerName: customerName,
                documentType: documentType,
                flowId: flowId,
                ...(parentId && { parentId: parentId }),
                ...(code && { code: code }),
            },
        };
        return this.flowInstanceService.flowInstanceControllerCreateFlowInstance(param).pipe(
            map((res) => {
                let flowInstances = this.flowInstances.getValue();
                flowInstances.push(res);
                this.flowInstances.next(flowInstances);
            })
        );
    }

    public getFlowInstances(code?: string, title?: string, customerName?: string, flowName?: string, instanceId?: string): Observable<any> {
        const param = {
            code: code,
            title: title,
            customerName: customerName,
            flowName: flowName,
            id: instanceId,
        };
        return this.flowInstanceService.flowInstanceControllerGetFlowInstance(param).pipe(
            map((res) => {
                this.flowInstances.next(res);
                return res;
            })
        );
    }

    public deleteFlowInstance(flowInstanceId: string): Observable<any> {
        const param = {
            id: flowInstanceId,
        };
        return this.flowInstanceService.flowInstanceControllerDeleteFlowInstance(param).pipe(
            map((res) => {
                let flowInstances = this.flowInstances.getValue();
                const deleteThisItem = flowInstances.find((flow) => flow._id == flowInstanceId);
                const index = flowInstances.indexOf(deleteThisItem);
                if (index > -1) {
                    flowInstances.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.flowInstances.next(flowInstances);
            })
        );
    }

    public editFlowInstance(id: string, title: string): Observable<any> {
        return this.http.put('/api/v1/flow-instance', { id, title }).pipe(
            map((res: any) => {
                // update the flow Categories
                const flowInstances = this.flowInstances.getValue();
                const foundedFlowInstance = flowInstances.find((flow) => flow._id === id);
                foundedFlowInstance.title = res.title;
                foundedFlowInstance.customerId = res.customerId;
                foundedFlowInstance.customerName = res.customerName;
                this.flowInstances.next(flowInstances);
                return res;
            })
        );
    }
}
