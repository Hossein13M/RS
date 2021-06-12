import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { StateType } from '#shared/state-type.enum';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
    animations: [
        fuseAnimations,
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    id: string = this.makeId(10);

    @Input() data;
    @Input() valueLabel = 'value';
    @Input() categoryLabel = 'name';
    @Input() height = 'auto';
    @Input() width = '100%';
    @Input() cardLayout = false;
    @Input() chartName = 'نام چارت';
    @Input() showLabel = false;
    @Input() state = StateType.INIT;
    stateType = StateType;
    selectedSlice;
    button;
    pieSeries;
    drillLevels = [];
    chart;
    expandedElement: any;

    constructor() {}

    ngOnInit(): void {
        if (this.data == null) this.state = StateType.PRESENT;
        else if (this.data === undefined || this.data.length === 0) this.state = StateType.LOADING;
    }

    ngAfterViewInit(): void {
        this.makeChart(this.data);
        this.chart.legend.valueLabels.template.text = "{value.percent.formatNumber('#.00')}%";

        if (this.data == null) this.state = StateType.PRESENT;
        else if (this.data !== undefined && this.data.length > 0) this.state = StateType.PRESENT;
        else if (this.data === undefined || this.data.length === 0) this.state = StateType.PRESENT;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.state === StateType.INIT) return;

        if (changes?.hasOwnProperty('data')) {
            this.state = StateType.PRESENT;
            this.makeChart(this.data);
        }
    }

    makeChart(data: any): void {
        if (!data) return;

        this.drillLevels = [];
        this.chart = am4core.create(this.id, am4charts.PieChart);
        this.chart.numberFormatter.numberFormat = { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 };
        this.chart.rtl = true;
        this.chart.data = data;
        this.pieSeries = this.chart.series.push(new am4charts.PieSeries());
        this.pieSeries.dataFields.value = this.valueLabel;
        this.pieSeries.dataFields.category = this.categoryLabel;
        this.pieSeries.hiddenState.properties.opacity = 1;
        this.pieSeries.hiddenState.properties.endAngle = -90;
        this.pieSeries.hiddenState.properties.startAngle = -90;
        if (!this.showLabel) {
            this.pieSeries.labels.template.disabled = true;
            this.pieSeries.ticks.template.disabled = true;
            this.chart.legend = new am4charts.Legend();
            this.chart.legend.maxHeight = 100;
            this.chart.legend.scrollable = true;
            this.chart.legend.itemContainers.template.reverseOrder = true;
            this.chart.legend.contentAlign = 'right';
            this.chart.legend.reverseOrder = true;
        }
        this.drillLevels.push(data);

        // ... chartNL code goes here ...
        this.pieSeries.slices.template.events.on('hit', (event) => this.clickHandlerNL(event.target.dataItem), this);

        this.button = this.chart.chartContainer.createChild(am4core.Button);
        this.button.padding(5, 5, 5, 5);
        this.button.align = 'right';
        this.button.marginRight = 15;
        this.button.icon = new am4core.Sprite();
        this.button.icon.path =
            'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z';
        this.button.hidden = true;
        this.button.hide();

        this.button.events.on('hit', () => this.drillUpNL(), this);
    }

    ngOnDestroy(): void {
        if (this.chart) this.chart.dispose();
    }

    clickHandlerNL(event): void {
        if (event.dataContext.hasOwnProperty('childs') || event.dataContext.hasOwnProperty('children')) {
            const propertyName = event.dataContext.hasOwnProperty('childs') ? 'childs' : 'children';
            this.selectedSlice = event.slice;
            this.pieSeries.colors.list = [];
            this.chart.data = event.dataContext[propertyName];
            this.drillLevels.push(event.dataContext[propertyName]);
            this.button.hidden = false;
            this.button.appear();
            this.pieSeries.appear();
        }
    }

    drillUpNL(): void {
        this.drillLevels.pop();
        this.chart.data = this.drillLevels[this.drillLevels.length - 1];
        if (this.drillLevels.length === 1) {
            this.button.hidden = true;
            this.button.hide();
        } else {
            this.button.hidden = false;
            this.button.appear();
        }
        this.pieSeries.appear();
    }

    makeId(length: number): string {
        let result = '';
        const alphaNumericRegex = '^[a-zA-Z0-9_]*$';
        const charactersLength = alphaNumericRegex.length;
        for (let i = 0; i < length; i++) result += alphaNumericRegex.charAt(Math.floor(Math.random() * charactersLength));
        return result;
    }
}
