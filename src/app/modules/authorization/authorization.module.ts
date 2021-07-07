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
import { LoginService } from './login/login.service';
import { OrganizationComponent } from './organization/organization.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ChangePasswordService} from "./change-password/change-password.service";

const routes: Routes = [
    {
        path: ``,
        component: LoginComponent,
    },
    {
        path: `change-password/:username`,
        component: ChangePasswordComponent,
    },
    {
        path: `organization/:username`,
        component: OrganizationComponent,
    },
    {
        path: `**`,
        redirectTo: ``,
    },
];

@NgModule({
    declarations: [LoginComponent, OrganizationComponent, ChangePasswordComponent],
    providers: [LoginService, ChangePasswordService],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    exports: [RouterModule],
})
export class AuthorizationModule {}
