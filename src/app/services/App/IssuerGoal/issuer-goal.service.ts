import { Injectable } from '@angular/core';
import { IssuerDto } from 'app/services/API/models';
import { IssuerGoalService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { IssuerLicense } from '../../../modules/system-settings/issuer-license/issuer-license.model';

export interface IssuerGoal {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class IssuerGoalsService {
    issuerGoalList: BehaviorSubject<Array<IssuerDto>> = new BehaviorSubject([]);

    /*
     ** start intial paging
     */
    skip: number = 0;
    limit: number = 15;
    total: number = this.limit + 1;

    searchKeyword: string = '';

    /*
     **  end inital paging
     */

    constructor(private issuerGoalService: IssuerGoalService, private http: HttpClient) {}

    getIssuerGoal(searchKeyword?: string): Observable<Array<IssuerDto>> {
        let param = {
            searchKeyword: searchKeyword,
        };
        return this.issuerGoalService.issuerGoalControllerGetIssuersGoal(param).pipe(
            map((res) => {
                return res.items;
            })
        );
    }

    getIssuers(searchKeyword?: string): Observable<any> {
        let param = {};
        if (this.searchKeyword == searchKeyword) {
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
            if (this.skip >= this.total) {
                return;
            }
        } else {
            this.clearSavedData();
            this.searchKeyword = searchKeyword;
            param = {
                limit: this.limit,
                skip: this.skip,
                searchKeyword: searchKeyword,
            };
        }

        return this.issuerGoalService.issuerGoalControllerGetIssuersGoal(param).pipe(
            map(
                (res) => {
                    // update the oprators list
                    let issuerGoalList = this.issuerGoalList.getValue();
                    for (const issuerGoal of res.items) {
                        issuerGoalList.push(issuerGoal);
                    }
                    this.issuerGoalList.next(issuerGoalList);
                    this.total = res.total;
                    this.skip += this.limit;
                    return res;
                },
                (error) => {
                    return error;
                }
            )
        );
    }

    clearSavedData() {
        this.skip = 0;
        this.issuerGoalList.next([]);
    }

    addIssuer(name: string): Observable<void> {
        const param = {
            body: {
                name: name,
            },
        };

        return this.issuerGoalService.issuerGoalControllerCreateIssuerGoal(param).pipe(
            map((res) => {
                // update the oprators list
                let issuerGoalList = this.issuerGoalList.getValue();
                issuerGoalList.push(res);
                this.issuerGoalList.next(issuerGoalList);
            })
        );
    }

    editIssuer(id: number, name: string): Observable<void> {
        const param = {
            body: {
                name: name,
                id: id,
            },
        };
        return this.issuerGoalService.issuerGoalControllerUpdateIssuerGoal(param).pipe(
            map((res) => {
                // update the operators list
                let issuerGoalList = this.issuerGoalList.getValue();
                let editedIssuer = issuerGoalList.find((issuerGoal) => issuerGoal.id == id);
                editedIssuer.name = name;

                this.issuerGoalList.next(issuerGoalList);
            })
        );
    }

    deleteIssuer(id: number): Observable<void> {
        let param = {
            issuerGoalId: id,
        };

        return this.issuerGoalService.issuerGoalControllerDeleteIssuerGoal(param).pipe(
            map((res) => {
                let issuerGoalList = this.issuerGoalList.getValue();
                const deleteThisItem = issuerGoalList.find((issuerGoal) => issuerGoal.id == id);
                const index = issuerGoalList.indexOf(deleteThisItem);
                if (index > -1) {
                    issuerGoalList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.issuerGoalList.next(issuerGoalList);
            })
        );
    }

    public $getIssuerGoal(paginationParams?, searchParams?): Observable<ResponseWithPagination<IssuerGoal>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get<ResponseWithPagination<IssuerGoal>>('/api/v1/issuer-goal', { params });
    }
}
