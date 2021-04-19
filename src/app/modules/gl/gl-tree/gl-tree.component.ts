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

    private expandRow(selectedRow: RowModel, index): void {
        const spliceIfNotFound = (x: RowModel): void => {
            if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                this.groupObj.splice(index + 1, 0, x);
            }
        };

        const setRow = (result: RowModel, type: TreeOrderType) => {
            result.type = type;
            result.isCollapsed = false;
            result.parentCode = selectedRow.code;
            spliceIfNotFound(result);
        };

        switch (selectedRow.type) {
            case TreeOrderType.Category:
                this.glService.getGroupByCategory(selectedRow.code).subscribe((res) => {
                    res.items.map((result: GroupModel) => {
                        result.code = result.groupLedgerCode;
                        result.name = result.groupLedgerName;
                        setRow(result, TreeOrderType.Group);
                    });
                });
                break;
            case TreeOrderType.Group:
                this.glService.getGeneralByGroup(selectedRow.code).subscribe((res) => {
                    res.items.map((result: GeneralModel) => {
                        result.code = result.generalLedgerCode;
                        result.name = result.generalLedgerName;
                        setRow(result, TreeOrderType.General);
                    });
                });
                break;
            case TreeOrderType.General:
                this.glService.getSubsidiaryByGeneral(selectedRow.code).subscribe((res) => {
                    res.items.map((result: SubsidiaryModel) => {
                        result.code = result.subsidiaryLedgerCode;
                        result.name = result.subsidiaryLedgerName;
                        setRow(result, TreeOrderType.Subsidiary);
                    });
                });
                break;
            case TreeOrderType.Subsidiary:
                this.glService.getDetailBySubsidiary(selectedRow.code).subscribe((res) => {
                    res.items.map((result: DetailModel) => {
                        result.code = result.detailLedgerCode;
                        result.name = result.detailLedgerName;
                        setRow(result, TreeOrderType.Detail);
                    });
                });
                break;
            default:
                break;
        }
    }

    private collapseRow(c: RowModel, removeList: Array<string>): void {
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

    public foldRow(selectedRow): void {
        // const fundCC: CategoryModel = this.groupObj.find((row) => row.code === selectedRow.code && row.type === selectedRow.type);
        const index = this.groupObj.indexOf(selectedRow);
        if (index > -1) {
            this.groupObj[index].isCollapsed = !this.groupObj[index].isCollapsed;
        }
        if (this.groupObj[index].isCollapsed) {
            this.expandRow(selectedRow, index);
        } else {
            const removeList = [];
            this.collapseRow(selectedRow, removeList);
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
