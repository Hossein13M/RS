import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from '../auth.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { matchValidator } from '#shared/validators/match/match.validator';
import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ChangePasswordComponent implements OnInit {
    public form: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private authorizationService: AuthorizationService,
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
        this.initForm();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            newPassword: ['', Validators.required],
            confirmNewPassword: ['', Validators.required],
        });

        this.initConfirmPasswordValidation();
    }

    public onSubmit(): void {
        if (this.form.invalid) return;
        this.authorizationService.changePassword(this.form.value as ChangePassword).subscribe(() => {
            this.redirectToLogin();
        });
    }

    private redirectToLogin(): void {
        this.router.navigate([`./login`]).finally();
    }

    private initConfirmPasswordValidation(): void {
        const { newPassword, confirmNewPassword } = this.form.controls;
        newPassword.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((value: string) => {
            confirmNewPassword.setValidators([Validators.required, matchValidator(value)]);
            console.log(confirmNewPassword.errors);
        });
    }
}
