import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
    {
        path: '',
        component: ModulesComponent,
        children: [
            {
                path: 'welcome',
                loadChildren: () => import('app/modules/welcome/welcome.module').then((m) => m.WelcomeModule),
            },
            {
                path: 'contract',
                loadChildren: () => import('app/modules/contract/contract.module').then((m) => m.ContractModule),
            },
            {
                path: 'aum',
                loadChildren: () => import('app/modules/aum/aum.module').then((m) => m.AUMModule),
            },
            {
                path: 'compliance',
                loadChildren: () => import('app/modules/compliance/compliance.module').then((m) => m.ComplianceModule),
            },

            {
                path: 'messaging',
                loadChildren: () => import('app/modules/mails/messaging.module').then((m) => m.MessagingModule),
            },
            {
                path: 'alarming',
                loadChildren: () => import('app/modules/alarming/alarming.module').then((m) => m.AlarmingModule),
            },
            {
                path: 'nav',
                loadChildren: () => import('app/modules/nav/nav.module').then((m) => m.NavModule),
            },
            {
                path: 'risk-measurement',
                loadChildren: () => import('app/modules/risk-measurement/risk-measurement.module').then((m) => m.RiskMeasurementModule),
            },
            {
                path: 'system-settings',
                loadChildren: () => import('app/modules/system-settings/system-settings.module').then((m) => m.SystemSettingsModule),
            },

            {
                path: 'assets-monitoring',
                loadChildren: () => import('app/modules/assets-monitoring/assets-monitoring.module').then((m) => m.AssetsMonitoringModule),
            },
            {
                path: 'organizations-structure',
                loadChildren: () => import('app/modules/organizations-structure/organization-structure.module').then((m) => m.OrganizationStructureModule),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'welcome',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModulesRoutingModule {}
