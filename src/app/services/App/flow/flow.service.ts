import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetFlowResponseDto } from 'app/services/API/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetFlowCategoryDto } from '../../API/models/get-flow-category-dto';
import { FlowCategoryService } from '../../API/services';
import { FlowFormService } from '../../API/services/flow-form.service';
import { FlowService } from '../../API/services/flow.service';
import {Specification} from "#shared/models/Specification";

@Injectable({
    providedIn: 'root',
})
export class FlowsService extends Specification {
    constructor(
        private flowService: FlowService,
        private flowCategoryService: FlowCategoryService,
        private flowForm: FlowFormService,
        private router: Router,
        private http: HttpClient
    ) {
        super();
    }

    flowCategories: BehaviorSubject<Array<GetFlowCategoryDto>> = new BehaviorSubject({} as Array<GetFlowCategoryDto>);
    flows: BehaviorSubject<Array<GetFlowResponseDto>> = new BehaviorSubject([] as Array<GetFlowResponseDto>);

    /*
     ** Start flow CROD`s
     */

    getFlows(name?: string, id?: string, categoryID?: string): Observable<Array<GetFlowResponseDto>> {
        const param = {
            name: name ? name : '',
            id: id ? id : '',
            categoryId: categoryID ? categoryID : '',
        };

        return this.flowService.flowControllerGetFlow(param).pipe(
            map((res) => {
                this.flows.next(res);
                return res;
            })
        );
    }

    getFlow(id: string): Observable<any> {
        const param = {
            id: id ? id : '',
        };

        return this.flowService.flowControllerGetFlow(param).pipe(
            map((res) => {
                this.flows.next(res);
                return res;
            })
        );
    }

    addNewFlow(name: string, categoryID: string, attributes): Observable<any> {
        const param = {
            body: {
                name: name,
                category: categoryID,
                attributes: attributes,
            },
        };
        return this.flowService.flowControllerCreateFlow(param).pipe(
            map((res) => {
                // redirecting here

                /* todo after danial change the response
                 let flows = this.flows.getValue();
                 flows.push(res);
                 this.flowCategories.next(flows);
                 */
                this.router.navigate(['/flow/flows']);
                return res;
            })
        );
    }

    editFlow(flowID: string, name: string, categoryID: string, attributes): Observable<any> {
        const body = {
            id: flowID,
            name: name,
            categoryId: categoryID,
            attributes: attributes,
        };
        return this.http.put('/api/v1/flow/', body).pipe(
            map((res) => {
                this.router.navigate(['/flow/flows']);
                return res;
            })
        );
    }

    deleteFlow(flowID: string): Observable<any> {
        const param = {
            id: flowID,
        };
        return this.flowService.flowControllerDeleteFlow(param).pipe(
            map((res) => {
                // update the flows and delete the deleted
                let flows = this.flows.getValue();
                const deleteThisItem = flows.find((flow) => flow._id == flowID);
                const index = flows.indexOf(deleteThisItem);
                if (index > -1) {
                    flows.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.flows.next(flows);
                return res;
            })
        );
    }

    /*
     ** End flow CROD`s
     */

    /*
     ** Start flow category
     */
    getFlowCategories(name?: string, id?: string): Observable<Array<GetFlowCategoryDto>> {
        const param = {
            id: id ? id : '',
            name: name ? name : '',
        };
        return this.flowCategoryService.flowCategoryControllerGetFlowCategory(param).pipe(
            map((res) => {
                this.flowCategories.next(res);
                return res;
            })
        );
    }

    addFlowCategory(name: string, keyword: string): Observable<GetFlowCategoryDto> {
        const param = {
            body: {
                name: name,
                keyword: keyword,
            },
        };
        return this.flowCategoryService.flowCategoryControllerCreateFlowCategory(param).pipe(
            map((res) => {
                // push response to flow categories
                let flowCategories = this.flowCategories.getValue();
                flowCategories.push(res);
                this.flowCategories.next(flowCategories);
                return res;
            })
        );
    }

    editFlowCategory(name: string, keyword: string, id: string): Observable<any> {
        const param = {
            id: id,
            body: {
                name: name,
                keyword: keyword,
            },
        };
        return this.flowCategoryService.flowCategoryControllerUpdateFlowCategory(param).pipe(
            map((res) => {
                // update the flow Categories
                let flowCategories = this.flowCategories.getValue();
                let findedFlowCategories = flowCategories.find((flowCat) => flowCat._id == id);
                findedFlowCategories.name = name;
                findedFlowCategories.keyword = keyword;
                this.flowCategories.next(flowCategories);
                return res;
            })
        );
    }

    deleteFlowCategory(id: string): Observable<any> {
        const param = {
            id: id,
        };
        return this.flowCategoryService.flowCategoryControllerDeleteFlowCategory(param).pipe(
            map((res) => {
                // update the flow Categories and delete the deleted
                let flowCategories = this.flowCategories.getValue();
                const deleteThisItem = flowCategories.find((flowCat) => flowCat._id == id);
                const index = flowCategories.indexOf(deleteThisItem);
                if (index > -1) {
                    flowCategories.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.flowCategories.next(flowCategories);
                return res;
            })
        );
    }

    /*
     ** End flow category
     */

    /*
     ** Start flow form
     */

    addFlowForm(stateId: string, flowId: string, stateName: string, attributes, accessRights: Array<number>): Observable<any> {
        const param = {
            body: {
                formId: stateId,
                flowId: flowId,
                name: stateName,
                state: stateName,
                attributes: attributes,
                accessRights: accessRights,
            },
        };
        return this.flowForm.flowFormControllerUpdateFlowForm(param).pipe(
            map((res) => {
                // nothing here
                return res;
            })
        );
    }

    getFlowForm(stateId: string, flowId: string): Observable<any> {
        const param = {
            formId: stateId,
            flowId: flowId,
        };
        return this.flowForm.flowFormControllerGetFlowForm(param).pipe(
            map(
                (res) => {
                    // nothing here
                    return res;
                },
                (error) => {
                    return;
                }
            )
        );
    }

    /*
     ** Start flow form
     */
}
