import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: `contract-form`,
        loadChildren: () => import('./contract-form/contract-form.module').then((m) => m.ContractFormModule),
    },
    {
        path: `contract-list`,
        loadChildren: () => import('./contract-list/contract-list.module').then((m) => m.ContractListModule),
    },
    {
        path: `contract-type`,
        loadChildren: () => import('./contract-type/contract-type.module').then((m) => m.ContractTypeModule),
    },
    {
        path: `cardboard`,
        loadChildren: () => import('./contract-cardboard/cardboard-list.module').then((m) => m.CardboardListModule),
    },
    {
        path: `flow/bpmn/:id`,
        loadChildren: () => import('./contract-bpmn/contract-bpmn.module').then((m) => m.ContractBpmnModule),
    },
    {
        path: `flow`,
        loadChildren: () => import('./contract-flow/contract-flow.module').then((m) => m.ContractFlowModule),
    },
    {
        path: `viewer/:id`,
        loadChildren: () => import('./contract-viewer/contract-viewer.module').then((m) => m.ContractViewerModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContractRoutingModule {}
