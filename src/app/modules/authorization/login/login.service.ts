import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, LoginResponse, User} from '../auth.model';
import {Observable} from 'rxjs';
import jwtDecode from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    public login(model: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`/api/v2/auth/login`, model);
    }

    public decodeToken(token: LoginResponse): User {
        return jwtDecode(token.accessToken) as User;
    }
}
