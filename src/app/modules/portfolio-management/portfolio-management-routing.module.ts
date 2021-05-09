import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const PMRoutePrefix = 'portfolio-management';

export const routes: Routes = [
    {
        path: `${PMRoutePrefix}`,
        pathMatch: 'full',
        redirectTo: `${PMRoutePrefix}/book`,
    },
    {
        path: `${PMRoutePrefix}/book`,
        loadChildren: () => import('./trade-book/trade-book.module').then((m) => m.TradeBookModule),
    },
    {
        path: `${PMRoutePrefix}/search`,
        loadChildren: () => import('./trade-search/trade-search.module').then((m) => m.TradeSearchModule),
    },
    {
        path: `${PMRoutePrefix}/dashboard`,
        loadChildren: () => import('./trade-dashboard/trade-dashboard.module').then((m) => m.TradeDashboardModule),
    },

    {
        path: 'settings/trade-add',
        loadChildren: () => import('./trade-add/trade-add.module').then((m) => m.TradeAddModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PortfolioManagementRoutingModule {}
