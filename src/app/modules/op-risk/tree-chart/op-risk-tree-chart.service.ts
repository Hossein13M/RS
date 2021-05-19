import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpRiskTreeChartService {
    private static OpRiskTreeChartServiceAPI = '/api/v1/operation-risk';

    constructor(private http: HttpClient) {}

    getTree(name: string): Observable<any> {
        return this.http.get(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree?name=${name}`);
    }

    addNode(parentId: number, name: string): Observable<any> {
        return this.http.post(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + '/tree/node', {
            titleFA: name,
            titleEN: '',
            parentId,
            icon: '',
        });
    }

    updateNode(nodeId: number, name: string, parentId?: number): Observable<any> {
        const updateData = {
            id: `${nodeId}`,
            titleFA: name,
        };
        if (parentId) {
            updateData['parentId'] = parentId;
        }

        return this.http.put(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree/node/${nodeId}`, updateData);
    }

    deleteNode(nodeId: number, category: string): Observable<any> {
        return this.http.delete(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree/node?id=${nodeId}&category=${category}`);
    }
}
