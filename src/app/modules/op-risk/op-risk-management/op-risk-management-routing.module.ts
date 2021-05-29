import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpLossAddDetailComponent } from './op-loss-add-detail/op-loss-add-detail.component';
import { OpLossAddComponent } from './op-loss-add/op-loss-add.component';
import { OpLossEditComponent } from './op-loss-edit/op-loss-edit.component';
import { OpRiskAddComponent } from './op-risk-add/op-risk-add.component';
import { OpRiskListComponent } from './op-risk-list/op-risk-list.component';
import { SubmittedRisksComponent } from './submitted-risks/submitted-risks.component';

const routes: Routes = [
    {
        path: '',
        component: OpRiskListComponent,
    },
    {
        path: 'add',
        component: OpRiskAddComponent,
    },
    {
        path: 'loss',
        component: OpLossAddComponent,
    },
    {
        path: 'loss/detail',
        component: OpLossAddDetailComponent,
    },
    {
        path: 'loss/edit/:id',
        component: OpLossEditComponent,
    },
    {
        path: 'submitted-risks',
        component: SubmittedRisksComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpRiskManagementRoutingModule {}
