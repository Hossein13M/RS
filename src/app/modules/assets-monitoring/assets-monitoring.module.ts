import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsMonitoringComponent } from './assets-monitoring.component';
import { AssetsMonitoringRoutingModule } from './assets-monitoring-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShareModule } from '#shared/share.module';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from '#shared/components/chart/chart.module';
import { AssetsMonitoringService } from './assets-monitoring.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    ],
    providers: [AssetsMonitoringService],
})
export class AssetsMonitoringModule {}
