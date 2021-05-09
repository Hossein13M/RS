import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { LayoutModule } from 'app/layout/layout.module';
import { take } from 'rxjs/operators';

export const PMRoutePrefix = 'portfolio-management';

const routes: Routes = [
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

    // Settings
    {
        path: 'settings/trade-add',
        loadChildren: () => import('./trade-add/trade-add.module').then((m) => m.TradeAddModule),
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), LayoutModule],
})
export class PortfolioManagementModule {
    constructor(private fuseNavigationService: FuseNavigationService) {
        this.fuseNavigationService.onNavigationRegistered.pipe(take(1)).subscribe(() => {
            // ------------------------------------ General Menu
            const customFunctionNavItem = {
                id: 'portfolio-management',
                title: 'مدیریت سبد',
                icon: 'shopping_basket',
                type: 'collapsable',
                children: [
                    {
                        id: 'trade-book-dashboard',
                        title: 'پیشخوان',
                        icon: 'view_agenda',
                        type: 'item',
                        url: `/${PMRoutePrefix}/dashboard`,
                    },
                    {
                        id: 'trade-book',
                        title: 'دفتر معاملاتی',
                        icon: 'book',
                        type: 'item',
                        url: `/${PMRoutePrefix}/book`,
                    },
                    {
                        id: 'complianceCalc',
                        title: 'جستجوی معاملات',
                        icon: 'find_in_page',
                        type: 'item',
                        url: `/${PMRoutePrefix}/search`,
                    },
                ],
            };
            if (this.fuseNavigationService.getNavigationItem('marketRisk')) {
                this.fuseNavigationService.addNavigationItem(customFunctionNavItem, 'marketRisk');
            } else {
                const marketRisk = {
                    id: 'marketRisk',
                    title: 'ریسک بازار',
                    icon: 'bar_chart',
                    type: 'collapsable',
                    children: [customFunctionNavItem],
                };
                this.fuseNavigationService.addNavigationItem(marketRisk, 'end');
            }

            // ------------------------------------ Setting Menu
            const portfolioManagementSettingMenu = [
                {
                    icon: 'library_add',
                    id: 'trade-add',
                    title: 'ثبت دستی معاملات',
                    type: 'item',
                    url: '/settings/trade-add',
                },
            ];
            let newSettingsMenu = this.fuseNavigationService.getNavigationItem('settings');
            if (newSettingsMenu) {
                portfolioManagementSettingMenu.forEach((el) => newSettingsMenu.children.push(el));
                this.fuseNavigationService.updateNavigationItem('settings', newSettingsMenu);
            } else {
                newSettingsMenu = {
                    id: 'settings',
                    title: 'تنظیمات سیستم',
                    type: 'collapsable',
                    icon: 'dashboard',
                    children: [...portfolioManagementSettingMenu],
                };
                this.fuseNavigationService.addNavigationItem(newSettingsMenu, 'end');
            }
        });
    }
}
