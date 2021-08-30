import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: `contract-form`, loadChildren: () => import('./contract-form/contract-form.module').then((m) => m.ContractFormModule) },
    { path: `contract-list`, loadChildren: () => import('./contract-list/contract-list.module').then((m) => m.ContractListModule) },
    { path: `contract-type`, loadChildren: () => import('./contract-type/contract-type.module').then((m) => m.ContractTypeModule) },
    { path: `cardboard`, loadChildren: () => import('./cardboard-list/cardboard-list.module').then((m) => m.CardboardListModule) },
    { path: `flow/bpmn/:id`, loadChildren: () => import('./bpmn/bpmn.module').then((m) => m.BpmnModule) },
    { path: `flow`, loadChildren: () => import('./flow/flow.module').then((m) => m.FlowModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContractRoutingModule {}
