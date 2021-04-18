import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from 'app/layout/layout.module';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AssetDebitDetailDialogComponent } from './asset-debit-detail-dialog/asset-debit-detail-dialog.component';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { NavAddChangeDialogComponent } from './nav-add-change-dialog/nav-add-change-dialog.component';
import { NavItemDetailComponent } from './nav-item-detail/nav-item-detail.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { NavProcessDetailDialogComponent } from './nav-process-detail-dialog/nav-process-detail-dialog.component';
import { NavRoutingModule } from './nav-routing.module';
import { RiskMeasuringComponent } from './risk-measuring/risk-measuring.component';
import { YieldCurveComponent } from './yield-curve/yield-curve.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        NavMainComponent,
        NavItemDetailComponent,
        AssetDebitDetailDialogComponent,
        NavProcessDetailDialogComponent,
        NavAddChangeDialogComponent,
        YieldCurveComponent,
        AssetsReturnComponent,
        RiskMeasuringComponent,
    ],
    imports: [
        CommonModule,
        NavRoutingModule,
        MaterialModule,
        ShareModule,
        NgxMatSelectSearchModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        ChartModule,
        LayoutModule,
        MatProgressBarModule,
    ],
})
export class NavModule {}
