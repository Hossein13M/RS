import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserInfoService } from './App/userInfo/user-info.service';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { distinct, filter, switchMap, take, tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userInfoService: UserInfoService, private authenticationService: AuthenticationService) {}

    // FIXME: Remove can activate and implement canActivate Child
    canActivate(): Observable<boolean> {
        console.log('gu2ard used');
        const out = new BehaviorSubject<boolean>(null);
        if (this.authenticationService.userToken) {
            if (!this.userInfoService.userInfo) {
                console.log('no user detail');
                this.userInfoService.userInfo$.subscribe(() => {
                    // FIXME: Implement new route access checker here
                    out.next(true);
                });
            } else {
                console.log('has user detail');

                out.next(true);
            }
        } else {
            console.log('no token');
            this.router.navigate(['/login']);
            out.next(false);
        }
        return out.asObservable().pipe(
            switchMap(
                (value: boolean): Observable<any> => {
                    if (value !== null) {
                        return of(value);
                    } else {
                        return EMPTY;
                    }
                }
            ),
            take(1)
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('accessToken')) {
            this.userInfoService.getUserInfo();
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
