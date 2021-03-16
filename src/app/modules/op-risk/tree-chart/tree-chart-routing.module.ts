import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeChartPageComponent } from './tree-chart-page/tree-chart-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TreeChartPageComponent,
    },
    {
        path: ':name',
        component: TreeChartPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TreeChartRoutingModule {}
