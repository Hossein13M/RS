import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable()
export class OpRiskTreeChartService extends Specification {
    private static OpRiskTreeChartServiceAPI = '/api/v1/operation-risk';

    constructor(private acs: ApiClientService) {
        super();
    }

    getTree(name: string, fc?: FormContainer): Observable<any> {
        return this.acs.get(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree?name=${name}`, fc);
    }

    addNode(parentId: number, name: string, fc?: FormContainer): Observable<any> {
        return this.acs.post(
            OpRiskTreeChartService.OpRiskTreeChartServiceAPI + '/tree/node',
            {
                titleFA: name,
                titleEN: '',
                parentId,
                icon: '',
            },
            fc
        );
    }

    updateNode(nodeId: number, name: string, parentId?: number, fc?: FormContainer): Observable<any> {
        const updateData = {
            id: `${nodeId}`,
            titleFA: name,
        };
        if (parentId) {
            updateData['parentId'] = parentId;
        }

        return this.acs.put(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree/node/${nodeId}`, fc, updateData);
    }

    deleteNode(nodeId: number, category: string, fc?: FormContainer): Observable<any> {
        return this.acs.delete(OpRiskTreeChartService.OpRiskTreeChartServiceAPI + `/tree/node?id=${nodeId}&category=${category}`, fc);
    }
}
