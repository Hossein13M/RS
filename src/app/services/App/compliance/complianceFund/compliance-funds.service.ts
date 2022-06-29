import { Injectable } from '@angular/core';
import { ResponseComplianceFundDto, ResponseFundDto } from 'app/services/API/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplianceFundService } from '../../../API/services/compliance-fund.service';
import { FundService } from '../../../API/services/fund.service';

@Injectable({
    providedIn: 'root',
})
export class ComplianceFundsService {
    public complianceFunds: BehaviorSubject<Array<ResponseComplianceFundDto>> = new BehaviorSubject([]);
    public funds: BehaviorSubject<Array<ResponseFundDto>> = new BehaviorSubject([]);

    constructor(private fundService: FundService, private complianceFundService: ComplianceFundService) {}

    getComplianceFunds(id: number): Observable<void> {
        const param = {
            complianceId: id,
        };

        return this.complianceFundService.complianceFundControllerGetComplianceFunds(param).pipe(
            map((res) => {
                this.complianceFunds.next(res);
            })
        );
    }

    getFunds(searchKeyword?: string): Observable<Array<ResponseFundDto>> {
        let param = {
            searchKeyword: searchKeyword,
        };
        return this.fundService.fundControllerGetFunds(param).pipe(
            map((res) => {
                this.funds.next(res.items);
                return res.items;
            })
        );
    }

    addComplianceFund(complianceId: number, fundId: number, up: number, down: number): Observable<void> {
        let param = {
            body: {
                complianceId: complianceId,
                fundId: fundId,
                up: up,
                down: down,
            },
        };

        return this.complianceFundService.complianceFundControllerCreateComplianceFund(param).pipe(
            map((res) => {
                let complianceFunds = this.complianceFunds.getValue();
                complianceFunds.push(res);
                this.complianceFunds.next(complianceFunds);
            })
        );
    }

    deleteComplianceFund(fundId: number): Observable<void> {
        let param = {
            id: fundId,
        };

        return this.complianceFundService.complianceFundControllerDeleteComplianceFund(param).pipe(
            map((res) => {
                let complianceFunds = this.complianceFunds.getValue();
                const deleteThisItem = complianceFunds.find((complianceFund) => complianceFund.id == fundId);
                const index = complianceFunds.indexOf(deleteThisItem);
                if (index > -1) {
                    complianceFunds.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.complianceFunds.next(complianceFunds);
            })
        );
    }

    editcomplianceFunds(fundId: number, up: number, down: number): Observable<void> {
        let param = {
            id: fundId,
            up: up,
            down: down,
        };

        return this.complianceFundService.complianceFundControllerDeleteComplianceFund(param).pipe(
            map((res) => {
                // update the compliances-list list
                let complianceFunds = this.complianceFunds.getValue();
                let editedcompliance = complianceFunds.find((complianceFund) => complianceFund.id == fundId);
                editedcompliance.up = up;
                editedcompliance.down = down;

                this.complianceFunds.next(complianceFunds);
            })
        );
    }
}
