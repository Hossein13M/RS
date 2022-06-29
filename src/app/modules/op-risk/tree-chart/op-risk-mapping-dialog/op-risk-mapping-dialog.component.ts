import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AlertService } from '#shared/services/alert.service';
import { Observable, of } from 'rxjs';
import { OpRiskTreeChartService } from '../op-risk-tree-chart.service';
import { TreeChartFlatNode, TreeChartMapping, TreeChartNode } from '../op-risk-tree-chart/op-risk-tree-chart.types';
import { TreeMappingService } from '../tree-mapping.service';

export interface DialogData {
    treeName: string;
    mappedNode: TreeChartNode;
}

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
    'SUCCESS',
}

@Component({
    selector: 'app-op-risk-mapping-dialog',
    templateUrl: './op-risk-mapping-dialog.component.html',
    styleUrls: ['./op-risk-mapping-dialog.component.scss'],
})
export class OpRiskMappingDialogComponent implements OnInit {
    // ----------------------------- Tree
    flatNodeMap: Map<TreeChartFlatNode, TreeChartNode>;
    nestedNodeMap: Map<TreeChartNode, TreeChartFlatNode>;

    checklistSelection = new SelectionModel<TreeChartFlatNode>(true);

    treeControl: FlatTreeControl<TreeChartFlatNode>;
    treeFlattener: MatTreeFlattener<TreeChartNode, TreeChartFlatNode>;
    dataSource: MatTreeFlatDataSource<TreeChartNode, TreeChartFlatNode>;

    // ----------------------------- General States
    isWorking: any = false;
    failed = false;
    stateType = stateType;
    state = stateType.LOADING;

    mappedTreeName: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialogRef: MatDialogRef<OpRiskMappingDialogComponent>,
        private ortcs: OpRiskTreeChartService,
        private tms: TreeMappingService,
        private alertService: AlertService
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

        this.treeControl = new FlatTreeControl<TreeChartFlatNode>(this.getLevel, this.isExpandable);

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.flatNodeMap = new Map<TreeChartFlatNode, TreeChartNode>();
        this.nestedNodeMap = new Map<TreeChartNode, TreeChartFlatNode>();
    }

    ngOnInit(): void {
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.ortcs.getTree(this.data.treeName).subscribe(
            (tree) => {
                this.state = stateType.PRESENT;

                const parseTree = (node, parent): TreeChartNode => {
                    const parsedNode = new TreeChartNode();
                    parsedNode.id = node.id;
                    parsedNode.titleFA = node.titleFA;
                    parsedNode.mappings = node.mappings;
                    parsedNode.children = [];
                    parsedNode.parent = parent;

                    // Handle This Node Relation
                    const thisNodeRelationIndex = this.data.mappedNode.mappings.findIndex((el) => el.mapChildId === node.id);
                    parsedNode.mapped = thisNodeRelationIndex !== -1;

                    if (node.children && node.children.length > 0) {
                        node.children.forEach((child) => parsedNode.children.push(parseTree(child, parsedNode)));
                    }
                    return parsedNode;
                };
                this.mappedTreeName = tree.titleFA;
                this.dataSource.data = [parseTree(tree, null)];
                this.treeControl.expandAll();
            },
            () => (this.state = stateType.FAILED)
        );
    }

    // ---------------------------------------- Tree

    transformer = (node: TreeChartNode, level: number) => {
        const flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.id === node.id ? this.nestedNodeMap.get(node)! : new TreeChartFlatNode();

        flatNode.id = node.id;
        flatNode.level = level;
        flatNode.titleFA = node.titleFA;
        flatNode.expandable = !!node.children && node.children.length > 0;
        flatNode.mappings = node.mappings;
        flatNode.mapped = node.mapped;

        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);

        return flatNode;
    };

    getLevel = (node: TreeChartFlatNode) => {
        return node.level;
    };

    isExpandable = (node: TreeChartFlatNode) => {
        return node.expandable;
    };

    getChildren = (node: TreeChartNode): Observable<TreeChartNode[]> => {
        return of(node.children);
    };

    hasChild = (_: number, _nodeData: TreeChartFlatNode) => {
        return _nodeData.expandable;
    };

    hasNoContent = (_: number, _nodeData: TreeChartFlatNode) => {
        return _nodeData.id === null;
    };

    handleError(): boolean {
        this.failed = true;
        return false;
    }

    refreshData(): void {
        const data = this.dataSource.data;
        this.dataSource.data = [];
        this.dataSource.data = data;
    }

    addMap(node: any): void {
        this.tms.addMapping(this.data.mappedNode.id, node.id).subscribe(
            (res) => {
                const foundedNode = this.flatNodeMap.get(node);

                foundedNode.mapped = true;
                node.mapped = true;
                this.data.mappedNode.mappings.push({
                    id: res.id,
                    mapParentId: res.mapParent.id,
                    mapChildId: res.mapChild.id,
                    childTitleFa: res.mapChild.titleFA,
                    childTitleEN: res.mapChild.titleEN,
                    childParentId: res.mapParent.id,
                    childIcon: null,
                });
                this.refreshData();
                this.alertService.onSuccess('نگاشت اضافه شد.');
            },
            () => this.alertService.onError('نگاشت اضافه نشد.')
        );
    }

    deleteMap(relation: TreeChartMapping, node: TreeChartFlatNode): void {
        this.tms.deleteMapping(relation.id).subscribe(
            () => {
                const foundedNode = this.flatNodeMap.get(node);
                const index = this.data.mappedNode.mappings.findIndex((el) => el.id === relation.id);

                if (index !== undefined || index !== -1) this.data.mappedNode.mappings.splice(index, 1);

                node.mapped = false;
                foundedNode.mapped = false;

                this.refreshData();
                this.alertService.onSuccess('نگاشت حذف شد.');
            },
            () => this.alertService.onError('نگاشت حذف نشد.')
        );
    }
}
