import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
import { AssetReturnService } from './asset-return.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-assets-return',
    templateUrl: './assets-return.component.html',
    styleUrls: ['./assets-return.component.scss'],
    providers: [AssetReturnService],
})
export class AssetsReturnComponent implements OnInit {
    searchFormGroup: FormGroup;
    today = new Date('2019-12-24');

    tree: any;
    categoryTrendPlot: any;
    barChart: any;

    public chartType = 'line';
    public chartDatasets: Array<any> = [];
    public chartLabels: Array<any> = [];
    public chartColors: Array<any> = [];
    public chartOptions: any = { responsive: true };

    show = false;

    constructor(private readonly assetReturnService: AssetReturnService, private readonly alertService: AlertService) {}

    ngOnInit(): void {
        this.searchFormGroup = new FormGroup({ endDate: new FormControl(new Date()) });
        this.get();
        this.searchFormGroup.valueChanges.subscribe(() => this.get());
    }

    get(): void {
        const date = UtilityFunctions.convertDateToGregorianFormatForServer(this.searchFormGroup.value.endDate);
        this.assetReturnService.getAssetReturns(date).subscribe(
            (response) => {
                this.show = true;
                this.barChart = response.barchart;
                this.createChart(response.categoryTrendPlot);
            },
            () => {
                this.alertService.onError('خطایی در دریافت اطلاعات رخ داده است');
                this.show = false;
            }
        );
    }

    createChart(dataArray): void {
        const labels = [];
        for (let i = 0; i < dataArray.length; i++) {
            const data = [];
            for (let j = 0; j < dataArray[i].plot.length; j++) {
                data.push(dataArray[i].plot[j].ROR);
                const date = new Date(dataArray[i].plot[j].date).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                if (!labels.includes(date)) {
                    labels.push(date);
                }
            }
            this.chartDatasets.push({ data: data, label: dataArray[i].name });
            this.chartColors.push({ backgroundColor: 'transparent', borderColor: this.randomColor(), borderWidth: 2 });
        }
        this.chartLabels = labels;
    }

    randomColor(): string {
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        return 'rgb(' + x + ',' + y + ',' + z + ')';
    }
}
