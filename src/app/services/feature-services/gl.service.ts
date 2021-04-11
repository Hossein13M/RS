import { Injectable } from '@angular/core';
import { TreeOrderType } from 'app/modules/gl/gl-tree/gl-tree.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
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

    getCategoryApi(): Observable<any> {
        return this.http.get(GlService.getCategoryApi);
    }

    getGroupByCategory(categoryLedgerCode): Observable<any> {
        return this.http.get(GlService.getGroupByCategoryApi, { params: { categoryLedgerCode } });
    }

    getGeneralByGroup(groupLedgerCode): Observable<any> {
        return this.http.get(GlService.getGeneralByGroupApi, { params: { groupLedgerCode } });
    }

    getSubsidiaryByGeneral(generalLedgerCode): Observable<any> {
        return this.http.get(GlService.getSubsidyByGeneralApi, { params: { generalLedgerCode } });
    }

    getDetailBySubsidiary(subsidiaryLedgerCode): Observable<any> {
        return this.http.get(GlService.getDetailBySubsidyApi, { params: { subsidiaryLedgerCode } });
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
