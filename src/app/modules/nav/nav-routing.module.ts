import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { RiskMeasuringComponent } from './risk-measuring/risk-measuring.component';
import { YieldCurveComponent } from './yield-curve/yield-curve.component';

const routes: Routes = [
    { path: '', component: NavMainComponent },
    { path: 'yield_curve', component: YieldCurveComponent },
    { path: 'assets_return', component: AssetsReturnComponent },
    { path: 'risk_measuring', component: RiskMeasuringComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NavRoutingModule {}
