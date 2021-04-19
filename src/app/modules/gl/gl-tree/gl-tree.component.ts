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

    private getGlCategory(): void {
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
                this.groupObj.push.apply(this.groupObj, this.glCategories);
            }
        });
    }

    private expandRow(c: RowModel, index): void {
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

    private collapseRow(selectedRow: RowModel): Array<string> {
        // todo: fix
        const removeList = [];
        for (const row of this.groupObj) {
            if (row.parentCode && row.parentCode === selectedRow.code) {
                removeList.push(row.code);
                for (const childRow of this.groupObj) {
                    if (childRow.parentCode === row.code) {
                        removeList.concat(this.collapseRow(childRow));
                    }
                }
            }
        }
        return _.uniq(removeList);
    }

    public toggleFoldRow(selectedRow: any, index: number): void {
        selectedRow.isCollapsed = !selectedRow.isCollapsed;
        if (selectedRow.isCollapsed) {
            this.expandRow(selectedRow, index);
        } else {
            const removeList = this.collapseRow(selectedRow);
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
