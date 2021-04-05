import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { InstrumentTypeService } from 'app/services/feature-services/system-setting-services/instrument-type.service';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { InstrumentTypeSettingAddComponent } from '../instrument-type-setting-add/instrument-type-setting-add.component';

@Component({
    selector: 'app-instrument-type-setting-list',
    templateUrl: './instrument-type-setting-list.component.html',
    styleUrls: ['./instrument-type-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class InstrumentTypeSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'ticker', 'type', 'status', 'symbol', 'isInBourse', 'operation'];
    searchFormGroup: FormGroup;

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            searchKeyword: '',
        });
    }

    pageHandler(e: PagingEvent) {
        this.instrumentTypeService.specificationModel.limit = e.pageSize;
        this.instrumentTypeService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public instrumentTypeService: InstrumentTypeService) {}

    ngOnInit() {
        this.createSearchFormGroup();
        this.get();
        this.searchFormGroup.valueChanges.subscribe((res) => {
            this.instrumentTypeService.specificationModel.searchKeyword = res;
            this.instrumentTypeService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.instrumentTypeService.getInstrumentType(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.instrumentTypeService.setPageDetailData(res);
        });
    }

    edit(element) {
        this.matDialog
            .open(InstrumentTypeSettingAddComponent, {
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
