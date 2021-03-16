import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-line-chart-js',
    templateUrl: './line-chart-js.component.html',
    styleUrls: ['./line-chart-js.component.scss'],
})
export class LineChartJsComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() dataKey: any;
    @Input() labelKey: any;
    @Input() linesArray: any[];
    @Input() height: any;
    @Input() chartName: string;

    keys = [];
    colors = [
        '#0d47a1',
        '#006064',
        '#004d40',
        '#afb42b',
        '#f57f17',
        '#ff6f00',
        '#e65100',
        '#d84315',
        '#4e342e',
        '#7e57c2',
        '#d500f9',
        '#c2185b',
        '#9c27b0',
    ];

    public chartType = 'line';
    public chartDatasets: Array<any> = [];
    public chartLabels: Array<any> = [];
    public chartColors: Array<any> = [];
    public chartOptions: any = {
        responsive: true,
        elements: {
            point: {
                radius: 0,
            },
        },
        scales: {
            xAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'bottom',
                    id: 'x-axis-1',
                },
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
            ],
        },
    };

    public chartClicked(e: any): void {}

    public chartHovered(e: any): void {}

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.chartDatasets = [];
        if (this.data) {
            this.keys = Object.keys(this.data);
            for (let i = 0; i < this.keys.length; i++) {
                if (isNaN(this.keys[i])) {
                    this.createChart(this.keys[i]);
                }
            }
            if (!isNaN(this.keys[0])) {
                this.createChart2();
            }
        }
    }

    randomColor(): any {
        return this.colors[Math.trunc(Math.random() * this.colors.length)];
    }

    // BackEnd Response type 1
    createChart(name): void {
        const data = [];
        for (let i = 0; i < this.data[name].length; i++) {
            data.push({
                y: this.data[name][i][this.dataKey],
                x: this.data[name][i][this.labelKey],
            });
        }
        this.chartDatasets.push({
            data: data,
            xAxisID: 'x-axis-1',
            yAxisID: 'y-axis-1',
            label: name,
        });

        this.chartColors.push({
            backgroundColor: 'transparent',
            borderColor: this.data[name]?.color ? this.data[name]?.color : this.randomColor(),
            borderWidth: 2,
        });
    }

    // BackEnd Response type 2
    createChart2(): void {
        const data = [];
        const colors = [];
        for (let i = 0; i < this.data.length; i++) {
            // // DEBUG ==> REMOVE
            // if (this.data[name][i][this.labelKey] > 3) {
            //     continue;
            // }
            data.push({
                y: this.data[i][this.dataKey],
                x: this.data[i][this.labelKey],
            });
            colors.push(this.randomColor());
        }

        this.chartDatasets.push({
            data: data,
            xAxisID: 'x-axis-1',
            yAxisID: 'y-axis-1',
            label: name,
        });
        this.chartColors.push({
            backgroundColor: 'transparent',
            borderColor: 'red',
            borderWidth: 2,
        });
    }
}
