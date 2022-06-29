import { Injectable } from '@angular/core';
import { ComplianceCalculatedPiechartDto, FundListDto, RsponceComplianceCalculatedDto } from 'app/services/API/models';
import { ComplianceCalculatedService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CompliancesCalculatedService {
    public pieChart: BehaviorSubject<ComplianceCalculatedPiechartDto> = new BehaviorSubject({} as ComplianceCalculatedPiechartDto);
    public table: BehaviorSubject<Array<RsponceComplianceCalculatedDto>> = new BehaviorSubject([]);
    public fundList: BehaviorSubject<Array<FundListDto>> = new BehaviorSubject([]);

    constructor(private complianceCalculatedService: ComplianceCalculatedService) {}

    getPieChart(fundNationalCode: string, date: string): Observable<void> {
        let param = {
            fundNationalCode: fundNationalCode,
            date: date,
        };
        return this.complianceCalculatedService.complianceCalculatedControllerGetPiechartComplianceCalculated(param).pipe(
            map((res) => {
                this.pieChart.next(res);
            })
        );
    }

    getTable(fundNationalCode: string, date: string): Observable<void> {
        let param = {
            fundNationalCode: fundNationalCode,
            date: date,
        };
        return this.complianceCalculatedService.complianceCalculatedControllerGetComplianceCalculated(param).pipe(
            map((res) => {
                // @ts-ignore
                this.table.next(res);
            })
        );
    }

    getComplianceCalculated(fundNationalCode: string, date?: string) {
        this.getPieChart(fundNationalCode, date).subscribe((res) => {});
        this.getTable(fundNationalCode, date).subscribe((res) => {});
    }

    getFundList(): Observable<Array<FundListDto>> {
        return this.complianceCalculatedService.complianceCalculatedControllerGetFundListComplianceCalculated().pipe(
            map((res) => {
                this.fundList.next(res);
                return res;
            })
        );
    }
}
