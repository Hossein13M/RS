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
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LoginModule } from './modules/login/login.module';
import { MessagingModule } from './modules/mails/messaging.module';
import { SendMailComponent } from './modules/mails/send-mail/send-mail.component';
import { OpRiskModule } from './modules/op-risk/op-risk.module';
import { PortfolioManagementModule } from './modules/portfolio-management/portfolio-management.module';
import { TestModule } from './modules/test/test.module';
import { ApiModule } from './services/API/api.module';
import { AuthGuard } from './services/auth.guard';
import { getFarsiPaginatorIntl } from './shared/components/table/farsi-paginator-intl';
import { MaterialModule } from './shared/material.module';
import { ShareModule } from './shared/share.module';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('app/modules/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'flow',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/modules/flow/flow.module').then((m) => m.FlowModule),
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
        loadChildren: () => import('app/modules/features/alarming/alarming.module').then((x) => x.AlarmingModule),
    },
    {
        path: 'nav',
        loadChildren: () => import('app/modules/nav/nav.module').then((x) => x.NavModule),
    },
    {
        path: 'user',
        loadChildren: () => import('app/modules/user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'settings',
        loadChildren: () => import('app/modules/settings/settings.module').then((m) => m.SettingsModule),
    },
    {
        path: 'gl',
        loadChildren: () => import('app/modules/gl/gl.module').then((m) => m.GlModule),
    },
    {
        path: 'system-setting',
        loadChildren: () => import('app/modules/features/system-setting/system-setting.module').then((m) => m.SystemSettingModule),
    },
    {
        path: 'welcome',
        loadChildren: () => import('app/modules/welcome/welcome.module').then((m) => m.WelcomeModule),
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        // Navigation
        FuseNavigationModule,

        LoginModule,
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
        SnotifyModule,
        LayoutModule,
        FuseThemeOptionsModule,

        PortfolioManagementModule,

        OpRiskModule,

        ShareModule,

        TestModule, // --> Test Playground
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
        { provide: MatPaginatorIntl, useValue: getFarsiPaginatorIntl() },
        SnotifyService,
        AuthGuard,
    ],
    exports: [],
    entryComponents: [SendMailComponent],
})
export class AppModule {}
