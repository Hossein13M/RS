import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsMonitoringIpsDialogComponent } from './assets-monitoring-ips-dialog.component';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '#shared/share.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [AssetsMonitoringIpsDialogComponent],
    imports: [CommonModule, FlexModule, MatDialogModule, ShareModule, MatProgressBarModule],
    exports: [AssetsMonitoringIpsDialogComponent],
})
export class AssetsMonitoringIpsDialogModule {}
