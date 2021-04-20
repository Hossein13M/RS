import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlTreeComponent } from './gl-tree.component';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '../../../layout/layout.module';
import { GlChartComponent } from './gl-chart/gl-chart.component';
import { GlPieChartComponent } from './gl-pie-chart/gl-pie-chart.component';
import {GlTreeService} from "./gl-tree.service";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GlTreeComponent,
    },
];

@NgModule({
    declarations: [GlTreeComponent, GlChartComponent, GlPieChartComponent],
    imports: [CommonModule, MaterialModule, ShareModule, MatTooltipModule, LayoutModule, RouterModule.forChild(routes)],
    providers: [GlTreeService]
})
export class GlTreeModule {}
