import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { ShareModule } from 'app/shared/share.module';
import { AumBondsComponent } from './aum-bonds/aum-bonds.component';
import { AumCertificateDepositComponent } from './aum-certificate-deposit/aum-certificate-deposit.component';
import { AumDepositComponent } from './aum-deposit/aum-deposit.component';
import { AumEtfComponent } from './aum-etf/aum-etf.component';
import { AumFundsComponent } from './aum-funds/aum-funds.component';
import { AumNlBondsComponent } from './aum-nl-bonds/aum-nl-bonds.component';
import { AumNlFundsComponent } from './aum-nl-funds/aum-nl-funds.component';
import { AumNlStocksComponent } from './aum-nl-stocks/aum-nl-stocks.component';
import { AUMRoutingModule } from './aum-routing.module';
import { AumStocksComponent } from './aum-stocks/aum-stocks.component';
import { AumComponent } from './aum.component';

@NgModule({
    declarations: [
        AumComponent,
        AumBondsComponent,
        AumNlBondsComponent,
        AumStocksComponent,
        AumDepositComponent,
        AumEtfComponent,
        AumCertificateDepositComponent,
        AumNlStocksComponent,
        AumFundsComponent,
        AumNlFundsComponent,
    ],
    imports: [CommonModule, AUMRoutingModule, ShareModule, ChartModule, MatProgressSpinnerModule],
    entryComponents: [TableDialogComponent],
})
export class AUMModule {}
