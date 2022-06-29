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
import { NavAddChangeDialogComponent } from './nav-add-change-dialog/nav-add-change-dialog.component';
import { NavItemDetailComponent } from './nav-item-detail/nav-item-detail.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { NavProcessDetailDialogComponent } from './nav-process-detail-dialog/nav-process-detail-dialog.component';
import { NavRoutingModule } from './nav-routing.module';
import { PipesModule } from '#shared/pipes/pipes.module';
import { HeaderModule } from '../../layout/components/header/header.module';

@NgModule({
    declarations: [NavMainComponent, NavItemDetailComponent, NavProcessDetailDialogComponent, NavAddChangeDialogComponent],
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
        PipesModule,
        HeaderModule,
    ],
})
export class NavModule {}
