import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
// @ts-ignore
import version from '../../../../../package.json';
import { LoginService } from './login.service';
import { Status, User } from './login.model';
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
    wrongPassWord = false;
    waiting = false;

    version = version.version;

    private static isUserUnauthorized(user: User): boolean {
        console.log(user.status);
        return user.status === Status.unauthorized;
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

    login(): void {
        this.waiting = true;
        this.loginService.login(this.loginForm.value).subscribe(
            (token) => {
                this.waiting = false;
                const user = this.loginService.decodeToken(token);
                if (LoginComponent.isUserUnauthorized(user)) {
                    this.redirectToChangePassword(this.loginForm.value.username);
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

    redirectToChangePassword(username: string): void {
        this.router.navigate([`./change-password/${username}`], { relativeTo: this.activatedRoute });
    }

    redirectToOrganization(username: string): void {
        this.router.navigate([`./organization/${username}`], { relativeTo: this.activatedRoute });
    }

    onSubmit(): void {}
}
