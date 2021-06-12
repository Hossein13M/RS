import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/authentication.service';
// @ts-ignore
import version from '../../../../package.json';

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

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private Authentication: AuthenticationService,
        private sbs: AlertService
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
        this.loginForm = this._formBuilder.group({ userName: ['', [Validators.required]], password: ['', Validators.required] });
    }

    login(): void {
        this.waiting = true;
        this.Authentication.login({ body: this.loginForm.value }).subscribe(
            () => (this.waiting = false),
            () => {
                this.waiting = false;
                this.sbs.onError('ورود موفقیت آمیز نبود.');
            }
        );
    }

    onSubmit(): void {}
}
