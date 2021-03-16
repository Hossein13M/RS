import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatedComplianceComponent } from './calculated-compliance/calculated-compliance.component';
import { CompliancesComponent } from './compliances/compliances.component';

const routes: Routes = [
    {
        path: 'fund',
        component: CompliancesComponent,
    },
    {
        path: 'calculated',
        component: CalculatedComplianceComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComplianceRoutingModule {}
