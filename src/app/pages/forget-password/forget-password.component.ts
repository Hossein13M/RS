import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';
import { FuseConfigService } from '../../../@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { AlertService } from '#shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ForgetPasswordComponent {
    public isSmsSent: boolean = false;
    private userId: number;

    public forgetPasswordForm: FormGroup = this.fb.group({
        nationalCode: [null, [Validators.required, Validators.pattern(/^\d{10}$/g)]],
    });
    public verifyOtpSmsForm: FormGroup = this.fb.group({
        newPassword: [null, [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: [null, [Validators.required, Validators.minLength(8)]],
        otp: [null, [Validators.required, Validators.pattern(/^\d{6}$/g)]],
    });

    constructor(
        private fuseConfigService: FuseConfigService,
        private fb: FormBuilder,
        private readonly authorizationService: AuthorizationService,
        private readonly alertService: AlertService,
        private readonly router: Router
    ) {
        this.configureFuseService();
    }

    private configureFuseService(): void {
        this.fuseConfigService.config = {
            layout: {
                navbar: { hidden: true },
                toolbar: { hidden: true },
                footer: { hidden: true },
                sidepanel: { hidden: true },
            },
        };
    }

    public forgetPasswordFormSubmit() {
        this.authorizationService.sendOTPSms(this.forgetPasswordForm.get('nationalCode').value).subscribe(
            (userId) => {
                this.isSmsSent = true;
                this.userId = userId.userId;
            },
            () => {
                this.alertService.onError('خطایی رخ داده!');
            }
        );
    }

    public verifyOtpSmsFormSubmit() {
        this.authorizationService.forgetPassword({ userId: this.userId, ...this.verifyOtpSmsForm.value }).subscribe(
            () => {
                this.router.navigate(['/login']).finally();
            },
            () => {
                this.alertService.onError('خطایی رخ داده!');
            }
        );
    }
}
