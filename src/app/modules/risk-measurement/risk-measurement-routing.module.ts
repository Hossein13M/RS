import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { RiskMeasuringComponent } from './risk-measuring/risk-measuring.component';
import { YieldCurveComponent } from './yield-curve/yield-curve.component';

const routes: Routes = [
    { path: 'yield_curve', component: YieldCurveComponent },
    { path: 'assets_return', component: AssetsReturnComponent },
    { path: 'risk_measuring', component: RiskMeasuringComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RiskMeasurementRoutingModule {}
