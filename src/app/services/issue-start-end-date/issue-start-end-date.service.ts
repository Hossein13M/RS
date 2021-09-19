import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BourseIssueDateDto } from '../API/models';
import { BourseIssueDateService } from '../API/services';
import { ResponseWithPagination } from '#shared/models/pagination.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

export interface IssueDate {
    id: number;
    startDate: string;
    endDate: string;
}

@Injectable({
    providedIn: 'root',
})
export class IssueStartEndDateService {
    public Dates: BehaviorSubject<Array<BourseIssueDateDto>> = new BehaviorSubject([]);

    constructor(private bourseIssueDate: BourseIssueDateService, private http: HttpClient) {}

    getDates(bourseId: number): Observable<Array<BourseIssueDateDto>> {
        return this.bourseIssueDate
            .bourseIssueDateControllerGetBourseIssueDates({
                bourseId: bourseId,
                limit: 100,
            })
            .pipe(
                map((res) => {
                    this.Dates.next(res.items);
                    return res.items;
                })
            );
    }

    addDate(bourseId: number, startDate: string, endDate: string): Observable<void> {
        let param = { body: { bourseId: bourseId, startDate: startDate, endDate: endDate } };
        return this.bourseIssueDate.bourseIssueDateControllerCreateBourseIssueDate(param).pipe(
            map((res) => {
                var temp = this.Dates.getValue();
                temp.push(res);
                this.Dates.next(temp);
            })
        );
    }

    editDate(id: number, startDate: string, endDate: string): Observable<void> {
        let param = { body: { id: id, startDate: startDate, endDate: endDate } };
        return this.bourseIssueDate.bourseIssueDateControllerUpdateBourseIssueDate(param).pipe(
            map((res) => {
                // update the date
                let date = this.Dates.getValue();
                let findedDate = date.find((d) => d.id == id);
                findedDate.startDate = startDate;
                findedDate.endDate = endDate;
                this.Dates.next(date);
            })
        );
    }

    delete(id: number): Observable<void> {
        return this.bourseIssueDate.bourseIssueDateControllerDeleteBourseIssueDate({ bourseIssueDateId: id }).pipe(
            map((res) => {
                // update the date
                let date = this.Dates.getValue();
                let deleteThisItem = date.find((d) => d.id == id);

                const index = date.indexOf(deleteThisItem);
                if (index > -1) {
                    date.splice(index, 1);
                } else {
                    //if u are here there is bug and we cant find id to delete localy
                }
                this.Dates.next(date);
            })
        );
    }

    public getDate(bourseIssueDateId: number | string, searchParams?): Observable<ResponseWithPagination<IssueDate>> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ bourseId: bourseIssueDateId, ...searchParams });
        return this.http.get<ResponseWithPagination<IssueDate>>(`/api/v1/bourse-issue-date`, { params });
    }
}
