import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlService } from 'app/services/feature-services/gl.service';
import { GlPieChartComponent } from '../gl-pie-chart/gl-pie-chart.component';

export enum TreeOrderType {
    Category = 'Category',
    Group = 'Group',
    General = 'General',
    Subsidiary = 'subsidiary',
    Detail = 'Detail',
}

@Component({
    selector: 'app-gl-tree',
    templateUrl: './gl-tree.component.html',
    styleUrls: ['./gl-tree.component.scss'],
})
export class GlTreeComponent implements OnInit, AfterViewInit {
    groupObj = [];
    glCategories = [];
    today = new Date();
    dateForm = new FormControl(this.today);
    isWorking: any;

    constructor(private glService: GlService, private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.getGlCategory();

        this.dateForm.valueChanges.subscribe((newDate) => {
            this.groupObj = [];
            this.glService.date = newDate;
            this.getGlCategory();
        });
    }

    ngAfterViewInit(): void {}

    getGlCategory(): void {
        this.glService.getCategoryApi(this).subscribe((res: any) => {
            if (res) {
                res.items.map((x) => {
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

    changeCollaption(c): void {
        const fundCC: any = this.groupObj.find((x) => x.code == c.code && x.type === c.type);
        const index = this.groupObj.indexOf(fundCC);
        if (index > -1) {
            this.groupObj[index].isCollapsed = !this.groupObj[index].isCollapsed;
        }
        if (this.groupObj[index].isCollapsed) {
            if (c.type === TreeOrderType.Category) {
                this.glService.getGroupByCategory(c.code, this).subscribe((res: any) => {
                    res.items.map((x) => {
                        x.type = TreeOrderType.Group;
                        x.isCollapsed = false;
                        x.code = x.groupLedgerCode;
                        x.name = x.groupLedgerName;
                        x.parentCode = c.code;
                        if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                            this.groupObj.splice(index + 1, 0, x);
                        }
                    });
                });
            } else if (c.type === TreeOrderType.Group) {
                this.glService.getGeneralByGroup(c.code, this).subscribe((res: any) => {
                    res.items.map((x) => {
                        x.type = TreeOrderType.General;
                        x.isCollapsed = false;
                        x.code = x.generalLedgerCode;
                        x.name = x.generalLedgerName;
                        x.parentCode = c.code;
                        if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                            this.groupObj.splice(index + 1, 0, x);
                        }
                    });
                });
            } else if (c.type === TreeOrderType.General) {
                this.glService.getSubsidiaryByGeneral(c.code).subscribe((res: any) => {
                    res.items.map((x) => {
                        x.type = TreeOrderType.Subsidiary;
                        x.isCollapsed = false;
                        x.code = x.subsidiaryLedgerCode;
                        x.name = x.subsidiaryLedgerName;
                        x.parentCode = c.code;
                        if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                            this.groupObj.splice(index + 1, 0, x);
                        }
                    });
                });
            } else if (c.type === TreeOrderType.Subsidiary) {
                this.glService.getDetailBySubsidiary(c.code).subscribe((res: any) => {
                    res.items.map((x) => {
                        x.type = TreeOrderType.Detail;
                        x.isCollapsed = false;
                        x.code = x.detailLedgerCode;
                        x.name = x.detailLedgerName;
                        x.parentCode = c.code;
                        if (!this.groupObj.find((y) => y.name === x.name && y.code === x.code)) {
                            this.groupObj.splice(index + 1, 0, x);
                        }
                    });
                });
            }
        } else {
            const removeList = [];
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
        this.glService.date = this.dateForm.value;
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
