import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { Organization, UserRole } from '../auth.model';
import { Router } from '@angular/router';

@Component({
    selector: 'organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class OrganizationComponent implements OnInit {
    public form: FormGroup;
    public waiting = true;
    public organizationData: Array<Organization>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private authorizationService: AuthorizationService,
        private formBuilder: FormBuilder,
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

    private static setActiveOrganization(organization: Organization): void {
        localStorage.setItem('activeOrganization', JSON.stringify(organization));
    }

    ngOnInit(): void {
        this.initForm();
        this.initActiveOrganizationData(this.authorizationService.decodeToken().userRoles);
    }

    public onSubmit(): void {
        if (this.form.invalid) return;
        OrganizationComponent.setActiveOrganization(this.form.value['organization']);
        this.redirectToWelcome();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            organization: [null, Validators.required],
        });
    }

    private initActiveOrganizationData(userRoles: Array<UserRole>): void {
        const codes: Array<number> = userRoles.map((userRole) => userRole.organizationCode);
        this.authorizationService.getOrganizations(codes).subscribe((response) => {
            this.organizationData = response.items;
            this.isOrganizationSingle();
        });
    }

    private isOrganizationSingle(): void {
        if (this.organizationData.length === 1) {
            OrganizationComponent.setActiveOrganization(this.organizationData[0]);
            this.redirectToWelcome();
        }
    }

    private redirectToWelcome(): void {
        this.router.navigate(['welcome']);
    }
}
