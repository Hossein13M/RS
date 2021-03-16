import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { BarChartJsComponent } from './bar-chart-js/bar-chart-js.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { LineChartJsComponent } from './line-chart-js/line-chart-js.component';
import { PieChartJsComponent } from './pie-chart-js/pie-chart-js.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TrendChartComponent } from './trend-chart/trend-chart.component';

@NgModule({
    declarations: [
        BarChartComponent,
        BarChartJsComponent,
        PieChartComponent,
        PieChartJsComponent,
        TrendChartComponent,
        GaugeChartComponent,
        LineChartJsComponent,
    ],
    imports: [CommonModule, ChartsModule, MatButtonModule, MatDividerModule, MatIconModule, FlexModule, MatProgressSpinnerModule],
    exports: [
        BarChartComponent,
        BarChartJsComponent,
        PieChartComponent,
        PieChartJsComponent,
        TrendChartComponent,
        GaugeChartComponent,
        LineChartJsComponent,
    ],
})
export class ChartModule {}
