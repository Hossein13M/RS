import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login, Token, User} from '../auth.model';
import {Observable} from 'rxjs';
import jwtDecode from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    public login(model: Login): Observable<Token> {
        return this.http.post<Token>(`/api/v2/auth/login`, model);
    }

    public decodeToken(token: Token): User {
        return jwtDecode(token.accessToken) as User;
    }
}
