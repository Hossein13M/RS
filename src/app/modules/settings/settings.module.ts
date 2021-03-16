import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BourceInstrumentDetailComponent } from './bource-instrument-detail/bource-instrument-detail.component';
import { CollaterallsComponent } from './bource-instrument-detail/collateralls/collateralls.component';
import { DateComponent } from './bource-instrument-detail/date/date.component';
import { GuarantorsComponent } from './bource-instrument-detail/guarantors/guarantors.component';
import { MarketMakerComponent } from './bource-instrument-detail/market-maker/market-maker.component';
import { UnderWriterComponent } from './bource-instrument-detail/under-writer/under-writer.component';
import { FundTypeComponent } from './fund-type/fund-type.component';
import { GuarantorComponent } from './guarantor/guarantor.component';
import { InputComponent } from './input/input.component';
import { IssuerGoalComponent } from './issuer-goal/issuer-goal.component';
import { IssuerLicenseComponent } from './issuer-license/issuer-license.component';
import { IssuerComponent } from './issuer/issuer.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
    declarations: [
        IssuerComponent,
        GuarantorComponent,
        FundTypeComponent,
        IssuerLicenseComponent,
        IssuerGoalComponent,
        InputComponent,
        CollaterallsComponent,
        GuarantorsComponent,
        DateComponent,
        UnderWriterComponent,
        MarketMakerComponent,
        BourceInstrumentDetailComponent,
    ],
    imports: [CommonModule, SettingsRoutingModule, ShareModule, NgxMatSelectSearchModule, FuseSharedModule, MaterialModule],
    entryComponents: [CollaterallsComponent, GuarantorsComponent, DateComponent, UnderWriterComponent, MarketMakerComponent],
})
export class SettingsModule {}
