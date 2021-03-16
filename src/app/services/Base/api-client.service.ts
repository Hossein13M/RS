import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FuseProgressBarService } from '../../../@fuse/components/progress-bar/progress-bar.service';
import { FormContainer } from '../../shared/models/FromContainer';
import { AuthenticationService } from '../authentication.service';
import { GetAPI } from './Memory';

@Injectable({
    providedIn: 'root',
})
export class ApiClientService {
    constructor(private http: HttpClient, private fps: FuseProgressBarService, private authenticationService: AuthenticationService) {}

    post<T>(api: string, data: any, component: FormContainer): Observable<T> {
        if (component) {
            component.isWorking = true;
        }
        return this.http.post<T>(GetAPI(api), data).pipe(
            map((res) => this.processResponse(res, component)),
            catchError((err) => throwError(this.processError(err, component)))
        );
    }

    get<T>(api: string, component: FormContainer): Observable<T> {
        if (component) {
            component.isWorking = true;
        }
        this.fps.show();
        return this.http.get<T>(GetAPI(api)).pipe(
            map((res) => this.processResponse(res, component)),
            catchError((err) => throwError(this.processError(err, component)))
        );
    }

    put<T>(api: string, component: FormContainer, data: any): Observable<T> {
        if (component) {
            component.isWorking = true;
        }
        return this.http.put<T>(GetAPI(api), data).pipe(
            map((res) => this.processResponse(res, component)),
            catchError((err) => throwError(this.processError(err, component)))
        );
    }

    delete<T>(api: string, component: FormContainer): Observable<T> {
        if (component) {
            component.isWorking = true;
        }
        return this.http.delete<T>(GetAPI(api)).pipe(
            map((res) => this.processResponse(res, component)),
            catchError((err) => throwError(this.processError(err, component)))
        );
    }

    processResponse<T>(res: T, component: FormContainer): any {
        this.fps.hide();
        if (component) {
            component.isWorking = false;
        }
        return res;
    }

    processError(err: HttpErrorResponse, component: FormContainer): any {
        this.fps.hide();

        if (component) {
            component.isWorking = false;
        }

        if (err.status === 401) {
            this.authenticationService.logout();
        }

        if (component && component.handleError && component.handleError(err)) {
            return EMPTY;
        }

        return err;
    }
}
