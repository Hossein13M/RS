import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input, NgZone, OnChanges, OnDestroy } from '@angular/core';

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

    constructor(private zone: NgZone) {}

    ngOnChanges(): void {
        this.categoryName = this.categoryName ? this.categoryName : 'name';
        this.valueName = this.valueName ? this.valueName : 'value';

        if (this.data) this.buildChart(this.data, this.categoryName, this.valueName, this.chartScroll);
    }

    buildChart(data: Array<any>, categoryName: string, valueName: string, chartScroll = false): void {
        if (!data || data.length === 0) return;

        this.zone.runOutsideAngular(() => {
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

            let yAxis = this.barChart.yAxes.push(new am4charts.ValueAxis());
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
        });
    }

    createSeries(value, name) {
        let series = this.barChart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = value;
        series.dataFields.categoryX = 'category';
        series.name = name;

        series.events.on('hidden', this.arrangeColumns);
        series.events.on('shown', this.arrangeColumns);

        let bullet = series.bullets.push(new am4charts.LabelBullet());
        bullet.interactionsEnabled = false;
        bullet.dy = 30;
        bullet.label.text = '{valueY}';
        bullet.label.fill = am4core.color('#ffffff');

        return series;
    }

    arrangeColumns() {
        let series = this.barChart.series.getIndex(0);

        let w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            let x0 = this.xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
            let x1 = this.xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
            let delta = ((x1 - x0) / this.barChart.series.length) * w;
            if (am4core.isNumber(delta)) {
                let middle = this.barChart.series.length / 2;

                let newIndex = 0;
                this.barChart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    } else series.dummyData = this.barChart.series.indexOf(series);
                });
                let visibleCount = newIndex;
                let newMiddle = visibleCount / 2;

                this.barChart.series.each(function (series) {
                    let trueIndex = this.barChart.series.indexOf(series);
                    let newIndex = series.dummyData;

                    let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

                    series.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
                });
            }
        }
    }

    ngOnDestroy(): void {
        this.zone.runOutsideAngular(() => {
            if (this.barChart) this.barChart.dispose();
        });
    }
}
