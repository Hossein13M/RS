import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavService } from 'app/modules/nav/nav.service';
import { LocalStorageService } from 'app/services/Base/local-storage.service';

@Component({
    selector: 'app-nav-process-detail-dialog',
    templateUrl: './nav-process-detail-dialog.component.html',
    styleUrls: ['./nav-process-detail-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NavProcessDetailDialogComponent implements OnInit {
    isWorking: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private navService: NavService,
        public dialogRef: MatDialogRef<NavProcessDetailDialogComponent>
    ) {}

    processRunTime(): void {
        this.navService.processNAVRuntime(this.data.fundId, this.data.plannedRate, null).subscribe(() => {});
    }

    ngOnInit() {
        this.process();
    }

    process() {
        const obj = { fundNationalCode: this.data.fundId, transactions: LocalStorageService.getNav() };
        this.navService.processNav(obj, this).subscribe(() => this.processRunTime());
    }

    handleError(): boolean {
        return false;
    }
}
