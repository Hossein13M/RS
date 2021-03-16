import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeDashboardComponent } from './trade-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: TradeDashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TradeDashboardRoutingModule {}
