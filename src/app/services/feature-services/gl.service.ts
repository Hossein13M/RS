import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { TreeOrderType } from 'app/modules/features/gl/gl-tree/gl-tree.component';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class GlService {
    private static getCategoryApi = '/api/v1/gl/category';
    private static getGroupByCategory = '/api/v1/gl/group?categoryLedgerCode={categoryLedgerCode}';
    private static getGeneralByGroup = '/api/v1/gl/general?groupLedgerCode={groupLedgerCode}';
    private static getSubsidyByGeneral = '/api/v1/gl/subsidiary?generalLedgerCode={generalLedgerCode}';
    private static getDetailBySubsidy = '/api/v1/gl/detail?subsidiaryLedgerCode={subsidiaryLedgerCode}';
    private static getLevelApi = '/api/v1/gl/level';
    private static getChartApi = '/api/v1/gl/chart';
    private static getGLGridDataApi = '/api/v1/gl/list';
    private static GlChangeApi = '/api/v1/gl/change';
    date;

    convertIfDateExist(api) {
        if (this.date) {
            return api + '&date=' + this.convertDate(this.date);
        } else return api;
    }

    convertDate(date: Date) {
        return formatDate(date, 'yyyy-MM-dd', 'en_US');
    }

    getCategoryApi(fc?: FormContainer) {
        return this.apiClientService.get(this.convertIfDateExist(GlService.getCategoryApi).replace('&', '?'), fc);
    }

    getGroupByCategory(categoryCode, fc?: FormContainer) {
        const api = GlService.getGroupByCategory.replace('{categoryLedgerCode}', categoryCode);
        return this.apiClientService.get(this.convertIfDateExist(api), fc);
    }

    getGeneralByGroup(groupCode, fc?: FormContainer) {
        const api = GlService.getGeneralByGroup.replace('{groupLedgerCode}', groupCode);
        return this.apiClientService.get(api, fc);
    }

    getSubsidiaryByGeneral(generalCode, fc?: FormContainer) {
        const api = GlService.getSubsidyByGeneral.replace('{generalLedgerCode}', generalCode);
        return this.apiClientService.get(this.convertIfDateExist(api), fc);
    }

    getDetailBySubsidiary(sCode, fc?: FormContainer) {
        const api = GlService.getDetailBySubsidy.replace('{subsidiaryLedgerCode}', sCode);
        return this.apiClientService.get(this.convertIfDateExist(api), fc);
    }

    getLevelApi(code, type: TreeOrderType, fc?: FormContainer) {
        let api = '';
        switch (type) {
            case TreeOrderType.Category:
                api = GlService.getLevelApi;
                break;
            case TreeOrderType.Detail:
                api = GlService.getLevelApi + '?subsidiaryLedgerCode=' + code;
                break;
            case TreeOrderType.General:
                api = GlService.getLevelApi + '?groupLedgerCode=' + code;
                break;
            case TreeOrderType.Group:
                api = GlService.getLevelApi + '?categoryLedgerCode=' + code;
                break;
            case TreeOrderType.Subsidiary:
                api = GlService.getLevelApi + '?generalLedgerCode=' + code;
                break;
        }
        return this.apiClientService.get(api, fc);
    }

    public getChartApi(model, fc?: FormContainer) {
        const api =
            GlService.getChartApi +
            '?fromDate=' +
            this.convertDate(model['fromDate']) +
            '&toDate=' +
            this.convertDate(model['toDate']) +
            '&categoryLedgerCode=' +
            model['categoryLedgerCode'] +
            '&groupLedgerCode=' +
            model['groupLedgerCode'] +
            '&generalLedgerCode=' +
            model['generalLedgerCode'] +
            '&subsidiaryLedgerCode=' +
            model['subsidiaryLedgerCode'] +
            '&detailLedgerCode=' +
            model['detailLedgerCode'];
        return this.apiClientService.get(api, fc);
    }

    getGlGridData(searchModel, fc?: FormContainer) {
        let api = '';
        if (searchModel) {
            api =
                GlService.getGLGridDataApi +
                '?date=' +
                this.convertDate(searchModel['date']) +
                '&limit=' +
                searchModel['limit'] +
                '&skip=' +
                searchModel['skip'];
        } else {
            api = GlService.getGLGridDataApi;
        }
        return this.apiClientService.get(api, fc);
    }

    getChangeApi(model, fc?: FormContainer) {
        let api =
            GlService.GlChangeApi +
            '?fromDate=' +
            this.convertDate(model['fromDate']) +
            '&toDate=' +
            this.convertDate(model['toDate']) +
            model['type'].map((x) => '&type=' + x) +
            model['categoryCode'].map((x) => '&categoryCode=' + x) +
            this.ifHas(model, 'fromPercent') +
            this.ifHas(model, 'toPercent') +
            this.ifHas(model, 'fromValue') +
            this.ifHas(model, 'toValue');
        api = api.replace(/,/g, '');
        return this.apiClientService.get(api, fc);
    }

    ifHas(model, prop) {
        if (model[prop] !== null && model[prop] !== undefined && model[prop] !== '') {
            return '&' + prop + '=' + model[prop];
        } else return '';
    }

    constructor(private apiClientService: ApiClientService) {}
}
