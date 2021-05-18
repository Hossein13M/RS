import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    private userInfoSubject: BehaviorSubject<any>;
    public userInfo$: Observable<any>;

    public get userInfo(): any {
        return this.userInfoSubject.getValue();
    }

    private userTokenInfoSubject: BehaviorSubject<any>;
    public userTokenInfo$: Observable<any>;

    public get userTokenInfo(): any {
        return this.userInfoSubject.getValue();
    }

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
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

        this.authenticationService.userToken$.subscribe((accessToken) => {
            const userTokenInfo = jwtDecode(accessToken);
            this.getUserInfo().subscribe();
            this.userTokenInfoSubject.next(userTokenInfo);
        });
    }

    getUserInfo(): Observable<any> {
        return this.http.get('/api/v1/user/details').pipe(tap((res) => this.userInfoSubject.next(res)));
    }
}
