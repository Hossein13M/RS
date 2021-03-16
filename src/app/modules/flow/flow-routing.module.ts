import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowInstanceComponent } from './flow-instance/flow-instance.component';
import { BpmnComponent } from './flow-maker/bpmn/bpmn.component';
import { FlowWizardComponent } from './flow-wizard/flow-wizard.component';
import { FlowsComponent } from './flows/flows.component';

const routes: Routes = [
    {
        path: 'flows',
        component: FlowsComponent,
    },
    {
        path: 'instance',
        component: FlowInstanceComponent,
    },
    {
        path: 'wizard/:id',
        component: FlowWizardComponent,
    },
    {
        path: 'maker/:id',
        component: BpmnComponent,
    },
    {
        path: 'maker',
        component: BpmnComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlowRoutingModule {}
