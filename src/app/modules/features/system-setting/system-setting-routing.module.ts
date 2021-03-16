import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankSettingListComponent } from './bank-setting-components/bank-setting-list/bank-setting-list.component';
import { BourseBoardSettingListComponent } from './bourse-board-setting-components/bourse-board-setting-list/bourse-board-setting-list.component';
import { BourseMarketSettingListComponent } from './bourse-market-setting-components/bourse-market-setting-list/bourse-market-setting-list.component';
import { BranchSettingListComponent } from './branch-setting-components/branch-setting-list/branch-setting-list.component';
import { BrokerSettingListComponent } from './broker-setting-components/broker-setting-list/broker-setting-list.component';
import { DepositSettingListComponent } from './deposit-setting-components/deposit-setting-list/deposit-setting-list.component';
import { FundSettingListComponent } from './fund-setting-components/fund-setting-list/fund-setting-list.component';
import { FundRoleSettingListComponent } from './fundRole-setting-components/fund-role-setting-list/fund-role-setting-list.component';
import { GlSettingListComponent } from './gl-setting-components/gl-setting-list/gl-setting-list.component';
import { InstrumentSettingListComponent } from './instrument-setting-components/instrument-setting-list/instrument-setting-list.component';
import { InstrumentTypeSettingListComponent } from './instrument-type-setting-components/instrument-type-setting-list/instrument-type-setting-list.component';
import { MarketSettingListComponent } from './market-setting-components/market-setting-list/market-setting-list.component';
import { OrganizationSupervisorListComponent } from './organization-supervisor-setting-components/organization-supervisor-list/organization-supervisor-list.component';
import { OrganizationTypeSettingListComponent } from './organization-type-setting-components/organization-type-setting-list/organization-type-setting-list.component';

const routes: Routes = [
    {
        component: BranchSettingListComponent,
        path: 'branch',
    },
    {
        component: BrokerSettingListComponent,
        path: 'broker',
    },
    {
        component: GlSettingListComponent,
        path: 'gl',
    },
    {
        component: DepositSettingListComponent,
        path: 'deposit',
    },
    {
        component: BankSettingListComponent,
        path: 'bank',
    },
    {
        component: BourseBoardSettingListComponent,
        path: 'bourse-board',
    },
    {
        component: BourseMarketSettingListComponent,
        path: 'bourse-market',
    },
    {
        component: InstrumentSettingListComponent,
        path: 'instrument',
    },
    {
        component: OrganizationSupervisorListComponent,
        path: 'supervisor',
    },
    {
        component: OrganizationTypeSettingListComponent,
        path: 'organization-type',
    },
    {
        component: FundRoleSettingListComponent,
        path: 'fundRole',
    },
    {
        component: InstrumentTypeSettingListComponent,
        path: 'instrument-type',
    },
    {
        component: FundSettingListComponent,
        path: 'fund',
    },
    {
        component: MarketSettingListComponent,
        path: 'market',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemSettingRoutingModule {}
