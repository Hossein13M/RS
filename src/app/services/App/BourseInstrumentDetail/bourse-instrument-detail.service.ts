import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BondsListDto, BourseInstrumentDetailsDto, UpdateBourseInstrumentDetailsDto } from 'app/services/API/models';
import { BourseInstrumentDetailService } from 'app/services/API/services';
import { SnotifyService } from 'ng-snotify';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BoursesInstrumentDetailService {
    public bonds: BehaviorSubject<BondsListDto[]> = new BehaviorSubject([]);

    constructor(private BIDService: BourseInstrumentDetailService, private snotifyService: SnotifyService, private snackBar: MatSnackBar) {}

    public getBonds(searchKeyword: string): Observable<void> {
        return this.BIDService.bourseInstrumentDetailControllerGetBondsList({
            limit: 200,
            searchKeyword: searchKeyword,
        }).pipe(
            map((i) => {
                this.bonds.next(i['items']);
            })
        );
    }

    public getBond(id: number, ticker: string): Observable<BourseInstrumentDetailsDto> {
        return this.BIDService.bourseInstrumentDetailControllerGetBourseInstrumentDetails({
            id: id,
            ticker: ticker,
        }).pipe(
            map((i) => {
                return i;
            })
        );
    }

    public editBond(updateBourseInstrumentDetailsDto: UpdateBourseInstrumentDetailsDto): Observable<void> {
        let param = {
            body: updateBourseInstrumentDetailsDto,
        };
        return this.BIDService.bourseInstrumentDetailControllerUpdateBourseInstrumentDetails(param).pipe(
            map(
                (i) => {
                    // this.snotifyService.success("باموفقیت تغییرات ثبت شد");
                    this.snackBar.open('باموفقیت تغییرات ثبت شد', '', {
                        panelClass: 'snack-success',
                        direction: 'rtl',
                        duration: 3000,
                    });
                },
                catchError((err) => {
                    // this.snotifyService.success("متاسفانه ثبت نشد");
                    this.snackBar.open('متاسفانه ثبت نشد', '', {
                        panelClass: 'snack-success',
                        direction: 'rtl',
                        duration: 3000,
                    });
                    return throwError(err);
                })
            )
        );
    }
}
