import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FuseNavigationModule, FuseProgressBarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/dashboard-configs';
import { LayoutModule } from 'app/layout/layout.module';
import { MessagingModule } from './modules/mails/messaging.module';
import { SendMailComponent } from './modules/mails/send-mail/send-mail.component';
import { OpRiskModule } from './modules/op-risk/op-risk.module';
import { PortfolioManagementModule } from './modules/portfolio-management/portfolio-management.module';
import { TestModule } from './modules/test/test.module';
import { ApiModule } from '#services/API/api.module';
import { getFarsiPaginatorIntl } from '#shared/components/table/farsi-paginator-intl';
import { MaterialModule } from '#shared/material.module';
import { ShareModule } from '#shared/share.module';
import { GlModule } from './modules/gl/gl.module';
import { AlertService } from '#services/alert.service';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { AuthGuard } from '#shared/auth.guard';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('app/modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
    },
    {
        path: 'flow',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/modules/flow/flow.module').then((m) => m.FlowModule),
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
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
        path: 'user',
        loadChildren: () => import('app/modules/user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'system-settings',
        loadChildren: () => import('app/modules/system-settings/system-settings.module').then((m) => m.SystemSettingsModule),
    },
    {
        path: 'welcome',
        loadChildren: () => import('app/modules/welcome/welcome.module').then((m) => m.WelcomeModule),
    },
    {
        path: 'assets-monitoring',
        loadChildren: () => import('app/modules/assets-monitoring/assets-monitoring.module').then((m) => m.AssetsMonitoringModule),
    },
    {
        path: 'organizations-structure',
        loadChildren: () => import('app/modules/organizations-structure/organization-structure.module').then((m) => m.OrganizationStructureModule),
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        FuseNavigationModule,
        AuthorizationModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ApiModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        MessagingModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        LayoutModule,
        FuseThemeOptionsModule,
        PortfolioManagementModule,
        OpRiskModule,
        ShareModule,
        GlModule,
        TestModule, // --> Test Playground
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: MatPaginatorIntl, useValue: getFarsiPaginatorIntl() }, AuthGuard, AlertService],
    entryComponents: [SendMailComponent],
})
export class AppModule {}
