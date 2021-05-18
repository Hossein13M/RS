import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from 'app/layout/layout.module';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BankSettingAddComponent } from './bank-setting-components/bank-setting-add/bank-setting-add.component';
import { BankSettingListComponent } from './bank-setting-components/bank-setting-list/bank-setting-list.component';
import { BourseBoardSettingAddComponent } from './bourse-board-setting-components/bourse-board-setting-add/bourse-board-setting-add.component';
import { BourseBoardSettingListComponent } from './bourse-board-setting-components/bourse-board-setting-list/bourse-board-setting-list.component';
import { BourseMarketSettingAddComponent } from './bourse-market-setting-components/bourse-market-setting-add/bourse-market-setting-add.component';
import { BourseMarketSettingListComponent } from './bourse-market-setting-components/bourse-market-setting-list/bourse-market-setting-list.component';
import { BranchSettingAddComponent } from './branch-setting-components/branch-setting-add/branch-setting-add.component';
import { BranchSettingListComponent } from './branch-setting-components/branch-setting-list/branch-setting-list.component';
import { BrokerSettingAddComponent } from './broker-setting-components/broker-setting-add/broker-setting-add.component';
import { BrokerSettingListComponent } from './broker-setting-components/broker-setting-list/broker-setting-list.component';
import { DepositSettingAddComponent } from './deposit-setting-components/deposit-setting-add/deposit-setting-add.component';
import { DepositSettingDetailComponent } from './deposit-setting-components/deposit-setting-detail/deposit-setting-detail.component';
import { DepositSettingListComponent } from './deposit-setting-components/deposit-setting-list/deposit-setting-list.component';
import { FundSettingAddComponent } from './fund-setting-components/fund-setting-add/fund-setting-add.component';
import { FundSettingListComponent } from './fund-setting-components/fund-setting-list/fund-setting-list.component';
import { FundRoleSettingAddComponent } from './fundRole-setting-components/fund-role-setting-add/fund-role-setting-add.component';
import { FundRoleSettingListComponent } from './fundRole-setting-components/fund-role-setting-list/fund-role-setting-list.component';
import { GlSettingAddComponent } from './gl-setting-components/gl-setting-add/gl-setting-add.component';
import { GlSettingListComponent } from './gl-setting-components/gl-setting-list/gl-setting-list.component';
import { InstrumentSettingAddComponent } from './instrument-setting-components/instrument-setting-add/instrument-setting-add.component';
import { InstrumentSettingListComponent } from './instrument-setting-components/instrument-setting-list/instrument-setting-list.component';
import { InstrumentTypeSettingAddComponent } from './instrument-type-setting-components/instrument-type-setting-add/instrument-type-setting-add.component';
import { InstrumentTypeSettingListComponent } from './instrument-type-setting-components/instrument-type-setting-list/instrument-type-setting-list.component';
import { MarketSettingAddComponent } from './market-setting-components/market-setting-add/market-setting-add.component';
import { MarketSettingListComponent } from './market-setting-components/market-setting-list/market-setting-list.component';
import { OrganizationSupervisorAddComponent } from './organization-supervisor-setting-components/organization-supervisor-add/organization-supervisor-add.component';
import { OrganizationSupervisorListComponent } from './organization-supervisor-setting-components/organization-supervisor-list/organization-supervisor-list.component';
import { OrganizationTypeSettingAddComponent } from './organization-type-setting-components/organization-type-setting-add/organization-type-setting-add.component';
import { OrganizationTypeSettingListComponent } from './organization-type-setting-components/organization-type-setting-list/organization-type-setting-list.component';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { PipesModule } from '#shared/pipes/pipes.module';
import { GlSettingService } from './gl-setting-components/gl-setting.service';

@NgModule({
    declarations: [
        BranchSettingListComponent,
        BranchSettingAddComponent,
        BrokerSettingListComponent,
        BrokerSettingAddComponent,
        GlSettingListComponent,
        GlSettingAddComponent,
        DepositSettingListComponent,
        DepositSettingAddComponent,
        DepositSettingDetailComponent,
        BankSettingListComponent,
        BankSettingAddComponent,
        BourseBoardSettingAddComponent,
        BourseBoardSettingListComponent,
        BourseMarketSettingAddComponent,
        BourseMarketSettingListComponent,
        InstrumentSettingAddComponent,
        InstrumentSettingListComponent,
        OrganizationSupervisorAddComponent,
        OrganizationSupervisorListComponent,
        OrganizationTypeSettingAddComponent,
        OrganizationTypeSettingListComponent,
        FundRoleSettingAddComponent,
        FundRoleSettingListComponent,
        InstrumentTypeSettingAddComponent,
        InstrumentTypeSettingListComponent,
        FundSettingAddComponent,
        FundSettingListComponent,
        MarketSettingAddComponent,
        MarketSettingListComponent,
    ],
    imports: [CommonModule, MaterialModule, ShareModule, SystemSettingRoutingModule, NgxMatSelectSearchModule, LayoutModule, PipesModule],
    entryComponents: [
        BranchSettingAddComponent,
        BrokerSettingAddComponent,
        GlSettingAddComponent,
        DepositSettingAddComponent,
        DepositSettingDetailComponent,
        BankSettingAddComponent,
        BourseBoardSettingAddComponent,
        BourseMarketSettingAddComponent,
        InstrumentSettingAddComponent,
        OrganizationSupervisorAddComponent,
        OrganizationTypeSettingAddComponent,
        FundRoleSettingAddComponent,
        FundSettingAddComponent,
        InstrumentTypeSettingAddComponent,
        MarketSettingAddComponent,
    ],
    providers: [GlSettingService],
})
export class SystemSettingModule {}
