import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BourseBoardService } from 'app/services/feature-services/system-setting-services/bourse-board.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BourseBoardSettingAddComponent } from '../bourse-board-setting-add/bourse-board-setting-add.component';

@Component({
    selector: 'app-bourse-board-setting-list',
    templateUrl: './bourse-board-setting-list.component.html',
    styleUrls: ['./bourse-board-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BourseBoardSettingListComponent implements OnInit {
    constructor(private matDialog: MatDialog, private bourseBoard: BourseBoardService) {}
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'code', 'operation'];

    isWorking: any;

    ngOnInit() {
        this.get();
    }

    get() {
        this.bourseBoard.getBourseBorad(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res);
        });
    }

    add() {
        this.matDialog
            .open(BourseBoardSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: null,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.bourseBoard.deleteBourseBorad(element.id, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(BourseBoardSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: element,
            })
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
}
