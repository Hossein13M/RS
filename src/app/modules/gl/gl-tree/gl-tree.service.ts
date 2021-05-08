import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { CategoryModelApi, TreeOrderType } from '../gl.model';

@Injectable()
export class GlTreeService {
    private static getCategoryApi = '/api/v1/gl/category';
    private static getGroupByCategoryApi = '/api/v1/gl/group';
    private static getGeneralByGroupApi = '/api/v1/gl/general';
    private static getSubsidyByGeneralApi = '/api/v1/gl/subsidiary';
    private static getDetailBySubsidyApi = '/api/v1/gl/detail';
    private static getChartApi = '/api/v1/gl/chart';
    public glHierarchy: Array<TreeOrderType> = [
        TreeOrderType.Category,
        TreeOrderType.Group,
        TreeOrderType.General,
        TreeOrderType.Subsidiary,
        TreeOrderType.Detail,
    ];

    constructor(private http: HttpClient) {}

    getSuperior(gl: TreeOrderType): TreeOrderType {
        return this.glHierarchy[_.findIndex(this.glHierarchy, (order) => order.toLowerCase() === gl.toLowerCase()) - 1];
    }

    getInferior(gl: TreeOrderType): TreeOrderType {
        return this.glHierarchy[_.findIndex(this.glHierarchy, (order) => order.toLowerCase() === gl.toLowerCase()) + 1];
    }

    getCategoryApi(): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlTreeService.getCategoryApi);
    }

    getGroupByCategory(categoryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlTreeService.getGroupByCategoryApi, { params: { categoryLedgerCode } });
    }

    getGeneralByGroup(groupLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlTreeService.getGeneralByGroupApi, { params: { groupLedgerCode } });
    }

    getSubsidiaryByGeneral(generalLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlTreeService.getSubsidyByGeneralApi, { params: { generalLedgerCode } });
    }

    getDetailBySubsidiary(subsidiaryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlTreeService.getDetailBySubsidyApi, { params: { subsidiaryLedgerCode } });
    }

    public getChartApi(params): Observable<any> {
        return this.http.get(GlTreeService.getChartApi, { params });
    }
}
