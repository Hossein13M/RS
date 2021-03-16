import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpRiskFlowComponent } from './op-risk-flow/op-risk-flow.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OpRiskFlowComponent,
    },
    {
        path: ':name',
        component: OpRiskFlowComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpRiskFlowRoutingModule {}
