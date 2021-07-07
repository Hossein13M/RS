import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../@fuse/animations';
// @ts-ignore
import version from '../../../../../package.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { ChangePassword } from '../auth.model';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ChangePasswordComponent implements OnInit {
    public form: FormGroup;
    public version = version.version;
    private username: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private changePasswordService: ChangePasswordService,
        private router: Router
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
        this.initUserNameFromRoute();
    }

    private initForm(username?: string | undefined): void {
        this.form = this.formBuilder.group({ username: [username ?? '', [Validators.required]], newPassword: ['', Validators.required] });
    }

    private initUserNameFromRoute(): void {
        this.activatedRoute.params.subscribe((data: { username: string }) => {
            this.initForm(data.username);
        });
    }

    public login(): void {
        if (this.form.invalid) return;

        const value: ChangePassword = {
            userName: this.form.value.username,
            newPassword: this.form.value.newPassword,
        };
        this.changePasswordService.changePassword(value).subscribe(() => {
            this.redirectToLogin();
        });
    }

    private redirectToLogin(): void {
        this.router.navigate([`./login`]);
    }
}
