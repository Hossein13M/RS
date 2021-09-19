import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from 'app/layout/layout.module';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { ShareModule } from 'app/shared/share.module';
import { ChartsModule } from 'ng2-charts';
import { OpRiskReportingRoutingModule } from './op-risk-reporting-routing.module';
import { OpRiskReportingComponent } from './op-risk-reporting/op-risk-reporting.component';
import { HeaderModule } from '../../../layout/components/header/header.module';

@NgModule({
    declarations: [OpRiskReportingComponent],
    imports: [
        CommonModule,
        OpRiskReportingRoutingModule,
        LayoutModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        ShareModule,
        ChartsModule,
        ChartModule,
        HeaderModule,
    ],
})
export class OpRiskReportingModule {}
