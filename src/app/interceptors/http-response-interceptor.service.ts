import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authenticationService.logout();
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
