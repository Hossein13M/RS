import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { OpRiskChartSelectComponent } from './op-risk-chart-select/op-risk-chart-select.component';
import { OpRiskMappingDialogComponent } from './op-risk-mapping-dialog/op-risk-mapping-dialog.component';
import { OpRiskTreeChartService } from './op-risk-tree-chart.service';
import { OpRiskTreeChartComponent } from './op-risk-tree-chart/op-risk-tree-chart.component';
import { TreeChartPageComponent } from './tree-chart-page/tree-chart-page.component';
import { TreeChartRoutingModule } from './tree-chart-routing.module';
import { TreeMappingService } from './tree-mapping.service';

@NgModule({
    declarations: [TreeChartPageComponent, OpRiskTreeChartComponent, OpRiskChartSelectComponent, OpRiskMappingDialogComponent],
    imports: [CommonModule, TreeChartRoutingModule, LayoutModule, ShareModule, MatProgressSpinnerModule, MatTooltipModule],
    providers: [OpRiskTreeChartService, TreeMappingService],
    entryComponents: [OpRiskMappingDialogComponent],
    exports: [OpRiskTreeChartComponent],
})
export class TreeChartModule {}
