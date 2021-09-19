import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthorizationService } from '../modules/authorization/authorization.service';

@Injectable({ providedIn: 'root' })
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(private readonly authorizationService: AuthorizationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authorizationService.logOut().finally();
                    return of(null);
                }
                throw error;
            }),
            catchError((response: HttpErrorResponse) => {
                let errorMessage = '';
                if (response.error instanceof ErrorEvent) errorMessage = `Error: ${response.error.message}`;
                else if (response.error && response.error.length > 0) errorMessage = response.error;
                return throwError(errorMessage);
            })
        );
    }
}
