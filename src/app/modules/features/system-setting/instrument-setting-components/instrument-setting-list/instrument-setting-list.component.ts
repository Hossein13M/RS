import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { NewInstrumentService } from 'app/services/feature-services/system-setting-services/new-instrument.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { InstrumentSettingAddComponent } from '../instrument-setting-add/instrument-setting-add.component';

@Component({
    selector: 'app-instrument-setting-list',
    templateUrl: './instrument-setting-list.component.html',
    styleUrls: ['./instrument-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class InstrumentSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = [
        'name',
        'nameEn',
        'symbol',
        'symbolEn',
        'boardName',
        'marketName',
        'isActive',
        'isInBourse',
        'type',
        'operation',
    ];
    searchFormGroup: FormGroup;

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public newInstrumentService: NewInstrumentService) {}

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            name: '',
            nameEn: '',
            symbol: '',
            symbolEn: '',
            boardName: '',
            marketName: '',
            isActive: '',
            isInBourse: '',
            type: '',
        });
    }

    pageHandler(e: PagingEvent) {
        this.newInstrumentService.specificationModel.limit = e.pageSize;
        this.newInstrumentService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.newInstrumentService.specificationModel.searchKeyword = res;
            this.newInstrumentService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.newInstrumentService.getInstruments(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.newInstrumentService.setPageDetailData(res);
        });
    }

    add() {
        this.matDialog
            .open(InstrumentSettingAddComponent, {
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
                    this.newInstrumentService.deleteInstrument(element.ticker, element.isInBourse, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(InstrumentSettingAddComponent, {
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

    isWorking: any;
}
