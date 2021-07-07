import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
// @ts-ignore
import version from '../../../../../package.json';
import { LoginService } from './login.service';
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
    loginForm: FormGroup;
    waiting = false;

    version = version.version;

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
        private loginService: LoginService,
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
        this.loginService.login(this.loginForm.value).subscribe(
            (token) => {
                this.waiting = false;
                LoginComponent.storeToken(token.accessToken);
                const user = this.loginService.decodeToken(token);
                if (LoginComponent.isUserUnauthorized(user)) {
                    this.redirectToChangePassword();
                } else {
                    this.redirectToOrganization(this.loginForm.value.username);
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

    private redirectToOrganization(username: string): void {
        this.router.navigate([`./organization/${username}`], { relativeTo: this.activatedRoute });
    }

    onSubmit(): void {}
}
