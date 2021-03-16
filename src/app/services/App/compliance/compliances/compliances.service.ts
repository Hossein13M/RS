import { Injectable } from '@angular/core';
import { ComplianceDto } from 'app/services/API/models';
import { ComplianceService } from 'app/services/API/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CompliancesService {
    public skip: number = 0;
    public searchKeyword: string = '';
    public limit: number = 15;
    public total: number = this.limit + 1;
    public compliances: BehaviorSubject<Array<ComplianceDto>> = new BehaviorSubject([]);

    constructor(private complianceService: ComplianceService) {}

    getComoliances(searchKeyword?: string): Observable<any> {
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

        return this.complianceService.complianceControllerGetCompliances(param).pipe(
            map(
                (res) => {
                    // update the oprators list
                    let compliances = this.compliances.getValue();
                    for (const compliance of res.items) {
                        compliances.push(compliance);
                    }
                    this.compliances.next(compliances);
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

    addCompliance(title: string, code: number): Observable<void> {
        const param = {
            body: {
                title: title,
                code: code,
            },
        };
        return this.complianceService.complianceControllerCreateCompliance(param).pipe(
            map((res) => {
                // update the compliances list
                let compliances = this.compliances.getValue();
                compliances.push(res);
                this.compliances.next(compliances);
            })
        );
    }

    editCompliance(id: number, title: string, code: number): Observable<void> {
        const param = {
            body: {
                id: id,
                title: title,
                code: code,
            },
        };
        return this.complianceService.complianceControllerUpdateCompliance(param).pipe(
            map((res) => {
                // update the compliances list
                let compliances = this.compliances.getValue();
                let editedcompliance = compliances.find((compliance) => compliance.id == id);
                editedcompliance.code = code;
                editedcompliance.title = title;

                this.compliances.next(compliances);
            })
        );
    }

    deleteCompliance(id: number): Observable<void> {
        const param = {
            id: id,
        };
        return this.complianceService.complianceControllerDeleteCompliance(param).pipe(
            map((res) => {
                let compliances = this.compliances.getValue();
                const deleteThisItem = compliances.find((compliance) => compliance.id == id);
                const index = compliances.indexOf(deleteThisItem);
                if (index > -1) {
                    compliances.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.compliances.next(compliances);
            })
        );
    }

    clearSavedData() {
        this.skip = 0;
        this.compliances.next([]);
    }
}
