import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    public userInfo$: Observable<any>;
    public userTokenInfo$: Observable<any>;
    private userInfoSubject: BehaviorSubject<any>;
    private userTokenInfoSubject: BehaviorSubject<any>;

    constructor() {
        this.userInfoSubject = new BehaviorSubject<any>(null);
        this.userInfo$ = this.userInfoSubject.asObservable().pipe(
            switchMap(
                (value: boolean): Observable<any> => {
                    if (value !== null) return of(value);
                    else return EMPTY;
                }
            )
        );

        this.userTokenInfoSubject = new BehaviorSubject<any>(null);
        this.userTokenInfo$ = this.userInfoSubject.asObservable().pipe(
            switchMap(
                (value: boolean): Observable<any> => {
                    if (value !== null) return of(value);
                    else return EMPTY;
                }
            )
        );
    }

    public get userInfo(): any {
        return this.userInfoSubject.getValue();
    }
}
