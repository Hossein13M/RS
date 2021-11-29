import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../../pages/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authorizationService: AuthorizationService) {}

    async canActivate(): Promise<boolean> {
        if (!localStorage.getItem('accessToken')) {
            return false;
        }
        const result = await this.checkForUserVerification();
        if (result) {
            return true;
        } else {
            this.router.navigate(['login']).finally();
            return false;
        }
    }

    private async checkForUserVerification(): Promise<boolean> {
        const verificationResult = await this.authorizationService.verifyUserIntegration();
        return !!verificationResult;
    }
}
