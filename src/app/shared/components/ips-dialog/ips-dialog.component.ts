import { Component, Inject, OnInit } from '@angular/core';
import { AssetsMonitoringIPSHistory } from '../../../modules/assets-monitoring/assets-monitoring.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IpsService } from '#shared/components/ips-dialog/ips.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-assets-monitoring-ips-dialog',
    templateUrl: './ips-dialog.component.html',
    styleUrls: ['./ips-dialog.component.scss'],
})
export class IpsDialogComponent implements OnInit {
    columns: Array<{ name: string; id: string; type: string; convert?: any }>;
    loading: boolean = true;
    tableData: Array<AssetsMonitoringIPSHistory> = [];

    constructor(private ipsService: IpsService, @Inject(MAT_DIALOG_DATA) public data: { basket: string; withDetails: boolean }) {}

    ngOnInit(): void {
        this.initiateColumns();
        this.getAssetsMonitoringIPSHistory();
    }

    private initiateColumns(): void {
        this.columns = [
            { name: 'سبد', id: 'organizationType', type: 'string' },
            { name: 'کارگزاری', id: 'broker', type: 'string', convert: (value: string | null) => (value ? value : '-') },
            {
                name: 'تاریخ',
                id: 'date',
                type: 'date',
                convert: (value: any) => new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' }),
            },
        ];
    }

    private getAssetsMonitoringIPSHistory(): void {
        const searchParams = {
            basket: this.data.basket,
            date: UtilityFunctions.convertDateToPersianDateString(new Date()),
            withDetails: this.data.withDetails,
        };
        this.ipsService.getIPSHistory(searchParams).subscribe((response) => {
            this.loading = false;
            this.tableData = response.items;
        });
    }
}
