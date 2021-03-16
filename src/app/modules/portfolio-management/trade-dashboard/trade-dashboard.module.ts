import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from 'app/layout/layout.module';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { DailyInvestmentReportComponent } from './daily-investment-report/daily-investment-report.component';
import { TradeDashboardPieChartComponent } from './trade-dashboard-pie-chart/trade-dashboard-pie-chart.component';
import { TradeDashboardRoutingModule } from './trade-dashboard-routing.module';
import { TradeDashboardTableComponent } from './trade-dashboard-table/trade-dashboard-table.component';
import { TradeDashboardTrendChartComponent } from './trade-dashboard-trend-chart/trade-dashboard-trend-chart.component';
import { TradeDashboardComponent } from './trade-dashboard.component';
import { TradeDashboardService } from './trade-dashboard.service';

@NgModule({
    declarations: [
        TradeDashboardComponent,
        DailyInvestmentReportComponent,
        TradeDashboardTableComponent,
        TradeDashboardTrendChartComponent,
        TradeDashboardPieChartComponent,
    ],
    imports: [
        CommonModule,
        TradeDashboardRoutingModule,
        LayoutModule,
        FlexModule,
        MaterialModule,
        ShareModule,
        MatProgressSpinnerModule,
        ChartModule,
    ],
    providers: [TradeDashboardService],
})
export class TradeDashboardModule {}
