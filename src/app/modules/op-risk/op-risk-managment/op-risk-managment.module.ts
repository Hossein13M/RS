import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from 'app/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { OpLossAddDetailComponent } from './op-loss-add-detail/op-loss-add-detail.component';
import { OpLossAddComponent } from './op-loss-add/op-loss-add.component';
import { OpLossEditComponent } from './op-loss-edit/op-loss-edit.component';
import { OpRiskAddComponent } from './op-risk-add/op-risk-add.component';
import { OpRiskListComponent } from './op-risk-list/op-risk-list.component';
import { OpRiskManagementRoutingModule } from './op-risk-management-routing.module';
import { RejectOpRiskComponent } from './reject-op-risk/reject-op-risk.component';
import { SubmittedRisksComponent } from './submitted-risks/submitted-risks.component';

@NgModule({
    declarations: [
        OpRiskListComponent,
        OpRiskAddComponent,
        RejectOpRiskComponent,
        OpLossAddComponent,
        OpLossAddDetailComponent,
        OpLossEditComponent,
        SubmittedRisksComponent,
    ],
    imports: [CommonModule, OpRiskManagementRoutingModule, LayoutModule, MatIconModule, MatButtonModule, MatGridListModule, ShareModule],
    entryComponents: [RejectOpRiskComponent],
})
export class OpRiskManagmentModule {}
