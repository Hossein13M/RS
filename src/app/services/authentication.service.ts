import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/API/services/auth.service';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userTokenSubject: BehaviorSubject<any>;
    userToken$: Observable<any>;

    get userToken(): any {
        return this.userTokenSubject.getValue();
    }

    constructor(private authService: AuthService, private router: Router) {
        this.userTokenSubject = new BehaviorSubject<any>(AuthenticationService.getAndValidateTokenFromLocalStorage());
        this.userToken$ = this.userTokenSubject.asObservable().pipe(
            switchMap(
                (value: boolean): Observable<any> => {
                    if (value !== null) {
                        return of(value);
                    } else {
                        return EMPTY;
                    }
                }
            )
        );
    }

    private static getAndValidateTokenFromLocalStorage(): any {
        const tokenFromLocalStorage = localStorage.getItem('accessToken');
        if (!tokenFromLocalStorage) {
            return null;
        }

        const tokenInfo: any = jwtDecode(tokenFromLocalStorage);
        if (!tokenInfo || !tokenInfo?.exp || new Date().getTime() >= tokenInfo?.exp * 1000) {
            return null;
        }

        return tokenFromLocalStorage;
    }

    login(body): Observable<any> {
        return this.authService.authControllerLogin(body).pipe(map((res) => this.userTokenSubject.next(res.accessToken)));
    }

    logout(): Promise<any> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('activeOrganization');
        localStorage.removeItem('user');
        return this.router.navigate(['/login']);
    }
}
