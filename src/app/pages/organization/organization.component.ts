import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../@fuse/animations';
import { AuthorizationService } from '../authorization.service';
import { OrganizationInfo } from '../auth.model';

@Component({
    selector: 'organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class OrganizationComponent implements OnInit {
    public form: FormGroup = this.fb.group({ organization: [null, Validators.required] });
    public loading: boolean = true;
    public organizations: Array<OrganizationInfo>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private authorizationService: AuthorizationService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: { hidden: true },
                toolbar: { hidden: true },
                footer: { hidden: false },
                sidepanel: { hidden: true },
            },
        };
    }

    ngOnInit(): void {
        this.organizations = JSON.parse(this.authorizationService.getToken('tempUserInfo')).organizations;
        this.organizations.length === 1 && this.checkForSingleOrganization();
    }

    private checkForSingleOrganization(): void {
        this.form.get('organization').setValue(this.organizations[0]);
        this.setActiveOrganization(this.form.get('organization').value);
    }

    public onSubmit(): void {
        this.setActiveOrganization(this.form.value['organization']);
    }

    private setActiveOrganization(organization: OrganizationInfo): void {
        this.authorizationService.selectActiveOrganization(organization.code).subscribe((token) => {
            this.authorizationService.setAccessTokenInLocalStorage(token.accessToken);
            this.redirectToPanel();
        });
    }

    private redirectToPanel(): void {
        this.router.navigate(['/welcome']).finally();
    }
}
