import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpRiskReportingComponent } from './op-risk-reporting/op-risk-reporting.component';

const routes: Routes = [
    {
        path: '',
        component: OpRiskReportingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpRiskReportingRoutingModule {}
