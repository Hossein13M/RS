import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RolesListComponent } from './roles-list.component';
import { LayoutModule } from '../../../layout/layout.module';
import { FlexModule } from '@angular/flex-layout';
import { ShareModule } from '#shared/share.module';
import { TreeHeaderSelectorModule } from '#shared/components/tree-header-selector/tree-header-selector.module';
import { TreeSimpleSelectorModule } from '#shared/components/tree-simple-selector/tree-simple-selector.module';
import { HeaderModule } from '../../../layout/components/header/header.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: RolesListComponent }];

@NgModule({
    declarations: [RolesListComponent],
    imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, FlexModule, ShareModule, TreeHeaderSelectorModule, TreeSimpleSelectorModule, HeaderModule],
    exports: [RolesListComponent, RouterModule],
})
export class RolesListModule {}
