import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { fuseAnimations } from '@fuse/animations';
import { map } from 'rxjs/operators';
import { Tree, TreeFlatNode, TreeNode } from './tree-select.types';
import { timer } from 'rxjs';

@Component({
    selector: 'app-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TreeSelectComponent), multi: true },
    ],
    animations: fuseAnimations,
})
export class TreeSelectComponent implements OnChanges, ControlValueAccessor, Validator {
    @Input() data;
    @Input() maxSelect = -1;
    @Input() selectedValueFieldName = 'titleFA';
    tree: Tree;
    show = false;
    disable = false;
    values: any;
    mouseIn: any;
    expandAll = true;
    showSelected = false;
    public onTouched: () => void = () => {};

    constructor() {
        this.tree = {
            dataSource: [],
            treeControl: null,
            treeFlattener: null,
            checklistSelection: new SelectionModel<TreeFlatNode>(true),
            flatNodeMap: null,
            nestedNodeMap: null,
        };
    }

    ngOnChanges(): void {
        if (!this.data) {
            this.show = false;
            return;
        }

        this.data.children = this.data.children.sort((a, b) => a.id - b.id);
        const flatNodeMap = new Map<TreeFlatNode, TreeNode>();
        const nestedNodeMap = new Map<TreeNode, TreeFlatNode>();
        const checklistSelection = this.tree.checklistSelection;
        const transformer = (node: TreeNode, level: number) => {
            let flatNode: TreeFlatNode;
            if (nestedNodeMap.has(node) && nestedNodeMap.get(node).id === node.id) {
                flatNode = nestedNodeMap.get(node);
            } else {
                flatNode = new TreeFlatNode();
            }
            flatNode.id = node.id;
            flatNode.titleFA = node[this.selectedValueFieldName];
            flatNode.level = level;
            flatNode.expandable = !!node.children && node.children.length > 0;
            flatNodeMap.set(flatNode, node);
            nestedNodeMap.set(node, flatNode);
            return flatNode;
        };
        const treeFlattener = new MatTreeFlattener(transformer, this.getLevel, this.isExpandable, this.getChildren);
        const treeControl = new FlatTreeControl<TreeFlatNode>(this.getLevel, this.isExpandable);
        const dataSource = new MatTreeFlatDataSource(treeControl, treeFlattener);
        dataSource.data = [this.data];

        this.tree.dataSource = dataSource;
        this.tree.treeControl = treeControl;
        this.tree.treeFlattener = treeFlattener;
        this.tree.flatNodeMap = flatNodeMap;
        this.tree.nestedNodeMap = nestedNodeMap;

        this.parseValues(this.values);
        this.show = true;
    }

    // --------------------------------------------------------------- Tree Functions
    getLevel = (node: TreeFlatNode) => node.level;

    isExpandable = (node: TreeFlatNode) => node.expandable;

    getChildren = (node: TreeNode): TreeNode[] => node.children;

    hasChild = (_: number, nodeData: TreeFlatNode) => nodeData.expandable;

    leafItemSelectionToggle(node: TreeFlatNode, tree: any): void {
        tree.checklistSelection.toggle(node);
        // if (tree.checklistSelection.isSelected(node)) {
        //     this.selectAllParents(node, tree);
        // }
    }

    checkAllParentsSelection(node: TreeFlatNode, tree: any): void {
        let parent: TreeFlatNode | null = this.getParentNode(node, tree);
        while (parent) {
            this.checkRootNodeSelection(parent, tree);
            parent = this.getParentNode(parent, tree);
        }
    }

    selectAllParents(node: TreeFlatNode, tree: any): void {
        let parent: TreeFlatNode | null = this.getParentNode(node, tree);
        while (parent) {
            tree.checklistSelection.select(parent);
            parent = this.getParentNode(parent, tree);
        }
    }

    checkRootNodeSelection(node: TreeFlatNode, tree: any): void {
        const nodeSelected = tree.checklistSelection.isSelected(node);
        const descendants = tree.treeControl.getDescendants(node);
        const descAllSelected = descendants.every((child) => tree.checklistSelection.isSelected(child));
        if (nodeSelected && !descAllSelected) {
            tree.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            tree.checklistSelection.select(node);
        }
    }

    getParentNode(node: TreeFlatNode, tree: any): TreeFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = tree.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = tree.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    descendantsAllSelected(node: TreeFlatNode, tree: any): boolean {
        const descendants = tree.treeControl.getDescendants(node);
        return descendants.every((child) => tree.checklistSelection.isSelected(child));
    }

    checkIndeterminate(node: TreeFlatNode, tree: any): boolean {
        const descendants = tree.treeControl.getDescendants(node);
        const result = descendants.some((child) => tree.checklistSelection.isSelected(child));
        return result && tree.checklistSelection.isSelected(node) && !this.descendantsAllSelected(node, tree);
    }

    roleSelectionToggle(node: TreeFlatNode, tree): void {
        tree.checklistSelection.toggle(node);
        const descendants = tree.treeControl.getDescendants(node);

        if (!tree.checklistSelection.isSelected(node)) {
            tree.checklistSelection.deselect(...descendants);
        } else {
            this.selectAllParents(node, tree);
        }

        // // Force update for the parent
        // descendants.every(child =>
        //     tree.checklistSelection.isSelected(child)
        // );
        // this.checkAllParentsSelection(node, tree);
    }

    toggleSelectAll(trees: Array<Tree>, select: boolean): void {
        trees.forEach((tree: Tree) => {
            tree.dataSource.data.forEach((el: TreeNode) => {
                const checkAllChild = (treeNode: TreeNode) => {
                    const fn = tree.nestedNodeMap.get(treeNode);

                    if (!fn) {
                        return;
                    }

                    if (select) {
                        if (!tree.checklistSelection.isSelected(fn)) {
                            tree.checklistSelection.select(fn);
                        }
                    } else {
                        if (tree.checklistSelection.isSelected(fn)) {
                            tree.checklistSelection.deselect(fn);
                        }
                    }

                    if (treeNode.children && treeNode.children.length > 0) {
                        treeNode.children.forEach((child) => checkAllChild(child));
                    }
                };

                checkAllChild(el);
            });
        });
    }

    isAnyExpanded(): boolean {
        return this.tree.treeControl.dataNodes.some((el) => this.tree.treeControl.isExpanded(el));
    }

    // ---------------------------------- FORM

    public writeValue(val: any): void {
        this.values = val;
        this.parseValues(val);
        // console.log(this.tree.nestedNodeMap)
    }

    parseValues(value: any): void {
        if (!value || !this.tree || this.tree.dataSource.length === 0 || !this.tree.nestedNodeMap) {
            return;
        }

        for (const child of value) {
            let foundedFlatNode = null;
            for (const [treeNode, flatNode] of this.tree.nestedNodeMap) {
                if (treeNode.id === child) {
                    foundedFlatNode = flatNode;
                }
            }

            if (foundedFlatNode) {
                this.tree.checklistSelection.select(foundedFlatNode);
            }
        }
    }

    registerOnChange(fn: any): void {
        this.tree.checklistSelection.changed
            .pipe(
                map((_) => {
                    return this.tree.checklistSelection.selected.map((el) => el.id);
                })
            )
            .subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disable = isDisabled;
        // this.addressForm.disable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        // return { invalidForm: { valid: false, message: 'Address fields are invalid' } };
        return null;
    }

    mouseLeave(): void {
        this.showSelected = false;
        this.expandAll = true;
        this.tree?.treeControl?.collapseAll();
    }

    toggleExpandTable(): void {
        if (this.expandAll) {
            this.tree.treeControl.expandAll();
            this.expandAll = false;
        } else {
            this.tree.treeControl.collapseAll();
            this.expandAll = true;
        }
    }
}
