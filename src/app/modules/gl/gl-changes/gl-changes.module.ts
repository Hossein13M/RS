import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlChangesComponent } from './gl-changes.component';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '../../../layout/layout.module';
import { GlChangesService } from './gl-changes.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GlChangesComponent,
    },
];

@NgModule({
    declarations: [GlChangesComponent],
    imports: [CommonModule, MaterialModule, ShareModule, MatTooltipModule, LayoutModule, RouterModule.forChild(routes)],
    providers: [GlChangesService],
})
export class GlChangesModule {}
