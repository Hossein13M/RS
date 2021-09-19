import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { Observable, of } from 'rxjs';
import { TreeChartFlatNode, TreeChartNode } from '../../op-risk/tree-chart/op-risk-tree-chart/op-risk-tree-chart.types';
import { OrganizationStructureService } from '../organization-structure.service';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'app-organization-role-mapping-dialog',
    templateUrl: './organization-role-mapping-dialog.component.html',
    styleUrls: ['./organization-role-mapping-dialog.component.scss'],
})
export class OrganizationRoleMappingDialogComponent implements OnInit {
    // ----------------------------- Tree
    flatNodeMap: Map<any, any>;
    nestedNodeMap: Map<any, any>;

    checklistSelection = new SelectionModel<any>(true);

    treeControl: FlatTreeControl<any>;
    treeFlattener: MatTreeFlattener<any, any>;
    dataSource: MatTreeFlatDataSource<any, any>;

    // ----------------------------- General States
    isWorking: any = false;
    failed = false;
    stateType = stateType;
    state = stateType.LOADING;

    mappedTreeName: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<OrganizationRoleMappingDialogComponent>,
        private alertService: AlertService,
        private organizationStructureService: OrganizationStructureService
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

        this.treeControl = new FlatTreeControl<any>(this.getLevel, this.isExpandable);

        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.flatNodeMap = new Map<any, any>();
        this.nestedNodeMap = new Map<any, any>();
    }

    ngOnInit(): void {
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.organizationStructureService.getOrganizationUnitsByOrgCode(+this.data.organizationCode).subscribe(
            (tree) => {
                this.state = stateType.PRESENT;

                const parseTree = (node, parent): TreeChartNode => {
                    const parsedNode = new TreeChartNode();
                    parsedNode.id = node.id;
                    parsedNode.name = node.name;
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
                this.mappedTreeName = tree.name;
                this.dataSource.data = [parseTree(tree, null)];
                this.treeControl.expandAll();
            },
            () => (this.state = stateType.FAILED)
        );
    }

    patchData(data): void {
        this.dataSource.data = data;
    }

    // ---------------------------------------- Tree

    transformer = (node: TreeChartNode, level: number) => {
        const flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.id === node.id ? this.nestedNodeMap.get(node)! : new TreeChartFlatNode();

        flatNode.id = node.id;
        flatNode.level = level;
        flatNode.name = node.name;
        flatNode.expandable = !!node.children && node.children.length > 0;
        flatNode.mappings = node.mappings;
        flatNode.mapped = node.mapped;

        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);

        return flatNode;
    };

    getLevel = (node: any) => {
        return node.level;
    };

    isExpandable = (node: any) => {
        return node.expandable;
    };

    getChildren = (node: TreeChartNode): Observable<TreeChartNode[]> => {
        return of(node.children);
    };

    hasChild = (_: number, _nodeData: any) => {
        return _nodeData.expandable;
    };

    hasNoContent = (_: number, _nodeData: any) => {
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
        this.organizationStructureService
            .assignRoleToOrganizationUnit({ unitId: node.id, roleId: this.data.mappedNode.id, organization: this.data.organizationCode })
            .subscribe(
                () => {
                    const foundedNode = this.flatNodeMap.get(node);
                    foundedNode.mapped = true;
                    node.mapped = true;
                    // this.data.mappedNode.mappings.push({
                    //     id: res.id,
                    //     mapParentId: res.mapParent.id,
                    //     mapChildId: res.mapChild.id,
                    //     childTitleFa: res.mapChild.name,
                    //     childTitleEN: res.mapChild.titleEN,
                    //     childParentId: res.mapParent.id,
                    //     childIcon: null,
                    // });
                    this.refreshData();
                    this.alertService.onSuccess('نگاشت اضافه شد.');
                },
                () => this.alertService.onError('نگاشت اضافه نشد.')
            );
    }

    deleteMap(relation: any, node: any): void {
        this.organizationStructureService.deleteMappingOfRoleWithUnit(relation).subscribe(
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
