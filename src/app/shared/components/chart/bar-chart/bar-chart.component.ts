import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnDestroy, OnChanges {
    @Input() data: Array<any>;
    @Input() width = '100%';
    @Input() height = '300px';
    @Input() paginator: any;
    @Input() categoryName: string;
    @Input() valueName: string;
    @Input() valueType = 'price';
    @Input() chartScroll = true;
    barChart: any;
    xAxis: any;

    constructor() {}

    ngOnChanges(): void {
        this.categoryName = this.categoryName ? this.categoryName : 'name';
        this.valueName = this.valueName ? this.valueName : 'value';

        if (this.data) this.buildChart(this.data, this.categoryName, this.valueName, this.chartScroll);
    }

    buildChart(data: Array<any>, categoryName: string, valueName: string, chartScroll = false): void {
        if (!data || data.length === 0) return;

        this.barChart = am4core.create('barChart', am4charts.XYChart);
        this.barChart.colors.step = 2;

        this.barChart.legend = new am4charts.Legend();
        this.barChart.legend.position = 'top';
        this.barChart.legend.paddingBottom = 20;
        this.barChart.legend.labels.template.maxWidth = 95;

        this.xAxis = this.barChart.xAxes.push(new am4charts.CategoryAxis());
        this.xAxis.dataFields.category = categoryName;
        this.xAxis.renderer.cellStartLocation = 0.1;
        this.xAxis.renderer.cellEndLocation = 0.9;
        this.xAxis.renderer.grid.template.location = 0;

        const yAxis = this.barChart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;

        this.barChart.data = data;

        this.barChart.padding(40, 40, 40, 40);

        const categoryAxis = this.barChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = categoryName;
        categoryAxis.renderer.minGridDistance = 200;

        this.barChart.yAxes.push(new am4charts.ValueAxis());

        const series = this.barChart.series.push(new am4charts.LineSeries());
        series.dataFields.categoryX = categoryName;
        series.dataFields.valueY = valueName;
        series.tooltipText = '{' + valueName + '}';

        this.barChart.cursor = new am4charts.XYCursor();

        if (chartScroll) {
            this.barChart.scrollbarX = new am4core.Scrollbar();
            this.barChart.scrollbarX.parent = this.barChart.bottomAxesContainer;
        }

        this.createSeries('۱', 'نمودار');
    }

    createSeries(value, name): any {
        const series = this.barChart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = value;
        series.dataFields.categoryX = 'category';
        series.name = name;

        series.events.on('hidden', this.arrangeColumns);
        series.events.on('shown', this.arrangeColumns);

        const bullet = series.bullets.push(new am4charts.LabelBullet());
        bullet.interactionsEnabled = false;
        bullet.dy = 30;
        bullet.label.text = '{valueY}';
        bullet.label.fill = am4core.color('#ffffff');

        return series;
    }

    arrangeColumns(): void {
        const series = this.barChart.series.getIndex(0);

        const w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            const x0 = this.xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
            const x1 = this.xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
            const delta = ((x1 - x0) / this.barChart.series.length) * w;
            if (am4core.isNumber(delta)) {
                const middle = this.barChart.series.length / 2;

                let newIndex = 0;
                this.barChart.series.each((barChartSeries) => {
                    if (!barChartSeries.isHidden && !barChartSeries.isHiding) {
                        barChartSeries.dummyData = newIndex;
                        newIndex++;
                    } else barChartSeries.dummyData = this.barChart.series.indexOf(barChartSeries);
                });
                const visibleCount = newIndex;
                const newMiddle = visibleCount / 2;

                this.barChart.series.each((barChartSeries) => {
                    const trueIndex = this.barChart.series.indexOf(barChartSeries);
                    const dummyData = barChartSeries.dummyData;

                    const dx = (dummyData - trueIndex + middle - newMiddle) * delta;

                    barChartSeries.animate({ property: 'dx', to: dx }, barChartSeries.interpolationDuration, barChartSeries.interpolationEasing);
                    barChartSeries.bulletsContainer.animate(
                        { property: 'dx', to: dx },
                        barChartSeries.interpolationDuration,
                        barChartSeries.interpolationEasing
                    );
                });
            }
        }
    }

    ngOnDestroy(): void {
        if (this.barChart) this.barChart.dispose();
    }
}
