import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlService } from 'app/modules/gl/gl.service';
import { GlPieChartComponent } from './gl-pie-chart/gl-pie-chart.component';
import { CategoryModel, DetailModel, GeneralModel, GroupModel, RowModel, SubsidiaryModel, TreeOrderType } from '../gl.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-gl-tree',
    templateUrl: './gl-tree.component.html',
    styleUrls: ['./gl-tree.component.scss'],
})
export class GlTreeComponent implements OnInit {
    groupObj = [];
    glCategories: Array<RowModel> = [];
    today: Date = new Date();
    dateForm = new FormControl(this.today);

    constructor(private glService: GlService, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.getGlCategory();
        this.dateForm.valueChanges.subscribe(() => {
            this.groupObj = [];
            this.getGlCategory();
        });
    }

    getGlCategory(): void {
        this.glService.getCategoryApi().subscribe((res) => {
            if (res) {
                res.items.map((x: CategoryModel) => {
                    x.type = TreeOrderType.Category;
                    x.isCollapsed = false;
                    x.code = x.categoryLedgerCode;
                    x.name = x.categoryLedgerName;
                    x.parentCode = '000';
                });
                this.glCategories = res.items;
                this.groupObj = _.concat(this.groupObj, this.glCategories);
            }
        });
    }

    private collapseRow(c: RowModel, index): void {
        const spliceIfNotFound = (x: RowModel): void => {
            if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                this.groupObj.splice(index + 1, 0, x);
            }
        };

        const setRow = (result: RowModel, type: TreeOrderType) => {
            result.type = type;
            result.isCollapsed = false;
            result.parentCode = c.code;
            spliceIfNotFound(result);
        };

        switch (c.type) {
            case TreeOrderType.Category:
                this.glService.getGroupByCategory(c.code).subscribe((res) => {
                    res.items.map((x: GroupModel) => {
                        x.code = x.groupLedgerCode;
                        x.name = x.groupLedgerName;
                        setRow(x, TreeOrderType.Group);
                    });
                });
                break;
            case TreeOrderType.Group:
                this.glService.getGeneralByGroup(c.code).subscribe((res) => {
                    res.items.map((x: GeneralModel) => {
                        x.code = x.generalLedgerCode;
                        x.name = x.generalLedgerName;
                        setRow(x, TreeOrderType.General);
                    });
                });
                break;
            case TreeOrderType.General:
                this.glService.getSubsidiaryByGeneral(c.code).subscribe((res) => {
                    res.items.map((x: SubsidiaryModel) => {
                        x.code = x.subsidiaryLedgerCode;
                        x.name = x.subsidiaryLedgerName;
                        setRow(x, TreeOrderType.Subsidiary);
                    });
                });
                break;
            case TreeOrderType.Subsidiary:
                this.glService.getDetailBySubsidiary(c.code).subscribe((res) => {
                    res.items.map((x: DetailModel) => {
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

    private unCollapseRow(c: RowModel, removeList: Array<string>): void {
        this.groupObj.filter((obj) => {
            if (obj.parentCode && obj.parentCode === c.code) {
                removeList.push(obj.code);
                this.groupObj.filter((x) => {
                    if (x.parentCode === obj.code) {
                        removeList.push(x.code);
                        this.groupObj.filter((y) => {
                            if (y.parentCode === x.code) {
                                removeList.push(y.code);
                                this.groupObj.filter((z) => {
                                    if (z.parentCode === y.code) {
                                        removeList.push(z.code);
                                        this.groupObj.filter((k) => {
                                            if (k.parentCode === z.code) {
                                                removeList.push(k.code);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    changeCollection(c): void {
        const fundCC: CategoryModel = this.groupObj.find((x) => x.code === c.code && x.type === c.type);
        const index = this.groupObj.indexOf(fundCC);
        if (index > -1) {
            this.groupObj[index].isCollapsed = !this.groupObj[index].isCollapsed;
        }
        if (this.groupObj[index].isCollapsed) {
            this.collapseRow(c, index);
        } else {
            const removeList = [];
            this.unCollapseRow(c, removeList);
            this.groupObj = this.groupObj.filter((x) => {
                return !removeList.includes(x.code);
            });
        }
    }

    calculateMargin(c): any {
        if (c.type === TreeOrderType.Category) {
            return '30px';
        } else if (c.type === TreeOrderType.Group) {
            return '70px';
        } else if (c.type === TreeOrderType.General) {
            return '110px';
        } else if (c.type === TreeOrderType.Subsidiary) {
            return '140px';
        } else if (c.type === TreeOrderType.Detail) {
            return '180px';
        }
    }

    submitDate(): void {
        this.groupObj = [];
        this.getGlCategory();
    }

    openChartDialog(): void {
        this.matDialog
            .open(GlPieChartComponent, { panelClass: 'dialog-w60', data: this.glCategories })
            .afterClosed()
            .subscribe(() => {});
    }

    handleError(): boolean {
        return false;
    }
}
