import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PricePipe } from 'app/shared/pipes/price.pipe';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-trend-chart',
    templateUrl: './trend-chart.component.html',
    styleUrls: ['./trend-chart.component.scss'],
})
export class TrendChartComponent implements OnInit, OnDestroy {
    @Input() data: Array<any>;
    @Input() width = '100%';
    @Input() height = '300px';
    @Input() paginator: any;
    @Input() dateName: string;
    @Input() valueName: string;
    @Input() valueType = 'price';
    @Input() chartScroll = true;
    @Input() convertJalali: boolean;
    trendChart: any;

    constructor() {}

    ngOnInit(): void {
        this.dateName = this.dateName ? this.dateName : 'date';
        this.valueName = this.valueName ? this.valueName : 'value';

        if (this.convertJalali) {
            this.data = this.convertDate(this.data, this.dateName);
            this.dateName = this.dateName + 'Fa';
        }

        this.data = this.convertValueType(this.data, this.valueName, this.valueType);

        this.data = this.deleteInvalidDates(this.data, this.dateName);

        if (this.data) {
            this.buildChart(this.data, this.dateName, this.valueName, this.chartScroll);
        }
    }

    convertDate(data: Array<any>, dateName: string): Array<any> {
        data.forEach((e) => {
            e[dateName + 'Fa'] = new Date(e[dateName]).toLocaleDateString('fa-Ir', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        });
        return data;
    }

    buildChart(data: Array<any>, dateName: string, valueName: string, chartScroll = false): void {
        if (!data || data.length === 0) {
            return;
        }

        this.trendChart = am4core.create('trendETFChart', am4charts.XYChart);

        this.trendChart.data = data;
        this.trendChart.rtl = true;

        this.trendChart.padding(40, 40, 40, 40);

        const categoryAxis = this.trendChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = dateName;
        categoryAxis.renderer.minGridDistance = 200;

        this.trendChart.yAxes.push(new am4charts.ValueAxis());

        const series = this.trendChart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = dateName;
        series.dataFields.valueY = valueName;
        series.tooltipText = `{${valueName}}`;

        this.trendChart.cursor = new am4charts.XYCursor();

        if (chartScroll) {
            this.trendChart.scrollbarX = new am4core.Scrollbar();
            this.trendChart.scrollbarX.parent = this.trendChart.bottomAxesContainer;
        }
    }

    private deleteInvalidDates(data: Array<any>, dateName: string): Array<any> {
        data = data.filter((el) => el[dateName] !== 'Invalid Date');
        return data;
    }

    private convertValueType(data: Array<any>, valueName: string, valueType: string): Array<any> {
        data.forEach((el) => (el[valueName] = PricePipe.convertPrice(el[valueName])));
        return data;
    }

    ngOnDestroy(): void {
        if (this.trendChart) {
            this.trendChart.dispose();
        }
    }
}
