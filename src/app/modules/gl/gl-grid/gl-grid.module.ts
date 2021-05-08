import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { GlGridComponent } from './gl-grid.component';
import { GlGridService } from './gl-grid.service';

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
    providers: [GlGridService],
})
export class GlGridModule {}
