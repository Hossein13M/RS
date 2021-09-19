import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../../modules/authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authorizationService: AuthorizationService) {}

    canActivate(): boolean {
        if (!this.authorizationService.isAuthenticated()) {
            this.router.navigate(['login']).finally();
            return false;
        }
        return true;
    }
}
