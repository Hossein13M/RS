import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAddComponent } from './role-add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', pathMatch: 'full', component: RoleAddComponent }];

@NgModule({
    declarations: [RoleAddComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RoleAddComponent, RouterModule],
})
export class RoleAddModule {}
