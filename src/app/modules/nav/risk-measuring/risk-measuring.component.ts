import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RiskMeasuringService } from '../risk-measuring.service';

@Component({
    selector: 'app-risk-measuring',
    templateUrl: './risk-measuring.component.html',
    styleUrls: ['./risk-measuring.component.scss'],
})
export class RiskMeasuringComponent implements OnInit {
    show = false;
    loading = true;
    form: FormGroup = this.fb.group({
        date: new FormControl(new Date('2019-01-30')),
        owner: new FormControl('', [Validators.required]),
        confidenceInterval: new FormControl('99'),
    });
    barChart: any;
    gage: any;

    public chartType: string = 'line';
    public chartDatasets: Array<any> = [{ data: [], label: '' }];
    public chartLabels: Array<any> = [];
    public chartColors: Array<any> = [{ backgroundColor: 'transparent', borderColor: this.randomColor(), borderWidth: 1 }];
    public chartOptions: any = { responsive: true };

    showingData = [];

    showingDataColumns = [
        { name: 'VaR', id: 'VaR', type: 'string', minWidth: '130px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'Upper bound VaR', id: 'upperBoundVar', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'worstVaR', id: 'worstVaR', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'Provision', id: 'provision', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
    ];

    showingDataColumns2 = [
        { name: 'VaR/سرمایه', id: 'VaR', type: 'string', minWidth: '130px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'Upper bound VaR/سرمایه', id: 'upperBoundVar', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'worst VaR/سرمایه', id: 'worstVaR', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
        { name: 'Provision/سرمایه', id: 'provision', type: 'string', minWidth: '150px', headerAlign: 'center', dataAlign: 'center' },
    ];
    showingData2 = [];

    constructor(private readonly riskMeasuringService: RiskMeasuringService, private fb: FormBuilder) {}

    ngOnInit(): void {}

    public get() {
        let searchParams = this.form.value;
        this.loading = false;
        searchParams.date = this.form.value.date.toISOString().split('T')[0];
        console.log(searchParams);
        // const date = this.form.value.date.toISOString().split('T')[0];
        const owner = this.form.value.owner;
        const confidence = this.form.value.confidenceInterval;
        this.riskMeasuringService.getRiskManagementValues(searchParams).subscribe((result) => console.log('result is: ', result));

        // this.riskMeasuringService.getYieldCurve(owner, date, confidence).subscribe((response) => {
        //     this.loading = true;
        //     this.show = true;
        //     this.barChart = response.histogramPL.dataset[0].data;
        //     this.gage = response.VaR.toFixed(3);
        //     this.createChart(response.historicalVaR.plot);
        //     this.showingData.push({
        //         VaR: response.VaR_rial,
        //         upperBoundVar: response.upperBound_VaR_rial,
        //         worstVaR: response.worstVaR_rial_ratio,
        //         provision: response.provision,
        //     });
        //     this.showingData2.push({
        //         VaR: response.VaR_rial_ratio,
        //         upperBoundVar: response.upperBound_VaR_rial,
        //         worstVaR: response.worstVaR_rial_ratio,
        //         provision: response.provision_ratio,
        //     });
        // });
    }

    createChart(dataArray) {
        const labels = [];
        const data = [];
        for (let i = 0; i < dataArray.length; i++) {
            data.push(dataArray[i].VaR);
            const date = new Date(dataArray[i].date).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
            if (!labels.includes(date)) labels.push(date);
        }
        this.chartDatasets[0].data = data;
        this.chartLabels = labels;
    }

    randomColor() {
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        return 'rgb(' + x + ',' + y + ',' + z + ')';
    }
}
