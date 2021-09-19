import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AssetDebitDetailDialogComponent } from './asset-debit-detail-dialog/asset-debit-detail-dialog.component';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { RiskMeasurementRoutingModule } from './risk-measurement-routing.module';
import { RiskMeasuringComponent } from './risk-measuring/risk-measuring.component';
import { YieldCurveComponent } from './yield-curve/yield-curve.component';
import { HeaderModule } from '../../layout/components/header/header.module';

@NgModule({
    declarations: [AssetDebitDetailDialogComponent, YieldCurveComponent, AssetsReturnComponent, RiskMeasuringComponent],
    imports: [
        CommonModule,
        RiskMeasurementRoutingModule,
        MaterialModule,
        ShareModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        ChartModule,
        LayoutModule,
        MatProgressBarModule,
        HeaderModule
    ]
})
export class RiskMeasurementModule {}
