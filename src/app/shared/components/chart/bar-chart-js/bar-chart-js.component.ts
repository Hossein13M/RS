import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-bar-chart-js',
    templateUrl: './bar-chart-js.component.html',
    styleUrls: ['./bar-chart-js.component.scss'],
})
export class BarChartJsComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() dataKey: any;
    @Input() labelKey: any;
    @Input() linesArray: any[];
    @Input() height: any;
    @Input() chartName: string;

    public chartType: string = 'bar';
    public chartDatasets: Array<any> = [{ data: [], label: '' }];
    public chartLabels: Array<any> = [];
    public chartColors: Array<any> = [{ backgroundColor: [], borderColor: [], borderWidth: 2 }];
    public chartOptions: any = { responsive: true };

    constructor() {}

    public chartClicked(e: any): void {}

    public chartHovered(e: any): void {}

    ngOnInit(): void {
        if (this.data) this.createChart();
    }

    ngOnChanges() {
        if (this.data) this.createChart();
    }

    randomColor() {
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        const bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';
        return bgColor;
    }

    createChart() {
        const data = [];
        const label = [];
        const colors = [];
        if (this.labelKey && this.dataKey) {
            for (const key of this.data) {
                data.push(key[this.dataKey]);
                label.push(key[this.labelKey]);
                colors.push(this.randomColor());
            }
        } else {
            for (const key of this.data) {
                data.push(key.value);
                label.push(key.name);
                colors.push(this.randomColor());
            }
        }
        this.chartLabels = label;
        this.chartDatasets[0].data = data;
        this.chartColors[0].backgroundColor = colors;
        this.chartOptions['scales'] = {};
        this.chartOptions['scales'].yAxes = [{ ticks: { beginAtZero: true } }];
    }
}
