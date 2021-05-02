import { ShareModule } from '#shared/share.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AssetsMonitoringIpsDialogComponent } from './assets-monitoring-ips-dialog.component';

@NgModule({
    declarations: [AssetsMonitoringIpsDialogComponent],
    imports: [CommonModule, FlexModule, MatDialogModule, ShareModule, MatProgressBarModule],
    exports: [AssetsMonitoringIpsDialogComponent],
})
export class AssetsMonitoringIpsDialogModule {}
