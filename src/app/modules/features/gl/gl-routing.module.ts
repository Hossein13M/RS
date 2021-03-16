import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlChangesComponent } from './gl-changes/gl-changes.component';
import { GlGridComponent } from './gl-grid/gl-grid.component';
import { GlTreeComponent } from './gl-tree/gl-tree.component';

const routes: Routes = [
    {
        path: '',
        component: GlTreeComponent,
    },
    {
        path: 'tree',
        component: GlTreeComponent,
    },
    {
        path: 'grid',
        component: GlGridComponent,
    },
    {
        path: 'changes',
        component: GlChangesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlRoutingModule {}
