import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrganizationComponent } from './organization/organization.component';
import { PageComponent } from './page.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'organization', component: OrganizationComponent },
            { path: 'forget-password', component: ForgetPasswordComponent },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
