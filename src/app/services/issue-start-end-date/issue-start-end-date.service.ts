import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BourseIssueDateDto } from '../API/models';
import { BourseIssueDateService } from '../API/services';

@Injectable({
    providedIn: 'root',
})
export class IssueStartEndDateService {
    public Dates: BehaviorSubject<Array<BourseIssueDateDto>> = new BehaviorSubject([]);

    constructor(private bourseIssueDate: BourseIssueDateService) {}

    getDates(bourseId: number): Observable<Array<BourseIssueDateDto>> {
        return this.bourseIssueDate.bourseIssueDateControllerGetBourseIssueDates({ bourseId: bourseId, limit: 100 }).pipe(
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
}
