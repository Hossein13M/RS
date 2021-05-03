import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { GlCategoryModel, GlDetailModel, GlGeneralModel, GlGroupModel, GlModel, GlSubsidiaryModel, TreeOrderType } from '../gl.model';
import { GlPieChartComponent } from './gl-pie-chart/gl-pie-chart.component';
import { GlTreeService } from './gl-tree.service';

@Component({
    selector: 'app-gl-tree',
    templateUrl: './gl-tree.component.html',
    styleUrls: ['./gl-tree.component.scss'],
})
export class GlTreeComponent implements OnInit {
    groupObj = [];
    glCategories: Array<GlModel> = [];
    today: Date = new Date();
    dateForm = new FormControl(this.today);

    constructor(private glTreeService: GlTreeService, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.getGlCategory();
        this.dateForm.valueChanges.subscribe(() => {
            this.groupObj = [];
            this.getGlCategory();
        });
    }

    private getGlCategory(): void {
        this.glTreeService.getCategoryApi().subscribe((res) => {
            if (res) {
                res.items.map((x: GlCategoryModel) => {
                    x.type = TreeOrderType.Category;
                    x.isCollapsed = false;
                    x.code = x.categoryLedgerCode;
                    x.name = x.categoryLedgerName;
                    x.parentCode = '000';
                });
                this.glCategories = res.items;
                this.groupObj.push.apply(this.groupObj, this.glCategories);
            }
        });
    }

    private expandRow(c: GlModel, index): void {
        const spliceIfNotFound = (x: GlModel): void => {
            if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                this.groupObj.splice(index + 1, 0, x);
            }
        };

        const setRow = (result: GlModel, type: TreeOrderType) => {
            result.type = type;
            result.isCollapsed = false;
            result.parentCode = c.code;
            spliceIfNotFound(result);
        };

        switch (c.type) {
            case TreeOrderType.Category:
                this.glTreeService.getGroupByCategory(c.code).subscribe((res) => {
                    res.items.map((x: GlGroupModel) => {
                        x.code = x.groupLedgerCode;
                        x.name = x.groupLedgerName;
                        setRow(x, TreeOrderType.Group);
                    });
                });
                break;
            case TreeOrderType.Group:
                this.glTreeService.getGeneralByGroup(c.code).subscribe((res) => {
                    res.items.map((x: GlGeneralModel) => {
                        x.code = x.generalLedgerCode;
                        x.name = x.generalLedgerName;
                        setRow(x, TreeOrderType.General);
                    });
                });
                break;
            case TreeOrderType.General:
                this.glTreeService.getSubsidiaryByGeneral(c.code).subscribe((res) => {
                    res.items.map((x: GlSubsidiaryModel) => {
                        x.code = x.subsidiaryLedgerCode;
                        x.name = x.subsidiaryLedgerName;
                        setRow(x, TreeOrderType.Subsidiary);
                    });
                });
                break;
            case TreeOrderType.Subsidiary:
                this.glTreeService.getDetailBySubsidiary(c.code).subscribe((res) => {
                    res.items.map((x: GlDetailModel) => {
                        x.code = x.detailLedgerCode;
                        x.name = x.detailLedgerName;
                        setRow(x, TreeOrderType.Detail);
                    });
                });
                break;
            default:
                break;
        }
    }

    private collapseRow(selectedRow: GlModel, index: number): Array<string> {
        let removeList: Array<string> = [];
        const parentOfSelectedRow = this.glTreeService.getSuperior(selectedRow.type);
        const modifiedGroupObj = _.slice(this.groupObj, index + 1);
        for (const row of modifiedGroupObj) {
            // sibling check
            if (row.type === selectedRow.type) {
                break;
            }
            // single sibling check
            if (row.type === parentOfSelectedRow) {
                break;
            }
            if (row.type !== selectedRow.type) {
                removeList.push(row.code);
            }
        }
        removeList = _.compact(removeList);
        return _.uniq(removeList);
    }

    public toggleFoldRow(selectedRow: any, index: number): void {
        selectedRow.isCollapsed = !selectedRow.isCollapsed;
        if (selectedRow.isCollapsed) {
            this.expandRow(selectedRow, index);
        } else {
            const removeList = this.collapseRow(selectedRow, index);
            this.groupObj = this.groupObj.filter((el) => !removeList.includes(el.code));
        }
    }

    public calculateMargin(type: TreeOrderType): string {
        switch (type) {
            case TreeOrderType.Category:
                return '30px';
            case TreeOrderType.Group:
                return '70px';
            case TreeOrderType.General:
                return '110px';
            case TreeOrderType.Subsidiary:
                return '140px';
            case TreeOrderType.Detail:
                return '160px';
            default:
                return '0';
        }
    }

    public openChartDialog(): void {
        this.matDialog
            .open(GlPieChartComponent, { panelClass: 'dialog-w60', data: this.glCategories })
            .afterClosed()
            .subscribe(() => {});
    }
}
