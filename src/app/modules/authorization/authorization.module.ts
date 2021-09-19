import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './authorization.service';
import { OrganizationComponent } from './organization/organization.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSelectModule } from '@angular/material/select';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [
    { path: ``, component: LoginComponent },
    { path: `change-password`, component: ChangePasswordComponent },
    { path: `organization`, component: OrganizationComponent },
];

@NgModule({
    declarations: [LoginComponent, OrganizationComponent, ChangePasswordComponent],
    providers: [AuthorizationService],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatSelectModule,
        ShareModule,
    ],
    exports: [RouterModule],
})
export class AuthorizationModule {}
