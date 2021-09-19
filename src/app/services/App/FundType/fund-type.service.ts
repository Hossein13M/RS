import { Injectable } from '@angular/core';
import { FundTypeDto } from 'app/services/API/models';
import { FundTypeService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

export interface FundType {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class FundTypesService {
    fundTypeList: BehaviorSubject<Array<FundTypeDto>> = new BehaviorSubject([]);

    searchKeyword: string = '';

    constructor(private fundTypeService: FundTypeService, private http: HttpClient) {}

    getFundTypes(searchKeyword?: string): Observable<Array<FundTypeDto>> {
        let param = {
            ...(searchKeyword && { searchKeyword: searchKeyword }),
        };

        return this.fundTypeService.fundTypeControllerGetFundTypes(param).pipe(
            map((res) => {
                this.fundTypeList.next(res);
                return res;
            })
        );
    }

    addFundType(name: string): Observable<void> {
        const param = {
            body: {
                name: name,
            },
        };

        return this.fundTypeService.fundTypeControllerCreateFundType(param).pipe(
            map((res) => {
                // update the oprators list
                let fundTypeList = this.fundTypeList.getValue();
                fundTypeList.push(res);
                this.fundTypeList.next(fundTypeList);
            })
        );
    }

    editFundType(id: number, name: string): Observable<void> {
        const param = {
            body: {
                name: name,
                id: id,
            },
        };
        return this.fundTypeService.fundTypeControllerUpdateFundType(param).pipe(
            map((res) => {
                // update the operators list
                let fundTypeList = this.fundTypeList.getValue();
                let editedFundType = fundTypeList.find((fundType) => fundType.id == id);
                editedFundType.name = name;

                this.fundTypeList.next(fundTypeList);
            })
        );
    }

    deleteFundType(id: number): Observable<void> {
        let param = {
            id: id,
        };

        return this.fundTypeService.fundTypeControllerDeleteFundType(param).pipe(
            map((res) => {
                let fundTypeList = this.fundTypeList.getValue();
                const deleteThisItem = fundTypeList.find((fundType) => fundType.id == id);
                const index = fundTypeList.indexOf(deleteThisItem);
                if (index > -1) {
                    fundTypeList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.fundTypeList.next(fundTypeList);
            })
        );
    }

    public $getFundTypes(searchParams?): Observable<Array<FundType>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...searchParams });
        return this.http.get<Array<FundType>>('/api/v1/fund-type', { params });
    }
}
