import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModelApi } from '../gl.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlTreeService {
    private static getCategoryApi = '/api/v1/gl/category';
    private static getGroupByCategoryApi = '/api/v1/gl/group';
    private static getGeneralByGroupApi = '/api/v1/gl/general';
    private static getSubsidyByGeneralApi = '/api/v1/gl/subsidiary';
    private static getDetailBySubsidyApi = '/api/v1/gl/detail';
    private static getChartApi = '/api/v1/gl/chart';

    constructor(private http: HttpClient) {}

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
