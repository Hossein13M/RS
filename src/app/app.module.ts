import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { FuseNavigationModule, FuseProgressBarModule, FuseSidebarModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/dashboard-configs';
import { LayoutModule } from 'app/layout/layout.module';
import { SendMailComponent } from './modules/mails/send-mail/send-mail.component';
import { ApiModule } from '#services/API/api.module';
import { getFarsiPaginatorIntl } from '#shared/components/table/farsi-paginator-intl';
import { MaterialModule } from '#shared/material.module';
import { AlertService } from '#shared/services/alert.service';
import { AuthGuard } from '#shared/services/auth.guard';
import { AuthorizationService } from './pages/authorization.service';

function urlMatcher(segments: UrlSegment[], regex: RegExp) {
    return segments.length >= 1 && regex.exec(segments[0].path);
}

export function authMatcher(segments: UrlSegment[]) {
    return urlMatcher(segments, /^(login|change-password|organization|forget-password)$/) ? { consumed: [] } : (undefined as any);
}

export function panelMatcher(segments: UrlSegment[]) {
    return urlMatcher(
        segments,
        /^(welcome|organizations-structure|assets-monitoring|system-settings|risk-measurement|nav|alarming|messaging|compliance|aum|contract)$/
    )
        ? { consumed: [] }
        : (undefined as any);
}

const routes: Routes = [
    // Panel Layout:
    {
        canActivate: [AuthGuard],
        matcher: panelMatcher,
        loadChildren: () => import('./modules/modules.module').then((module) => module.ModulesModule),
    },

    // Pages Layout:
    {
        matcher: authMatcher,
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    },

    // {
    //     path: '**',
    //     redirectTo: 'welcome',
    //     pathMatch: 'full',
    // },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        FuseNavigationModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ApiModule,
        MaterialModule,
        RouterModule.forRoot(routes),
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        LayoutModule,
        FuseSidebarModule,
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: MatPaginatorIntl, useValue: getFarsiPaginatorIntl() }, AuthGuard, AlertService, AuthorizationService],
    entryComponents: [SendMailComponent],
})
export class AppModule {}
