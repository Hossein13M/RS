import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlGridComponent } from './gl-grid.component';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '../../../layout/layout.module';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GlGridComponent,
    },
];

@NgModule({
    declarations: [GlGridComponent],
    imports: [CommonModule, MaterialModule, ShareModule, MatTooltipModule, LayoutModule, RouterModule.forChild(routes)],
})
export class GlGridModule {}
