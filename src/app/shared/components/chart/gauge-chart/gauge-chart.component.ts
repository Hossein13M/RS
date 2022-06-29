import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { StateType } from '#shared/state-type.enum';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-gauge-chart',
    templateUrl: './gauge-chart.component.html',
    styleUrls: ['./gauge-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GaugeChartComponent implements OnInit, OnDestroy, OnChanges {
    @Input() labels;
    @Input() handValue = 1000;
    @Input() maxRange = 3000;
    @Input() minRange = -3000;
    @Input() reverse = false;

    @Input() state = StateType.LOADING;
    stateType = StateType;

    chart: any;
    hand: any;
    axis: any;
    labelList: any;

    constructor() {}

    ngOnInit(): void {
        this.makeChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes || !this.chart) {
            return;
        }

        if (changes.hasOwnProperty('maxRange') && changes.maxRange && this.maxRange !== null) {
            this.axis.max = this.maxRange;
        }

        if (changes.hasOwnProperty('minRange') && changes.minRange && this.maxRange !== null) {
            this.axis.min = this.minRange;
        }

        if (changes.hasOwnProperty('handValue') && changes.handValue && this.handValue !== null) {
            if (this.handValue < this.minRange) {
                this.hand.showValue(this.minRange, 1000, am4core.ease.cubicOut);
            } else if (this.handValue > this.maxRange) {
                this.hand.showValue(this.maxRange, 1000, am4core.ease.cubicOut);
            } else {
                this.hand.showValue(this.handValue, 1000, am4core.ease.cubicOut);
            }
        }

        if (changes.hasOwnProperty('labels') && changes.labels && this.labels !== null) {
            this.updateLabels();
        }

        if (changes.hasOwnProperty('reverse')) {
            const gradient = new am4core.LinearGradient();
            if (this.reverse) {
                gradient.stops.push({ color: am4core.color('green') });
                gradient.stops.push({ color: am4core.color('yellow') });
                gradient.stops.push({ color: am4core.color('red') });
            } else {
                gradient.stops.push({ color: am4core.color('red') });
                gradient.stops.push({ color: am4core.color('yellow') });
                gradient.stops.push({ color: am4core.color('green') });
            }
            this.axis.renderer.line.stroke = gradient;
        }
    }

    makeChart(): void {
        this.chart = am4core.create('chart-div', am4charts.GaugeChart);
        this.chart.innerRadius = -20;

        const gradient = new am4core.LinearGradient();
        if (this.reverse) {
            gradient.stops.push({ color: am4core.color('green') });
            gradient.stops.push({ color: am4core.color('yellow') });
            gradient.stops.push({ color: am4core.color('red') });
        } else {
            gradient.stops.push({ color: am4core.color('red') });
            gradient.stops.push({ color: am4core.color('yellow') });
            gradient.stops.push({ color: am4core.color('green') });
        }

        this.axis = this.chart.xAxes.push(new am4charts.ValueAxis());
        this.axis.max = this.maxRange;
        this.axis.min = this.minRange;
        this.axis.strictMinMax = true;

        this.axis.renderer.line.stroke = gradient;
        this.axis.renderer.line.strokeWidth = 15;
        this.axis.renderer.line.strokeOpacity = 1;
        this.axis.renderer.minGridDistance = 150;

        this.axis.renderer.ticks.template.disabled = true;
        this.axis.renderer.ticks.template.strokeOpacity = 1;
        this.axis.renderer.ticks.template.length = 20;
        this.axis.renderer.grid.template.disabled = false;
        this.axis.renderer.labels.template.radius = 20;

        this.hand = this.chart.hands.push(new am4charts.ClockHand());
        this.hand.radius = am4core.percent(100);
        this.hand.innerRadius = am4core.percent(20);

        // label
        this.labelList = new am4core.ListTemplate(new am4core.Label());
        this.labelList.template.isMeasured = false;
        this.labelList.template.background.strokeWidth = 1;
        this.labelList.template.fontSize = 10;
        this.labelList.template.padding(5, 10, 5, 10);
        this.labelList.template.y = am4core.percent(50);
        this.labelList.template.horizontalCenter = 'middle';
        this.updateLabels();

        this.hand.showValue(0, 0, am4core.ease.cubicOut);
        if (this.handValue) {
            setTimeout(() => {
                if (this.handValue < this.minRange) {
                    this.hand.showValue(this.minRange, 1000, am4core.ease.cubicOut);
                } else if (this.handValue > this.maxRange) {
                    this.hand.showValue(this.maxRange, 1000, am4core.ease.cubicOut);
                } else {
                    this.hand.showValue(this.handValue, 1000, am4core.ease.cubicOut);
                }
            }, 1000);
        }
    }

    updateLabels(): void {
        if (!this.chart || !this.labels || this.labels.length === 0) {
            return;
        }

        if (this.labelList) {
            this.labelList.each((el) => el.dispose());
        }

        let i = 0;
        const step = 10;
        for (const label of this.labels) {
            const tmpLabel = this.labelList.create();
            tmpLabel.parent = this.chart.chartContainer;
            let y = 0;
            if (i < this.labels.length / 2) {
                y = 50 - (Math.ceil(this.labels.length / 2) - i) * step;
            } else {
                y = 50 + (Math.ceil(this.labels.length / 2) - i) * step;
            }
            tmpLabel.x = am4core.percent(50);
            tmpLabel.y = am4core.percent(y);
            tmpLabel.background.stroke = this.chart.colors.getIndex(0);
            tmpLabel.text = label.text;
            tmpLabel.fontSize = '10px';
            tmpLabel.fontWeight = 'bold';
            tmpLabel.textAlign = 'middle';

            i++;
        }
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
