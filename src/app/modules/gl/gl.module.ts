import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { take } from 'rxjs/operators';
import { GlService } from './gl.service';

// Edit This Section To Change Route Prefix
export const GLRoutePrefix = 'gl';
// ----------------------------------------

const routes: Routes = [
    {
        path: `${GLRoutePrefix}`,
        pathMatch: 'full',
        redirectTo: `${GLRoutePrefix}/tree`,
    },
    {
        path: `${GLRoutePrefix}/tree`,
        loadChildren: () => import('./gl-tree/gl-tree.module').then((m) => m.GlTreeModule),
    },
    {
        path: `${GLRoutePrefix}/grid`,
        loadChildren: () => import('./gl-grid/gl-grid.module').then((m) => m.GlGridModule),
    },
    {
        path: `${GLRoutePrefix}/changes`,
        loadChildren: () => import('./gl-changes/gl-changes.module').then((m) => m.GlChangesModule),
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,

        // ADD Routes to Root Of Router
        RouterModule.forRoot(routes),
    ],
    providers: [GlService],
})
export class GlModule {
    constructor(private fns: FuseNavigationService) {
        this.fns.onNavigationRegistered.pipe(take(1)).subscribe((s) => {
            // ------------------------------------ General Menu
            const customFunctionNavItem = {
                id: 'glBrief',
                title: 'خلاصه دفتر کل',
                type: 'collapsable',
                icon: 'aspect_ratio',
                children: [
                    {
                        id: 'tree',
                        type: 'item',
                        url: '/gl/tree',
                        title: 'درختواره خلاصه دفتر',
                        icon: 'subject',
                    },
                    { id: 'grid', type: 'item', url: '/gl/grid', title: 'جدول خلاصه دفتر', icon: 'grid_on' },
                    {
                        id: 'changes',
                        type: 'item',
                        url: 'gl/changes',
                        title: 'تغییرات خلاصه دفتر',
                        icon: 'published_with_changes',
                    },
                ],
            };

            if (this.fns.getNavigationItem('financialModel')) {
                this.fns.addNavigationItem(customFunctionNavItem, 'financialModel');
            } else {
                const financialModel = {
                    id: 'financialModel',
                    title: 'مدل مالی',
                    icon: 'bar_chart',
                    type: 'collapsable',
                    children: [customFunctionNavItem],
                };
                this.fns.addNavigationItem(financialModel, 'end');
            }
        });
    }
}
