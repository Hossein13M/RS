import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {ChangePassword} from "../auth.model";

@Injectable()
export class ChangePasswordService {
    constructor(private readonly http: HttpClient) {}

    public changePassword(model: ChangePassword): Observable<null> {
        return this.http.post<null>(`/api/v1/user/change-password`, model);
    }
}
