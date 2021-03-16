import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BondTableItem, CodDto, CodTableItem } from 'app/services/API/models';
import * as moment from 'jalaali-js';

@Component({
    selector: 'aum-certificate-deposit',
    templateUrl: './aum-certificate-deposit.component.html',
    styleUrls: ['./aum-certificate-deposit.component.scss'],
    animations: fuseAnimations,
})
export class AumCertificateDepositComponent implements OnInit {
    terendCODChart;
    terendCODSeries;
    viewInit: boolean = false;
    _COD: CodDto;
    bond: BondTableItem[] = [];
    ELEMENT_DATA: CodTableItem[] = [];
    dataSource = new MatTableDataSource<CodTableItem>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'sum', 'dayPrice', 'averageInterst', 'percentOfTotal'];

    @Input('certificateDeposit') set certificateDeposit(value: CodDto) {
        if (value.table) {
            for (let row of value.table) if (row.details) for (let detial of row.details) row[detial.name] = detial.value;
            this._COD = value;
            if (this._COD.chart[0].date.substr(0, 2) != '13') {
                this._COD.chart.forEach((e) => {
                    let date = moment.toJalaali(+e.date.substr(0, 4), +e.date.substr(5, 2), +e.date.substr(8, 2));
                    e.date = String(date.jy).padStart(2, '0') + '-' + String(date.jm).padStart(2, '0') + '-' + String(date.jd).padStart(2, '0');
                });
            }
            this.displayedColumns = this.displayedColumns.concat(value.columnSet);
            this.ELEMENT_DATA = value.table;
            this.dataSource = new MatTableDataSource<BondTableItem>(this.ELEMENT_DATA);
        }

        if (this.viewInit) {
            this.pieChartBuilder();
            this.trendCODChartBuilder();
        }
    }

    constructor(private zone: NgZone) {}

    ngOnInit() {}

    /*
     ** Start intial Nahad PieChart
     */

    selectedSliceNahad;
    buttonNahad;
    pieSeriesNahad;
    drillLevelsNahad = [];
    chartNahad;

    clickHandlerNahad(event) {
        // get chart object
        if (event.dataContext.hasOwnProperty('childs')) {
            this.selectedSliceNahad = event.slice;
            var fill = this.selectedSliceNahad.fill;
            var count = event.dataContext.childs.length;
            this.pieSeriesNahad.colors.list = [];
            this.chartNahad.data = event.dataContext.childs;
            this.drillLevelsNahad.push(event.dataContext.childs);
            this.buttonNahad.hidden = false;
            this.buttonNahad.appear();
            this.pieSeriesNahad.appear();
        }
    }

    drillUpNahad() {
        this.drillLevelsNahad.pop();
        this.chartNahad.data = this.drillLevelsNahad[this.drillLevelsNahad.length - 1];
        // remove labels
        if (this.drillLevelsNahad.length == 1) {
            this.buttonNahad.hidden = true;
            this.buttonNahad.hide();
        } else {
            this.buttonNahad.hidden = false;
            this.buttonNahad.appear();
        }
        this.pieSeriesNahad.appear();
    }

    /*
     ** end intial Nahad PieChart
     */

    /*
     ** Start intial Bank PieChart
     */

    selectedSliceBank;
    buttonBank;
    pieSeriesBank;
    drillLevelsBank = [];
    chartBank;

    clickHandlerBank(event) {
        // get chart object
        if (event.dataContext.hasOwnProperty('childs')) {
            this.selectedSliceBank = event.slice;
            var fill = this.selectedSliceBank.fill;
            var count = event.dataContext.childs.length;
            this.pieSeriesBank.colors.list = [];
            this.chartBank.data = event.dataContext.childs;
            this.drillLevelsBank.push(event.dataContext.childs);
            this.buttonBank.hidden = false;
            this.buttonBank.appear();
            this.pieSeriesBank.appear();
        }
    }

    drillUpBank() {
        this.drillLevelsBank.pop();
        this.chartBank.data = this.drillLevelsBank[this.drillLevelsBank.length - 1];
        // remove labels
        if (this.drillLevelsBank.length == 1) {
            this.buttonBank.hidden = true;
            this.buttonBank.hide();
        } else {
            this.buttonBank.hidden = false;
            this.buttonBank.appear();
        }
        this.pieSeriesBank.appear();
    }

    /*
     ** end intial Bank PieChart
     */

    /*
     ** Start intial Nerkh PieChart
     */

    selectedSliceNerkh;
    buttonNerkh;
    pieSeriesNerkh;
    drillLevelsNerkh = [];
    chartNerkh;

    clickHandlerNerkh(event) {
        // get chart object
        if (event.dataContext.hasOwnProperty('childs')) {
            this.selectedSliceNerkh = event.slice;
            var fill = this.selectedSliceNerkh.fill;
            var count = event.dataContext.childs.length;
            this.pieSeriesNerkh.colors.list = [];
            this.chartNerkh.data = event.dataContext.childs;
            this.drillLevelsNerkh.push(event.dataContext.childs);
            this.buttonNerkh.hidden = false;
            this.buttonNerkh.appear();
            this.pieSeriesNerkh.appear();
        }
    }

    drillUpNerkh() {
        this.drillLevelsNerkh.pop();
        this.chartNerkh.data = this.drillLevelsNerkh[this.drillLevelsNerkh.length - 1];
        // remove labels
        if (this.drillLevelsNerkh.length == 1) {
            this.buttonNerkh.hidden = true;
            this.buttonNerkh.hide();
        } else {
            this.buttonNerkh.hidden = false;
            this.buttonNerkh.appear();
        }
        this.pieSeriesNerkh.appear();
    }
    /*
     ** end intial Nerkh PieChart
     */

    ngAfterViewInit() {
        this.viewInit = true;
        this.pieChartBuilder();
        this.trendCODChartBuilder();
    }

    pieChartBuilder() {
        if (this._COD.table) {
            /*
             ** Start define Nahad PieChart
             */
            this.drillLevelsNahad = [];
            this.zone.runOutsideAngular(() => {
                this.chartNahad = am4core.create('NahadPieChart', am4charts.PieChart);
                this.chartNahad.data = this._COD.institutionPieChart;
                this.pieSeriesNahad = this.chartNahad.series.push(new am4charts.PieSeries());
                this.pieSeriesNahad.dataFields.value = 'value';
                this.pieSeriesNahad.dataFields.category = 'name';
                this.drillLevelsNahad.push(this._COD.institutionPieChart);
                this.pieSeriesNahad.slices.template.events.on('hit', (event) => this.clickHandlerNahad(event.target.dataItem), this);

                this.buttonNahad = this.chartNahad.chartContainer.createChild(am4core.Button);
                this.buttonNahad.padding(5, 5, 5, 5);
                this.buttonNahad.align = 'right';
                this.buttonNahad.marginRight = 15;
                this.buttonNahad.icon = new am4core.Sprite();
                this.buttonNahad.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
                this.buttonNahad.hidden = true;
                this.buttonNahad.hide();
                this.buttonNahad.events.on('hit', () => this.drillUpNahad(), this);
            });

            /*
             ** end define Nahad PieChart
             */

            /*
             ** Start define Bank PieChart
             */
            this.drillLevelsBank = [];
            this.zone.runOutsideAngular(() => {
                this.chartBank = am4core.create('BankPieChart', am4charts.PieChart);
                this.chartBank.data = this._COD.bankPieChart;
                this.pieSeriesBank = this.chartBank.series.push(new am4charts.PieSeries());
                this.pieSeriesBank.dataFields.value = 'value';
                this.pieSeriesBank.dataFields.category = 'name';
                this.drillLevelsBank.push(this._COD.bankPieChart);
                this.pieSeriesBank.slices.template.events.on('hit', (event) => this.clickHandlerBank(event.target.dataItem), this);

                this.buttonBank = this.chartBank.chartContainer.createChild(am4core.Button);
                this.buttonBank.padding(5, 5, 5, 5);
                this.buttonBank.align = 'right';
                this.buttonBank.marginRight = 15;
                this.buttonBank.icon = new am4core.Sprite();
                this.buttonBank.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
                this.buttonBank.hidden = true;
                this.buttonBank.hide();
                this.buttonBank.events.on('hit', () => this.drillUpBank(), this);
            });

            /*
             ** end define Bank PieChart
             */

            /*
             ** Start define Nerkh PieChart
             */
            this.drillLevelsNerkh = [];
            this.zone.runOutsideAngular(() => {
                this.chartNerkh = am4core.create('NerkhPieChart', am4charts.PieChart);
                this.chartNerkh.data = this._COD.interestPieChart;
                this.pieSeriesNerkh = this.chartNerkh.series.push(new am4charts.PieSeries());
                this.pieSeriesNerkh.dataFields.value = 'value';
                this.pieSeriesNerkh.dataFields.category = 'name';
                this.drillLevelsNerkh.push(this._COD.interestPieChart);
                this.pieSeriesNerkh.slices.template.events.on('hit', (event) => this.clickHandlerNerkh(event.target.dataItem), this);

                this.buttonNerkh = this.chartNerkh.chartContainer.createChild(am4core.Button);
                this.buttonNerkh.padding(5, 5, 5, 5);
                this.buttonNerkh.align = 'right';
                this.buttonNerkh.marginRight = 15;
                this.buttonNerkh.icon = new am4core.Sprite();
                this.buttonNerkh.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
                this.buttonNerkh.hidden = true;
                this.buttonNerkh.hide();
                this.buttonNerkh.events.on('hit', () => this.drillUpNerkh(), this);
            });

            /*
             ** end define industry PieChart
             */
        }
    }

    trendCODChartBuilder() {
        if (this._COD.chart) {
            this.zone.runOutsideAngular(() => {
                this.terendCODChart = am4core.create('terendCODChart', am4charts.XYChart);
                this.terendCODChart.data = this._COD.chart;
                // Create axes
                let dateAxis = this.terendCODChart.xAxes.push(new am4charts.DateAxis());
                dateAxis.dateFormatter = new am4core.DateFormatter();
                dateAxis.dateFormatter.monthsShort = [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند',
                ];
                dateAxis.renderer.minGridDistance = 60;
                let valueAxis = this.terendCODChart.yAxes.push(new am4charts.ValueAxis());
                this.terendCODSeries = this.terendCODChart.series.push(new am4charts.LineSeries());
                this.terendCODSeries.dataFields.valueY = 'value';
                this.terendCODSeries.dataFields.dateX = 'date';
                this.terendCODSeries.tooltipText = '{value}';
                this.terendCODSeries.tooltip.pointerOrientation = 'vertical';
                this.terendCODChart.cursor = new am4charts.XYCursor();
                this.terendCODChart.cursor.snapToSeries = this.terendCODSeries;
                this.terendCODChart.cursor.xAxis = dateAxis;
                this.terendCODChart.scrollbarX = new am4core.Scrollbar();
            });
        }
    }
}
