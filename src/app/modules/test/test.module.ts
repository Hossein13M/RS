import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'app/layout/layout.module';
import { ChartModule } from 'app/shared/components/chart/chart.module';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { ListTestPagesComponent } from './list-test-pages/list-test-pages.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { Page5Component } from './page5/page5.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { HeaderModule } from '../../layout/components/header/header.module';

// Edit This Section To Change Route Prefix
export const TRoutePrefix = 'test';
// ----------------------------------------

const routes: Routes = [
    {
        path: `${TRoutePrefix}`,
        pathMatch: 'full',
        redirectTo: `${TRoutePrefix}/list`,
    },
    {
        path: `${TRoutePrefix}/list`,
        component: ListTestPagesComponent,
    },
    {
        path: `${TRoutePrefix}/page1`,
        component: Page1Component,
    },
    {
        path: `${TRoutePrefix}/page2`,
        component: Page2Component,
    },
    {
        path: `${TRoutePrefix}/page3`,
        component: Page3Component,
    },
    {
        path: `${TRoutePrefix}/page4`,
        component: Page4Component,
    },
    {
        path: `${TRoutePrefix}/page5`,
        component: Page5Component,
    },
    {
        path: `${TRoutePrefix}/bubble`,
        component: BubbleChartComponent,
    },
];

@NgModule({
    declarations: [Page1Component, Page2Component, Page3Component, Page4Component, Page5Component, ListTestPagesComponent, BubbleChartComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MatDialogModule,
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
        LayoutModule,
        ShareModule,
        ChartModule,
        HeaderModule,
    ],
    entryComponents: [TableDialogComponent],
})
export class TestModule {}
