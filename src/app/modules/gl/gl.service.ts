import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CategoryModelApi, TreeOrderType} from './gl.model'

@Injectable()
export class GlService {
    private static getCategoryApi = '/api/v1/gl/category';
    private static getGroupByCategoryApi = '/api/v1/gl/group';
    private static getGeneralByGroupApi = '/api/v1/gl/general';
    private static getSubsidyByGeneralApi = '/api/v1/gl/subsidiary';
    private static getDetailBySubsidyApi = '/api/v1/gl/detail';
    private static getLevelApi = '/api/v1/gl/level';
    private static getChartApi = '/api/v1/gl/chart';
    private static getGLGridDataApi = '/api/v1/gl/list';
    private static GlChangeApi = '/api/v1/gl/change';

    constructor(private http: HttpClient) {}

    getCategoryApi(): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlService.getCategoryApi);
    }

    getGroupByCategory(categoryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlService.getGroupByCategoryApi, { params: { categoryLedgerCode } });
    }

    getGeneralByGroup(groupLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlService.getGeneralByGroupApi, { params: { groupLedgerCode } });
    }

    getSubsidiaryByGeneral(generalLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlService.getSubsidyByGeneralApi, { params: { generalLedgerCode } });
    }

    getDetailBySubsidiary(subsidiaryLedgerCode): Observable<CategoryModelApi> {
        return this.http.get<CategoryModelApi>(GlService.getDetailBySubsidyApi, { params: { subsidiaryLedgerCode } });
    }

    getLevelApi(code, type: TreeOrderType): Observable<any> {
        const params: any = {};
        switch (type) {
            case TreeOrderType.Category:
                break;
            case TreeOrderType.Detail:
                params.ubsidiaryLedgerCode = code;
                break;
            case TreeOrderType.General:
                params.groupLedgerCode = code;
                break;
            case TreeOrderType.Group:
                params.categoryLedgerCode = code;
                break;
            case TreeOrderType.Subsidiary:
                params.generalLedgerCode = code;
                break;
        }
        return this.http.get(GlService.getLevelApi, { params });
    }

    public getChartApi(params): Observable<any> {
        return this.http.get(GlService.getChartApi, { params });
    }

    getGlGridData(params): Observable<any> {
        return this.http.get(GlService.getGLGridDataApi, { params });
    }

    getChangeApi(params): Observable<any> {
        return this.http.get(GlService.GlChangeApi, { params });
    }
}
