import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GlSettingService } from 'app/services/feature-services/system-setting-services/gl-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { GlSettingAddComponent } from '../gl-setting-add/gl-setting-add.component';

@Component({
    selector: 'app-gl-setting-list',
    templateUrl: './gl-setting-list.component.html',
    styleUrls: ['./gl-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class GlSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['symbol', 'status', 'glCode', 'operation'];
    searchFormGroup: FormGroup;

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public glSettingService: GlSettingService) {}

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({ searchKeyword: '' });
    }

    pageHandler(e: PagingEvent) {
        this.glSettingService.specificationModel.limit = e.pageSize;
        this.glSettingService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.glSettingService.specificationModel.searchKeyword = res;
            this.glSettingService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.glSettingService.getGlSetting(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.glSettingService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.glSettingService.deleteGlSetting(element.id, this).subscribe(() => this.get());
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
