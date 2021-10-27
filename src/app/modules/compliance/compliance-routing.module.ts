import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompliancesComponent } from './compliances-list/compliances.component';

const routes: Routes = [
    {
        path: 'fund',
        component: CompliancesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComplianceRoutingModule {}
