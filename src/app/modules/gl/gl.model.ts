export enum TreeOrderType {
    Category = 'category',
    Group = 'group',
    General = 'general',
    Subsidiary = 'subsidiary',
    Detail = 'detail',
}

export interface CategoryModelApi {
    date: string;
    items: Array<GlModel>;
}

export type GlModel = GlCategoryModel | GlGroupModel | GlGeneralModel | GlSubsidiaryModel | GlDetailModel;

interface DefaultGlModel {
    readonly aggregatedCreditAmount: string;
    readonly aggregatedDebitAmount: string;
    readonly aggregatedRemainedAmount: string;
    code: string;
    isCollapsed: boolean;
    name: string;
    parentCode: string;
    type: TreeOrderType;
}

export interface GlCategoryModel extends DefaultGlModel {
    readonly categoryLedgerCode: string;
    readonly categoryLedgerName: string;
}

export interface GlGroupModel extends DefaultGlModel {
    readonly groupLedgerCode: string;
    readonly groupLedgerName: string;
}

export interface GlGeneralModel extends DefaultGlModel {
    readonly generalLedgerCode: string;
    readonly generalLedgerName: string;
}

export interface GlSubsidiaryModel extends DefaultGlModel {
    readonly subsidiaryLedgerCode: string;
    readonly subsidiaryLedgerName: string;
}

export interface GlDetailModel extends DefaultGlModel {
    readonly detailLedgerCode: string;
    readonly detailLedgerName: string;
}
