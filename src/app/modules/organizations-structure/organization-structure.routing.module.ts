import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: `organizations-list`,
        loadChildren: () => import('./organizations-list/organizations-list.module').then((m) => m.OrganizationsListModule),
    },
    {
        path: `roles-list/:id`,
        loadChildren: () => import('./roles-list/roles-list.module').then((m) => m.RolesListModule),
    },
    {
        path: `roles-list/:id/:orgInfo`,
        loadChildren: () => import('./roles-list/roles-list.module').then((m) => m.RolesListModule),
    },
    { path: `user`, loadChildren: () => import('./user/user.module').then((m) => m.UserModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationStructureRoutingModule {}
