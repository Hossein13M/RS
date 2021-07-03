import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routePrefix = `auth`;

const routes: Routes = [
    {
        path: `${routePrefix}/login`,
        loadChildren: () => import('./login/login.module').then((module) => module.LoginModule),
    },
    {
        path: `**`,
        redirectTo: `${routePrefix}/login`,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthorizationModule {}
