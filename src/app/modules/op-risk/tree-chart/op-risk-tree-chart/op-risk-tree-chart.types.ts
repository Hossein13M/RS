export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
    'NO_SELECT',
    'SUCCESS',
}

export class TreeChartNode {
    id: number;
    titleFA: string;
    parent: TreeChartNode;
    children: TreeChartNode[];
    mappings: TreeChartMapping[];
    mapped: any = null;
}

export class TreeChartFlatNode {
    mappings: TreeChartMapping[];
    expandable: boolean;
    mapped = false;
    titleFA: string;
    level: number;
    id: number;
}

export interface TreeChartMapping {
    id: number;
    mapParentId: number;
    mapChildId: number;
    childTitleFa: string;
    childTitleEN: string;
    childParentId: number;
    childIcon: string;
}
