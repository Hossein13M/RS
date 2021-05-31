import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: `organizations-list`, loadChildren: () => import('./organizations-list/organizations-list.module').then((m) => m.OrganizationsListModule) },
    { path: `roles-list`, loadChildren: () => import('./roles-list/roles-list.module').then((m) => m.RolesListModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationStructureRoutingModule {}
