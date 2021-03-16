import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pie-chart-js',
    templateUrl: './pie-chart-js.component.html',
    styleUrls: ['./pie-chart-js.component.scss'],
})
export class PieChartJsComponent implements OnInit, OnChanges {
    @Input() chartName: string;
    @Input() data = [];
    @Input() height: any;
    @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

    back = false;

    public chartType = 'pie';
    public chartDatasets: Array<any> = [{ data: [], label: '' }];
    public chartLabels: Array<any> = [];
    public chartColors: Array<any> = [
        {
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
        },
    ];
    public chartOptions: any = {
        responsive: true,
    };

    public chartClicked(e: any): void {
        const chart = e.active[0]._chart;
        const activePoints = chart.getElementAtEvent(e.event);
        const activeIndex = activePoints[0]._index;
        this.onDatePicked.emit(this.data[activeIndex]);
    }

    public chartHovered(e: any): void {}

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.data) {
            this.createChart();
        }
    }

    randomColor(): any {
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        const bgColor = 'rgb(' + x + ',' + y + ',' + z + ')';
        return bgColor;
    }

    createChart(): void {
        const data = [];
        const label = [];
        const colors = [];
        for (const key of this.data) {
            data.push(key.percent);
            label.push(key.titleFa);
            colors.push(this.randomColor());
        }
        this.chartLabels = label;
        this.chartDatasets[0].data = data;
        this.chartColors[0].backgroundColor = colors;
    }

    backToFirstStep(): void {
        this.back = !this.back;
        this.onDatePicked.emit((this.data['treeNodeId'] = false));
    }
}
