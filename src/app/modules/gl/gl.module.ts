import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { GlChangesComponent } from './gl-changes/gl-changes.component';
import { GlChartComponent } from './gl-chart/gl-chart.component';
import { GlGridComponent } from './gl-grid/gl-grid.component';
import { GlPieChartComponent } from './gl-pie-chart/gl-pie-chart.component';
import { RouterModule, Routes } from '@angular/router';

// Edit This Section To Change Route Prefix
export const GLRoutePrefix = 'gl';
// ----------------------------------------

const routes: Routes = [
    {
        path: `/${GLRoutePrefix}`,
        pathMatch: 'full',
        redirectTo: `${GLRoutePrefix}/tree`,
    },
    {
        path: `/${GLRoutePrefix}/tree`,
        loadChildren: () => import('./gl-tree/gl-tree.module').then((m) => m.GlTreeModule),
    },
    {
        path: `/${GLRoutePrefix}/grid`,
        component: GlGridComponent,
    },
    {
        path: `/${GLRoutePrefix}/changes`,
        component: GlChangesComponent,
    },
];

@NgModule({
    declarations: [GlGridComponent, GlChangesComponent, GlChartComponent, GlPieChartComponent],
    imports: [CommonModule, RouterModule.forRoot(routes), MaterialModule, ShareModule, MatTooltipModule, LayoutModule],
    entryComponents: [GlPieChartComponent],
})
export class GlModule {
    constructor() {}
}
