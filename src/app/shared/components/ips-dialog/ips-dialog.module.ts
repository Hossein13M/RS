import { ShareModule } from '#shared/share.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IpsDialogComponent } from './ips-dialog.component';
import { IpsService } from '#shared/components/ips-dialog/ips.service';

@NgModule({
    declarations: [IpsDialogComponent],
    imports: [CommonModule, FlexModule, MatDialogModule, ShareModule, MatProgressBarModule],
    exports: [IpsDialogComponent],
    providers: [IpsService],
})
export class IpsDialogModule {}
