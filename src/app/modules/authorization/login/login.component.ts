import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { AuthorizationService } from '../authorization.service';
import { Status, User } from '../auth.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public waiting = false;

    private static isUserUnauthorized(user: User): boolean {
        console.log(user.status);
        return user.status === Status.unauthorized;
    }

    private static storeToken(token: string): void {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', token);
    }

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private Authentication: AuthenticationService,
        private authorizationService: AuthorizationService,
        private sbs: AlertService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: { hidden: true },
                toolbar: { hidden: true },
                footer: { hidden: true },
                sidepanel: { hidden: true },
            },
        };
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({ username: ['', [Validators.required]], password: ['', Validators.required] });
    }

    public login(): void {
        this.waiting = true;
        this.authorizationService.login(this.loginForm.value).subscribe(
            (token) => {
                this.waiting = false;
                this.Authentication.login(this.loginForm.value).subscribe();
                LoginComponent.storeToken(token.accessToken);
                const user = this.authorizationService.decodeToken(token);
                localStorage.setItem('user', JSON.stringify(user));
                if (LoginComponent.isUserUnauthorized(user)) {
                    this.redirectToChangePassword();
                } else {
                    this.redirectToOrganization();
                }
            },
            () => {
                this.waiting = false;
                this.sbs.onError('ورود موفقیت آمیز نبود.');
            }
        );
    }

    private redirectToChangePassword(): void {
        this.router.navigate([`./change-password`], { relativeTo: this.activatedRoute });
    }

    private redirectToOrganization(): void {
        this.router.navigate([`./organization`], { relativeTo: this.activatedRoute });
    }

    onSubmit(): void {}
}
