import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list.component';
import { LayoutModule } from '../../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { OrganizationModule } from '../organization/organization.module';
import { ShareModule } from '#shared/share.module';
import { HeaderModule } from '../../../layout/components/header/header.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: OrganizationsListComponent }];

@NgModule({
    declarations: [OrganizationsListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        MatIconModule,
        MatButtonModule,
        FlexModule,
        OrganizationModule,
        ShareModule,
        LayoutModule,
        HeaderModule,
    ],
    exports: [OrganizationsListComponent, RouterModule],
})
export class OrganizationsListModule {}
