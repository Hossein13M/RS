import { Injectable } from '@angular/core';
import { IssuerDto } from 'app/services/API/models';
import { IssuerService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IssuersService {
    issuerList: BehaviorSubject<Array<IssuerDto>> = new BehaviorSubject([]);

    /*
     ** start intial paging
     */
    skip: number = 0;
    limit: number = 10;
    total: number = this.limit + 1;

    searchKeyword: string = '';

    /*
     **  end inital paging
     */

    constructor(private issuerService: IssuerService) {}

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

        return this.issuerService.issuerControllerGetIssuers(param).pipe(
            map(
                (res) => {
                    // update the oprators list
                    let issuerList = this.issuerList.getValue();
                    for (const issuer of res.items) {
                        issuerList.push(issuer);
                    }
                    this.issuerList.next(issuerList);
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

    getIssuersList(searchKeyword?: string): Observable<Array<IssuerDto>> {
        let param = {
            searchKeyword: searchKeyword,
        };
        return this.issuerService.issuerControllerGetIssuers(param).pipe(
            map((res) => {
                return res.items;
            })
        );
    }

    clearSavedData() {
        this.skip = 0;
        this.issuerList.next([]);
    }

    addIssuer(name: string): Observable<void> {
        const param = {
            body: {
                name: name,
            },
        };

        return this.issuerService.issuerControllerCreateIssuer(param).pipe(
            map((res) => {
                // update the oprators list
                let issuerList = this.issuerList.getValue();
                issuerList.push(res);
                this.issuerList.next(issuerList);
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
        return this.issuerService.issuerControllerUpdateIssuer(param).pipe(
            map((res) => {
                // update the operators list
                let issuerList = this.issuerList.getValue();
                let editedIssuer = issuerList.find((issuer) => issuer.id == id);
                editedIssuer.name = name;

                this.issuerList.next(issuerList);
            })
        );
    }

    deleteIssuer(id: number): Observable<void> {
        let param = {
            issuerId: id,
        };

        return this.issuerService.issuerControllerDeleteIssuer(param).pipe(
            map((res) => {
                let issuerList = this.issuerList.getValue();
                const deleteThisItem = issuerList.find((issuer) => issuer.id == id);
                const index = issuerList.indexOf(deleteThisItem);
                if (index > -1) {
                    issuerList.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.issuerList.next(issuerList);
            })
        );
    }
}
