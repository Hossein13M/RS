import { Component } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-calculated-compliance',
    templateUrl: './calculated-compliance.component.html',
    styleUrls: ['./calculated-compliance.component.scss'],
    animations: fuseAnimations,
})
export class CalculatedComplianceComponent {
    // fundList: FundListDto[] = [];
    // pieChart;
    // table;
    // selectedFund: FundListDto = {} as FundListDto;
    // date: FormControl = new FormControl();
    // pieChartLoading = false;
    // tableLoading = false;
    //
    // public ELEMENT_DATA: RsponceComplianceCalculatedDto[] = [];
    // public dataSource = new MatTableDataSource<RsponceComplianceCalculatedDto>(this.ELEMENT_DATA);
    // public displayedColumns = ['code', 'title', 'up', 'down', 'currentAmount', 'violationAmount'];
    //
    // /*
    //  ** Start intial Industry PieChart
    //  */
    //
    // selectedSliceIndustry;
    // buttonIndustry;
    // pieSeriesIndustry;
    // drillLevelsIndustry = [];
    // chartIndustry;
    //
    // /*
    //  ** Start intial tools PieChart
    //  */
    //
    // selectedSliceTools;
    // buttonTools;
    // pieSeriesTools;
    // drillLevelsTools = [];
    // chartTools;
    //
    // /*
    //  ** Start intial market PieChart
    //  */
    //
    // selectedSliceMarket;
    // buttonMarket;
    // pieSeriesMarket;
    // drillLevelsMarket = [];
    // chartMarket;
    //
    // constructor(private calculatedService: CompliancesCalculatedService) {
    //     this.selectedFund.fundName = 'تحلیل حدود صندوق ها';
    //     this.calculatedService.getFundList().subscribe((res) => {
    //         this.fundList = res;
    //     });
    //
    //     this.calculatedService.pieChart.subscribe((res) => {
    //         setTimeout(() => {
    //             this.pieChartLoading = false;
    //             this.pieChart = res;
    //             if (res.industryPieChart) {
    //                 setTimeout(() => {
    //                     this.makeIndustryChart();
    //                 }, 5);
    //             }
    //             if (res.marketPieChart) {
    //                 setTimeout(() => {
    //                     this.makeMarketChart();
    //                 }, 5);
    //             }
    //             if (res.toolsPieChart) {
    //                 setTimeout(() => {
    //                     this.makeToolChart();
    //                 }, 5);
    //             }
    //         }, 1000);
    //     });
    //
    //     this.calculatedService.table.subscribe((res) => {
    //         this.tableLoading = true;
    //         this.table = res;
    //         this.ELEMENT_DATA = res;
    //         this.dataSource = new MatTableDataSource<RsponceComplianceCalculatedDto>(this.ELEMENT_DATA);
    //     });
    // }
    //
    // clickHandlerTools(event): void {
    //     // get chart object
    //     if (event.dataContext.childs.length) {
    //         this.selectedSliceTools = event.slice;
    //         let fill = this.selectedSliceTools.fill;
    //         let count = event.dataContext.childs.length;
    //         this.pieSeriesTools.colors.list = [];
    //         this.chartTools.data = event.dataContext.childs;
    //         this.drillLevelsTools.push(event.dataContext.childs);
    //         this.buttonTools.hidden = false;
    //         this.buttonTools.appear();
    //         this.pieSeriesTools.appear();
    //     }
    // }
    //
    // drillUpTools(): void {
    //     this.drillLevelsTools.pop();
    //     this.chartTools.data = this.drillLevelsTools[this.drillLevelsTools.length - 1];
    //     // remove labels
    //     if (this.drillLevelsTools.length == 1) {
    //         this.buttonTools.hidden = true;
    //         this.buttonTools.hide();
    //     } else {
    //         this.buttonTools.hidden = false;
    //         this.buttonTools.appear();
    //     }
    //     this.pieSeriesTools.appear();
    // }
    //
    // /*
    //  ** end intial tools PieChart
    //  */
    //
    // clickHandlerIndustry(event): void {
    //     // get chart object
    //     if (event.dataContext.childs.length) {
    //         this.selectedSliceIndustry = event.slice;
    //         let fill = this.selectedSliceIndustry.fill;
    //         let count = event.dataContext.childs.length;
    //         this.pieSeriesIndustry.colors.list = [];
    //         this.chartIndustry.data = event.dataContext.childs;
    //         this.drillLevelsIndustry.push(event.dataContext.childs);
    //         this.buttonIndustry.hidden = false;
    //         this.buttonIndustry.appear();
    //         this.pieSeriesIndustry.appear();
    //     }
    // }
    //
    // drillUpIndustry(): void {
    //     this.drillLevelsIndustry.pop();
    //     this.chartIndustry.data = this.drillLevelsIndustry[this.drillLevelsIndustry.length - 1];
    //     // remove labels
    //     if (this.drillLevelsIndustry.length == 1) {
    //         this.buttonIndustry.hidden = true;
    //         this.buttonIndustry.hide();
    //     } else {
    //         this.buttonIndustry.hidden = false;
    //         this.buttonIndustry.appear();
    //     }
    //     this.pieSeriesIndustry.appear();
    // }
    //
    // /*
    //  ** end intial industry PieChart
    //  */
    //
    // clickHandlerMarket(event): void {
    //     // get chart object
    //     if (event.dataContext.childs.length) {
    //         this.selectedSliceMarket = event.slice;
    //         let fill = this.selectedSliceMarket.fill;
    //         let count = event.dataContext.childs.length;
    //         this.pieSeriesMarket.colors.list = [];
    //         this.chartMarket.data = event.dataContext.childs;
    //         this.drillLevelsMarket.push(event.dataContext.childs);
    //         this.buttonMarket.hidden = false;
    //         this.buttonMarket.appear();
    //         this.pieSeriesMarket.appear();
    //     }
    // }
    //
    // drillUpMarket(): void {
    //     this.drillLevelsMarket.pop();
    //     this.chartMarket.data = this.drillLevelsMarket[this.drillLevelsMarket.length - 1];
    //     // remove labels
    //     if (this.drillLevelsMarket.length == 1) {
    //         this.buttonMarket.hidden = true;
    //         this.buttonMarket.hide();
    //     } else {
    //         this.buttonMarket.hidden = false;
    //         this.buttonMarket.appear();
    //     }
    //     this.pieSeriesMarket.appear();
    // }
    //
    // /*
    //  ** end intial market PieChart
    //  */
    //
    // makeIndustryChart(): void {
    //     /*
    //      ** Start define industry PieChart
    //      */
    //     this.drillLevelsIndustry = [];
    //     this.zone.runOutsideAngular(() => {
    //         this.chartIndustry = am4core.create('industryPieChart', am4charts.PieChart);
    //         am4core.useTheme(am4themes_animated);
    //         this.chartIndustry.data = this.pieChart.industryPieChart;
    //         this.pieSeriesIndustry = this.chartIndustry.series.push(new am4charts.PieSeries());
    //         this.pieSeriesIndustry.dataFields.value = 'value';
    //         this.pieSeriesIndustry.dataFields.category = 'name';
    //         this.pieSeriesIndustry.labels.template.paddingTop = 0;
    //         this.pieSeriesIndustry.labels.template.paddingBottom = 0;
    //         this.pieSeriesIndustry.labels.template.fontSize = 10;
    //
    //         this.drillLevelsIndustry.push(this.pieChart.industryPieChart);
    //
    //         this.pieSeriesIndustry.slices.template.events.on(
    //             'hit',
    //             (event) => {
    //                 this.clickHandlerIndustry(event.target.dataItem);
    //             },
    //             this
    //         );
    //
    //         this.buttonIndustry = this.chartIndustry.chartContainer.createChild(am4core.Button);
    //         this.buttonIndustry.padding(5, 5, 5, 5);
    //         this.buttonIndustry.align = 'right';
    //         this.buttonIndustry.marginRight = 15;
    //         this.buttonIndustry.icon = new am4core.Sprite();
    //         this.buttonIndustry.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    //         this.buttonIndustry.hidden = true;
    //         this.buttonIndustry.hide();
    //
    //         this.buttonIndustry.events.on(
    //             'hit',
    //             (event) => {
    //                 this.drillUpIndustry();
    //             },
    //             this
    //         );
    //     });
    //
    //     /*
    //      ** end define industry PieChart
    //      */
    // }
    //
    // makeMarketChart(): void {
    //     /*
    //      ** Start define market PieChart
    //      */
    //     this.drillLevelsMarket = [];
    //     this.zone.runOutsideAngular(() => {
    //         this.chartMarket = am4core.create('marketPieChart', am4charts.PieChart);
    //         this.chartMarket.data = this.pieChart.marketPieChart;
    //         this.pieSeriesMarket = this.chartMarket.series.push(new am4charts.PieSeries());
    //         this.pieSeriesMarket.dataFields.value = 'value';
    //         this.pieSeriesMarket.dataFields.category = 'name';
    //         this.pieSeriesMarket.labels.template.paddingTop = 0;
    //         this.pieSeriesMarket.labels.template.paddingBottom = 0;
    //         this.pieSeriesMarket.labels.template.fontSize = 10;
    //         this.drillLevelsMarket.push(this.pieChart.marketPieChart);
    //
    //         this.pieSeriesMarket.slices.template.events.on(
    //             'hit',
    //             (event) => {
    //                 this.clickHandlerMarket(event.target.dataItem);
    //             },
    //             this
    //         );
    //
    //         this.buttonMarket = this.chartMarket.chartContainer.createChild(am4core.Button);
    //         this.buttonMarket.padding(5, 5, 5, 5);
    //         this.buttonMarket.align = 'right';
    //         this.buttonMarket.marginRight = 15;
    //         this.buttonMarket.icon = new am4core.Sprite();
    //         this.buttonMarket.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    //         this.buttonMarket.hidden = true;
    //         this.buttonMarket.hide();
    //
    //         this.buttonMarket.events.on(
    //             'hit',
    //             (event) => {
    //                 this.drillUpMarket();
    //             },
    //             this
    //         );
    //     });
    //
    //     /*
    //      ** end define market PieChart
    //      */
    // }
    //
    // makeToolChart(): void {
    //     /*
    //      ** Start define tools PieChart
    //      */
    //     this.drillLevelsTools = [];
    //     this.zone.runOutsideAngular(() => {
    //         this.chartTools = am4core.create('toolsPieChart', am4charts.PieChart);
    //         this.chartTools.data = this.pieChart.toolsPieChart;
    //         this.pieSeriesTools = this.chartTools.series.push(new am4charts.PieSeries());
    //         this.pieSeriesTools.dataFields.value = 'value';
    //         this.pieSeriesTools.dataFields.category = 'name';
    //         this.pieSeriesTools.labels.template.paddingTop = 0;
    //         this.pieSeriesTools.labels.template.paddingBottom = 0;
    //         this.pieSeriesTools.labels.template.fontSize = 10;
    //         this.drillLevelsTools.push(this.pieChart.toolsPieChart);
    //
    //         this.pieSeriesTools.slices.template.events.on(
    //             'hit',
    //             (event) => {
    //                 this.clickHandlerTools(event.target.dataItem);
    //             },
    //             this
    //         );
    //
    //         this.buttonTools = this.chartTools.chartContainer.createChild(am4core.Button);
    //         this.buttonTools.padding(5, 5, 5, 5);
    //         this.buttonTools.align = 'right';
    //         this.buttonTools.marginRight = 15;
    //         this.buttonTools.icon = new am4core.Sprite();
    //         this.buttonTools.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    //         this.buttonTools.hidden = true;
    //         this.buttonTools.hide();
    //
    //         this.buttonTools.events.on(
    //             'hit',
    //             (event) => {
    //                 this.drillUpTools();
    //             },
    //             this
    //         );
    //     });
    //
    //     /*
    //      ** end define tools PieChart
    //      */
    // }
    //
    // select(fund): void {
    //     this.selectedFund = fund;
    //     this.tableLoading = true;
    //     this.pieChartLoading = true;
    //     this.pieChart = {};
    //     this.table = [];
    //     // this.chartTools.data = this.pieChart.toolsPieChart;
    //     // this.chartMarket.data = this.pieChart.marketPieChart;
    //     // this.chartIndustry.data = this.pieChart.industryPieChart;
    //
    //     this.dataSource = new MatTableDataSource<RsponceComplianceCalculatedDto>(this.pieChart);
    //     this.calculatedService.getComplianceCalculated(fund.fundNationalCode);
    //
    //     // fucking baaaaaaad code
    // }
    //
    // ngOnInit(): void {
    //     this.date.valueChanges.subscribe((res) => {
    //         this.calculatedService.getComplianceCalculated(this.selectedFund.fundNationalCode, moment(res).format('YYYY-MM-DD'));
    //     });
    // }
    //
    // ngOnDestroy(): void {
    //     this.zone.runOutsideAngular(() => {
    //         if (this.chartIndustry) {
    //             this.chartIndustry.dispose();
    //         }
    //         if (this.chartTools) {
    //             this.chartTools.dispose();
    //         }
    //         if (this.chartMarket) {
    //             this.chartMarket.dispose();
    //         }
    //     });
    // }
}
