import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { ShareModule } from 'app/shared/share.module';
import { AumBondsComponent } from './aum-bonds/aum-bonds.component';
import { AumDepositComponent } from './aum-deposit/aum-deposit.component';
import { AumEtfComponent } from './aum-etf/aum-etf.component';
import { AumFundsComponent } from './aum-funds/aum-funds.component';
import { AumNlBondsComponent } from './aum-nl-bonds/aum-nl-bonds.component';
import { AumNlFundsComponent } from './aum-nl-funds/aum-nl-funds.component';
import { AumNlStocksComponent } from './aum-nl-stocks/aum-nl-stocks.component';
import { AUMRoutingModule } from './aum-routing.module';
import { AumStocksComponent } from './aum-stocks/aum-stocks.component';
import { AumComponent } from './aum.component';
import { IpsDialogModule } from '#shared/components/ips-dialog/ips-dialog.module';
import { LayoutModule } from '../../layout/layout.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PipesModule } from '#shared/pipes/pipes.module';
import { HeaderModule } from '../../layout/components/header/header.module';

@NgModule({
    declarations: [
        AumComponent,
        AumBondsComponent,
        AumNlBondsComponent,
        AumStocksComponent,
        AumDepositComponent,
        AumEtfComponent,
        AumNlStocksComponent,
        AumFundsComponent,
        AumNlFundsComponent,
    ],
    imports: [
        CommonModule,
        AUMRoutingModule,
        ShareModule,
        ChartModule,
        MatProgressSpinnerModule,
        IpsDialogModule,
        LayoutModule,
        MatProgressBarModule,
        PipesModule,
        HeaderModule,
    ],
    entryComponents: [TableDialogComponent],
})
export class AUMModule {}
