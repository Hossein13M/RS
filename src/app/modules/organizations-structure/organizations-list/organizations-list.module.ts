import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list.component';
import { LayoutModule } from '../../../layout/layout.module';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { OrganizationModule } from '../organization/organization.module';
import { ShareModule } from '#shared/share.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: OrganizationsListComponent }];

@NgModule({
    declarations: [OrganizationsListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FlexModule,
        OrganizationModule,
        ShareModule,
        LayoutModule,
    ],
    exports: [OrganizationsListComponent, RouterModule],
})
export class OrganizationsListModule {}
