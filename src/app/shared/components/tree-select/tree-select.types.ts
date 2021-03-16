import { SelectionModel } from '@angular/cdk/collections';

export enum stateType {
    'INIT',
    'LOADING',
    'PRESENT',
    'FAILED',
}

export class TreeNode {
    id: number;
    children: TreeNode[];
    titleFA: string;
}

export class TreeFlatNode {
    id: number;
    titleFA: string;
    children: TreeNode[];
    level: number;
    expandable: boolean;
}

export interface Tree {
    dataSource: any;
    treeControl: any;
    treeFlattener: any;
    checklistSelection: SelectionModel<TreeFlatNode>;
    flatNodeMap: Map<TreeFlatNode, TreeNode>;
    nestedNodeMap: Map<TreeNode, TreeFlatNode>;
}
