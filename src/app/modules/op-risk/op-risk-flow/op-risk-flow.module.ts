import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FlowAddComponent } from './flow-add/flow-add.component';
import { OpRiskFlowRoutingModule } from './op-risk-flow-routing.module';
import { OpRiskFlowService } from './op-risk-flow.service';
import { OpRiskFlowComponent } from './op-risk-flow/op-risk-flow.component';
import { OpRiskViewComponent } from './op-risk-view/op-risk-view.component';

@NgModule({
    declarations: [OpRiskFlowComponent, FlowAddComponent, OpRiskViewComponent],
    imports: [CommonModule, LayoutModule, ShareModule, MatProgressSpinnerModule, MatTooltipModule, OpRiskFlowRoutingModule, NgxMatSelectSearchModule],
    providers: [OpRiskFlowService],
    entryComponents: [FlowAddComponent, OpRiskViewComponent],
})
export class OpRiskFlowModule {}
