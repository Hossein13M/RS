export enum TreeOrderType {
    Category = 'Category',
    Group = 'Group',
    General = 'General',
    Subsidiary = 'subsidiary',
    Detail = 'Detail',
}

export interface CategoryModelApi {
    date: string;
    items: Array<RowModel>;
}

export type RowModel = CategoryModel | GroupModel | GeneralModel | SubsidiaryModel | DetailModel;

interface DefaultModel {
    readonly aggregatedCreditAmount: string;
    readonly aggregatedDebitAmount: string;
    readonly aggregatedRemainedAmount: string;
    code: string;
    isCollapsed: boolean;
    name: string;
    parentCode: string;
    type: TreeOrderType;
}

export interface CategoryModel extends DefaultModel {
    readonly categoryLedgerCode: string;
    readonly categoryLedgerName: string;
}

export interface GroupModel extends DefaultModel {
    readonly groupLedgerCode: string;
    readonly groupLedgerName: string;
}

export interface GeneralModel extends DefaultModel {
    readonly generalLedgerCode: string;
    readonly generalLedgerName: string;
}

export interface SubsidiaryModel extends DefaultModel {
    readonly subsidiaryLedgerCode: string;
    readonly subsidiaryLedgerName: string;
}

export interface DetailModel extends DefaultModel {
    readonly detailLedgerCode: string;
    readonly detailLedgerName: string;
}
