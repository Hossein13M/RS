import { ChartModule } from '#shared/components/chart/chart.module';
import { ShareModule } from '#shared/share.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { LayoutModule } from '../../layout/layout.module';
import { IpsDialogModule } from '#shared/components/ips-dialog/ips-dialog.module';
import { AssetsMonitoringRoutingModule } from './assets-monitoring-routing.module';
import { AssetsMonitoringComponent } from './assets-monitoring.component';
import { AssetsMonitoringService } from './assets-monitoring.service';
import { PipesModule } from '#shared/pipes/pipes.module';
import { HeaderModule } from '../../layout/components/header/header.module';

@NgModule({
    declarations: [AssetsMonitoringComponent],
    imports: [
        CommonModule,
        AssetsMonitoringRoutingModule,
        LayoutModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        FlexModule,
        ShareModule,
        MatProgressBarModule,
        MatCardModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        ChartModule,
        IpsDialogModule,
        PipesModule,
        HeaderModule,
    ],
    providers: [AssetsMonitoringService],
})
export class AssetsMonitoringModule {}
