import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { bubbleChartData } from './seed';

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.scss'],
})
export class BubbleChartComponent implements OnInit {
    public bubbleChartOptions: ChartOptions = {
        responsive: true,
        aspectRatio: 2,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'روز',
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 31,
                        stepSize: 1,
                    },
                },
            ],
            yAxes: [
                {
                    type: 'category',
                    scaleLabel: {
                        display: true,
                        labelString: 'نماد',
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
            ],
        },
    };
    public bubbleChartType: ChartType = 'bubble';
    public bubbleChartLegend = true;

    public bubbleChartData: ChartDataSets[] = bubbleChartData;

    constructor() {}

    ngOnInit(): void {}

    // events
    public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
        console.log(event, active);
    }
}
