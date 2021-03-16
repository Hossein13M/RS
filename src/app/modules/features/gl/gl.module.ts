import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { GlChangesComponent } from './gl-changes/gl-changes.component';
import { GlChartComponent } from './gl-chart/gl-chart.component';
import { GlGridComponent } from './gl-grid/gl-grid.component';
import { GlPieChartComponent } from './gl-pie-chart/gl-pie-chart.component';
import { GlRoutingModule } from './gl-routing.module';
import { GlTreeComponent } from './gl-tree/gl-tree.component';

@NgModule({
    declarations: [GlTreeComponent, GlGridComponent, GlChangesComponent, GlChartComponent, GlPieChartComponent],
    imports: [CommonModule, GlRoutingModule, MaterialModule, ShareModule, MatTooltipModule, LayoutModule],
    entryComponents: [GlPieChartComponent],
})
export class GlModule {}
