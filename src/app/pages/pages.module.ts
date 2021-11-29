import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { ShareModule } from '#shared/share.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrganizationComponent } from './organization/organization.component';
import { AuthorizationService } from './authorization.service';
import { PagesRoutingModule } from './pages.routing.module';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page.component';

@NgModule({
    declarations: [LoginComponent, ChangePasswordComponent, OrganizationComponent, PageComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        // RouterModule.forChild(routes, { relativeLinkResolution: 'legacy' },
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatSelectModule,
        ShareModule,
    ],
    providers: [AuthorizationService],
    exports: [PagesRoutingModule],
})
export class PagesModule {}
