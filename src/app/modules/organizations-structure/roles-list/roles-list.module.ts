import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './roles-list.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: RolesListComponent }];

@NgModule({
    declarations: [RolesListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RolesListComponent, RouterModule],
})
export class RolesListModule {}
