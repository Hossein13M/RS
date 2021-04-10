import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { LayoutModule } from 'app/layout/layout.module';
import { take } from 'rxjs/operators';

export const ORRoutePrefix = 'op-risk';

const routes: Routes = [
    {
        path: `${ORRoutePrefix}`,
        pathMatch: 'full',
        redirectTo: `${ORRoutePrefix}/tree-chart`,
    },
    {
        path: `${ORRoutePrefix}/tree-chart`,
        loadChildren: () => import('./tree-chart/tree-chart.module').then((m) => m.TreeChartModule),
    },
    {
        path: `${ORRoutePrefix}/flow`,
        loadChildren: () => import('./op-risk-flow/op-risk-flow.module').then((m) => m.OpRiskFlowModule),
    },
    {
        path: `${ORRoutePrefix}/management`,
        loadChildren: () => import('./op-risk-managment/op-risk-managment.module').then((m) => m.OpRiskManagmentModule),
    },
    {
        path: `${ORRoutePrefix}/reporting`,
        loadChildren: () => import('./op-risk-reporting/op-risk-reporting.module').then((m) => m.OpRiskReportingModule),
    },
];

@NgModule({
    imports: [CommonModule, LayoutModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
})
export class OpRiskModule {
    constructor(private fns: FuseNavigationService) {
        this.fns.onNavigationRegistered.pipe(take(1)).subscribe(() => {
            // ------------------------------------ General Menu
            const customFunctionNavItem = {
                id: 'opRisk',
                title: 'ریسک عملیاتی',
                icon: 'beach_access',
                type: 'collapsable',
                children: [
                    { id: 'opRiskTreeChart', title: 'درختواره', icon: 'clear_all', type: 'item', url: `/${ORRoutePrefix}/tree-chart` },
                    { id: 'opRiskFlow', title: 'جریان', icon: 'clear_all', type: 'item', url: `/${ORRoutePrefix}/flow` },
                    {
                        id: 'OpRiskManagement',
                        title: 'مدیریت ریسک',
                        exactMatch: true,
                        icon: 'clear_all',
                        type: 'item',
                        url: `/${ORRoutePrefix}/management`,
                    },
                    { id: 'OpRiskReporting', title: 'گزارشات ریسک عملیاتی', icon: 'clear_all', type: 'item', url: `/${ORRoutePrefix}/reporting` },
                    {
                        id: 'OpRiskReporting',
                        title: 'ریسک و زیان‌های ثبت شده',
                        icon: 'clear_all',
                        type: 'item',
                        url: `/${ORRoutePrefix}/management/submitted-risks`,
                    },
                ],
            };
            this.fns.addNavigationItem(customFunctionNavItem, 'end');
        });
    }
}
