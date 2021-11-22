import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { AlertService } from '#shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent {
    public loginForm: FormGroup = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, Validators.required],
    });
    public loading: boolean = false;

    constructor(
        private fuseConfigService: FuseConfigService,
        private fb: FormBuilder,
        private authorizationService: AuthorizationService,
        private alertService: AlertService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.configureFuseService();
    }

    public login(): void {
        this.loading = true;
        this.authorizationService.newLogin(this.loginForm.value).subscribe(
            (response) => {
                this.authorizationService.temporaryStoreUserTokenAndInfo(response);
                this.redirectToOrganization();
            },
            (error: any) => this.alertService.onError(error.error.errors[0].messageFA),
            () => (this.loading = false)
        );
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

    private redirectToChangePassword(): void {
        this.router.navigate([`./change-password`], { relativeTo: this.activatedRoute }).finally();
    }

    private redirectToOrganization(): void {
        this.router.navigate([`./organization`], { relativeTo: this.activatedRoute }).finally();
    }
}
